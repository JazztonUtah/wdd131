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
      publishedEvents = [];
      return publishedEvents;
    }
    const data = await response.json();
    publishedEvents = Array.isArray(data) ? data : [];
    return publishedEvents;
  } catch {
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

function downloadEventsJsonForDeploy() {
  const json = JSON.stringify(getAllEvents(), null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "events.json";
  link.click();
  URL.revokeObjectURL(url);
}
