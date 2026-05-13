"use client";

import { MapPin, Star, Navigation, User, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#0a0a0f] text-white">
      {/* MAIN WRAPPER */}
      <div className="w-full max-w-[400px] flex flex-col pb-24">

        {/* MAP PLACEHOLDER */}
        <div className="px-5">
          <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#1a1a25] to-[#0f0f17] border border-[#2a2a3a] flex items-center justify-center text-sm text-gray-400">
            Map Placeholder
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Nearby Hotspots • Within 5 Miles
          </p>
        </div>

        {/* VENUE LIST */}
        <div className="px-5 mt-6 flex flex-col gap-5">

          {/* ITEM */}
          <VenueCard
            name="Club Eclipse"
            area="Downtown"
            distance="0.4 miles"
            entries={200}
            image="/placeholder1.jpg"
          />

          <VenueCard
            name="Vibe Lounge"
            area="Midtown"
            distance="1.2 miles"
            entries={150}
            image="/placeholder2.jpg"
          />

          <VenueCard
            name="Neon Oasis"
            area="Riverside"
            distance="2.8 miles"
            entries={85}
            image="/placeholder3.jpg"
          />

          <VenueCard
            name="AfterGlow"
            area="Uptown"
            distance="3.5 miles"
            entries={120}
            image="/placeholder4.jpg"
          />
        </div>

        {/* PROMO BANNER */}
        <div className="px-5 mt-8">
          <div className="rounded-xl bg-gradient-to-br from-purple-700/40 to-blue-600/40 border border-purple-500/40 p-4 text-center">
            <h3 className="text-lg font-semibold text-white">
              WIN VIP PRIZES!
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Check In & Sweepstakes Entries for Cash Prizes
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER NAV */}
      <FooterNav />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function VenueCard({ name, area, distance, entries, image }: any) {
  return (
    <div className="w-full bg-[#111118] rounded-xl border border-[#2a2a3a] overflow-hidden">
      {/* IMAGE */}
      <div className="relative w-full h-36 bg-[#1a1a25]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover opacity-90"
        />
      </div>

      {/* INFO */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white">{name}</h2>
        <p className="text-sm text-gray-400">
          {area} • {distance}
        </p>

        <p className="text-sm text-purple-400 mt-1">
          {entries} Entries
        </p>

        <button className="mt-3 w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-sm font-medium shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          CHECK IN
        </button>
      </div>
    </div>
  );
}

function FooterNav() {
  return (
    <div className="fixed bottom-0 w-full bg-[#0d0d12] border-t border-[#1f1f2a]">
      <div className="max-w-[400px] mx-auto flex justify-between px-8 py-3 text-gray-400">

        <Link href="/discover" className="flex flex-col items-center text-purple-400">
          <MapPin size={22} />
          <span className="text-xs mt-1">Discover</span>
        </Link>

        <Link href="/events" className="flex flex-col items-center">
          <Gift size={22} />
          <span className="text-xs mt-1">Events</span>
        </Link>

        <Link href="/checkin" className="flex flex-col items-center">
          <Navigation size={22} />
          <span className="text-xs mt-1">Favorites</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center">
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </Link>

      </div>
    </div>
  );
}
