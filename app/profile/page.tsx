"use client";

import FooterNav from "@/app/components/FooterNav";

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#0a0014] to-black text-white flex flex-col items-center">
      {/* Main Wrapper */}
      <div className="w-full max-w-[400px] mx-auto px-4 pb-24">

        {/* Header / Username */}
        <div className="text-center pt-8">
          <h1 className="text-2xl font-bold">Username</h1>
          <p className="text-sm text-purple-300 mt-1">
            Nightlife Enthusiast • VIP Explorer
          </p>
        </div>

        {/* Profile Photo */}
        <div className="flex justify-center mt-6">
          <div className="w-32 h-32 rounded-full bg-purple-700/40 border border-purple-500 shadow-[0_0_15px_#a855f7]"></div>
        </div>

        {/* Social Link Buttons (Text Only) */}
        <div className="mt-6 space-y-3">
          <button className="w-full py-3 rounded-lg bg-purple-900/40 border border-purple-500 text-purple-200">
            LinkedIn (placeholder)
          </button>
          <button className="w-full py-3 rounded-lg bg-purple-900/40 border border-purple-500 text-purple-200">
            Instagram (placeholder)
          </button>
          <button className="w-full py-3 rounded-lg bg-purple-900/40 border border-purple-500 text-purple-200">
            Custom URL (placeholder)
          </button>
        </div>

        {/* Contact Me Button */}
        <button className="w-full py-3 mt-6 rounded-lg bg-blue-600 text-white font-semibold shadow-[0_0_15px_#3b82f6]">
          Contact Me
        </button>

        {/* Photo Gallery */}
        <h2 className="text-lg font-semibold mt-10 mb-4">Photo Gallery</h2>

        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-32 bg-purple-800/30 border border-purple-600 rounded-md shadow-[0_0_10px_#9333ea]"
            ></div>
          ))}
        </div>
      </div>

      {/* Unified Footer */}
      <FooterNav />
    </div>
  );
}
