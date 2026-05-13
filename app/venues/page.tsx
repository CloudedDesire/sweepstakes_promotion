"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  CalendarDays,
  User,
  LocateFixed,
} from "lucide-react";

const photos = [
  "/images/club-1.jpg",
  "/images/club-2.jpg",
  "/images/club-3.jpg",
  "/images/club-4.jpg",
];

export default function VenuePage() {
  const venue = {
    name: "Club Eclipse",
    address: "123 Main Street, Phoenix, AZ",
    hours: "Mon–Sun · 6 PM – 2 AM",
    phone: "(602) 555-0199",
  };

  // Native maps deep-link
  const openMaps = () => {
    const encoded = encodeURIComponent(venue.address);

    // iOS Apple Maps
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.location.href = `maps://?q=${encoded}`;
      return;
    }

    // Android + Desktop → Google Maps
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050010] overflow-hidden">
      {/* Centered wrapper with max width */}
      <div className="relative w-full max-w-[400px] min-h-screen bg-[#050010] text-white flex flex-col overflow-y-auto no-scrollbar">

        {/* Background glows */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1b0040] via-[#050010] to-black" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute top-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Content */}
        <div className="flex-1 pb-24 px-5 pt-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-wide">
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">
                {venue.name}
              </span>
            </h1>
          </div>

          {/* Hero image */}
          <div className="flex justify-center mb-5">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border border-pink-400/60 shadow-[0_0_25px_rgba(236,72,153,0.7)]">
              <img
                src="/images/club-hero.jpg"
                alt={venue.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Venue info */}
          <div className="space-y-2 text-sm text-gray-200 mb-6">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-pink-400 mt-0.5" />
              <span>{venue.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-cyan-400 mt-0.5" />
              <span>{venue.hours}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-purple-300 mt-0.5" />
              <span>{venue.phone}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={openMaps}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 
                         text-sm font-semibold py-3 shadow-[0_0_18px_rgba(56,189,248,0.8)] hover:shadow-[0_0_26px_rgba(56,189,248,1)] 
                         transition-shadow"
            >
              <Navigation className="h-4 w-4" />
              <span>Get Directions</span>
            </button>

            <button
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 
                         text-sm font-semibold py-3 shadow-[0_0_22px_rgba(236,72,153,0.9)] hover:shadow-[0_0_30px_rgba(236,72,153,1)] 
                         transition-shadow"
            >
              <CalendarDays className="h-4 w-4" />
              <span>RSVP to Earn Bonus Entries</span>
            </button>
          </div>

          {/* Social row */}
          <div className="flex justify-center gap-4 mb-6 text-xs text-gray-300">
            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_12px_rgba(148,163,184,0.6)]">
              f
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_12px_rgba(148,163,184,0.6)]">
              IG
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_12px_rgba(148,163,184,0.6)]">
              🌐
            </div>
          </div>

          {/* Photo gallery */}
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-gray-100">
              Photo Gallery
            </h2>
            <span className="text-[11px] text-gray-400">Swipe to view</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {photos.map((src, idx) => (
              <div
                key={idx}
                className="relative h-32 w-40 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 
                           shadow-[0_0_18px_rgba(15,23,42,0.9)]"
              >
                <img
                  src={src}
                  alt={`Photo ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] border-t border-white/10 bg-[#050010]/95 backdrop-blur-md">
          <div className="flex justify-around py-2.5 text-[11px]">
            <NavItem label="Discover" active icon={<MapPin className="h-5 w-5" />} />
            <NavItem label="Events" icon={<CalendarDays className="h-5 w-5" />} />
            <NavItem label="Check-In" icon={<LocateFixed className="h-5 w-5" />} />
            <NavItem label="Profile" icon={<User className="h-5 w-5" />} />
          </div>
        </nav>
      </div>
    </div>
  );
}

type NavItemProps = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

function NavItem({ label, icon, active }: NavItemProps) {
  return (
    <button
      className={`flex flex-col items-center gap-0.5 ${
        active ? "text-pink-400" : "text-gray-400"
      }`}
    >
      <div
        className={`flex items-center justify-center h-8 w-8 rounded-full ${
          active
            ? "bg-pink-500/20 shadow-[0_0_18px_rgba(236,72,153,0.9)]"
            : "bg-white/5"
        }`}
      >
        {icon}
      </div>
      <span className="mt-0.5">{label}</span>
    </button>
  );
}
