"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header({ title, tagline }: { title: string; tagline: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[400px] px-4 pt-6 relative">

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,0,255,0.7)]">
        {title}
      </h1>

      {/* Tagline */}
      <p className="text-center text-gray-400 text-base mt-1 mb-5 tracking-wide">
        {tagline}
      </p>

      {/* Hamburger Menu */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute right-4 top-6 p-3"
      >
        <Menu size={30} className="text-gray-200" />
      </button>

      {/* Slide‑Down Menu */}
      {open && (
        <div className="absolute right-4 top-20 w-56 bg-[#111] border border-[#222] rounded-xl shadow-2xl z-50 p-3 text-base">
          <div className="flex flex-col text-gray-200">

            <a href="#" className="py-3 px-3 hover:bg-[#222] rounded-lg">Edit Profile</a>
            <a href="#" className="py-3 px-3 hover:bg-[#222] rounded-lg">Edit Pictures</a>
            <a href="#" className="py-3 px-3 hover:bg-[#222] rounded-lg">Upload Pictures</a>
            <a href="#" className="py-3 px-3 hover:bg-[#222] rounded-lg">My Entries</a>

            <div className="border-t border-[#333] my-3" />

            <a href="#" className="py-3 px-3 hover:bg-[#222] rounded-lg">Privacy Policy</a>
            <a href="#" className="py-3 px-3 hover:bg-[#222] rounded-lg">Terms of Service</a>
            <a href="#" className="py-3 px-3 hover:bg-[#222] rounded-lg">Official Rules</a>

            <div className="border-t border-[#333] my-3" />

            <a href="#" className="py-3 px-3 text-red-400 hover:bg-[#222] rounded-lg">
              Delete Account
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
