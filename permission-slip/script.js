const MINOR_AGE = 18;

const form = document.getElementById("permissionForm");
const submitBtn = document.getElementById("submitBtn");
const eventDateType = document.getElementById("eventDateType");
const eventDatesHidden = document.getElementById("eventDates");
const singleDayDates = document.getElementById("singleDayDates");
const multipleDayDates = document.getElementById("multipleDayDates");
const eventDateSingle = document.getElementById("eventDateSingle");
const eventDateRange = document.getElementById("eventDateRange");

let singleDatePicker = null;
let rangeDatePicker = null;

const flatpickrOptions = {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "F j, Y",
  disableMobile: true,
  onChange: () => syncEventDatesField(),
};
const errorsEl = document.getElementById("formErrors");
const dobInput = document.getElementById("dateOfBirth");
const ageInput = document.getElementById("age");
const parentSignatureNote = document.getElementById("parentSignatureNote");
const parentSignDate = document.getElementById("parentSignDate");
const participantSignDate = document.getElementById("participantSignDate");

class SignaturePad {
  constructor(canvas, hiddenInput) {
    this.canvas = canvas;
    this.hiddenInput = hiddenInput;
    this.ctx = canvas.getContext("2d");
    this.drawing = false;
    this.hasStroke = false;

    this.ctx.strokeStyle = "#1a2e1b";
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.bindEvents();
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const wrap = this.canvas.parentElement;
    const width = wrap.clientWidth;
    const height = 140;
    const ratio = window.devicePixelRatio || 1;

    const imageData = this.hasStroke ? this.toDataURL() : null;

    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(ratio, ratio);
    this.ctx.strokeStyle = "#1a2e1b";
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    if (imageData) {
      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, width, height);
        this.syncHiddenInput();
      };
      img.src = imageData;
    }
  }

  getPoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  startDraw(event) {
    event.preventDefault();
    this.drawing = true;
    const { x, y } = this.getPoint(event);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  draw(event) {
    if (!this.drawing) return;
    event.preventDefault();
    const { x, y } = this.getPoint(event);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.hasStroke = true;
    this.syncHiddenInput();
  }

  endDraw() {
    if (!this.drawing) return;
    this.drawing = false;
    this.ctx.closePath();
    this.syncHiddenInput();
  }

  bindEvents() {
    this.canvas.addEventListener("mousedown", (e) => this.startDraw(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", () => this.endDraw());
    this.canvas.addEventListener("mouseleave", () => this.endDraw());

    this.canvas.addEventListener("touchstart", (e) => this.startDraw(e), {
      passive: false,
    });
    this.canvas.addEventListener("touchmove", (e) => this.draw(e), {
      passive: false,
    });
    this.canvas.addEventListener("touchend", () => this.endDraw());
  }

  isEmpty() {
    return !this.hasStroke;
  }

  clear() {
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);
    this.ctx.clearRect(0, 0, width, height);
    this.hasStroke = false;
    this.hiddenInput.value = "";
  }

  toDataURL() {
    return this.canvas.toDataURL("image/png");
  }

  syncHiddenInput() {
    if (this.hasStroke) {
      this.hiddenInput.value = this.toDataURL();
    } else {
      this.hiddenInput.value = "";
    }
  }
}

const participantPad = new SignaturePad(
  document.getElementById("participantSignaturePad"),
  document.getElementById("participantSignatureData")
);

const parentPad = new SignaturePad(
  document.getElementById("parentSignaturePad"),
  document.getElementById("parentSignatureData")
);

function setDefaultSignDate() {
  const today = new Date().toISOString().slice(0, 10);
  if (participantSignDate && !participantSignDate.value) {
    participantSignDate.value = today;
  }
}

function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }
  return age;
}

function updateParentSignatureNote(age) {
  if (!parentSignatureNote) return;

  if (age == null || age === "") {
    parentSignatureNote.textContent =
      "Required if the participant is under 18. Enter date of birth above to confirm.";
    return;
  }

  if (age < MINOR_AGE) {
    parentSignatureNote.textContent =
      "Required — participant is under 18. Parent or guardian must sign below.";
  } else {
    parentSignatureNote.textContent =
      "Not required — participant is 18 or older. Leave blank unless a parent is signing on their behalf.";
  }
}

