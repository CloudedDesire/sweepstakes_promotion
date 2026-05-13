"use client";

import { useEffect, useState } from "react";

export default function QRPage() {
  const [events, setEvents] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);
  const [form, setForm] = useState({
    eventId: "",
    venueId: "",
    codeValue: "",
    expiresAt: "",
    maxScans: ""
  });

  useEffect(() => {
    fetch("/api/events").then(r => r.json()).then(setEvents);
    fetch("/api/qr_codes").then(r => r.json()).then(setQrCodes);
  }, []);

  const createQR = async () => {
    await fetch("/api/qr_codes", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const updated = await fetch("/api/qr_codes").then(r => r.json());
    setQrCodes(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">QR Codes</h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Generate QR Code</h2>

          <select
            className="border p-2 w-full mb-2"
            value={form.eventId}
            onChange={e => setForm({ ...form, eventId: e.target.value })}
          >
            <option value="">Select Event</option>
            {events.map((ev: any) => (
              <option key={ev._id} value={ev._id}>{ev.eventName}</option>
            ))}
          </select>

          {Object.keys(form).filter(k => k !== "eventId").map(key => (
            <input
              key={key}
              placeholder={key}
              className="border p-2 w-full mb-2"
              value={(form as any)[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
            />
          ))}

          <button
            onClick={createQR}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save QR Code
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Existing QR Codes</h2>

          <ul className="space-y-2">
            {qrCodes.map((qr: any) => (
              <li key={qr._id} className="p-3 bg-white shadow rounded">
                <strong>{qr.codeValue}</strong>
                <div>Expires: {new Date(qr.expiresAt).toLocaleString()}</div>
                <div>Scans: {qr.scansUsed}/{qr.maxScans}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
