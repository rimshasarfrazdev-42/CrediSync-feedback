// components/ui/MobileScrollableTable.jsx
import React from "react";

export default function MobileScrollableTable({ children, className = "" }) {
  return (
    <div className={`relative w-full bg-white border border-gray-200 shadow-sm rounded-xl ${className}`}>
      {/* Swipe hint (mobile only) */}
      <div className="flex items-center justify-end px-3 pt-2 text-xs text-gray-500 sm:hidden">
        <span>Swipe to see more</span>
        <span className="ml-2">→</span>
      </div>

      {/* Scroll container */}
      <div className="relative overflow-x-auto">
        {/* Right fade to indicate more columns */}
        <div className="absolute top-0 right-0 w-10 h-full pointer-events-none bg-gradient-to-l from-white to-transparent sm:hidden" />
        {children}
      </div>
    </div>
  );
}
