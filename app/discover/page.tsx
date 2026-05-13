"use client";

import FooterNav from "@/app/components/FooterNav";
import { MapPin, Star } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#050505] text-white">
      {/* Main Wrapper */}
      <div className="w-full max-w-[400px] px-4 pb-24">

        {/* Header */}
        <h1 className="text-3xl font-bold mt-6 mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
          Discover
        </h1>
        <p className="text-center text-sm text-gray-300 mb-6">
          Find nightlife hotspots near you.
        </p>

        {/* Category Filters */}
        <div className="flex justify-between mb-4">
          <button className="px-4 py-2 bg-[#111] border border-[#222] rounded-xl text-sm">
            Trending
          </button>
          <button className="px-4 py-2 bg-[#111] border border-[#222] rounded-xl text-sm">
            Nearby
          </button>
          <button className="px-4 py-2 bg-[#111] border border-[#222] rounded-xl text-sm">
            Top Rated
          </button>
        </div>

        {/* MAP PLACEHOLDER */}
        <div className="w-full h-40 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-gray-500 text-sm">
          Map Placeholder
        </div>

        <p className="text-xs text-gray-400 mt-2 mb-6">
          Nearby Hotspots • Within 5 Miles
        </p>

        {/* Venue Cards */}
        <VenueCard
          name="Club Eclipse"
          address="123 Main St, Phoenix, AZ"
          rating="4.8"
          distance="0.8 miles"
        />

        <VenueCard
          name="Pulse Lounge"
          address="456 Sunset Blvd, Phoenix, AZ"
          rating="4.6"
          distance="1.2 miles"
        />

        <VenueCard
          name="Neon Oasis"
          address="789 Ocean Dr, Phoenix, AZ"
          rating="4.9"
          distance="2.1 miles"
        />
      </div>

      {/* Unified Footer */}
      <FooterNav />
    </div>
  );
}

/* -----------------------------
   VENUE CARD COMPONENT
------------------------------ */
function VenueCard({
  name,
  address,
  rating,
  distance,
}: {
  name: string;
  address: string;
  rating: string;
  distance: string;
}) {
  return (
    <div className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-4 mb-4 shadow-[0_0_12px_rgba(255,0,255,0.15)]">
      <h2 className="text-xl font-semibold mb-1">{name}</h2>

      <div className="flex items-center text-gray-400 text-sm mb-1">
        <MapPin size={14} className="mr-1" />
        {address}
      </div>

      <div className="flex items-center text-gray-400 text-sm mb-1">
        <Star size={14} className="mr-1 text-yellow-400" />
        {rating} • {distance}
      </div>

      <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-[0_0_10px_rgba(255,0,255,0.4)]">
        View Venue
      </button>
    </div>
  );
}
