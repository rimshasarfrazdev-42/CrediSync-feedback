import React from "react";
import { Progress } from "../ui/progress";


export default function ProgressSidebar({ uploadedCount }) {
  return (
    <div className="order-1 w-full p-5 bg-white border shadow-sm md:col-span-4 rounded-3xl border-zinc-200 h-fit md:order-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[20px] font-semibold text-secondary">Upload Progress</p>
        <p className="text-[16px] font-normal text-tertiary">{uploadedCount} of 9</p>
      </div>

      <Progress value={(uploadedCount / 9) * 100} />
      <p className="text-[16px] font-normal text-tertiary mt-2">
        {Math.round((uploadedCount / 9) * 100)}% complete
      </p>

      <div className="mt-5">
        <div className="h-px mb-3 bg-gray-200"></div>

        <div className="flex justify-between">
          <p className="text-base font-normal text-secondary">Required Documents:</p>
          <p className="text-base font-normal text-tertiary">5</p>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-base font-normal text-secondary">Optional Documents:</p>
          <p className="text-base font-normal text-tertiary">4</p>
        </div>

        <div className="h-px mt-4 bg-gray-200"></div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-base font-normal text-secondary">Quick Tips:</p>
        <ul className="list-disc ml-5 space-y-1 text-[16px] font-normal text-subtext">
          <li>Ensure all documents are clear and legible</li>
          <li>Check that licenses are current and not expired</li>
          <li>You can update documents later from your vault</li>
        </ul>
      </div>
    </div>
  );
}
