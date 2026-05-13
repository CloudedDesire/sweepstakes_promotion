"use client";

import FooterNav from "@/app/components/FooterNav";
import { MapPin, Phone, Globe } from "lucide-react";

export default function VenuePage() {
  const venue = {
    name: "Club Eclipse",
    address: "123 Main Street, Phoenix, AZ",
    hours: "Mon–Sun • 6 PM – 2 AM",
    phone: "(602) 555-0199",
    photos: [
      "/images/venue1.jpg",
      "/images/venue2.jpg",
      "/images/venue3.jpg",
      "/images/venue4.jpg",
    ],
  };

  const openMaps = () => {
    const encoded = encodeURIComponent(venue.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#050505] text-white">
      {/* Main Wrapper */}
      <div className="w-full max-w-[400px] px-4 pb-24">

        {/* Header */}
        <h1 className="text-3xl font-bold mt-6 mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
          {venue.name}
        </h1>

        {/* Address */}
        <div className="flex items-center justify-center text-gray-300 text-sm mb-1">
          <MapPin size={16} className="mr-1" />
          {venue.address}
        </div>

        {/* Hours */}
        <p className="text-center text-gray-400 text-sm mb-4">{venue.hours}</p>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {venue.photos.map((src, i) => (
            <div
              key={i}
              className="w-full h-28 bg-[#111] border border-[#222] rounded-xl flex items-center justify-center text-gray-500 text-xs"
            >
              Photo
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={openMaps}
          className="w-full py-2 mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-[0_0_10px_rgba(255,0,255,0.4)]"
        >
          Get Directions
        </button>

        <button className="w-full py-2 mb-6 bg-[#111] border border-[#222] rounded-xl font-semibold">
          RSVP for Entries
        </button>

        {/* Contact + Socials */}
        <div className="flex flex-col items-center mb-10">
          <a
            href={`tel:${venue.phone}`}
            className="flex items-center text-purple-300 text-sm mb-3"
          >
            <Phone size={16} className="mr-2" />
            {venue.phone}
          </a>

          <div className="flex items-center gap-6 mt-2">
            <a href="#" className="text-gray-300 hover:text-purple-400">
              <Instagram size={26} />
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400">
              <Facebook size={26} />
            </a>
          </div>
        </div>
      </div>

      {/* Unified Footer */}
      <FooterNav />
    </div>
  );
}
