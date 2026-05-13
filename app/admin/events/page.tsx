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

  // ⭐ EDITING STATE
  const [editing, setEditing] = useState<any>(null);

  // ⭐ LOAD EVENTS + VENUES
  useEffect(() => {
    fetch("/api/events").then(r => r.json()).then(setEvents);
    fetch("/api/venues").then(r => r.json()).then(setVenues);
  }, []);

  // ⭐ CREATE EVENT
  const createEvent = async () => {
    await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const updated = await fetch("/api/events").then(r => r.json());
    setEvents(updated);

    // Reset form
    setForm({
      venueId: "",
      eventName: "",
      description: "",
      startTime: "",
      endTime: "",
      prizeDaily: "",
      prizeWeekly: "",
      prizeMonthly: ""
    });
  };

  // ⭐ START EDITING
  const startEdit = (event: any) => {
    setEditing({ ...event });
  };

  // ⭐ SAVE EDIT
  const saveEdit = async () => {
    await fetch("/api/events", {
      method: "PATCH",
      body: JSON.stringify(editing)
    });

    const updated = await fetch("/api/events").then(r => r.json());
    setEvents(updated);
    setEditing(null);
  };

  // ⭐ DELETE EVENT
  const deleteEvent = async (id: string) => {
    await fetch("/api/events", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    const updated = await fetch("/api/events").then(r => r.json());
    setEvents(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT SIDE — CREATE EVENT */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Create Event</h2>

          <select
            className="border p-2 w-full mb-2"
            value={form.venueId}
            onChange={e => setForm({ ...form, venueId: e.target.value })}
          >
            <option value="">Select Venue</option>
            {venues.map((v: any) => (
              <option key={v._id} value={v._id}>
                {v.venueName}
              </option>
            ))}
          </select>

          {Object.keys(form)
            .filter(k => k !== "venueId")
            .map(key => (
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

        {/* RIGHT SIDE — EVENT LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Events</h2>

          <ul className="space-y-2">
            {events.map((ev: any) => (
              <li key={ev._id} className="p-3 bg-white shadow rounded">
                <strong>{ev.eventName}</strong>
                <div>{ev.description}</div>
                <div>
                  {new Date(ev.startTime).toLocaleString()} →{" "}
                  {new Date(ev.endTime).toLocaleString()}
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(ev)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEvent(ev._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ⭐ EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>

            <select
              className="border p-2 w-full mb-2"
              value={editing.venueId}
              onChange={e => setEditing({ ...editing, venueId: e.target.value })}
            >
              {venues.map((v: any) => (
                <option key={v._id} value={v._id}>
                  {v.venueName}
                </option>
              ))}
            </select>

            {Object.keys(editing)
              .filter(k => !["_id", "venueId"].includes(k))
              .map(key => (
                <input
                  key={key}
                  className="border p-2 w-full mb-2"
                  value={editing[key]}
                  onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                />
              ))}

            <div className="flex gap-2 mt-4">
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
