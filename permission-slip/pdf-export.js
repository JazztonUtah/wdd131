function escapeHtml(text) {
  if (text == null || text === "") return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function field(label, value, className = "") {
  return `<div class="off-field ${className}">
    <span class="off-label">${label}</span>
    <span class="off-value">${escapeHtml(value)}</span>
  </div>`;
}

function yesNoBoxes(value) {
  return `<span class="off-yn"><span class="off-box ${value === "yes" ? "on" : ""}"></span> Yes</span>
    <span class="off-yn"><span class="off-box ${value === "no" ? "on" : ""}"></span> No</span>`;
}

function yesNoRow(question, value, explainLabel, explainValue) {
  let html = `<div class="off-yn-row">
    <span class="off-yn-question">${question}</span>
    ${yesNoBoxes(value)}
  </div>`;
  if (explainLabel) {
    html += `<div class="off-row off-row--tight">
      ${field(explainLabel, explainValue || "", "off-field")}
    </div>`;
  }
  return html;
}

function signatureRow(label, signatureData, dateValue) {
  const img = signatureData?.startsWith("data:image")
    ? `<img src="${signatureData}" alt="Signature" />`
    : "";
  return `<div class="off-sig-row">
    <div class="off-sig-block">
      <div class="off-sig-img">${img}</div>
      <div class="off-sig-label">${label}</div>
    </div>
    ${field("Date", dateValue || "", "off-sig-date")}
  </div>`;
}

function buildOfficialFormHtml(data) {
  const showParent =
    data.parentSignature?.startsWith("data:image") || data.parentSignDate;

  return `<div class="off-pdf-header">
      <div class="off-church-name">The Church of Jesus Christ<br>of Latter-day Saints</div>
      <h1 class="off-title">Permission and Medical Release Form</h1>
    </div>
    <p class="off-intro">
      To participate in Church activities, children and youth must have permission from a
      parent or legal guardian. This permission and medical release form must be completed
      for activities that extend beyond regularly scheduled meetings or that include
      overnight stays, travel, physical activity, or other factors that may require
      additional planning to ensure the safety of participants.
    </p>
    <hr class="off-rule" />

    <div class="off-row">
      ${field("Event", data.eventName, "off-field--lg")}
      ${field("Date(s) of event", data.eventDates, "off-field--md")}
    </div>
    <div class="off-row">
      ${field("Describe event and activities (please be specific)", data.eventDescription, "off-field")}
    </div>
    <div class="off-row">
      ${field("Ward", data.ward, "off-field")}
      ${field("Stake", data.stake, "off-field")}
    </div>
    <div class="off-row">
      ${field("Event or activity leader", data.leaderName, "off-field")}
      ${field("Event or activity leader's phone number", data.leaderPhone, "off-field--md")}
      ${field("Event or activity leader's email", data.leaderEmail, "off-field--md")}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Contact information</p>
    <div class="off-row">
      ${field("Participant", data.participantName, "off-field--lg")}
      ${field("Date of birth", data.dateOfBirth, "off-field--sm")}
      ${field("Age", data.age, "off-field--sm")}
    </div>
    <div class="off-row">
      ${field("Telephone number", data.participantPhone, "off-field")}
    </div>
    <div class="off-row">
      ${field("Address", data.address, "off-field--lg")}
      ${field("City", data.city, "off-field")}
      ${field("State or province", data.state, "off-field--sm")}
    </div>
    <div class="off-row">
      ${field("Emergency contact (parent or guardian)", data.emergencyContact, "off-field--lg")}
      ${field("Primary telephone number", data.primaryPhone, "off-field")}
      ${field("Secondary telephone number", data.secondaryPhone, "off-field")}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Medical information</p>
    ${yesNoRow(
      "Special diet?",
      data.specialDiet,
      "If yes, please explain dietary restrictions",
      data.dietExplain
    )}
    ${yesNoRow(
      "Allergies?",
      data.allergies,
      "If yes, please list allergies",
      data.allergiesList
    )}
    <div class="off-row">
      ${field(
        "List all prescription or over-the-counter (OTC) medications the participant is taking. Leave blank if none.",
        data.medications,
        "off-field"
      )}
    </div>
    <div class="off-yn-row">
      <span class="off-yn-question">Can the participant self-administer his or her medication?</span>
      ${yesNoBoxes(data.selfAdminister)}
    </div>
    <p style="font-size:7.5pt;margin:0 0 0.06in;">If no, please contact the event or activity leader directly.</p>

    <hr class="off-rule" />
    <p class="off-section-title">Conditions that limit activity</p>
    ${yesNoRow(
      "Chronic or recurring illness?",
      data.chronicIllness,
      "If yes, please explain",
      data.chronicExplain
    )}
    ${yesNoRow(
      "Surgery or serious illness in the past year?",
      data.recentIllness,
      "If yes, please explain",
      data.recentExplain
    )}
    <div class="off-row">
      ${field(
        "Identify any other limits, restrictions, or disabilities that could prevent the participant from fully participating in the event or activity.",
        data.otherLimits,
        "off-field"
      )}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Other accommodations or special needs</p>
    <div class="off-row">
      ${field(
        "Identify any other needs or considerations the participant has that the event or activity planner should be aware of (attach additional pages if needed).",
        data.specialNeeds,
        "off-field"
      )}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Permission</p>
    <div class="off-permission-cols">
      <p>
        I give permission for the participant named above to participate in the event or
        activity described in this form. I understand that this activity is
        Church-sponsored. The participant agrees to abide by Church standards and
        Christlike behavior during the activity.
      </p>
      <p>
        I authorize adult leaders to seek emergency medical treatment for the participant
        if I cannot be reached. I understand that Church units may not be able to
        accommodate every need or restriction and that participation is a privilege.
      </p>
    </div>

    ${signatureRow("Participant's signature", data.participantSignature, data.participantSignDate)}
    ${
      showParent
        ? signatureRow(
            "Parent or guardian's signature (if participant is a minor)",
            data.parentSignature,
            data.parentSignDate
          )
        : ""
    }

    <div class="off-footer">
      <span></span>
      <span class="off-page-num">1</span>
      <span>© 2026 by Intellectual Reserve, Inc. All rights reserved. 1/26. PD60004035 000</span>
    </div>`;
}

function renderOfficialForm(data) {
  const container = document.getElementById("officialFormPdf");
  container.innerHTML = buildOfficialFormHtml(data);
  return container;
}

function getPdfFilename(data) {
  const participant = data.participantName?.trim() || "Participant";
  const event = data.eventName?.trim() || "Event";
  return `Permission slip - ${participant} - ${event}.pdf`;
}

function downloadPdfBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function createOfficialPdfFile(data) {
  const { jsPDF } = window.jspdf;
  const container = renderOfficialForm(data);

  container.style.left = "0";
  container.style.zIndex = "-1";

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    } else {
      const scale = pageHeight / imgHeight;
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth * scale, pageHeight);
    }

    const filename = getPdfFilename(data);
    const blob = pdf.output("blob");
    return { blob, filename };
  } finally {
    container.style.left = "-10000px";
  }
}

async function downloadOfficialPdf(data) {
  const { blob, filename } = await createOfficialPdfFile(data);
  downloadPdfBlob(blob, filename);
  return filename;
}
