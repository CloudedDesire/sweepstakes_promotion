"use client";

import { useEffect, useState } from "react";

export default function QRPage() {
  const [qrCodes, setQrCodes] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);

  const [form, setForm] = useState({
    eventId: "",
    venueId: "",
    codeValue: "",
    expiresAt: "",
    maxScans: ""
  });

  // ⭐ EDITING STATE
  const [editing, setEditing] = useState<any>(null);

  // ⭐ LOAD QR CODES + EVENTS + VENUES
  useEffect(() => {
    fetch("/api/qr_codes").then(r => r.json()).then(setQrCodes);
    fetch("/api/events").then(r => r.json()).then(setEvents);
    fetch("/api/venues").then(r => r.json()).then(setVenues);
  }, []);

  // ⭐ CREATE QR CODE
  const createQR = async () => {
    await fetch("/api/qr_codes", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const updated = await fetch("/api/qr_codes").then(r => r.json());
    setQrCodes(updated);

    setForm({
      eventId: "",
      venueId: "",
      codeValue: "",
      expiresAt: "",
      maxScans: ""
    });
  };

  // ⭐ START EDITING
  const startEdit = (qr: any) => {
    setEditing({ ...qr });
  };

  // ⭐ SAVE EDIT
  const saveEdit = async () => {
    await fetch("/api/qr_codes", {
      method: "PATCH",
      body: JSON.stringify(editing)
    });

    const updated = await fetch("/api/qr_codes").then(r => r.json());
    setQrCodes(updated);
    setEditing(null);
  };

  // ⭐ DELETE QR CODE
  const deleteQR = async (id: string) => {
    await fetch("/api/qr_codes", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    const updated = await fetch("/api/qr_codes").then(r => r.json());
    setQrCodes(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">QR Codes</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT SIDE — CREATE QR CODE */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Generate QR Code</h2>

          {/* Event dropdown */}
          <select
            className="border p-2 w-full mb-2"
            value={form.eventId}
            onChange={e => setForm({ ...form, eventId: e.target.value })}
          >
            <option value="">Select Event</option>
            {events.map((ev: any) => (
              <option key={ev._id} value={ev._id}>
                {ev.eventName}
              </option>
            ))}
          </select>

          {/* Venue dropdown */}
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

          {/* Other fields */}
          {Object.keys(form)
            .filter(k => !["eventId", "venueId"].includes(k))
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
            onClick={createQR}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save QR Code
          </button>
        </div>

        {/* RIGHT SIDE — QR CODE LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Existing QR Codes</h2>

          <ul className="space-y-2">
            {qrCodes.map((qr: any) => (
              <li key={qr._id} className="p-3 bg-white shadow rounded">
                <strong>Code:</strong> {qr.codeValue} <br />
                <strong>Event:</strong> {qr.eventId} <br />
                <strong>Venue:</strong> {qr.venueId} <br />
                <strong>Expires:</strong>{" "}
                {new Date(qr.expiresAt).toLocaleString()} <br />
                <strong>Scans:</strong> {qr.scansUsed}/{qr.maxScans}

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => start