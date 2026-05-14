"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header({ title, tagline }: { title: string; tagline: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[400px] px-4 pt-6 relative">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
        {title}
      </h1>

      {/* Tagline */}
      <p className="text-center text-gray-400 text-sm mt-1 mb-4">
        {tagline}
      </p>

      {/* Hamburger Menu */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute right-4 top-6 p-2"
      >
        <Menu size={26} className="text-gray-300" />
      </button>

      {/* Slide‑Down Menu */}
      {open && (
        <div className="absolute right-4 top-16 w-48 bg-[#111] border border-[#222] rounded-xl shadow-xl z-50 p-3 text-sm">
          <div className="flex flex-col text-gray-300">

            <a href="#" className="py-2 px-2 hover:bg-[#222] rounded">Edit Profile</a>
            <a href="#" className="py-2 px-2 hover:bg-[#222] rounded">Edit Pictures</a>
            <a href="#" className="py-2 px-2 hover:bg-[#222] rounded">Upload Pictures</a>
            <a href="#" className="py-2 px-2 hover:bg-[#222] rounded">My Entries</a>

            <div className="border-t border-[#333] my-2" />

            <a href="#" className="py-2 px-2 hover:bg-[#222] rounded">Privacy Policy</a>
            <a href="#" className="py-2 px-2 hover:bg-[#222] rounded">Terms of Service</a>
            <a href="#" className="py-2 px-2 hover:bg-[#222] rounded">Official Rules</a>

            <div className="border-t border-[#333] my-2" />

            <a href="#" className="py-2 px-2 text-red-400 hover:bg-[#222] rounded">
              Delete Account
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
