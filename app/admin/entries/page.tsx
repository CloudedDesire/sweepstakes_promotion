"use client";

import { useEffect, useState } from "react";

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("/api/entries").then(r => r.json()).then(setEntries);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Entries</h1>

      <ul className="space-y-2">
        {entries.map((e: any) => (
          <li key={e._id} className="p-3 bg-white shadow rounded">
            <div>User: {e.userId}</div>
            <div>Event: {e.eventId}</div>
            <div>Type: {e.entryType}</div>
            <div>Amount: {e.amount}</div>
            <div>{new Date(e.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
