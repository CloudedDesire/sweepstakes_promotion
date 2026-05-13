"use client";

import { useEffect, useState } from "react";

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  // ⭐ EDITING STATE
  const [editing, setEditing] = useState<any>(null);

  // ⭐ LOAD ENTRIES + USERS + EVENTS
  useEffect(() => {
    fetch("/api/entries").then(r => r.json()).then(setEntries);
    fetch("/api/users").then(r => r.json()).then(setUsers);
    fetch("/api/events").then(r => r.json()).then(setEvents);
  }, []);

  // ⭐ START EDITING
  const startEdit = (entry: any) => {
    setEditing({ ...entry });
  };

  // ⭐ SAVE EDIT
  const saveEdit = async () => {
    await fetch("/api/entries", {
      method: "PATCH",
      body: JSON.stringify(editing)
    });

    const updated = await fetch("/api/entries").then(r => r.json());
    setEntries(updated);
    setEditing(null);
  };

  // ⭐ DELETE ENTRY
  const deleteEntry = async (id: string) => {
    await fetch("/api/entries", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    const updated = await fetch("/api/entries").then(r => r.json());
    setEntries(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Entries</h1>

      {/* ENTRY LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Entries</h2>

        <ul className="space-y-2">
          {entries.map((e: any) => (
            <li key={e._id} className="p-3 bg-white shadow rounded">
              <strong>User:</strong> {e.userId} <br />
              <strong>Event:</strong> {e.eventId} <br />
              <strong>Type:</strong> {e.entryType} <br />
              <strong>Amount:</strong> {e.amount} <br />
              <strong>Time:</strong> {new Date(e.timestamp).toLocaleString()}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEdit(e)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEntry(e._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ⭐ EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit Entry</h2>

            {/* User dropdown */}
            <select
              className="border p-2 w-full mb-2"
              value={editing.userId}
              onChange={e => setEditing({ ...editing, userId: e.target.value })}
            >
              {users.map((u: any) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>

            {/* Event dropdown */}
            <select
              className="border p-2 w-full mb-2"
              value={editing.eventId}
              onChange={e => setEditing({ ...editing, eventId: e.target.value })}
            >
              {events.map((ev: any) => (
                <option key={ev._id} value={ev._id}>
                  {ev.eventName}
                </option>
              ))}
            </select>

            {/* Editable fields */}
            {Object.keys(editing)
              .filter(k => !["_id", "userId", "eventId"].includes(k))
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
