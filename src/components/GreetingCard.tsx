"use client";
import React from "react";

// Helper to get greeting by hour
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return "Selamat Pagi";
  if (hour >= 11 && hour < 15) return "Selamat Siang";
  if (hour >= 15 && hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

export default function GreetingCard({ name = "User" }: { name?: string }) {
  return (
    <div className="max-w-3xl w-full mx-auto rounded-2xl bg-gradient-to-r from-teal-900 to-teal-800 p-6 md:p-8 flex items-center justify-between shadow-lg min-h-[120px] md:min-h-[160px]">
      <div className="flex-1 min-w-0">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg truncate">
          {getGreeting()}, <span className="capitalize">{name}</span>
        </h2>
        <p className="text-white/90 text-sm md:text-base mb-3 drop-shadow truncate">Semoga harimu menyenangkan dan produktif!</p>
      </div>
      <div className="hidden md:flex items-end h-full">
        <img src="/assets/images/model1.png" alt="Greeting" className="h-28 md:h-36 w-auto drop-shadow-xl" />
      </div>
    </div>
  );
}
