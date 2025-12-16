import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const TermsConditionsModal = ({ open, onClose, onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (open) setIsChecked(false);
  }, [open]);

  if (!open) return null;

  const handleAccept = () => {
    if (!isChecked) return;
    if (onAccept) onAccept();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center !mt-0"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-7xl mx-3 sm:mx-4 bg-white rounded-2xl shadow-[0_18px_45px_rgba(15,27,61,0.25)] border border-[#e1e6f0] flex flex-col max-h-[90vh] ">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e8f1]">
          <h2 className="text-base font-semibold sm:text-lg text-slate-900">
            Terms &amp; Conditions
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
        <div className="px-6 pt-4 pb-2 overflow-y-auto text-[0.82rem] sm:text-[0.97rem] leading-relaxed text-slate-800 space-y-3">
          <p>
            By creating a CrediSync account, you agree to comply with our
            data-handling and credentialing policies outlined below. These
            Terms &amp; Conditions govern your use of the CrediSync Provider
            Portal and all related services.
          </p>

          <h3 className="mt-3 font-semibold text-slate-900">
            Agreement Overview
          </h3>
          <p>
            This agreement ("Agreement") is entered into between you
            ("Provider", "You", or "User") and CrediSync, Inc. ("CrediSync", "We", or
            "Us"). By accessing or using the CrediSync Provider
            Portal, you acknowledge that you have read, understood, and agree
            to be bound by these Terms &amp; Conditions.
          </p>
          <p>
            The CrediSync Provider Portal is a HIPAA and SOC 2–compliant
            healthcare credentialing platform designed to streamline the
            verification and management of healthcare provider credentials.
            Your use of this platform constitutes acceptance of these terms in
            their entirety.
          </p>

          <h3 className="mt-3 font-semibold text-slate-900">
            User Responsibilities
          </h3>
          <p>As a user of the CrediSync Provider Portal, you agree to:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              Provide accurate, current, and complete information during
              registration and credentialing processes
            </li>
            <li>
              Maintain the confidentiality of your account credentials and
              notify us immediately of any unauthorized access
            </li>
            <li>
              Use the platform solely for lawful purposes related to healthcare
              credentialing
            </li>
            <li>
              Comply with all applicable federal, state, and local laws,
              including HIPAA regulations
            </li>
            <li>
              Keep your professional licenses, certifications, and credentials
              current and valid
            </li>
            <li>
              Promptly update any changes to your personal or professional
              information
            </li>
            <li>
              Not share, sell, or transfer your account access to any third
              party
            </li>
          </ul>

          <h3 className="mt-3 font-semibold text-slate-900">
            Data Usage &amp; Security
          </h3>
          <p>
            CrediSync collects and processes personal and professional
            information necessary for healthcare credentialing purposes. This
            includes, but is not limited to:
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Professional licenses and certifications</li>
            <li>Educational background and training history</li>
            <li>Work history and references</li>
            <li>National Provider Identifier (NPI) and DEA numbers</li>
            <li>Malpractice insurance information</li>
          </ul>

          <p className="mt-2">
            We implement industry-standard security measures to protect your
            data, including:
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>End-to-end encryption for data transmission</li>
            <li>Secure cloud storage with redundant backups</li>
            <li>Multi-factor authentication options</li>
            <li>Regular security audits and penetration testing</li>
            <li>Role-based access controls</li>
          </ul>

          <div className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-t border-[#e4e8f1] bg-slate-50/70">
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

export default TermsConditionsModal;
