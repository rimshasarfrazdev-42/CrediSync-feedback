import React, { useEffect, useRef, useState } from "react";

const roleOptions = ["Admin", "Credentialing Coordinator", "HR", "Other"];

const DelegateModal = ({ isOpen, onClose, onSendInvite }) => {
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // focus email on open (safe)
      setTimeout(() => emailInputRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const resetState = () => {
    setAdminName("");
    setEmail("");
    setRole("");
    setError("");
    setSubmitting(false);
  };

  const handleCancel = () => {
    resetState();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !role) {
      setError("Email and role are required.");
      return;
    }

    const basicEmailRegex = /\S+@\S+\.\S+/;
    if (!basicEmailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);
      await onSendInvite?.({
        adminName: adminName.trim() || null,
        email: email.trim(),
        role,
      });
      resetState();
      onClose?.();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleCancel();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-4 bg-slate-900/80 backdrop-blur-[2px] sm:px-6 overflow-hidden"
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delegate-modal-title"
        className="w-full max-w-lg rounded-2xl bg-white shadow-[0_22px_50px_rgba(15,27,61,0.40)]"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="px-6 pt-6 pb-5 sm:px-8 sm:pt-7 sm:pb-6">
          <div className="mb-5">
            <h2 id="delegate-modal-title" className="text-[20px] font-semibold text-secondary">
              Delegate to Your Team
            </h2>
            <p className="mt-1 text-sm sm:text-[14px] text-tertiary">
              Send a secure link to your admin or coordinator to complete the intake on your behalf.
            </p>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-secondary">
                Admin Name <span className="font-normal text-tertiary">(Optional)</span>
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="e.g., Sarah Johnson"
                className="w-full rounded-md border border-[#d7dde6] bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-tertiary focus:border-[#163B6D] focus:outline-none focus:ring-2 focus:ring-[#163B6D]/70"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-secondary">Email Address</label>
              <input
                useref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clinic.com"
                className="w-full rounded-md border border-[#d7dde6] bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-tertiary focus:border-[#163B6D] focus:outline-none focus:ring-2 focus:ring-[#163B6D]/70"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-secondary">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none rounded-md border border-[#d7dde6] bg-white px-3 py-2.5 pr-9 text-sm text-slate-900 focus:border-[#163B6D] focus:outline-none focus:ring-2 focus:ring-[#163B6D]/70"
                  required
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <span className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                  <svg className="w-4 h-4 text-slate-500" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>

          <div className="flex flex-col gap-3 mt-6 sm:mt-7 sm:flex-row">
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#123057] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {submitting ? "Sending..." : "Send Invite"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full rounded-md border border-[#92949F] bg-white px-4 py-2.5 text-sm font-semibold text-[#92949F] hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DelegateModal;
