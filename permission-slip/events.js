const LEADER_PIN = "1820";
let eventsPageInitialized = false;

const eventForm = document.getElementById("eventForm");
const eventErrors = document.getElementById("eventErrors");
const eventFormTitle = document.getElementById("eventFormTitle");
const eventIdInput = document.getElementById("eventId");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const savedEventsList = document.getElementById("savedEventsList");
const noEventsMsg = document.getElementById("noEventsMsg");

const eventDateType = document.getElementById("eventDateType");
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
};

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

function setupEventDateFields() {
  const toggle = () => {
    const mode = eventDateType.value;
    singleDayDates.classList.toggle("hide", mode !== "single");
    multipleDayDates.classList.toggle("hide", mode !== "multiple");
    destroyDatePickers();
    if (mode === "single") initSingleDatePicker();
    else if (mode === "multiple") initRangeDatePicker();
  };

  eventDateType.addEventListener("change", toggle);
  toggle();
}

function getDateValuesFromForm() {
  const type = eventDateType.value;

  if (type === "single" && singleDatePicker?.selectedDates.length) {
    const date = singleDatePicker.selectedDates[0];
    const iso = singleDatePicker.formatDate(date, "Y-m-d");
    return { eventDateType: type, dateStart: iso, dateEnd: iso };
  }

  if (type === "multiple" && rangeDatePicker?.selectedDates.length === 2) {
    const [start, end] = rangeDatePicker.selectedDates;
    return {
      eventDateType: type,
      dateStart: rangeDatePicker.formatDate(start, "Y-m-d"),
      dateEnd: rangeDatePicker.formatDate(end, "Y-m-d"),
    };
  }

  return null;
}

function showErrors(messages) {
  eventErrors.innerHTML = "";
  if (!messages.length) return;
  const list = document.createElement("ul");
  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    list.appendChild(li);
  });
  eventErrors.appendChild(list);
}

function resetEventForm() {
  eventForm.reset();
  eventIdInput.value = "";
  eventFormTitle.textContent = "Add new event";
  cancelEditBtn.classList.add("hide");
  eventDateType.value = "";
  singleDayDates.classList.add("hide");
  multipleDayDates.classList.add("hide");
  destroyDatePickers();
  document.getElementById("ward").value = "Santaquin 10th Ward";
  document.getElementById("stake").value = "Santaquin East Stake";
}

function loadEventIntoForm(event) {
  eventIdInput.value = event.id;
  eventFormTitle.textContent = "Edit event";
  cancelEditBtn.classList.remove("hide");

  document.getElementById("eventName").value = event.eventName;
  document.getElementById("eventDescription").value = event.eventDescription;
  document.getElementById("ward").value = event.ward;
  document.getElementById("stake").value = event.stake;
  document.getElementById("leaderName").value = event.leaderName;
  document.getElementById("leaderPhone").value = event.leaderPhone;
  document.getElementById("leaderEmail").value = event.leaderEmail;

  eventDateType.value = event.eventDateType;
  eventDateType.dispatchEvent(new Event("change"));

  if (event.eventDateType === "single") {
    singleDatePicker?.setDate(event.dateStart, true);
  } else if (event.eventDateType === "multiple") {
    rangeDatePicker?.setDate([event.dateStart, event.dateEnd], true);
  }
}

function formatEventDates(event) {
  const opts = { month: "long", day: "numeric", year: "numeric" };
  const start = new Date(`${event.dateStart}T00:00:00`);
  const end = new Date(`${event.dateEnd}T00:00:00`);

  if (event.eventDateType === "single" || event.dateStart === event.dateEnd) {
    return start.toLocaleDateString("en-US", opts);
  }

  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}

function showPublishNotice() {
  const notice = document.getElementById("publishNotice");
  if (notice) notice.hidden = false;
}

function renderSavedEvents() {
  const events = getAllEvents();
  savedEventsList.innerHTML = "";
  noEventsMsg.hidden = events.length > 0;

  events.forEach((event) => {
    const li = document.createElement("li");
    li.className = "saved-event-item";

    const info = document.createElement("div");
    info.className = "saved-event-info";
    info.innerHTML = `<strong>${escapeHtml(event.eventName)}</strong>
      <span>${escapeHtml(formatEventDates(event))}</span>
      <span>${escapeHtml(event.leaderName)}</span>`;

    const actions = document.createElement("div");
    actions.className = "saved-event-actions";

    const useLink = document.createElement("a");
    useLink.href = new URL(
      `index.html?event=${encodeURIComponent(event.id)}`,
      window.location.href
    ).href;
    useLink.className = "btn-link";
    useLink.textContent = "Open form";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-secondary btn-small";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      loadEventIntoForm(event);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-secondary btn-small btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Delete "${event.eventName}"?`)) {
        deleteStoredEvent(event.id);
        renderSavedEvents();
        if (eventIdInput.value === event.id) resetEventForm();
      }
    });

    actions.append(useLink, editBtn, deleteBtn);
    li.append(info, actions);
    savedEventsList.appendChild(li);
  });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function unlockEventsPage() {
  document.getElementById("pinGate").classList.add("hide");
  document.getElementById("eventsContent").classList.remove("hide");
  document.getElementById("eventsFooter").classList.remove("hide");
}

function initPinGate() {
  const pinForm = document.getElementById("pinForm");
  const pinInput = document.getElementById("pinInput");
  const pinError = document.getElementById("pinError");

  pinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    pinError.classList.add("hide");

    if (pinInput.value === LEADER_PIN) {
      unlockEventsPage();
      if (!eventsPageInitialized) {
        initEventsPage();
        eventsPageInitialized = true;
      }
      return;
    }

    pinError.classList.remove("hide");
    pinInput.value = "";
    pinInput.focus();
  });
}

function initEventsPage() {
  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showErrors([]);

    const dates = getDateValuesFromForm();
    if (!dates) {
      showErrors(["Please select the event date(s) on the calendar."]);
      return;
    }

    const eventData = {
      id: eventIdInput.value || createEventId(),
      eventName: document.getElementById("eventName").value.trim(),
      eventDescription: document.getElementById("eventDescription").value.trim(),
      ward: document.getElementById("ward").value,
      stake: document.getElementById("stake").value,
      leaderName: document.getElementById("leaderName").value.trim(),
      leaderPhone: document.getElementById("leaderPhone").value.trim(),
      leaderEmail: document.getElementById("leaderEmail").value.trim(),
      ...dates,
    };

    upsertEvent(eventData);
    resetEventForm();
    renderSavedEvents();
    downloadEventsJsonForDeploy();
    showPublishNotice();
  });

  cancelEditBtn.addEventListener("click", resetEventForm);

  document.getElementById("exportEventsBtn")?.addEventListener("click", () => {
    downloadEventsJsonForDeploy();
    showPublishNotice();
  });

  setupEventDateFields();
  renderSavedEvents();
}

async function startEventsApp() {
  await loadPublishedEvents();
  initPinGate();
}

startEventsApp();
