const EVENTS_STORAGE_KEY = "wardEvents";

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

function createEventId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getEventById(id) {
  return getStoredEvents().find((event) => event.id === id) || null;
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
}
