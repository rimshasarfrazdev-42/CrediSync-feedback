import React, { useEffect, useState } from "react";

export default function MarkNotApplicableModal({
  open,
  onClose,
  onSubmit,
  checklistItemName = "",
  initialReason = "",
  initialConfirmed = false,
  allowEditItem = false,
}) {
  const [reason, setReason] = useState(initialReason);
  const [confirmed, setConfirmed] = useState(initialConfirmed);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setReason(initialReason || "");
    setConfirmed(initialConfirmed || false);
    setErrors({});
  }, [open, initialReason, initialConfirmed]);

  if (!open) return null;

  const validate = () => {
    const nextErrors = {};
    if (!reason.trim()) {
      nextErrors.reason = "Please provide a brief reason.";
    } else if (reason.trim().length < 10) {
      nextErrors.reason = "Reason should be at least 10 characters.";
    }

    if (!confirmed) {
      nextErrors.confirmed =
        "You must confirm this does not apply to your role.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      checklistItemName,
      reason: reason.trim(),
      confirmed,
    });

    onClose?.();
  };

  const fieldClass = (key) =>
    `w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 ${
      errors[key] ? "border-rose-400" : "border-slate-300"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-secondary/80"
      aria-modal="true"
      role="dialog"
      onClick={onClose}               // ✅ CLOSE ON OUTSIDE CLICK
    >
      <div
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl"
        onClick={(e) => e.stopPropagation()} // ✅ PREVENT CLOSE INSIDE
      >
        <form
          onSubmit={handleSubmit}
          className="max-h-[90vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6"
        >
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Mark as Not Applicable
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              This item will not count toward your credentialing progress.
            </p>
          </div>

          {/* Checklist Item */}
          <div className="mb-4">
            <label className="block mb-1 text-xs font-medium text-slate-700">
              Checklist Item
            </label>
            <input
              type="text"
              value={checklistItemName}
              readOnly
              className={`${fieldClass("item")} bg-slate-50 cursor-not-allowed`}
            />
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="block mb-1 text-xs font-medium text-slate-700">
              Reason for N/A
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className={`${fieldClass("reason")} resize-none`}
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-rose-500">{errors.reason}</p>
            )}
          </div>

          {/* Confirmation */}
          <div className="mb-5">
            <label className="flex items-start gap-2 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300"
              />
              <span>
                I confirm this credential does not apply to my professional role.
              </span>
            </label>
            {errors.confirmed && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.confirmed}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 text-sm bg-white border rounded-md border-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-semibold text-white rounded-md bg-primary"
            >
              Mark N/A
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
