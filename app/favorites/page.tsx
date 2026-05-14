"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import FooterNav from "@/app/components/FooterNav";

export default function FavoritesPage() {
  const initialVenues = [
    {
      id: "1",
      name: "Club Eclipse",
      address: "123 Main St, Phoenix, AZ",
      phone: "(602) 555-0199",
      lastVisited: "May 2, 2026",
      favorited: true,
    },
    {
      id: "2",
      name: "Neon Cactus Lounge",
      address: "88 Desert Ridge Blvd, Phoenix, AZ",
      phone: "(602) 555-2211",
      lastVisited: "April 28, 2026",
      favorited: true,
    },
    {
      id: "3",
      name: "Skyline After Dark",
      address: "500 Central Ave, Phoenix, AZ",
      phone: "(602) 555-8822",
      lastVisited: "April 20, 2026",
      favorited: true,
    },
    {
      id: "4",
      name: "Midnight Mirage",
      address: "77 Camelback Rd, Scottsdale, AZ",
      phone: "(480) 555-3344",
      lastVisited: "April 18, 2026",
      favorited: true,
    },
    {
      id: "5",
      name: "Electric Ember Bar",
      address: "42 Roosevelt Row, Phoenix, AZ",
      phone: "(602) 555-9090",
      lastVisited: "April 10, 2026",
      favorited: true,
    },
    {
      id: "6",
      name: "Vibe District Social",
      address: "19 Tempe Town Lake Dr, Tempe, AZ",
      phone: "(480) 555-7711",
      lastVisited: "March 30, 2026",
      favorited: true,
    },
    {
      id: "7",
      name: "Pulse Room",
      address: "300 Mill Ave, Tempe, AZ",
      phone: "(480) 555-6600",
      lastVisited: "March 25, 2026",
      favorited: true,
    },
  ];

  const [venues, setVenues] = useState(initialVenues);

  const toggleFavorite = (id: string) => {
    setVenues((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, favorited: !v.favorited } : v
      )
    );
  };

  const openMaps = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white pb-24">

      {/* Global Header */}
      <Header
        title="Favorites"
        tagline="Your saved nightlife hotspots."
      />

      <div className="w-full max-w-[400px] px-4 pt-2">

        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-[#111] border border-[#222] rounded-xl p-4 mb-4 shadow-lg shadow-black/40"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{venue.name}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Last visited: {venue.lastVisited}
                </p>
              </div>

              <button
                onClick={() => toggleFavorite(venue.id)}
                className="text-3xl select-none"
              >
                {venue.favorited ? "❤️‍🔥" : "🤍"}
              </button>
            </div>

            <div className="mt-3 space-y-1">
              <p
                className="text-blue-400 underline cursor-pointer"
                onClick={() => openMaps(venue.address)}
              >
                {venue.address}
              </p>

              <a
                href={`tel:${venue.phone.replace(/[^0-9]/g, "")}`}
                className="text-pink-400 underline"
              >
                {venue.phone}
              </a>
            </div>

            <Link
              href={`/venues/${venue.id}`}
              className="block mt-4 text-center text-sm text-black font-semibold bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded-lg shadow-md shadow-blue-500/30"
            >
              Visit Page
            </Link>
          </div>
        ))}
      </div>

      <FooterNav />
    </div>
  );
}
