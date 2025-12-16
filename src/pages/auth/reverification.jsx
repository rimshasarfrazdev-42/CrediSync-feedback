import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { routePaths } from "../../constants/paths"; // use when you hook up navigation

const reverification = () => {
  const navigate = useNavigate();
  const [npiNumber, setNpiNumber] = useState("");
  const [dob, setDob] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // validation error states
  const [npiError, setNpiError] = useState("");
  const [dobError, setDobError] = useState("");

  const handleManualReview = () => {
    // Implement manual review logic here
    alert("Manual review requested"); // placeholder action
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If already verified, do nothing
    if (isVerified) {
      return;
    }

    // reset previous errors
    setNpiError("");
    setDobError("");

    let isValid = true;

    // NPI validation: must be exactly 10 digits
    const trimmedNpi = npiNumber.trim();
    if (!/^\d{10}$/.test(trimmedNpi)) {
      setNpiError("Please enter a valid 10-digit NPI number.");
      isValid = false;
    }

    // DOB validation: basic MM/DD/YYYY pattern
    const trimmedDob = dob.trim();
    const dobPattern =
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    if (!dobPattern.test(trimmedDob)) {
      setDobError("Please enter a valid date in MM/DD/YYYY format.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Call your verification API here.
    // For demo: mark as verified (show success banner).
    setIsVerified(true);

    // On success, you might navigate:
    // navigate(routePaths.VerificationSuccess);
  };

  const handleNpiChange = (e) => {
    setNpiNumber(e.target.value);
    if (npiError) setNpiError("");
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
    if (dobError) setDobError("");
  };

  const handleContinueToRoleSelection = () => {
    // Hook up your real route here
    navigate("/professional-role");
    // alert("Continue to Role Selection"); // placeholder
  };

  return (
    <div className="flex h-screen gap-6 p-4 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl md:flex">
        <img
          src="/doctors-img.svg"
          alt="Medical professionals"
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full px-4 border shadow-sm md:w-1/2 rounded-2xl">
        <div className="w-full p-6 bg-white">
          {/* Heading */}
          <h1 className="mb-3 text-center text-2xl font-semibold text-slate-900 sm:text-[31px]">
            Identity Verification
          </h1>
          <p className="mb-6 text-center text-sm font-medium text-slate-900 sm:text-[20px]">
            Validate your credentials against the official NPI Registry. Your
            data remains private and encrypted.
          </p>

          {/* Success banner */}
          {isVerified && (
            <div className="p-3 mb-4 text-[16px] text-[#111827] border border-[#CBD4FF] rounded-md bg-[#EFF3FF]">
              <div className="flex items-center gap-2">
                <span className="mt-0.5 text-base text-[#163B6D]">
                  <img src="/tick.svg" alt="success" />
                </span>
                <p className="leading-snug">
                  <span className="font-semibold">Identity Verified</span> — Your
                  information has been matched with the NPI Registry.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-[18px] font-medium text-gray-700">
                NPI Number (Individual)
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                required
                placeholder={isVerified ? "**********" : "10-digit NPI"}
                value={isVerified ? "**********" : npiNumber}
                onChange={handleNpiChange}
                readOnly={isVerified}
                className="w-full rounded-md border border-[#d7dde6] bg-white p-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#1f4fbf] focus:outline-none focus:ring-2 focus:ring-[#1f4fbf]/70"
              />
              {npiError && (
                <p className="mt-1 text-sm text-red-600">
                  {npiError}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-[18px] font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="text"
                required
                placeholder={isVerified ? "**/**/****" : "MM/DD/YYYY"}
                value={isVerified ? "**/**/****" : dob}
                onChange={handleDobChange}
                readOnly={isVerified}
                className="w-full rounded-md border border-[#d7dde6] bg-white p-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#1f4fbf] focus:outline-none focus:ring-2 focus:ring-[#1f4fbf]/70"
              />
              {dobError && (
                <p className="mt-1 text-sm text-red-600">
                  {dobError}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <img src="/sheild.svg" alt="" />
              <p className="text-sm text-gray-500">
                Your PHI is protected and never shared without your consent.
              </p>
            </div>

            {/* Buttons row (matches screenshot: left disabled, right primary) */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isVerified}
                className={`w-full rounded-md py-2.5 text-[16px] font-semibold transition-colors ${
                  isVerified
                    ? "bg-gray-200 text-gray-500 cursor-default"
                    : "bg-primary text-white hover:bg-[#123057]"
                }`}
              >
                Verify with NPI
              </button>

              <button
                type="button"
                onClick={handleContinueToRoleSelection}
                className="w-full rounded-md bg-primary py-2.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#123057]"
              >
                Continue to Role Selection
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reverification;
