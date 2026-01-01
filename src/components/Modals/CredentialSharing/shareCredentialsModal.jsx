import { useRef, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import useClickOutside from '../../../hooks/useClickOutside';
import PrivacyPolicyModal from '../LegalAndConsentManagement/PrivacyPolicyModal';

export default function ShareCredentialsModal({ closeModal }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);

  const [accessExpiryOpen, setAccessExpiryOpen] = useState(false);
  const [accessTypeOpen, setAccessTypeOpen] = useState(false);

  const [selectedAccessType, setSelectedAccessType] = useState('View Only');
  const [selectedAccessExpiry, setSelectedAccessExpiry] = useState('7 Days');

  const accessTypeRef = useRef(null);
  const accessExpiryRef = useRef(null);

  useClickOutside(accessTypeRef, () => setAccessTypeOpen(false));
  useClickOutside(accessExpiryRef, () => setAccessExpiryOpen(false));

  const [institutionName, setInstitutionName] = useState('');
  const [institutionState, setInstitutionState] = useState('');
  const [email, setEmail] = useState('');

  // store ISO date (yyyy-mm-dd) from native picker
  const [customExpiryDate, setCustomExpiryDate] = useState('');

  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const [activeModal, setActiveModal] = useState(null);
  const checkboxId = 'consent-checkbox';

  const openPrivacyModal = () => setActiveModal('PrivacyPolicy');
  const closeActiveModal = () => setActiveModal(null);

  const handleSelectOption = (value, setState, closeMenu) => {
    setState(value);
    closeMenu(false);
  };

  // ---------- Date helpers ----------
  const datePickerRef = useRef(null);

  const formatMMDDYYYY = (iso) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    if (!y || !m || !d) return '';
    return `${m}/${d}/${y}`;
  };

  const openDatePicker = () => {
    const el = datePickerRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') el.showPicker();
    else el.click();
  };

  // ---------- Validation ----------
  const validateForm = () => {
    const newErrors = {};

    const hasInstitutionName = institutionName.trim().length > 0;
    const hasInstitutionState = institutionState.trim().length > 0;
    const hasInstitutionDetails = hasInstitutionName || hasInstitutionState;

    const hasEmail = email.trim().length > 0;

    if (!hasInstitutionDetails && !hasEmail) {
      newErrors.institution = 'Enter institution details or invite by email';
    }

    if (hasInstitutionDetails && !hasEmail) {
      if (!hasInstitutionName) newErrors.institutionName = 'Institution name is required';
      if (!hasInstitutionState) newErrors.institutionState = 'State is required';
    }

    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) newErrors.email = 'Enter a valid email address';
    }

    if (selectedAccessExpiry === 'Custom') {
      if (!customExpiryDate) {
        newErrors.customExpiry = 'Custom expiry date is required';
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const picked = new Date(customExpiryDate);
        picked.setHours(0, 0, 0, 0);

        if (picked < today) newErrors.customExpiry = 'Expiry date cannot be in the past';
      }
    }

    if (!consentChecked) newErrors.consent = 'You must agree before sharing credentials';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validateForm()) return;

    console.log('Form Submitted Successfully', {
      institutionName,
      institutionState,
      email,
      selectedAccessType,
      selectedAccessExpiry,
      customExpiryDate: selectedAccessExpiry === 'Custom' ? customExpiryDate : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-secondary/80" />

      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 shadow-xl"
      >
        <h2 className="text-lg font-semibold sm:text-xl text-secondary">Share Credentials</h2>
        <p className="text-xs sm:text-sm text-tertiary">
          Securely share your verified documents with hospitals or agencies.
        </p>

        <div className="mt-3 space-y-3 sm:mt-6">
          {/* Institution Section */}
          <div className="grid grid-cols-1 gap-3 p-3 border border-gray-200 rounded-lg sm:grid-cols-2 sm:gap-4 sm:p-4">
            <div>
              <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">
                Search Institution Name
              </label>
              <input
                value={institutionName}
                onChange={(e) => {
                  setInstitutionName(e.target.value);
                  setErrors((prev) => ({ ...prev, institution: '', institutionName: '' }));
                }}
                type="text"
                placeholder="Search Institution Name..."
                className="w-full rounded-lg border px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.institutionName && <p className="mt-1 text-xs text-red-500">{errors.institutionName}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">Search State</label>
              <input
                value={institutionState}
                onChange={(e) => {
                  setInstitutionState(e.target.value);
                  setErrors((prev) => ({ ...prev, institution: '', institutionState: '' }));
                }}
                type="text"
                placeholder="Search Institution State..."
                className="w-full rounded-lg border px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.institutionState && <p className="mt-1 text-xs text-red-500">{errors.institutionState}</p>}
            </div>

            <div className="relative flex items-center my-2 sm:col-span-2">
              <div className="flex-grow border-t-[1.5px] border-gray-200" />
              <span className="px-3 text-sm font-medium bg-white text-tertiary">or</span>
              <div className="flex-grow border-t-[1.5px] border-gray-200" />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="mb-1 block text-[16px] font-medium text-secondary">Invite Institution by Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, institution: '', email: '' }));
                }}
                placeholder="Enter email address"
                className="w-full rounded-lg border px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {errors.institution && <p className="text-xs text-red-500 sm:col-span-2">{errors.institution}</p>}
          </div>

          {/* Access Type */}
          <div className="relative" ref={accessTypeRef}>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div>
                <label className="mb-1 text-sm font-medium sm:text-base text-secondary">Access Type</label>
                <button
                  type="button"
                  onClick={() => setAccessTypeOpen((v) => !v)}
                  className="mt-1 mb-1 flex w-full items-center justify-between gap-1 rounded-md border border-tertiary-30 px-3 py-2 text-[16px] font-medium text-secondary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <span>{selectedAccessType}</span>
                  <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
                </button>

                {accessTypeOpen && (
                  <div className="absolute z-30 w-full mt-2 bg-white border rounded-md shadow-lg">
                    {['View Only', 'View Only + Download'].map((option, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption(option, setSelectedAccessType, setAccessTypeOpen)}
                        className="w-full rounded-md bg-white px-3 py-2 text-left text-[13px] hover:bg-gradient-to-r hover:from-[#F4F9FF] hover:to-[#F8FAFC]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Access Expiry + Custom Expiry Date (same UI) */}
          <div className="relative" ref={accessExpiryRef}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {/* Access Expiry */}
              <div className="relative">
                <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">Access Expiry</label>

                <button
                  type="button"
                  onClick={() => setAccessExpiryOpen((v) => !v)}
                  className={[
                    'mt-1 w-full rounded-md border px-3 py-2',
                    'flex items-center justify-between gap-2 bg-white',
                    'text-[16px] font-medium text-secondary',
                    'focus:outline-none focus:ring-1 focus:ring-primary',
                    accessExpiryOpen ? 'border-primary' : 'border-tertiary-30',
                  ].join(' ')}
                >
                  <span>{selectedAccessExpiry}</span>
                  <span className="p-1 rounded-md shrink-0 hover:bg-tertiary/10">
                    <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
                  </span>
                </button>

                {accessExpiryOpen && (
                  <div className="absolute z-30 w-full mt-2 bg-white border rounded-md shadow-lg">
                    {['7 Days', '30 Days', 'Never', 'Custom'].map((option, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          handleSelectOption(option, setSelectedAccessExpiry, setAccessExpiryOpen);

                          if (option !== 'Custom') {
                            setCustomExpiryDate('');
                            setErrors((prev) => ({ ...prev, customExpiry: '' }));
                          }
                        }}
                        className="w-full rounded-md bg-white px-3 py-2 text-left text-[13px] hover:bg-gradient-to-r hover:from-[#F4F9FF] hover:to-[#F8FAFC]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">Custom Expiry Date</label>

                <div
                  className={[
                    'mt-1 relative w-full rounded-md border px-3 py-1.5',
                    'flex items-center justify-between gap-2 bg-white',
                    'focus:outline-none focus:ring-1 focus:ring-primary',
                    errors.customExpiry ? 'border-red-400' : 'border-tertiary-30',
                    selectedAccessExpiry !== 'Custom' ? 'opacity-60' : '',
                  ].join(' ')}
                >
                  {/* Visible text (MM/DD/YYYY) */}
                  <input
                    type="text"
                    readOnly
                    value={formatMMDDYYYY(customExpiryDate)}
                    placeholder="MM/DD/YYYY"
                    className="w-full bg-transparent text-[16px] font-medium text-secondary placeholder:text-tertiary focus:outline-none"
                  />

                  {/* Calendar icon */}
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedAccessExpiry !== 'Custom') return;
                      openDatePicker();
                    }}
                    className="relative z-20 p-1 rounded-md shrink-0 "
                    aria-label="Select date"
                  >
                    <CalendarDays className="w-5 h-5 text-tertiary" />
                  </button>

                  {/* REAL date input overlay (this is the key fix) */}
                  <input
                    ref={datePickerRef}
                    type="date"
                    value={customExpiryDate}
                    disabled={selectedAccessExpiry !== 'Custom'}
                    onChange={(e) => {
                      setCustomExpiryDate(e.target.value);
                      setErrors((prev) => ({ ...prev, customExpiry: '' }));
                    }}
                    className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                    // DO NOT use pointer-events-none here
                  />
                </div>

                {selectedAccessExpiry === 'Custom' && errors.customExpiry && (
                  <p className="mt-1 text-xs text-red-500">{errors.customExpiry}</p>
                )}
              </div>
            </div>
          </div>
          <div className="pt-2">
            {/* Consent */}
            <div className="flex items-start gap-2 text-xs sm:text-sm text-secondary">
              <input
                id={checkboxId}
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => {
                  setConsentChecked(e.target.checked);
                  setErrors((prev) => ({ ...prev, consent: '' }));
                }}
                className="
                mt-0.5 h-4 w-4 flex-shrink-0 rounded-sm border border-tertiary
                checked:border-primary checked:bg-white
                relative appearance-none cursor-pointer
                after:content-['✔'] after:absolute after:inset-0
                after:flex after:items-center after:justify-center after:text-primary after:text-xs
                after:opacity-0 checked:after:opacity-100
              "
              />

              <label htmlFor={checkboxId} className="leading-5 cursor-pointer select-none">
                I consent to share my credentials with the selected institution under the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openPrivacyModal();
                  }}
                  className="inline font-semibold underline rounded-sm text-primary underline-offset-2 hover:opacity-90 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  CrediSync Privacy Policy
                </button>
                .
              </label>
            </div>

            {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}
          </div>
          {/* Privacy Modal */}
          {activeModal === 'PrivacyPolicy' && <PrivacyPolicyModal closeModal={closeActiveModal} />}

          {/* Actions */}
          <div className="flex flex-col items-center justify-between gap-4 mt-4 md:flex-row">
            <button
              type="button"
              className="w-full rounded-md bg-primary py-2 font-medium text-white transition hover:bg-[#093557]"
              onClick={handleGenerate}
            >
              Generate Link &amp; Send
            </button>
            <button
              type="button"
              className="w-full py-2 font-medium transition border rounded-md border-subtext/40 text-tertiary hover:bg-tertiary/5"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
