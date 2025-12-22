import React, { useEffect, useState } from "react";

export default function MarkNotApplicableModal({
  open,
  onClose,
  onSubmit,
  checklistItemName = "",
  initialReason = "",
  initialConfirmed = false,
  allowEditItem = false, // set true if you ever want to let them change the item text
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
      nextErrors.confirmed = "You must confirm this does not apply to your role.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (onSubmit) {
      onSubmit({
        checklistItemName,
        reason: reason.trim(),
        confirmed,
      });
    }
    onClose && onClose();
  };

  const fieldClass = (key) =>
    `w-full rounded-md border px-3 py-2 text-sm text-secondary placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 ${errors[key] ? "border-rose-400" : "border-slate-300"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-secondary/80 sm:px-6"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl">
        <form
          onSubmit={handleSubmit}
          className="max-h-[90vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6"
        >
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
              Mark as Not Applicable
            </h2>
            <p className="mt-1 text-xs text-tertiary sm:text-sm">
              This item will not count toward your credentialing progress.
            </p>
          </div>

          {/* Checklist Item (read-only by default) */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs font-medium text-slate-700 sm:text-sm mb-1.5">
              Checklist Item
            </label>
            <input
              type="text"
              value={checklistItemName}
              onChange={(e) =>
                allowEditItem && typeof checklistItemName === "string"
                  ? e.target.value
                  : undefined
              }
              readOnly={!allowEditItem}
              className={`${fieldClass("item")} ${!allowEditItem ? "bg-slate-50 cursor-not-allowed" : ""
                }`}
            />
          </div>

          {/* Reason for N/A */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs font-medium text-slate-700 sm:text-sm mb-1.5">
              Reason for N/A
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="e.g., This credential is not required for my specialty, I don't provide this service, etc."
              className={`${fieldClass("reason")} resize-none`}
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-rose-500">{errors.reason}</p>
            )}
          </div>

          {/* Confirmation checkbox */}
          <div className="mb-4 sm:mb-5">
            <label className="flex items-start gap-2 text-xs sm:text-sm text-secondary">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className={`mt-0.5 h-4 w-4 rounded border ${errors.confirmed ? "border-rose-400" : "border-slate-300"
                  } text-[#0B3B7F] focus:ring-[#0B3B7F]`}
              />
              <span>
                I confirm this credential does not apply to my professional role.
              </span>
            </label>
            {errors.confirmed && (
              <p className="mt-1 text-xs text-rose-500">{errors.confirmed}</p>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex w-full gap-3 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium bg-white border rounded-md border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Mark N/A
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
