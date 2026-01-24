"use client";

import { useState } from "react";
import EnrollmentPopup from "./PopupForm";

export const BottomEnrollFooter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-[env(safe-area-inset-bottom)]">
        {/* Left Section - Price & Offer */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Price Container */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Original Price */}
            <div className="relative">
              <span className="text-lg sm:text-xl lg:text-2xl text-gray-500 font-medium line-through">
                ₹9999
              </span>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 -translate-y-1/2"></div>
            </div>

            {/* Offer Price */}
            <div className="relative">
              <span className="text-2xl sm:text-3xl lg:text-4xl text-black font-bold tracking-tight">
                3500
              </span>
              <div className="absolute -inset-1 bg-linear-to-r from-transparent via-black/5 to-transparent blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Offer Badge */}
          <div className="relative inline-flex items-center">
            <div className="relative z-10 px-3 sm:px-4 py-1 sm:py-1.5 bg-linear-to-r from-gray-900 to-black text-white text-xs sm:text-sm font-bold border border-gray-800 rounded-full shadow-lg">
              <span className="relative z-10">Limited Time Offer</span>
              <div className="absolute top-0 left-0 right-0 h-full overflow-hidden rounded-full">
                <div className="absolute -top-4 -left-4 w-8 h-12 bg-white/30 rotate-45 animate-shine"></div>
              </div>
            </div>
            <div className="hidden sm:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45"></div>
          </div>
        </div>

        {/* Right Section - Button */}
        <button
          onClick={() => setOpen(true)}
          className="relative overflow-hidden bg-linear-to-r from-black via-gray-900 to-black text-white px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-base sm:text-lg lg:text-xl font-bold tracking-wide border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 w-full sm:w-auto cursor-pointer rounded-full group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>Enroll Now</span>
            <svg
              className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>

          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></span>
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30"></span>
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30"></span>
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></span>
        </button>
      </div>

      <EnrollmentPopup open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
