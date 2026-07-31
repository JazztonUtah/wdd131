/**
 * Baby llama → adult height projection + picky conformation scoring
 * Benchmarked against the elite US pack llama panel.
 */

import { ELITE_PANEL, getTargetsForSex, panelForSex } from "./elite-packers.js";

/**
 * Approximate fraction of mature wither height by age (months).
 * Based on camelid growth patterns; maturity ~36 months.
 */
const GROWTH_CURVE = [
  { months: 0, fraction: 0.52 },
  { months: 1, fraction: 0.58 },
  { months: 2, fraction: 0.63 },
  { months: 3, fraction: 0.68 },
  { months: 4, fraction: 0.72 },
  { months: 5, fraction: 0.75 },
  { months: 6, fraction: 0.78 },
  { months: 8, fraction: 0.82 },
  { months: 10, fraction: 0.85 },
  { months: 12, fraction: 0.88 },
  { months: 15, fraction: 0.91 },
  { months: 18, fraction: 0.935 },
  { months: 24, fraction: 0.965 },
  { months: 30, fraction: 0.985 },
  { months: 36, fraction: 1.0 },
];

/** Weight matures slower than linear height early on */
const WEIGHT_GROWTH_CURVE = [
  { months: 0, fraction: 0.09 },
  { months: 1, fraction: 0.14 },
  { months: 2, fraction: 0.2 },
  { months: 3, fraction: 0.28 },
  { months: 4, fraction: 0.34 },
  { months: 5, fraction: 0.4 },
  { months: 6, fraction: 0.45 },
  { months: 8, fraction: 0.55 },
  { months: 10, fraction: 0.62 },
  { months: 12, fraction: 0.68 },
  { months: 15, fraction: 0.76 },
  { months: 18, fraction: 0.82 },
  { months: 24, fraction: 0.9 },
  { months: 30, fraction: 0.96 },
  { months: 36, fraction: 1.0 },
];

function curveFraction(curve, ageMonths) {
  const age = Math.max(0, Math.min(36, Number(ageMonths)));
  if (age >= 36) return 1;

  for (let i = 0; i < curve.length - 1; i++) {
    const a = curve[i];
    const b = curve[i + 1];
    if (age >= a.months && age <= b.months) {
      const t = (age - a.months) / (b.months - a.months);
      return a.fraction + t * (b.fraction - a.fraction);
    }
  }
  return 1;
}

function growthFraction(ageMonths) {
  return curveFraction(GROWTH_CURVE, ageMonths);
}

function weightGrowthFraction(ageMonths) {
  return curveFraction(WEIGHT_GROWTH_CURVE, ageMonths);
}

export function estimateAdultHeight(currentWithers, ageMonths) {
  const frac = growthFraction(ageMonths);
  const estimate = currentWithers / frac;
  const uncertainty = ageMonths < 6 ? 1.8 : ageMonths < 12 ? 1.2 : ageMonths < 24 ? 0.7 : 0.35;
  return {
    estimate: round1(estimate),
    low: round1(estimate - uncertainty),
    high: round1(estimate + uncertainty),
    growthPercent: round1(frac * 100),
    ageMonths: Number(ageMonths),
  };
}

