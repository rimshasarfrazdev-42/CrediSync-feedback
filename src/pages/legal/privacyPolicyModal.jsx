import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const PrivacyPolicyModal = ({ open, onClose, onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (open) setIsChecked(false);
  }, [open]);

  if (!open) return null;

  const handleAccept = () => {
    if (!isChecked) return;
    onAccept?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center !mt-0"
      aria-modal="true"
      role="dialog"
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-7xl mx-3 sm:mx-4 bg-white rounded-2xl shadow-[0_18px_45px_rgba(15,27,61,0.25)] border border-[#e1e6f0] flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e8f1]">
          <h2 className="text-base font-semibold sm:text-lg text-slate-900">
            Privacy Policy
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 focus:outline-none"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-4 pb-2 overflow-y-auto text-[0.82rem] sm:text-[0.97rem] leading-relaxed text-slate-700 space-y-3">
          <p>
            CrediSync, Inc. ("CrediSync", "we", "our" or "us") is committed to
            protecting your privacy and ensuring the security of your personal
            and health information. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use the
            CrediSync Provider Portal.
          </p>

          <h3 className="mt-3 font-semibold text-slate-900">
            Information We Collect
          </h3>
          <p>
            We collect several types of information from and about users of our
            platform, including:
          </p>

          <h4 className="mt-1 font-semibold text-slate-900">
            Protected Health Information (PHI)
          </h4>
          <ul className="space-y-1 list-disc list-inside">
            <li>Medical licenses and board certifications</li>
            <li>Drug Enforcement Administration registration numbers</li>
            <li>National Provider Identifier (NPI) numbers</li>
            <li>Malpractice insurance and claims history</li>
            <li>Hospital privileges and affiliations</li>
          </ul>

          <h4 className="mt-2 font-semibold text-slate-900">
            Contact Information
          </h4>
          <ul className="space-y-1 list-disc list-inside">
            <li>Full name and professional credentials</li>
            <li>Email address and phone number</li>
            <li>Practice address and mailing address</li>
            <li>Emergency contact information</li>
          </ul>

          <h4 className="mt-2 font-semibold text-slate-900">
            License and Credential Details
          </h4>
          <ul className="space-y-1 list-disc list-inside">
            <li>Educational background (medical school, residency, fellowships)</li>
            <li>Specialty and sub-specialty certifications</li>
            <li>Continuing Medical Education (CME) credits</li>
            <li>Work history and employment verification</li>
            <li>Professional references</li>
          </ul>

          <h4 className="mt-2 font-semibold text-slate-900">
            Technical and Usage Information
          </h4>
          <ul className="space-y-1 list-disc list-inside">
            <li>IP address and device information</li>
            <li>Browser type and operating system</li>
            <li>Login timestamps and activity logs</li>
            <li>Pages viewed and features used</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3 className="mt-3 font-semibold text-slate-900">
            How We Use Your Data
          </h3>
          <p>
            CrediSync uses your information for verification and compliance
            purposes, including:
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Credentialing and verification</li>
          </ul>

          <div className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-t border-[#e4e8f1] bg-slate-50/60">
          <label className="inline-flex items-start gap-2 text-[0.8rem] text-slate-700">
            <input
              type="checkbox"
              className="mt-[3px] h-3.5 w-3.5 rounded border border-[#b6bfd1]"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>I have read and agree to this document.</span>
          </label>

          <div className="flex items-center justify-end w-full gap-2 sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[0.8rem] font-medium rounded-md border border-[#d0d6e4] text-slate-700 bg-white hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAccept}
              disabled={!isChecked}
              className={`px-4 py-2 text-[0.8rem] font-semibold rounded-md text-white transition-colors ${
                isChecked
                  ? "bg-[#163B6D] hover:bg-[#123057]"
                  : "bg-[#163B6D]/60 cursor-not-allowed"
              }`}
            >
              Accept &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
