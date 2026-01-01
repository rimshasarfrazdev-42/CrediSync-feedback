import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import useClickOutside from "../../../hooks/useClickOutside";

export default function ApproveRequestModal({ closeModal }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  const [accessExpiryOpen, setAccessExpiryOpen] = useState(false);
  const [selectedAccessExpiry, setSelectedAccessExpiry] = useState("7 Days");

  const [customExpiryDate, setCustomExpiryDate] = useState(""); // ✅ needed for Custom
  const [errors, setErrors] = useState({}); // optional (if you want validation)

  const accessExpiryRef = useRef(null);
  useClickOutside(accessExpiryRef, () => setAccessExpiryOpen(false));

  // Date picker ref
  const datePickerRef = useRef(null);

  const formatMMDDYYYY = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    if (!y || !m || !d) return "";
    return `${m}/${d}/${y}`;
  };

  const openDatePicker = () => {
    const el = datePickerRef.current;
    if (!el || el.disabled) return;

    el.focus();
    if (typeof el.showPicker === "function") el.showPicker();
    else el.click();
  };

  const handleSelectOption = (value) => {
    setSelectedAccessExpiry(value);
    setAccessExpiryOpen(false);

    // ✅ reset custom date when leaving Custom
    if (value !== "Custom") {
      setCustomExpiryDate("");
      setErrors((prev) => ({ ...prev, customExpiry: "" }));
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80" />

      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-[520px] rounded-xl bg-white p-4 sm:p-6 shadow-xl"
      >
        <h2 className="mb-3 text-lg font-semibold text-secondary">
          Approve Access Request
        </h2>

        <div className="mb-3 rounded-lg bg-[#92949F1A] p-4 text-sm text-gray-700">
          <div className="flex justify-between gap-3 mb-2">
            <span className="font-medium text-subtext">Institution:</span>
            <span className="text-right text-secondary">Stanford Health Care</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-subtext">Requested Access:</span>
            <span className="text-right text-secondary">View + Download</span>
          </div>
        </div>

        {/* Access Expiry + Custom Expiry (responsive) */}
        <div className="relative" ref={accessExpiryRef}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 sm:gap-4">
            {/* Access Expiry */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">
                Access Expiry
              </label>

              <button
                type="button"
                onClick={() => setAccessExpiryOpen((v) => !v)}
                className={[
                  "mt-1 w-full rounded-md border px-3 py-2",
                  "flex items-center justify-between gap-2 bg-white",
                  "text-[16px] font-medium text-secondary",
                  "focus:outline-none focus:ring-1 focus:ring-primary",
                  accessExpiryOpen ? "border-primary" : "border-tertiary-30",
                ].join(" ")}
              >
                <span>{selectedAccessExpiry}</span>
                <span className="p-1 rounded-md shrink-0 hover:bg-tertiary/10">
                  <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
                </span>
              </button>

              {accessExpiryOpen && (
                <div className="absolute z-30 w-full mt-2 bg-white border rounded-md shadow-lg">
                  {["7 Days", "30 Days", "Never", "Custom"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className="w-full rounded-md bg-white px-3 py-2 text-left text-[13px] hover:bg-gradient-to-r hover:from-[#F4F9FF] hover:to-[#F8FAFC]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Expiry Date appears ONLY if Custom selected */}
            {selectedAccessExpiry === "Custom" && (
              <div>
                <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">
                  Custom Expiry Date
                </label>

                <div
                  className={[
                    "mt-1 relative w-full rounded-md border px-3 py-2",
                    "flex items-center justify-between gap-2 bg-white",
                    "focus-within:ring-1 focus-within:ring-primary",
                    errors.customExpiry ? "border-red-400" : "border-tertiary-30",
                  ].join(" ")}
                >
                  {/* Visible value (MM/DD/YYYY) */}
                  <input
                    type="text"
                    readOnly
                    value={formatMMDDYYYY(customExpiryDate)}
                    placeholder="MM/DD/YYYY"
                    className="w-full bg-transparent text-[16px] font-medium text-secondary placeholder:text-tertiary focus:outline-none"
                    onClick={openDatePicker}
                  />

                  <button
                    type="button"
                    onClick={openDatePicker}
                    className="relative z-20 p-1 "
                    aria-label="Select date"
                  >
                    <CalendarDays className="w-5 h-5 text-tertiary" />
                  </button>

                  {/* Real date input overlay (opens picker reliably) */}
                  <input
                    ref={datePickerRef}
                    type="date"
                    value={customExpiryDate}
                    onChange={(e) => {
                      setCustomExpiryDate(e.target.value);
                      setErrors((prev) => ({ ...prev, customExpiry: "" }));
                    }}
                    className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                  />
                </div>

                {errors.customExpiry && (
                  <p className="mt-1 text-xs text-red-500">{errors.customExpiry}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Consent */}
        <label className="flex items-start gap-2 mt-3 text-xs sm:text-sm text-secondary">
          <input
            type="checkbox"
            className="
              mt-[3px]
              h-4 w-4 shrink-0 appearance-none
              border border-tertiary rounded-sm
              checked:border-primary checked:bg-white
              checked:before:content-['✔']
              before:flex before:items-center before:justify-center
              before:text-primary before:text-xs
            "
          />
          I consent to share my credentials with the selected institution under
          the CrediSync Privacy Policy.
        </label>

        {/* Actions: Approve above Cancel on mobile */}
        <div className="flex flex-col gap-3 mt-4 md:flex-row md:justify-between md:gap-4">
          <button
            type="button"
            className="w-full rounded-md bg-primary py-2 font-medium text-white transition hover:bg-[#093557] md:order-2"
          >
            Approve
          </button>

          <button
            type="button"
            className="w-full py-2 font-medium transition border rounded-md border-subtext/40 text-tertiary hover:bg-gray-50 md:order-1"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
