"use client";

import { useEffect, useState } from "react";

export default function CheckinsPage() {
  const [checkins, setCheckins] = useState([]);
  const [venues, setVenues] = useState([]);
  const [users, setUsers] = useState([]);

  // ⭐ EDITING STATE
  const [editing, setEditing] = useState<any>(null);

  // ⭐ LOAD CHECKINS + VENUES + USERS
  useEffect(() => {
    fetch("/api/checkins").then(r => r.json()).then(setCheckins);
    fetch("/api/venues").then(r => r.json()).then(setVenues);
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, []);

  // ⭐ START EDITING
  const startEdit = (checkin: any) => {
    setEditing({ ...checkin });
  };

  // ⭐ SAVE EDIT
  const saveEdit = async () => {
    await fetch("/api/checkins", {
      method: "PATCH",
      body: JSON.stringify(editing)
    });

    const updated = await fetch("/api/checkins").then(r => r.json());
    setCheckins(updated);
    setEditing(null);
  };

  // ⭐ DELETE CHECK-IN
  const deleteCheckin = async (id: string) => {
    await fetch("/api/checkins", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    const updated = await fetch("/api/checkins").then(r => r.json());
    setCheckins(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Check-ins</h1>

      {/* RIGHT SIDE — CHECK-IN LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Check-ins</h2>

        <ul className="space-y-2">
          {checkins.map((c: any) => (
            <li key={c._id} className="p-3 bg-white shadow rounded">
              <strong>User:</strong> {c.userId} <br />
              <strong>Venue:</strong> {c.venueId} <br />
              <strong>Distance:</strong> {c.distanceFromVenue} meters <br />
              <strong>Valid:</strong> {c.valid ? "Yes" : "No"} <br />
              <strong>Time:</strong> {new Date(c.timestamp).toLocaleString()}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEdit(c)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCheckin(c._id)}
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
            <h2 className="text-xl font-bold mb-4">Edit Check-in</h2>

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

            {/* Venue dropdown */}
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

            {/* Editable fields */}
            {Object.keys(editing)
              .filter(k => !["_id", "userId", "venueId"].includes(k))
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
