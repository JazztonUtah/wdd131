const OFFICIAL_INTRO =
  "Children and youth need permission from a parent or guardian to participate in Church activities. This permission and medical release form must be completed and signed by a parent or guardian for activities that extend beyond regularly scheduled meetings or classes, including activities that involve overnight stays, travel beyond the local area, or any activity with additional risks that may require leaders to plan and prepare differently to help participants be safe.";

const PERMISSION_COL_LEFT =
  "I give permission for my child or youth (or if signing on my own behalf, as a leader attending this activity, I personally consent) to participate in the event and activities listed above (unless noted) and authorize the adult leaders supervising this event to administer emergency treatment to the above-named participant for any accident or illness and to act in my stead in approving necessary medical care. This authorization shall cover this event and travel to and from this event. Please note: Units may not have the ability to meet all medical, physical, and other accommodations and are asked to counsel with parents or guardians on what is possible. The participant is responsible for his or her own conduct and is aware of and";

const PERMISSION_COL_RIGHT =
  "agrees to abide by Church standards, camp or event safety rules, and other pertinent instructions. The participant’s conduct and interactions should abide by Church standards and exemplify Christlike behavior, including those listed on the attached “Conduct at Church Activities.” Parents and participants should understand that participation in an activity is not a right but a privilege that can be revoked if participants behave inappropriately or if they pose a risk to themselves or others. This information is collected to help event and activity leaders or medical personnel so they can be prepared and appropriately respond to health concerns or an emergency. It will be kept confidential and shared only as needed.";

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

function fieldMulti(label, value, className = "") {
  return `<div class="off-field ${className}">
    <span class="off-label">${label}</span>
    <span class="off-value off-value--multi">${escapeHtml(value)}</span>
  </div>`;
}

function yesNoBoxes(value) {
  return `<span class="off-yn"><span class="off-box ${value === "yes" ? "on" : ""}"></span> Yes</span>
    <span class="off-yn"><span class="off-box ${value === "no" ? "on" : ""}"></span> No</span>`;
}

function yesNoRowInline(question, value, explainLabel, explainValue) {
  return `<div class="off-yn-inline-row">
    <span class="off-yn-question">${question}</span>
    ${yesNoBoxes(value)}
    <div class="off-field off-field--explain">
      <span class="off-label">${explainLabel}</span>
      <span class="off-value">${escapeHtml(explainValue)}</span>
    </div>
  </div>`;
}

function yesNoRowStacked(question, value, explainLabel, explainValue) {
  return `<div class="off-yn-stacked">
    <div class="off-yn-inline-row off-yn-inline-row--compact">
      <span class="off-yn-question">${question}</span>
      ${yesNoBoxes(value)}
    </div>
    <div class="off-row off-row--tight">
      ${field(explainLabel, explainValue || "", "off-field")}
    </div>
  </div>`;
}