function updateAgeAndParentFields() {
  if (!dobInput.value) {
    ageInput.value = "";
    parentSignDate.removeAttribute("required");
    updateParentSignatureNote(null);
    return;
  }

  const birthDate = new Date(dobInput.value + "T00:00:00");
  if (Number.isNaN(birthDate.getTime())) return;

  const age = calculateAge(birthDate);
  ageInput.value = age;
  updateParentSignatureNote(age);

  const isMinor = age < MINOR_AGE;

  if (isMinor) {
    parentSignDate.setAttribute("required", "");
    if (!parentSignDate.value) {
      parentSignDate.value = new Date().toISOString().slice(0, 10);
    }
  } else {
    parentSignDate.removeAttribute("required");
  }
}

function formatDisplayDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function destroyDatePickers() {
  singleDatePicker?.destroy();
  rangeDatePicker?.destroy();
  singleDatePicker = null;
  rangeDatePicker = null;
}

function initSingleDatePicker() {
  if (!singleDatePicker) {
    singleDatePicker = flatpickr(eventDateSingle, flatpickrOptions);
  }
}

function initRangeDatePicker() {
  if (!rangeDatePicker) {
    rangeDatePicker = flatpickr(eventDateRange, {
      ...flatpickrOptions,
      mode: "range",
    });
  }
}

function syncEventDatesField() {
  const mode = eventDateType.value;
  eventDatesHidden.value = "";

  if (mode === "single" && singleDatePicker?.selectedDates.length) {
    eventDatesHidden.value = formatDisplayDate(singleDatePicker.selectedDates[0]);
    return;
  }

  if (mode === "multiple" && rangeDatePicker?.selectedDates.length === 2) {
    const [start, end] = rangeDatePicker.selectedDates;
    eventDatesHidden.value =
      start.getTime() === end.getTime()
        ? formatDisplayDate(start)
        : `${formatDisplayDate(start)} – ${formatDisplayDate(end)}`;
  }
}

function setupEventDateFields() {
  const toggle = () => {
    const mode = eventDateType.value;
    singleDayDates.classList.toggle("hide", mode !== "single");
    multipleDayDates.classList.toggle("hide", mode !== "multiple");

    destroyDatePickers();

    if (mode === "single") {
      initSingleDatePicker();
    } else if (mode === "multiple") {
      initRangeDatePicker();
    }

    syncEventDatesField();
  };

  eventDateType.addEventListener("change", toggle);
  toggle();
}

function setEventDatesFromUrl(dates) {
  const range = dates.match(
    /^(\d{4}-\d{2}-\d{2})\s*(?:to|–|-)\s*(\d{4}-\d{2}-\d{2})$/i
  );

  if (range) {
    eventDateType.value = "multiple";
    eventDateType.dispatchEvent(new Event("change"));
    rangeDatePicker?.setDate([range[1], range[2]], true);
    return;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dates)) {
    eventDateType.value = "single";
    eventDateType.dispatchEvent(new Event("change"));
    singleDatePicker?.setDate(dates, true);
    return;
  }

  eventDatesHidden.value = dates;
}

function setupConditionalFields() {
  document.querySelectorAll("[data-show-when]").forEach((block) => {
    const [fieldName, expectedValue] = block.dataset.showWhen.split(":");
    const radios = form.querySelectorAll(`input[name="${fieldName}"]`);

    const toggle = () => {
      const selected = form.querySelector(`input[name="${fieldName}"]:checked`);
      const show = selected && selected.value === expectedValue;
      block.classList.toggle("hide", !show);

      const textarea = block.querySelector("textarea");
      if (textarea) {
        if (show) {
          textarea.setAttribute("required", "");
        } else {
          textarea.removeAttribute("required");
          textarea.value = "";
        }
      }
    };

    radios.forEach((radio) => radio.addEventListener("change", toggle));
    toggle();
  });
}

