"use client";

import { useEffect, useState } from "react";

export default function CheckinsPage() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    fetch("/api/checkins").then(r => r.json()).then(setCheckins);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Check‑ins</h1>

      <ul className="space-y-2">
        {checkins.map((c: any) => (
          <li key={c._id} className="p-3 bg-white shadow rounded">
            <div>User: {c.userId}</div>
            <div>Venue: {c.venueId}</div>
            <div>Distance: {c.distanceFromVenue}m</div>
            <div>Valid: {c.valid ? "Yes" : "No"}</div>
            <div>{new Date(c.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