function signatureRow(label, signatureData, dateValue) {
  const img = signatureData?.startsWith("data:image")
    ? `<img src="${signatureData}" alt="Signature" crossorigin="anonymous" />`
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
  return `<div class="off-pdf-header">
      <div class="off-logo-area">
        <p class="off-church-name">The Church of Jesus Christ<br>of Latter-day Saints</p>
      </div>
      <h1 class="off-title">Permission and Medical Release Form</h1>
    </div>
    <p class="off-intro">${OFFICIAL_INTRO}</p>
    <hr class="off-rule" />

    <p class="off-section-title">Event details <span class="off-section-sub">(to be filled out by event planner)</span></p>
    <div class="off-row">
      ${field("Event", data.eventName, "off-field--event")}
      ${field("Date(s) of event", data.eventDates, "off-field--dates")}
    </div>
    <div class="off-row">
      ${fieldMulti("Describe event and activities (please be specific)", data.eventDescription, "off-field")}
    </div>
    <div class="off-row">
      ${field("Ward", data.ward, "off-field--half")}
      ${field("Stake", data.stake, "off-field--half")}
    </div>
    <div class="off-row">
      ${field("Event or activity leader", data.leaderName, "off-field--third")}
      ${field("Event or activity leader’s phone number", data.leaderPhone, "off-field--third")}
      ${field("Event or activity leader’s email", data.leaderEmail, "off-field--third")}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Contact information</p>
    <div class="off-row">
      ${field("Participant", data.participantName, "off-field--participant")}
      ${field("Date of birth", data.dateOfBirth, "off-field--dob")}
      ${field("Age", data.age, "off-field--age")}
    </div>
    <div class="off-row">
      ${field("Telephone number", data.participantPhone, "off-field")}
    </div>
    <div class="off-row">
      ${field("Address", data.address, "off-field--addr")}
      ${field("City", data.city, "off-field--city")}
      ${field("State or province", data.state, "off-field--state")}
    </div>
    <div class="off-row">
      ${field("Emergency contact (parent or guardian)", data.emergencyContact, "off-field--third")}
      ${field("Primary telephone number", data.primaryPhone, "off-field--third")}
      ${field("Secondary telephone number", data.secondaryPhone, "off-field--third")}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Medical information</p>
    ${yesNoRowInline(
      "Does the participant require a special diet?",
      data.specialDiet,
      "If yes, please explain the dietary restrictions",
      data.dietExplain
    )}
    ${yesNoRowInline(
      "Does the participant have any allergies?",
      data.allergies,
      "If yes, please list the allergies",
      data.allergiesList
    )}
    <div class="off-row">
      ${fieldMulti(
        "List all prescription or over-the-counter (OTC) medications the participant is taking. Leave blank if none.",
        data.medications,
        "off-field"
      )}
    </div>
    <div class="off-yn-inline-row off-yn-inline-row--compact">
      <span class="off-yn-question">Can the participant self-administer his or her medication?</span>
      ${yesNoBoxes(data.selfAdminister)}
    </div>
    <p class="off-note">If no, please contact the event or activity leader directly.</p>

    <hr class="off-rule" />
    <p class="off-section-title">Conditions that limit activity</p>
    ${yesNoRowStacked(
      "Does the participant have a chronic or recurring illness?",
      data.chronicIllness,
      "If yes, please explain",
      data.chronicExplain
    )}
    ${yesNoRowStacked(
      "Has the participant had surgery or a serious illness in the past year?",
      data.recentIllness,
      "If yes, please explain",
      data.recentExplain
    )}
    <div class="off-row">
      ${fieldMulti(
        "Identify any other limits, restrictions, or disabilities that could prevent the participant from fully participating in the event or activity.",
        data.otherLimits,
        "off-field"
      )}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Other accommodations or special needs</p>
    <div class="off-row">
      ${fieldMulti(
        "Identify any other needs or considerations the participant has that the event or activity planner should be aware of (attach additional pages if needed).",
        data.specialNeeds,
        "off-field"
      )}
    </div>

    <hr class="off-rule" />
    <p class="off-section-title">Permission</p>
    <div class="off-permission-cols">
      <p>${PERMISSION_COL_LEFT}</p>
      <p>${PERMISSION_COL_RIGHT}</p>
    </div>

    ${signatureRow("Participant’s signature", data.participantSignature, data.participantSignDate)}
    ${signatureRow(
      "Parent or guardian’s signature (if participant is a minor)",
      data.parentSignature,
      data.parentSignDate
    )}

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

function buildConductPageHtml() {
  return `<h2 class="off-conduct-title">Conduct at Church Activities</h2>
    <p class="off-conduct-intro">
      The Savior Jesus Christ invites us to live as He did (see 3 Nephi 27:21), including at
      events and activities. The goal for every activity is to have fun, build faith, love and
      serve each other, and grow spiritually. Everyone benefits when we follow these guidelines.
    </p>
    <div class="off-conduct-cols">
      <div class="off-conduct-col">
        <h3>These things can make the activity fun and uplifting:</h3>
        <ul>
          <li><strong>Remembering Who You Are:</strong> Trust in the Lord and follow gospel principles.</li>
          <li><strong>Respecting Privacy:</strong> Be smart about using media and social media. Ask permission before taking or posting pictures or videos of others.</li>
          <li><strong>Being Safe:</strong> Create an environment where others feel safe, welcomed, and able to feel God’s love.</li>
          <li><strong>Keeping It Friendly and Fun:</strong> Be a friend; reach out and be kind to everyone. Remember, these events are about making friends, not about romantic behavior or drama.</li>
          <li><strong>Being Engaged:</strong> Participate in and contribute as an influence for good by being a light to others.</li>
        </ul>
      </div>
      <div class="off-conduct-col">
        <h3>These things distract from and are not allowed during the event or activity:</h3>
        <ul>
          <li><strong>No Immorality:</strong> No talking about, encouraging, or engaging in any sexual activity. No immoral behavior, including making sexual advances. No sharing or viewing pornography.</li>
          <li><strong>No Harm:</strong> No bullying, threatening, or harming yourself or others in any way—physically, spiritually, or emotionally.</li>
          <li><strong>No Weapons or Harmful Substances:</strong> Do not bring dangerous or illegal items. Stay clean. Follow the Word of Wisdom.</li>
          <li><strong>No Stealing or Vandalism:</strong> Respect other people’s property.</li>
          <li><strong>No Disruptions:</strong> Cooperate. For minors, do not skip activities, miss curfew, or leave without notifying leaders.</li>
        </ul>
      </div>
    </div>
    <p class="off-conduct-closing">
      These guidelines keep everyone safe. If you do not follow them, you may have to go home, and for
      minors, your parents will be notified. Leaders will also report crimes and other harmful or
      destructive incidents (including pranks) to local authorities as required by law.
    </p>
    <p class="off-conduct-closing off-conduct-emphasis">
      Remember the Savior’s example, keep it fun, and build faith!
    </p>
    <div class="off-footer">
      <span></span>
      <span class="off-page-num">2</span>
      <span>© 2026 by Intellectual Reserve, Inc. All rights reserved. 1/26. PD60004035 000</span>
    </div>`;
}

function renderConductPage() {
  const container = document.getElementById("officialConductPdf");
  container.innerHTML = buildConductPageHtml();
  return container;
}

async function renderPageToCanvas(element) {
  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });
}

function addCanvasToPdf(pdf, canvas, pageWidth, pageHeight) {
  const imgData = canvas.toDataURL("image/png");
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
  } else {
    const scale = pageHeight / imgHeight;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth * scale, pageHeight);
  }
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

function assertPdfLibraries() {
  if (typeof html2canvas === "undefined") {
    throw new Error(
      "PDF tools did not load. Check your internet connection and refresh the page."
    );
  }
  if (!window.jspdf?.jsPDF) {
    throw new Error(
      "PDF library did not load. Check your internet connection and refresh the page."
    );
  }
}

async function createOfficialPdfFile(data) {
  assertPdfLibraries();
  const { jsPDF } = window.jspdf;
  const formContainer = renderOfficialForm(data);
  const conductContainer = renderConductPage();

  formContainer.style.left = "0";
  formContainer.style.zIndex = "-1";
  conductContainer.style.left = "0";
  conductContainer.style.zIndex = "-1";

  try {
    const formCanvas = await renderPageToCanvas(formContainer);
    const conductCanvas = await renderPageToCanvas(conductContainer);

    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    addCanvasToPdf(pdf, formCanvas, pageWidth, pageHeight);
    pdf.addPage();
    addCanvasToPdf(pdf, conductCanvas, pageWidth, pageHeight);

    const filename = getPdfFilename(data);
    const blob = pdf.output("blob");
    return { blob, filename };
  } finally {
    formContainer.style.left = "-10000px";
    conductContainer.style.left = "-10000px";
  }
}

async function downloadOfficialPdf(data) {
  const { blob, filename } = await createOfficialPdfFile(data);
  downloadPdfBlob(blob, filename);
  return filename;
}
