"use client";

import { useRouter } from "next/navigation";
import FooterNav from "@/app/components/FooterNav";
import { Calendar, MapPin } from "lucide-react";

export default function EventsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#050505] text-white">
      {/* Main Wrapper */}
      <div className="w-full max-w-[400px] flex flex-col px-4 pb-24">

        {/* Header */}
        <h1 className="text-3xl font-bold mt-6 mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
          Events
        </h1>
        <p className="text-center text-sm text-gray-300 mb-6">
          Join parties and earn bonus sweepstakes entries.
        </p>

        {/* Search + Filters Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 bg-[#111] border border-[#222] rounded-xl px-3 py-2 text-sm text-gray-300">
            Search by Venue, Date or Multiplier
          </div>
          <button className="ml-2 px-3 py-2 bg-[#111] border border-[#222] rounded-xl text-sm">
            Filters
          </button>
          <button className="ml-2 px-3 py-2 bg-[#111] border border-[#222] rounded-xl text-sm">
            Sort: Entries
          </button>
        </div>

        {/* EVENT CARDS */}
        <EventCard
          venue="Club Eclipse"
          address="123 Main St, Phoenix, AZ"
          date="May 15, 2026"
          time="9:00 PM"
          entries="1,200"
          multiplier="3x Gold Multiplier"
          onClick={() => router.push("/events/1")}
        />

        <EventCard
          venue="Pulse Lounge"
          address="456 Sunset Blvd, Los Angeles, CA"
          date="May 20, 2026"
          time="10:00 PM"
          entries="850"
          multiplier="2x Silver Multiplier"
          onClick={() => router.push("/events/2")}
        />

        <EventCard
          venue="Neon Oasis"
          address="789 Ocean Dr, Miami, FL"
          date="May 28, 2026"
          time="8:30 PM"
          entries="+1,000 Bonus Entries This Weekend!"
          multiplier=""
          highlight
          onClick={() => router.push("/events/3")}
        />
      </div>

      {/* Unified Footer */}
      <FooterNav />
    </div>
  );
}

/* -----------------------------
   EVENT CARD COMPONENT
------------------------------ */
function EventCard({
  venue,
  address,
  date,
  time,
  entries,
  multiplier,
  highlight = false,
  onClick,
}: {
  venue: string;
  address: string;
  date: string;
  time: string;
  entries: string;
  multiplier: string;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-full bg-[#0d0d0d] border ${
        highlight ? "border-pink-500" : "border-[#1a1a1a]"
      } rounded-2xl p-4 mb-4 shadow-[0_0_12px_rgba(255,0,255,0.15)]`}
    >
      <h2 className="text-xl font-semibold mb-1">{venue}</h2>

      <div className="flex items-center text-gray-400 text-sm mb-1">
        <MapPin size={14} className="mr-1" />
        {address}
      </div>

      <div className="flex items-center text-gray-400 text-sm mb-1">
        <Calendar size={14} className="mr-1" />
        {date} • {time}
      </div>

      <div className="text-sm text-gray-300 mt-2">
        <span className="font-semibold text-white">Total Entries:</span>{" "}
        {entries}
        {multiplier && (
          <span className="block text-purple-300 mt-1">{`(Includes ${multiplier})`}</span>
        )}
      </div>

      <button
        onClick={onClick}
        className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-[0_0_10px_rgba(255,0,255,0.4)]"
      >
        Join Event
      </button>
    </div>
  );
}
