import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { routePaths } from "../../constants/paths"; // use when you hook up navigation

const IdentityVerification = () => {
  const navigate = useNavigate();
  const [npiNumber, setNpiNumber] = useState('');
  const [dob, setDob] = useState('');
  const [showAutoVerifyError, setShowAutoVerifyError] = useState(false);

  // NEW: validation error states
  const [npiError, setNpiError] = useState('');
  const [dobError, setDobError] = useState('');

  const handleManualReview = () => {
    // Implement manual review logic here
    alert("Manual review requested"); // placeholder action
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous errors
    setNpiError('');
    setDobError('');

    let isValid = true;

    // NPI validation: must be exactly 10 digits
    const trimmedNpi = npiNumber.trim();
    if (!/^\d{10}$/.test(trimmedNpi)) {
      setNpiError('Please enter a valid 10-digit NPI number.');
      isValid = false;
    }

    // DOB validation: basic MM/DD/YYYY pattern
    const trimmedDob = dob.trim();
    const dobPattern =
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    if (!dobPattern.test(trimmedDob)) {
      setDobError('Please enter a valid date in MM/DD/YYYY format.');
      isValid = false;
    }

    if (!isValid) {
      // Do not proceed if validation fails
      return;
    }

    // Call your verification API here.
    // For demo: show the banner like in the second screenshot.
    setShowAutoVerifyError(true);

    // On success, you might navigate:
    navigate("/next-to-verify");
  };

  const handleNpiChange = (e) => {
    setNpiNumber(e.target.value);
    // Clear error as user types
    if (npiError) setNpiError('');
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
    // Clear error as user types
    if (dobError) setDobError('');
  };

  return (
    <div className="flex h-screen gap-6 p-4 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl md:flex">
        <img src="/doctors-img.svg" alt="Medical professionals" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full px-4 border shadow-sm md:w-1/2 rounded-2xl">
        <div className="w-full p-6 bg-white">
          {/* Heading */}
          <h1 className="mb-3 text-center text-2xl font-semibold text-slate-900 sm:text-[31px]">
            Identity Verification
          </h1>
          <p className="mb-6 text-center text-sm font-medium text-slate-900 sm:text-[20px]">
            Validate your credentials against the official NPI Registry. Your data remains private and encrypted.
          </p>

          {/* Auto-verification error banner (second state) */}
          {showAutoVerifyError && (
            <div className="p-3 mb-4 text-[16px] text-gray-900 border border-gray-300 rounded-md bg-gray-100">
              {/* Top row: icon + message */}
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-base text-gray-500"><img src="/info.svg" alt="info" /></span>
                <p className="leading-snug">
                  We couldn&apos;t verify your information automatically. You can retry or request manual review.
                </p>
              </div>

              {/* Actions row */}
              <div className="flex flex-wrap mt-2 font-medium text-[16px] gap-x-6 gap-y-1">
                <button
                  type="button"
                  onClick={handleSubmit} // or your retry handler
                  className="text-gray-900 underline underline-offset-2 hover:text-gray-700"
                >
                  Retry
                </button>
                <button
                  type="button"
                  onClick={handleManualReview} // create this handler for manual review flow
                  className="text-gray-900 underline underline-offset-2 hover:text-gray-700"
                >
                  Request Manual Review
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-[18px] font-medium text-gray-700">NPI Number (Individual)</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                required
                placeholder="10-digit NPI"
                value={npiNumber}
                onChange={handleNpiChange}
                className="w-full rounded-md border border-[#d7dde6] bg-white p-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#1f4fbf] focus:outline-none focus:ring-2 focus:ring-[#1f4fbf]/70"
              />
              {npiError && (
                <p className="mt-1 text-sm text-red-600">
                  {npiError}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-[18px] font-medium text-gray-700">Date of Birth</label>
              <input
                type="text"
                required
                placeholder="MM/DD/YYYY"
                value={dob}
                onChange={handleDobChange}
                className="w-full rounded-md border border-[#d7dde6] bg-white p-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#1f4fbf] focus:outline-none focus:ring-2 focus:ring-[#1f4fbf]/70"
              />
              {dobError && (
                <p className="mt-1 text-sm text-red-600">
                  {dobError}
                </p>
              )}
            </div>

            <div className='flex gap-2'>
              <img src="/sheild.svg" alt="" />
              <p className="text-sm text-gray-500">Your NPI is protected and never shared without your consent.</p>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full rounded-md bg-primary py-2.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#123057]"
            >
              Verify with NPI
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
