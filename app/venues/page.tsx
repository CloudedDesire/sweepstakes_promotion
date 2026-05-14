"use client";

import Header from "@/app/components/Header";
import FooterNav from "@/app/components/FooterNav";
import { MapPin, Phone } from "lucide-react";

export default function VenuePage() {
  const venue = {
    name: "Club Eclipse",
    address: "123 Main Street, Phoenix, AZ",
    hours: "Mon–Sun • 6 PM – 2 AM",
    phone: "(602) 555-0199",
    photos: [1, 2, 3, 4, 5, 6],
  };

  const openMaps = () => {
    const encoded = encodeURIComponent(venue.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#050505] text-white">

      {/* Global Header */}
      <Header
        title={venue.name}
        tagline="Nightlife Venue • Phoenix AZ"
      />

      <div className="w-full max-w-[400px] px-4 pb-24">

        {/* CHECK IN Graphic */}
        <div className="w-full flex justify-center mb-4 mt-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-[0_0_12px_rgba(255,0,255,0.5)] font-bold text-lg tracking-wide flex items-center gap-2">
            <MapPin size={20} />
            CHECK IN
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center justify-center text-gray-300 text-sm mb-1">
          <MapPin size={16} className="mr-1" />
          {venue.address}
        </div>

        {/* Hours */}
        <p className="text-center text-gray-400 text-sm">{venue.hours}</p>

        {/* Phone Number */}
        <a
          href={`tel:${venue.phone}`}
          className="flex justify-center items-center text-purple-300 text-sm mt-1 mb-4"
        >
          <Phone size={16} className="mr-2" />
          {venue.phone}
        </a>

        {/* Buttons Row */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={openMaps}
            className="w-1/2 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl font-semibold shadow-[0_0_10px_rgba(0,150,255,0.4)]"
          >
            Get Directions
          </button>

          <button className="w-1/2 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-[0_0_10px_rgba(255,0,255,0.4)]">
            RSVP for Entries
          </button>
        </div>

        {/* Social Links (Text Placeholders) */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-gray-300">
          <a href="#" className="hover:text-purple-400 underline">FB</a>
          <a href="#" className="hover:text-purple-400 underline">IG</a>
          <a href="#" className="hover:text-purple-400 underline">X</a>
          <a href="#" className="hover:text-purple-400 underline">URL</a>
        </div>

        {/* 6‑Image Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {venue.photos.map((_, i) => (
            <div
              key={i}
              className="w-full h-24 bg-[#111] border border-[#222] rounded-xl flex items-center justify-center text-gray-500 text-xs"
            >
              Photo
            </div>
          ))}
        </div>
      </div>

      <FooterNav />
    </div>
  );
}
