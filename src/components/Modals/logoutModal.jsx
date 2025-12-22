// LogoutAllDevicesModal.jsx
import React from "react";

const LogoutAllDevicesModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-secondary/80 backdrop-blur-sm !mt-0">
      <div
        className="w-full max-w-xl p-5 bg-white border rounded-2xl border-slate-300/80 "
      >
        <h2 className="text-lg font-semibold text-left sm:text-xl text-slate-900">
          Logout from all devices?
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Are you sure you want to log out from all devices? You will need to
          sign in again on each device.
        </p>

        <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-4 py-3 text-sm font-medium bg-white border sm:flex-1 rounded-xl border-slate-300 sm:text-base text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              w-full sm:flex-1 rounded-xl border border-transparent
              bg-primary px-4 py-3 text-sm sm:text-base font-medium text-white
              hover:bg-[#072f5c]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70
              focus-visible:ring-offset-1 focus-visible:ring-offset-white
            "
          >
            Yes, Logout All
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutAllDevicesModal;
