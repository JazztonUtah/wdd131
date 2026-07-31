import { ELITE_PANEL, scoreConformation } from "./scoring.js";

const form = document.getElementById("eval-form");
const results = document.getElementById("results");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photo-preview");
const resultPhoto = document.getElementById("result-photo");
const panelGrid = document.getElementById("panel-grid");
const panelCount = document.getElementById("panel-count");

let photoDataUrl = null;

panelCount.textContent = String(ELITE_PANEL.length);

photoInput.addEventListener("change", () => {
  const file = photoInput.files?.[0];
  if (!file) {
    resetPhoto();
    return;
  }
  if (!file.type.startsWith("image/")) {
    alert("Please choose an image file.");
    photoInput.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    photoDataUrl = reader.result;
    photoPreview.style.backgroundImage = `url(${photoDataUrl})`;
    photoPreview.classList.add("has-image");
    photoPreview.innerHTML = "";
  };
  reader.readAsDataURL(file);
});

function resetPhoto() {
  photoDataUrl = null;
  photoPreview.style.backgroundImage = "";
  photoPreview.classList.remove("has-image");
  photoPreview.innerHTML =
    '<span class="photo-hint">Drop a side or three-quarter photo</span><span class="photo-sub">or click to upload</span>';
}

const SAMPLE_CRIA = {
  name: "Trail Sample",
  sex: "male",
  ageMonths: "6",
  witherHeight: "35",
  hipHeight: "34.75",
  weight: "140",
  legLength: "21.5",
  girthDepth: "18.5",
  chestWidth: "3.6",
  cannon: "4.6",
  neckLength: "14.5",
  backLength: "21.5",
  pastern: "upright",
  stance: "narrow",
  topline: "level",
  muscling: "excellent",
};

document.getElementById("fill-sample").addEventListener("click", () => {
  for (const [key, value] of Object.entries(SAMPLE_CRIA)) {
    const field = form.elements.namedItem(key);
    if (field) field.value = value;
  }
  form.requestSubmit();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const required = [
    "ageMonths",
    "witherHeight",
    "hipHeight",
    "weight",
    "legLength",
    "girthDepth",
    "chestWidth",
    "cannon",
    "neckLength",
    "backLength",
  ];

  for (const key of required) {
    const val = Number(data.get(key));
    if (!Number.isFinite(val) || val <= 0) {
      alert(`Please enter a valid number for ${key}.`);
      return;
    }
  }

  if (Number(data.get("legLength")) <= Number(data.get("girthDepth"))) {
    // still allow — scoring will punish hard
  }

  const input = {
    name: String(data.get("name") || "").trim() || "Untitled cria",
    sex: String(data.get("sex") || "male"),
    ageMonths: Number(data.get("ageMonths")),
    witherHeight: Number(data.get("witherHeight")),
    hipHeight: Number(data.get("hipHeight")),
    weight: Number(data.get("weight")),
    legLength: Number(data.get("legLength")),
    girthDepth: Number(data.get("girthDepth")),
    chestWidth: Number(data.get("chestWidth")),
    cannon: Number(data.get("cannon")),
    neckLength: Number(data.get("neckLength")),
    backLength: Number(data.get("backLength")),
    pastern: String(data.get("pastern")),
    stance: String(data.get("stance")),
    topline: String(data.get("topline")),
    muscling: String(data.get("muscling")),
  };

  const report = scoreConformation(input);
  renderResults(input, report);
});

function renderResults(input, report) {
  results.hidden = false;

  document.getElementById("result-name").textContent =
    `${input.name} · ${input.sex === "female" ? "Female" : "Male"}`;
  document.getElementById("score-value").textContent = String(report.total);
  document.getElementById("result-grade").textContent = report.grade;
  document.getElementById("result-panel-summary").textContent =
    report.panel.summary;

  const hp = report.heightProjection;
  document.getElementById("height-estimate").textContent = `${hp.estimate}"`;
  document.getElementById(
    "height-range"
  ).textContent = `Likely range ${hp.low}" – ${hp.high}"`;
  document.getElementById(
    "height-note"
  ).textContent = `Currently ~${hp.growthPercent}% of mature height at ${hp.ageMonths} mo`;

  const wp = report.weightProjection;
  document.getElementById("weight-estimate").textContent = `${wp.estimate} lb`;
  document.getElementById(
    "weight-range"
  ).textContent = `Likely range ${wp.low} – ${wp.high} lb`;
  document.getElementById(
    "weight-note"
  ).textContent = `Currently ~${wp.growthPercent}% of mature weight at ${wp.ageMonths} mo`;

  // Animated score ring
  const circle = document.getElementById("score-ring-fg");
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = String(circumference);
  circle.style.strokeDashoffset = String(circumference);
  requestAnimationFrame(() => {
    const offset = circumference - (report.total / 100) * circumference;
    circle.style.strokeDashoffset = String(offset);
    circle.style.stroke = scoreColor(report.total);
  });

  const penaltiesEl = document.getElementById("penalties");
  if (report.penalties.length) {
    penaltiesEl.hidden = false;
    penaltiesEl.innerHTML =
      "<strong>Hard deductions</strong><ul>" +
      report.penalties.map((p) => `<li>${escapeHtml(p)}</li>`).join("") +
      "</ul>";
  } else {
    penaltiesEl.hidden = true;
    penaltiesEl.innerHTML = "";
  }

  const list = document.getElementById("category-list");
  list.innerHTML = report.categories
    .map((c) => {
      const barWidth = Math.round(c.score);
      return `
      <article class="category">
        <div class="category-top">
          <h4>${escapeHtml(c.label)} <span class="weight">${c.weight} pts</span></h4>
          <span class="cat-score">${Math.round(c.score)}</span>
        </div>
        <div class="bar"><span style="width:${barWidth}%; background:${scoreColor(c.score)}"></span></div>
        <p class="cat-detail">${escapeHtml(c.detail)}</p>
        <p class="cat-verdict">${escapeHtml(c.verdict)}</p>
      </article>`;
    })
    .join("");

  const matchList = document.getElementById("match-list");
  matchList.innerHTML = report.panel.closerMatches
    .map(
      (m) => `
      <li>
        <strong>${escapeHtml(m.name)}</strong>
        <span>${escapeHtml(m.farm)} · ${m.sex} · ${m.witherHeight}" · ${m.weight} lb</span>
        <em>${escapeHtml(m.notes)}</em>
      </li>`
    )
    .join("");

  if (photoDataUrl) {
    resultPhoto.hidden = false;
    resultPhoto.style.backgroundImage = `url(${photoDataUrl})`;
  } else {
    resultPhoto.hidden = true;
    resultPhoto.style.backgroundImage = "";
  }

  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scoreColor(score) {
  if (score >= 86) return "#2f6b4f";
  if (score >= 72) return "#6b8f3a";
  if (score >= 58) return "#b8842a";
  if (score >= 42) return "#c45c2a";
  return "#9b2e2e";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPanel() {
  panelGrid.innerHTML = ELITE_PANEL.map(
    (p) => `
    <article class="panel-animal">
      <h3>${escapeHtml(p.name)}</h3>
      <p class="farm">${escapeHtml(p.farm)} · ${p.sex}</p>
      <p class="stats">${p.witherHeight}" withers · ${p.weight} lb · legs +${p.legOverGirth}" over girth · chest ${p.chestWidth}"</p>
      <p class="notes">${escapeHtml(p.notes)}</p>
    </article>`
  ).join("");
}

renderPanel();

// Reveal motion for sections
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".section-head, .eval-form, .panel-animal, .standards li")
  .forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