function applySavedEvent(event) {
  if (!event) return;

  document.getElementById("eventName").value = event.eventName || "";
  document.getElementById("eventDescription").value = event.eventDescription || "";
  document.getElementById("ward").value = event.ward || "Santaquin 10th Ward";
  document.getElementById("stake").value = event.stake || "Santaquin East Stake";
  document.getElementById("leaderName").value = event.leaderName || "";
  document.getElementById("leaderPhone").value = event.leaderPhone || "";
  document.getElementById("leaderEmail").value = event.leaderEmail || "";

  if (event.eventDateType && event.dateStart) {
    eventDateType.value = event.eventDateType;
    eventDateType.dispatchEvent(new Event("change"));

    if (event.eventDateType === "single") {
      singleDatePicker?.setDate(event.dateStart, true);
    } else if (event.eventDateType === "multiple") {
      rangeDatePicker?.setDate([event.dateStart, event.dateEnd || event.dateStart], true);
    }
    syncEventDatesField();
  }
}

function populateSavedEventsDropdown() {
  const select = document.getElementById("savedEventSelect");
  if (!select) return;

  const currentValue = select.value;
  select.innerHTML = '<option value="">— Enter event details manually —</option>';

  getStoredEvents().forEach((event) => {
    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = event.eventName;
    select.appendChild(option);
  });

  if (currentValue && getEventById(currentValue)) {
    select.value = currentValue;
  }
}

function setupSavedEventSelect() {
  const select = document.getElementById("savedEventSelect");
  if (!select) return;

  populateSavedEventsDropdown();

  select.addEventListener("change", () => {
    const event = getEventById(select.value);
    if (event) {
      applySavedEvent(event);
    }
  });
}

function prefillFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const savedEventId = params.get("event");

  if (savedEventId) {
    const stored = getEventById(savedEventId);
    if (stored) {
      const select = document.getElementById("savedEventSelect");
      if (select) select.value = savedEventId;
      applySavedEvent(stored);
      return;
    }
  }

  const map = {
    event: "eventName",
    dates: "eventDates",
    ward: "ward",
    stake: "stake",
    leader: "leaderName",
    phone: "leaderPhone",
    email: "leaderEmail",
  };

  Object.entries(map).forEach(([param, id]) => {
    const value = params.get(param);
    const el = document.getElementById(id);
    if (value && el) el.value = value;
  });

  const description = params.get("description");
  if (description) {
    document.getElementById("eventDescription").value = description;
  }

  const dates = params.get("dates");
  if (dates) {
    setEventDatesFromUrl(dates);
    syncEventDatesField();
  }
}

function collectFormData() {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}

function buildShareTitle(data) {
  const participant = data.participantName?.trim() || "Participant";
  const event = data.eventName?.trim() || "Unnamed event";
  return `Permission slip for ${participant} - ${event}`;
}

function getDeliveryMethod() {
  return (
    form.querySelector('input[name="deliveryMethod"]:checked')?.value || "text"
  );
}

function canSharePdf() {
  return typeof navigator.share === "function";
}

async function sharePdfByText(blob, filename, data) {
  const file = new File([blob], filename, { type: "application/pdf" });
  const shareData = {
    title: buildShareTitle(data),
    text: `Permission slip for ${data.participantName || "participant"} — ${data.eventName || "event"}`,
    files: [file],
  };

  if (!canSharePdf()) {
    downloadPdfBlob(blob, filename);
    throw new Error(
      "Text sharing is not supported in this browser. Use Safari or Chrome on a phone. The PDF was downloaded so you can attach it in Messages manually."
    );
  }

  if (navigator.canShare && !navigator.canShare(shareData)) {
    downloadPdfBlob(blob, filename);
    throw new Error(
      "This device cannot share PDF files directly. The PDF was downloaded—open Messages, pick your contact, and attach the file."
    );
  }

  try {
    await navigator.share(shareData);
  } catch (err) {
    if (err.name === "AbortError") {
      return "cancelled";
    }
    throw err;
  }

  return "shared";
}

function setSubmitting(isSubmitting) {
  submitBtn.disabled = isSubmitting;
  const method = getDeliveryMethod();
  if (!isSubmitting) {
    submitBtn.textContent = "Submit permission slip";
    return;
  }

  const labels = {
    download: "Creating PDF…",
    text: "Creating PDF & opening share…",
  };
  submitBtn.textContent = labels[method] || "Submitting…";
}

