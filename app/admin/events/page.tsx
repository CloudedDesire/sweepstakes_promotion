"use client";

import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState({
    venueId: "",
    eventName: "",
    description: "",
    startTime: "",
    endTime: "",
    prizeDaily: "",
    prizeWeekly: "",
    prizeMonthly: ""
  });

  useEffect(() => {
    fetch("/api/events").then(r => r.json()).then(setEvents);
    fetch("/api/venues").then(r => r.json()).then(setVenues);
  }, []);

  const createEvent = async () => {
    await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const updated = await fetch("/api/events").then(r => r.json());
    setEvents(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create Event</h2>

          <select
            className="border p-2 w-full mb-2"
            value={form.venueId}
            onChange={e => setForm({ ...form, venueId: e.target.value })}
          >
            <option value="">Select Venue</option>
            {venues.map((v: any) => (
              <option key={v._id} value={v._id}>{v.venueName}</option>
            ))}
          </select>

          {Object.keys(form).filter(k => k !== "venueId").map(key => (
            <input
              key={key}
              placeholder={key}
              className="border p-2 w-full mb-2"
              value={(form as any)[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
            />
          ))}

          <button
            onClick={createEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Event
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Events</h2>

          <ul className="space-y-2">
            {events.map((ev: any) => (
              <li key={ev._id} className="p-3 bg-white shadow rounded">
                <strong>{ev.eventName}</strong>
                <div>{ev.description}</div>
                <div>{new Date(ev.startTime).toLocaleString()}</div>
                <div>{new Date(ev.endTime).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
