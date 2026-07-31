const EVENTS_STORAGE_KEY = "wardEvents";

let publishedEvents = [];

function resolveAssetUrl(filename) {
  return new URL(filename, window.location.href).href;
}

function getStoredEvents() {
  try {
    return JSON.parse(localStorage.getItem(EVENTS_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveStoredEvents(events) {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
}

async function loadPublishedEvents() {
  try {
    const url = resolveAssetUrl("events.json");
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      console.error(`Could not load events.json (${response.status})`);
      publishedEvents = [];
      return publishedEvents;
    }
    const text = await response.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) {
      console.error("events.json must be a JSON array of events");
      publishedEvents = [];
      return publishedEvents;
    }
    publishedEvents = data;
    return publishedEvents;
  } catch (error) {
    console.error("Failed to parse events.json — check for trailing commas or other invalid JSON.", error);
    publishedEvents = [];
    return publishedEvents;
  }
}

function getAllEvents() {
  const merged = new Map();
  publishedEvents.forEach((event) => merged.set(event.id, event));
  getStoredEvents().forEach((event) => merged.set(event.id, event));
  return Array.from(merged.values()).sort((a, b) =>
    (a.eventName || "").localeCompare(b.eventName || "")
  );
}

function createEventId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getEventById(id) {
  return getAllEvents().find((event) => event.id === id) || null;
}

function upsertEvent(eventData) {
  const events = getStoredEvents();
  const index = events.findIndex((e) => e.id === eventData.id);

  if (index >= 0) {
    events[index] = eventData;
  } else {
    events.push(eventData);
  }

  saveStoredEvents(events);
  return eventData;
}

function deleteStoredEvent(id) {
  const events = getStoredEvents().filter((e) => e.id !== id);
  saveStoredEvents(events);

  publishedEvents = publishedEvents.filter((e) => e.id !== id);
}

function getEventsJsonString() {
  return JSON.stringify(getAllEvents(), null, 2);
}

function downloadEventsJsonForDeploy() {
  const events = getAllEvents();
  const json = getEventsJsonString();
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "events.json";
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 500);

  return events.length;
}

async function copyEventsJsonToClipboard() {
  const json = getEventsJsonString();
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(json);
    return true;
  }
  return false;
}
