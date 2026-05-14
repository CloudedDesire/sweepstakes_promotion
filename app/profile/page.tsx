"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import FooterNav from "@/app/components/FooterNav";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#0a0014] to-black text-white flex flex-col items-center">

      {/* Global Header */}
      <Header
        title={user.name || "Your Profile"}
        tagline="Nightlife Enthusiast • VIP Explorer"
      />

      {/* Main Wrapper */}
      <div className="w-full max-w-[400px] mx-auto px-4 pb-24">

        {/* Profile Photo */}
        <div className="flex justify-center mt-4">
          <div className="w-32 h-32 rounded-full bg-purple-700/40 border border-purple-500 shadow-[0_0_15px_#a855f7] overflow-hidden">
            {/* Replace with real user photo later */}
            <img
              src={user.photoUrl || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Social Link Buttons */}
        <div className="mt-8 space-y-3">
          <button className="w-full py-3 rounded-lg bg-purple-900/40 border border-purple-500 text-purple-200">
            {user.linkedin || "LinkedIn (not set)"}
          </button>

          <button className="w-full py-3 rounded-lg bg-purple-900/40 border border-purple-500 text-purple-200">
            {user.instagram || "Instagram (not set)"}
          </button>

          <button className="w-full py-3 rounded-lg bg-purple-900/40 border border-purple-500 text-purple-200">
            {user.website || "Custom URL (not set)"}
          </button>
        </div>

        {/* Contact Me Button */}
        <button className="w-full py-3 mt-6 rounded-lg bg-blue-600 text-white font-semibold shadow-[0_0_15px_#3b82f6]">
          Contact Me
        </button>

        {/* Photo Gallery */}
        <h2 className="text-lg font-semibold mt-10 mb-4">Photo Gallery</h2>

        <div className="grid grid-cols-2 gap-3">
          {(user.photos?.length ? user.photos : Array.from({ length: 12 })).map(
            (photo: any, i: number) => (
              <div
                key={i}
                className="w-full h-32 bg-purple-800/30 border border-purple-600 rounded-md shadow-[0_0_10px_#9333ea] overflow-hidden"
              >
                {photo && (
                  <img
                    src={photo}
                    alt="User photo"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Unified Footer */}
      <FooterNav />
    </div>
  );
}
