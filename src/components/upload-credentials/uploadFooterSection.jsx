import React from "react";
import { Lock } from "lucide-react";

export default function FooterSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 px-4 py-5 mx-auto text-center sm:flex-row sm:px-6 lg:px-8 sm:text-left">
      <Lock className="text-primary shrink-0" size={16} />
      <span className="text-sm text-tertiary">
        HIPAA & SOC 2 Compliant • Your data is protected • All files encrypted
      </span>
    </div>
  );
}
