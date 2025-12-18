import React, { useEffect, useState } from 'react';

const REMINDER_OPTIONS = [
  { label: '7 days', value: 7 },
  { label: '15 days', value: 15 },
  { label: '30 days', value: 30 },
  { label: '60 days', value: 60 },
  { label: 'Custom', value: 'custom' },
];

export default function SetReminderModal({
  open,
  onClose,
  onSave,
  initialDays, // e.g. 15
}) {
  const [selectedValue, setSelectedValue] = useState(15);
  const [customDays, setCustomDays] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;

    if (initialDays && REMINDER_OPTIONS.some((o) => o.value === initialDays)) {
      setSelectedValue(initialDays);
      setCustomDays('');
    } else if (initialDays) {
      setSelectedValue('custom');
      setCustomDays(String(initialDays));
    } else {
      setSelectedValue(15);
      setCustomDays('');
    }
    setError('');
  }, [open, initialDays]);

  if (!open) return null;

  const isCustom = selectedValue === 'custom';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    let days;

    if (!isCustom) {
      days = Number(selectedValue);
      if (!days || days <= 0) {
        setError('Please choose a valid reminder date.');
        return;
      }
    } else {
      if (!customDays.trim()) {
        setError('Please enter the number of days.');
        return;
      }
      const num = Number(customDays);
      if (!Number.isInteger(num) || num <= 0) {
        setError('Enter a positive whole number of days.');
        return;
      }
      if (num > 365) {
        setError('Reminder must be within 365 days.');
        return;
      }
      days = num;
    }

    if (onSave) {
      onSave({ days, isCustom });
    }
    if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-secondary/80 sm:px-6"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl">
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:px-6 sm:py-6">
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <h2 className="text-base font-semibold text-secondary sm:text-lg">Set Reminder</h2>
            <p className="mt-1 text-xs text-tertiary sm:text-sm">
              Get reminded to complete this checklist item later.
            </p>
          </div>

          {/* Reminder Date field */}
          <div className="mb-4 sm:mb-5">
            <label className="block text-xs font-medium text-slate-700 sm:text-sm mb-1.5">Reminder Date</label>

            <div className="grid grid-cols-1">
              {/* Select */}
              <div className="relative">
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value === 'custom' ? 'custom' : Number(e.target.value))}
                  className="block w-full appearance-none rounded-md border border-slate-300 bg-white py-2.5 pl-3 pr-9 text-sm text-secondary focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  {REMINDER_OPTIONS.map((opt) => (
                    <option key={opt.label} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Custom days input (only when Custom is selected) */}
              {isCustom && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Custom (days)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    placeholder="Number of days"
                    className="w-full px-3 py-2 text-sm bg-white border rounded-md border-slate-300 text-secondary placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              )}
            </div>

            {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
          </div>

          {/* Footer buttons */}
          <div className=" w-full flex flex-col-reverse gap-3 mt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-white border rounded-md sm:w-1/2 border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="sm:w-1/2 inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#082b5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Set Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
