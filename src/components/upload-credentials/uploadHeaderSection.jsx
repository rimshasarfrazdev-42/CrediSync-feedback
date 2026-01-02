import React from "react";

export default function HeaderSection() {
  return (
    <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10 ">
      <div className="flex flex-col w-full gap-4 p-5 border shadow-sm rounded-3xl border-zinc-200 sm:p-6 lg:p-8">
        <p className="text-3xl sm:text-[39px] font-semibold text-secondary leading-tight">
          Upload Your Credentials
        </p>

        <p className="text-sm sm:text-[18px] text-subtext font-medium">
          Upload your key credentialing documents securely.
        </p>

        <div className="flex items-start gap-3 p-4 text-sm font-normal border rounded-lg md:items-center bg-primary bg-opacity-10 border-primary border-opacity-30 text-primary sm:text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock shrink-0 mt-0.5 md:mt-0"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>All uploads are encrypted and stored securely per HIPAA & SOC 2 standards.</span>
        </div>
      </div>
    </div>
  );
}
