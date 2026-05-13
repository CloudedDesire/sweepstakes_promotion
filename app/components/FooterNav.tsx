"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Gift, Heart, User } from "lucide-react";

export default function FooterNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 w-full bg-[#0d0d12] border-t border-[#1f1f2a]">
      <div className="max-w-[400px] mx-auto flex justify-between px-8 py-3 text-gray-400">

        {/* HOME */}
        <Link
          href="/venues"
          className={`flex flex-col items-center ${
            isActive("/") ? "text-purple-400" : ""
          }`}
        >
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* DISCOVER */}
        <Link
          href="/discover"
          className={`flex flex-col items-center ${
            isActive("/discover") ? "text-purple-400" : ""
          }`}
        >
          <MapPin size={22} />
          <span className="text-xs mt-1">Discover</span>
        </Link>

        {/* EVENTS */}
        <Link
          href="/events"
          className={`flex flex-col items-center ${
            isActive("/events") ? "text-purple-400" : ""
          }`}
        >
          <Gift size={22} />
          <span className="text-xs mt-1">Events</span>
        </Link>

        {/* FAVORITES */}
        <Link
          href="/favorites"
          className={`flex flex-col items-center ${
            isActive("/favorites") ? "text-purple-400" : ""
          }`}
        >
          <Heart size={22} />
          <span className="text-xs mt-1">Favorites</span>
        </Link>

        {/* PROFILE */}
        <Link
          href="/profile"
          className={`flex flex-col items-center ${
            isActive("/profile") ? "text-purple-400" : ""
          }`}
        >
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </Link>

      </div>
    </div>
  );
}
