"use client";

import { useEffect, useState } from "react";

export default function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState({
    venueName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    latitude: "",
    longitude: ""
  });

  // ⭐ EDITING STATE
  const [editing, setEditing] = useState<any>(null);

  // ⭐ LOAD VENUES ON PAGE LOAD
  useEffect(() => {
    fetch("/api/venues")
      .then(res => res.json())
      .then(data => setVenues(data));
  }, []);

  // ⭐ CREATE VENUE
  const createVenue = async () => {
    await fetch("/api/venues", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const updated = await fetch("/api/venues").then(r => r.json());
    setVenues(updated);

    // Reset form
    setForm({
      venueName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      latitude: "",
      longitude: ""
    });
  };

  // ⭐ START EDITING
  const startEdit = (venue: any) => {
    setEditing({ ...venue });
  };

  // ⭐ SAVE EDIT
  const saveEdit = async () => {
    await fetch("/api/venues", {
      method: "PATCH",
      body: JSON.stringify(editing)
    });

    const updated = await fetch("/api/venues").then(r => r.json());
    setVenues(updated);
    setEditing(null);
  };

  // ⭐ DELETE VENUE
  const deleteVenue = async (id: string) => {
    await fetch("/api/venues", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    const updated = await fetch("/api/venues").then(r => r.json());
    setVenues(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Venues</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT SIDE — CREATE VENUE */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Add Venue</h2>

          <div className="space-y-2">
            {Object.keys(form).map(key => (
              <input
                key={key}
                placeholder={key}
                className="border p-2 w-full"
                value={(form as any)[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
              />
            ))}

            <button
              onClick={createVenue}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Venue
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — VENUE LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Venues</h2>

          <ul className="space-y-2">
            {venues.map((v: any) => (
              <li key={v._id} className="p-3 bg-white shadow rounded">
                <strong>{v.venueName}</strong>
                <div>{v.address}</div>
                <div>{v.city}, {v.state}</div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(v)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteVenue(v._id)}
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
            <h2 className="text-xl font-bold mb-4">Edit Venue</h2>

            {Object.keys(editing)
              .filter(k => k !== "_id")
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
