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

  useEffect(() => {
    fetch("/api/venues")
      .then(res => res.json())
      .then(data => setVenues(data));
  }, []);

  const createVenue = async () => {
    await fetch("/api/venues", {
      method: "POST",
      body: JSON.stringify(form)
    });

    // reload list
    const updated = await fetch("/api/venues").then(r => r.json());
    setVenues(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Venues</h1>

      <div className="grid grid-cols-2 gap-6">
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

        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Venues</h2>

          <ul className="space-y-2">
            {venues.map((v: any) => (
              <li key={v._id} className="p-3 bg-white shadow rounded">
                <strong>{v.venueName}</strong>
                <div>{v.address}</div>
                <div>{v.city}, {v.state}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
