import React from "react";
import { Users } from "lucide-react";

function DelegatedAccessEmptyState() {
  return (
    <div className="flex items-center justify-center w-full px-4 py-10 bg-white border border-gray-200 rounded-xl sm:py-14">
      <div className="flex flex-col items-center justify-center h-44 text-center ">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12   sm:w-16 sm:h-16">
          <Users className="w-10 h-10 text-gray-400 sm:w-14 sm:h-14" />
        </div>

        {/* Main line */}
        <p className="text-xs  text-[#92949F] sm:text-sm">
          You haven’t delegated access yet.
        </p>

        {/* Sub text */}
        <p className="text-xs leading-snug  text-[#92949F] sm:text-sm">
          Add a trusted admin or credentialing coordinator to help manage your account.
        </p>
      </div>
    </div>
  );
}

export default DelegatedAccessEmptyState;
