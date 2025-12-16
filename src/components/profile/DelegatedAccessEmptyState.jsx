import React from "react";
import { Users } from "lucide-react";

function DelegatedAccessEmptyState() {
  return (
    <div className="flex items-center justify-center w-full px-4 py-10 bg-white border border-gray-200 rounded-xl sm:py-14">
      <div className="flex flex-col items-center max-w-lg space-y-2 text-center sm:space-y-3">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mb-1 rounded-full sm:w-14 sm:h-14">
          <Users className="w-8 h-8 text-gray-400 sm:w-10 sm:h-10" />
        </div>

        {/* Main line */}
        <p className="text-sm font-medium text-gray-600 sm:text-base">
          You haven’t delegated access yet.
        </p>

        {/* Sub text */}
        <p className="text-xs leading-snug text-gray-500 sm:text-sm">
          Add a trusted admin or credentialing coordinator to help manage your account.
        </p>
      </div>
    </div>
  );
}

export default DelegatedAccessEmptyState;