export function estimateAdultWeight(currentWeight, ageMonths) {
  const frac = weightGrowthFraction(ageMonths);
  const estimate = currentWeight / Math.max(frac, 0.08);
  const uncertainty = ageMonths < 6 ? 35 : ageMonths < 12 ? 25 : ageMonths < 24 ? 15 : 8;
  return {
    estimate: Math.round(estimate),
    low: Math.round(estimate - uncertainty),
    high: Math.round(estimate + uncertainty),
    growthPercent: round1(frac * 100),
    ageMonths: Number(ageMonths),
  };
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Piecewise scoring: perfect only at elite mean; falls off harshly.
 * @param {number} value
 * @param {number} ideal
 * @param {number} softTol - full-ish points within this distance
 * @param {number} hardTol - near-zero beyond this
 */
function scoreNearIdeal(value, ideal, softTol, hardTol) {
  const d = Math.abs(value - ideal);
  if (d <= softTol) return 100 - (d / softTol) * 12;
  if (d >= hardTol) return Math.max(0, 8 - (d - hardTol) * 4);
  const t = (d - softTol) / (hardTol - softTol);
  return 88 - t * 72;
}

function scoreBand(value, bestMin, bestMax, failBelow, failAbove) {
  if (value >= bestMin && value <= bestMax) {
    const mid = (bestMin + bestMax) / 2;
    const half = (bestMax - bestMin) / 2 || 0.01;
    return 100 - (Math.abs(value - mid) / half) * 8;
  }
  if (value < bestMin) {
    if (value <= failBelow) return 0;
    return ((value - failBelow) / (bestMin - failBelow)) * 72;
  }
  if (value >= failAbove) return 0;
  return ((failAbove - value) / (failAbove - bestMax)) * 72;
}

/**
 * @param {object} input - baby measurements + qualitative ratings
 * @returns full score report out of 100 (elite-harsh scale)
 */
export function scoreConformation(input) {
  const sex = input.sex === "female" ? "female" : "male";
  const TARGETS = getTargetsForSex(sex);
  const sexLabel = sex === "female" ? "female" : "male";
  const heightProj = estimateAdultHeight(input.witherHeight, input.ageMonths);
  const weightProj = estimateAdultWeight(input.weight, input.ageMonths);
  const projected = heightProj.estimate;
  const projectedWeight = weightProj.estimate;
  const weightRatio = projectedWeight / projected;

  const legLength = Number(input.legLength);
  const girthDepth = Number(input.girthDepth);
  const legOverGirthNow = legLength - girthDepth;
  const chestWidthNow = Number(input.chestWidth);
  const neckLength = Number(input.neckLength);
  const backLength = Number(input.backLength);
  const neckToBack = neckLength / backLength;
  const witherNow = Number(input.witherHeight);
  const hipHeight = Number(input.hipHeight);
  const frac = Math.max(heightProj.growthPercent / 100, 0.45);
  const scale = projected / witherNow;

  // Project absolute (inch) traits to adult; keep ratios as-is
  const legOverGirth = legOverGirthNow * scale;
  const chestWidth = chestWidthNow * scale;
  const backToHeight = backLength / witherNow;
  const hipOffset = (hipHeight - witherNow) * scale;
  const cannon = Number(input.cannon) / frac;

  const categories = [];

  // 1. Projected adult height vs sex-specific elite pack band (13 pts)
  const heightScore = scoreBand(
    projected,
    TARGETS.witherHeight.idealMin,
    TARGETS.witherHeight.idealMax,
    TARGETS.witherHeight.failBelow,
    TARGETS.witherHeight.failAbove
  );
  let heightAdj = heightScore;
  if (projected > TARGETS.witherHeight.softMax) heightAdj *= 0.55;
  else if (projected > TARGETS.witherHeight.idealMax) heightAdj *= 0.82;
  categories.push({
    id: "height",
    label: `Projected adult wither height (${sexLabel})`,
    weight: 13,
    score: clamp(heightAdj, 0, 100),
    detail: `Est. ${projected}" vs ${sexLabel} elite ideal ${TARGETS.witherHeight.idealMin}–${TARGETS.witherHeight.idealMax}" (same-sex panel mean ${round1(TARGETS.witherHeight.mean)}")`,
    verdict: heightVerdict(projected, sex),
  });

  // 2. Projected adult weight vs height ratio (9 pts) — lean pack athletes preferred
  const ratioScore = scoreBand(
    weightRatio,
    TARGETS.weight.ratioMin,
    TARGETS.weight.ratioMax,
    TARGETS.weight.ratioMin - 1.8,
    TARGETS.weight.ratioMax + 2.2
  );
  let weightScore = ratioScore;
  if (projectedWeight > TARGETS.weight.hardMax) weightScore *= 0.35;
  else if (projectedWeight > TARGETS.weight.softMax) weightScore *= 0.65;
  // Underweight for frame also hurts (not enough mass to pack)
  const lightCut = projectedWeight / projected < TARGETS.weight.ratioMin - 0.8;
  if (lightCut) weightScore = Math.min(weightScore, 45);
  categories.push({
    id: "weight",
    label: `Projected adult weight (${sexLabel})`,
    weight: 9,
    score: clamp(weightScore, 0, 100),
    detail: `Now ${Number(input.weight)} lb → adult est. ${projectedWeight} lb (ratio ${round1(weightRatio)} lb/in; ${sexLabel} ideal ${TARGETS.weight.ratioMin}–${TARGETS.weight.ratioMax}; panel mean ${Math.round(TARGETS.weight.mean)} lb)`,
    verdict: weightVerdict(projectedWeight, weightRatio, sex, TARGETS),
  });

  // 3. Leg length vs girth depth — NACA disqualifier under 2" (16 pts — critical)
  let legScore;
  if (legOverGirth < 2) {
    legScore = Math.max(0, (legOverGirth / 2) * 35);
  } else if (legOverGirth < TARGETS.legOverGirth.elite) {
    legScore = 35 + ((legOverGirth - 2) / (TARGETS.legOverGirth.elite - 2)) * 45;
  } else {
    legScore = scoreNearIdeal(legOverGirth, TARGETS.legOverGirth.mean, 0.4, 2.5);
  }
  categories.push({
    id: "legGirth",
    label: "Leg length over girth depth",
    weight: 16,
    score: clamp(legScore, 0, 100),
    detail: `Now ${round1(legOverGirthNow)}" → adult est. ${round1(legOverGirth)}" (NACA min 2"; ${sexLabel} elite mean ${round1(TARGETS.legOverGirth.mean)}")`,
    verdict:
      legOverGirth < 2
        ? "DISQUALIFYING by Ccara screen — deep body / short legs"
        : legOverGirth >= TARGETS.legOverGirth.elite
          ? `Elite ${sexLabel} athletic clearances`
          : "Acceptable but below elite pack mean",
  });

  // 4. Chest width between forelegs (11 pts)
  let chestScore;
  if (chestWidth > 6) chestScore = Math.max(0, 25 - (chestWidth - 6) * 12);
  else if (chestWidth > TARGETS.chestWidth.eliteMax)
    chestScore = 55 + ((6 - chestWidth) / (6 - TARGETS.chestWidth.eliteMax)) * 30;
  else chestScore = scoreNearIdeal(chestWidth, TARGETS.chestWidth.mean, 0.5, 2);
  categories.push({
    id: "chest",
    label: "Foreleg stance / chest width",
    weight: 11,
    score: clamp(chestScore, 0, 100),
    detail: `Now ${chestWidthNow}" → adult est. ${round1(chestWidth)}" (${sexLabel} elite mean ${round1(TARGETS.chestWidth.mean)}"; max 6")`,
    verdict:
      chestWidth > 6
        ? "Too wide — energy wasted pacing with pack sway"
        : chestWidth <= TARGETS.chestWidth.eliteMax
          ? "Narrow athletic base matching elite packers"
          : "Borderline — elite animals are narrower",
  });

  // 5. Neck : back proportion (9 pts)
  const neckScore = scoreNearIdeal(
    neckToBack,
    TARGETS.neckToBack.ideal,
    TARGETS.neckToBack.tol,
    0.22
  );
  categories.push({
    id: "neck",
    label: "Neck-to-back balance",
    weight: 9,
    score: clamp(neckScore, 0, 100),
    detail: `Ratio ${round1(neckToBack)} (ideal ≈ 0.67 / ⅔)`,
    verdict:
      Math.abs(neckToBack - 2 / 3) <= 0.05
        ? "Proportional counterbalance"
        : neckToBack < 0.58
          ? "Neck short relative to back — balance fault"
          : "Neck long / unbalanced relative to back",
  });

  // 6. Back length relative to height — short backs preferred (9 pts)
  let backScore;
  if (backToHeight <= TARGETS.backToHeight.mean) {
    backScore = scoreNearIdeal(backToHeight, TARGETS.backToHeight.mean, 0.03, 0.12);
    if (backToHeight < 0.48) backScore = Math.min(backScore, 92);
  } else if (backToHeight <= TARGETS.backToHeight.eliteMax) {
    backScore = 78 - ((backToHeight - TARGETS.backToHeight.mean) / 0.03) * 20;
  } else {
    backScore = Math.max(0, 50 - (backToHeight - TARGETS.backToHeight.eliteMax) * 180);
  }
  categories.push({
    id: "back",
    label: "Back length (strength)",
    weight: 9,
    score: clamp(backScore, 0, 100),
    detail: `Back/height ${round1(backToHeight)} (${sexLabel} elite mean ${round1(TARGETS.backToHeight.mean)}; long loins lose thrust)`,
    verdict:
      backToHeight > TARGETS.backToHeight.eliteMax
        ? "Long-backed — limited weight bearing vs elite"
        : "Strong, relatively short coupling",
  });

  // 7. Topline / hip-wither relationship (7 pts)
  const hipScore = (() => {
    if (hipOffset <= -0.5) return 98;
    if (hipOffset <= 0) return 90;
    if (hipOffset <= 0.75) return 62;
    if (hipOffset <= 1.5) return 35;
    return Math.max(0, 20 - hipOffset * 8);
  })();
  const toplineMap = {
    level: 100,
    "slight-hip": 55,
    "high-hip": 28,
    sway: 12,
    roach: 18,
  };
  const toplineBlend = hipScore * 0.55 + (toplineMap[input.topline] ?? 40) * 0.45;
  categories.push({
    id: "topline",
    label: "Topline & wither/hip balance",
    weight: 7,
    score: clamp(toplineBlend, 0, 100),
    detail: `Hip vs wither offset ~${round1(hipOffset)}" (negative = withers higher — preferred)`,
    verdict:
      hipOffset <= 0 && input.topline === "level"
        ? "Level topline — elite pack preference"
        : input.topline === "sway" || input.topline === "roach"
          ? "Serious topline fault for packing"
          : "Hips higher than withers — load tends to slide forward",
  });

  // 8. Cannon bone (7 pts) — sex-specific bone ideals
  const cannonScore = scoreBand(
    cannon,
    TARGETS.cannon.idealMin,
    TARGETS.cannon.idealMax,
    TARGETS.cannon.idealMin - 0.9,
    TARGETS.cannon.idealMax + 1.0
  );
  const cannonSoftMin = TARGETS.cannon.idealMin - 0.15;
  const cannonSoftMax = TARGETS.cannon.idealMax + 0.15;
  categories.push({
    id: "cannon",
    label: `Cannon bone (${sexLabel} medium bone ideal)`,
    weight: 7,
    score: clamp(cannonScore, 0, 100),
    detail: `Now ${Number(input.cannon)}" → adult est. ${round1(cannon)}" (${sexLabel} elite ${TARGETS.cannon.idealMin}–${TARGETS.cannon.idealMax}"; mean ${round1(TARGETS.cannon.mean)}")`,
    verdict:
      cannon < cannonSoftMin
        ? `Fine-boned for a ${sexLabel} — endurance risk under pack`
        : cannon > cannonSoftMax
          ? `Heavy bone for a ${sexLabel} — power yes, endurance may suffer`
          : `Medium bone matching high-end ${sexLabel} packers`,
  });

  // 9. Pasterns (9 pts)
  const pasternMap = { upright: 100, springy: 82, soft: 28, dropped: 0 };
  const pasternScore = pasternMap[input.pastern] ?? 40;
  categories.push({
    id: "pastern",
    label: "Pastern strength",
    weight: 9,
    score: pasternScore,
    detail: `Rated: ${input.pastern}`,
    verdict:
      input.pastern === "dropped"
        ? "DISQUALIFYING — packing career ending fault"
        : input.pastern === "soft"
          ? "Soft pasterns — unlikely to stay sound packing"
          : input.pastern === "upright"
            ? "Strong upright pasterns — elite requirement"
            : "Springy but acceptable on taller animals",
  });

  // 10. Stance / limb alignment (5 pts)
  const stanceMap = {
    narrow: 100,
    medium: 62,
    wide: 22,
    "cow-hock": 15,
    sickle: 18,
    "base-wide": 20,
  };
  categories.push({
    id: "stance",
    label: "Limb alignment & stance",
    weight: 5,
    score: stanceMap[input.stance] ?? 40,
    detail: `Rated: ${input.stance}`,
    verdict:
      input.stance === "narrow"
        ? "Narrow stance ideal for pacing gait"
        : "Alignment fault vs elite athletic type",
  });

  // 11. Muscling (5 pts)
  const muscleMap = { excellent: 100, good: 78, fair: 42, poor: 12 };
  categories.push({
    id: "muscle",
    label: "Chest & thigh muscling",
    weight: 5,
    score: muscleMap[input.muscling] ?? 40,
    detail: `Rated: ${input.muscling}`,
    verdict:
      input.muscling === "excellent"
        ? "Pectoral & inner-thigh definition of a working athlete"
        : "Needs more musculature for hard mountain packing",
  });

  let weighted = 0;
  let weightSum = 0;
  for (const c of categories) {
    weighted += (c.score * c.weight) / 100;
    weightSum += c.weight;
  }
  let raw = (weighted / weightSum) * 100;

  const penalties = [];
  if (legOverGirth < 2) {
    raw = Math.min(raw, 54);
    penalties.push("Front legs not 2\"+ longer than girth depth (Ccara DQ)");
  }
  if (input.pastern === "dropped") {
    raw = Math.min(raw, 38);
    penalties.push("Dropped pasterns (Ccara DQ / packing career risk)");
  }
  if (chestWidth > 6.5) {
    raw = Math.min(raw, 62);
    penalties.push("Chest excessively wide between forelegs");
  }
  if (projected < TARGETS.minUtilityHeight) {
    raw = Math.min(raw, 58);
    penalties.push(
      `Projected adult height below ${TARGETS.minUtilityHeight}" for ${sexLabel} pack utility`
    );
  }
  if (projected > TARGETS.maxSoundHeight) {
    raw = Math.min(raw, 60);
    penalties.push(
      `Projected over ${TARGETS.maxSoundHeight}" for a ${sexLabel} — elite selectors flag soundness risk`
    );
  }
  if (projectedWeight > TARGETS.weight.hardMax) {
    raw = Math.min(raw, 58);
    penalties.push(
      `Projected over ${TARGETS.weight.hardMax} lb — heavy weight is a pack liability, not an asset`
    );
  } else if (weightRatio > TARGETS.weight.ratioMax + 1.0) {
    raw = Math.min(raw, 68);
    penalties.push(
      `Weight-to-height ratio ${round1(weightRatio)} is soft/heavy vs elite ${sexLabel} packers`
    );
  }

  const total = Math.round(clamp(raw, 0, 100));

  const comparisons = compareToPanel(
    {
      projected,
      projectedWeight,
      weightRatio,
      legOverGirth,
      chestWidth,
      neckToBack,
      backToHeight,
      hipOffset,
      cannon,
      pastern: input.pastern,
      stance: input.stance,
      muscling: input.muscling,
      sex,
    },
    TARGETS
  );

  return {
    total,
    grade: gradeLabel(total, sex),
    sex,
    heightProjection: heightProj,
    weightProjection: weightProj,
    categories,
    penalties,
    panel: {
      size: comparisons.panelSize,
      sex: sexLabel,
      beats: comparisons.beats,
      trails: comparisons.trails,
      closerMatches: comparisons.closerMatches,
      summary: comparisons.summary,
    },
    targets: TARGETS,
  };
}

function weightVerdict(weight, ratio, sex, targets) {
  if (weight > targets.weight.hardMax)
    return `Far too heavy for a ${sex} packer — endurance and pasterns will pay`;
  if (weight > targets.weight.softMax)
    return `Over the preferred ${sex} pack weight ceiling — leaner is better on the trail`;
  if (ratio < targets.weight.ratioMin - 0.5)
    return "Light for frame — may lack substance for sustained packing";
  if (ratio > targets.weight.ratioMax)
    return "Heavy relative to height — elite packers stay athletic, not bulky";
  return `Lean athletic mass for an elite ${sex} packer`;
}

function heightVerdict(h, sex) {
  const t = getTargetsForSex(sex).witherHeight;
  if (h < t.failBelow + 1) return `Well below ${sex} pack utility height`;
  if (h < t.idealMin)
    return sex === "female"
      ? "Compact for a female — workable if proportions and pasterns are excellent"
      : "Marginal for a male packer — picky screeners dock hard";
  if (h <= t.idealMax) return `Sweet spot for elite ${sex} packers`;
  if (h <= t.softMax) return `Tall for a ${sex} — watch bone/pasterns for soundness`;
  return `Too tall for many elite ${sex} breeding programs concerned with longevity`;
}

function gradeLabel(score, sex) {
  const who = sex === "female" ? "female" : "male";
  if (score >= 93) return `Elite ${who} prospect — matches top pack athletes`;
  if (score >= 86) return `Strong ${who} pack prospect — minor nitpicks only`;
  if (score >= 78) return `Solid ${who} working type — not elite yet`;
  if (score >= 68) return `Average for a ${who} — several faults vs elite panel`;
  if (score >= 55) return `Below ${who} pack standard — selective breeding needed`;
  if (score >= 40) return `Poor conformation for serious ${who} packing`;
  return `Not a ${who} pack prospect under elite criteria`;
}

function compareToPanel(traits, targets) {
  const peerPanel = panelForSex(traits.sex);
  const center = targets.witherHeight.center;
  const idealMin = targets.witherHeight.idealMin;
  const idealMax = targets.witherHeight.idealMax;

  const scores = peerPanel
    .map((elite) => {
      const eliteRatio = elite.weight / elite.witherHeight;
      const diffs = [
        Math.abs(elite.witherHeight - traits.projected) / 3,
        Math.abs(elite.weight - traits.projectedWeight) / 40,
        Math.abs(eliteRatio - traits.weightRatio) / 0.8,
        Math.abs(elite.legOverGirth - traits.legOverGirth) / 1.2,
        Math.abs(elite.chestWidth - traits.chestWidth) / 1.5,
        Math.abs(elite.neckToBack - traits.neckToBack) / 0.08,
        Math.abs(elite.backToHeight - traits.backToHeight) / 0.06,
        Math.abs(elite.hipOffset - traits.hipOffset) / 1.2,
        Math.abs(elite.cannon - traits.cannon) / 0.6,
        elite.pastern === traits.pastern ? 0 : 1.2,
        elite.stance === traits.stance ? 0 : 1.0,
        elite.muscling === traits.muscling ? 0 : 0.8,
      ];
      const distance = diffs.reduce((a, b) => a + b, 0);
      return {
        name: elite.name,
        farm: elite.farm,
        notes: elite.notes,
        sex: elite.sex,
        distance,
        witherHeight: elite.witherHeight,
        weight: elite.weight,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  const closerMatches = scores.slice(0, 5);
  let beats = 0;
  for (const elite of peerPanel) {
    let points = 0;
    if (traits.legOverGirth >= elite.legOverGirth) points++;
    if (traits.chestWidth <= elite.chestWidth) points++;
    if (Math.abs(traits.neckToBack - 2 / 3) <= Math.abs(elite.neckToBack - 2 / 3)) points++;
    if (traits.backToHeight <= elite.backToHeight) points++;
    if (traits.hipOffset <= elite.hipOffset) points++;
    const eliteRatio = elite.weight / elite.witherHeight;
    if (Math.abs(traits.weightRatio - targets.weight.ratioCenter) <= Math.abs(eliteRatio - targets.weight.ratioCenter))
      points++;
    const inBand =
      traits.projected >= idealMin &&
      traits.projected <= idealMax &&
      !(
        elite.witherHeight >= idealMin &&
        elite.witherHeight <= idealMax &&
        Math.abs(elite.witherHeight - center) < Math.abs(traits.projected - center)
      );
    if (inBand || Math.abs(traits.projected - center) <= Math.abs(elite.witherHeight - center))
      points++;
    if (points >= 4) beats++;
  }

  const n = peerPanel.length;
  const sexLabel = traits.sex === "female" ? "female" : "male";

  return {
    panelSize: n,
    beats,
    trails: n - beats,
    closerMatches,
    summary:
      beats >= n * 0.6
        ? `Outperforms ${beats}/${n} elite ${sexLabel} references on key structural metrics.`
        : beats >= n * 0.35
          ? `Competitive with ${beats}/${n} elite ${sexLabel}s — still trailing the best.`
          : `Trails ${n - beats}/${n} elite ${sexLabel}s — be picky.`,
  };
}

export { ELITE_PANEL, growthFraction, getTargetsForSex };