function updateTextShareAvailability() {
  const textOption = document.getElementById("textShareOption");
  const textNote = document.getElementById("textShareNote");
  if (!textOption || !textNote) return;

  if (canSharePdf()) {
    textNote.textContent =
      "Opens your phone’s share menu so you can pick a contact in Messages or another app.";
  } else {
    textNote.textContent =
      "Best on iPhone or Android. On a computer, choose Download PDF instead.";
  }
}

function formatPdfDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function preparePdfData(data) {
  const formatted = { ...data };
  formatted.dateOfBirth = formatPdfDate(formatted.dateOfBirth);
  formatted.participantSignDate = formatPdfDate(formatted.participantSignDate);
  formatted.parentSignDate = formatPdfDate(formatted.parentSignDate);
  return formatted;
}

function showErrors(messages) {
  errorsEl.innerHTML = "";
  if (!messages.length) return;

  const list = document.createElement("ul");
  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    list.appendChild(li);
  });
  errorsEl.appendChild(list);
  errorsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function validateForm() {
  const messages = [];

  if (!form.checkValidity()) {
    messages.push("Please complete all required fields.");
  }

  const age = Number(ageInput.value);
  if (Number.isNaN(age) || age < 0) {
    messages.push("Enter a valid date of birth.");
  }

  syncEventDatesField();

  if (!eventDateType.value) {
    messages.push("Select whether the event is one day or multiple days.");
  } else if (!eventDatesHidden.value) {
    if (eventDateType.value === "multiple") {
      messages.push(
        "Please select both the first and last day on the calendar."
      );
    } else {
      messages.push("Please select the event date on the calendar.");
    }
  }

  if (participantPad.isEmpty()) {
    messages.push("Participant signature is required. Please sign in the box provided.");
  }

  const isMinor = age < MINOR_AGE;
  if (isMinor && parentPad.isEmpty()) {
    messages.push(
      "Parent or guardian signature is required for participants under 18."
    );
  }

  showErrors(messages);
  return messages.length === 0;
}

function saveSubmission(data) {
  const key = "permissionSlips";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push({
    ...data,
    submittedAt: new Date().toISOString(),
  });
  localStorage.setItem(key, JSON.stringify(existing));
}

document.querySelectorAll(".btn-clear-signature").forEach((btn) => {
  btn.addEventListener("click", () => {
    const canvasId = btn.dataset.clear;
    if (canvasId === "participantSignaturePad") {
      participantPad.clear();
    } else if (canvasId === "parentSignaturePad") {
      parentPad.clear();
    }
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showErrors([]);

  participantPad.syncHiddenInput();
  parentPad.syncHiddenInput();

  if (!validateForm()) {
    form.reportValidity();
    return;
  }

  syncEventDatesField();
  const data = collectFormData();
  const deliveryMethod = getDeliveryMethod();
  setSubmitting(true);

  try {
    const pdfData = preparePdfData(data);
    const { blob, filename } = await createOfficialPdfFile(pdfData);
    saveSubmission(data);

    if (deliveryMethod === "download") {
      downloadPdfBlob(blob, filename);
      window.location.href = "completed.html?method=download";
    } else {
      const result = await sharePdfByText(blob, filename, data);
      if (result === "cancelled") {
        window.location.href = "completed.html?method=text&cancelled=1";
      } else {
        window.location.href = "completed.html?method=text";
      }
    }
  } catch (err) {
    showErrors([
      err.message || "Something went wrong creating the PDF. Please try again.",
    ]);
    setSubmitting(false);
  }
});

document.querySelectorAll('input[name="deliveryMethod"]').forEach((radio) => {
  radio.addEventListener("change", () => setSubmitting(false));
});

dobInput.addEventListener("change", updateAgeAndParentFields);
dobInput.addEventListener("input", updateAgeAndParentFields);

setDefaultSignDate();
setupEventDateFields();
setupSavedEventSelect();
setupConditionalFields();
prefillFromUrl();
updateAgeAndParentFields();
updateTextShareAvailability();

requestAnimationFrame(() => {
  participantPad.resize();
  parentPad.resize();
});
