import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { routePaths } from "../../constants/paths"; // use when you hook up navigation

const VerifiedSection = () => {
  const navigate = useNavigate();
  const [npiNumber, setNpiNumber] = useState('');
  const [dob, setDob] = useState('');
  const [showAutoVerifyError, setShowAutoVerifyError] = useState(false);

  const handleManualReview = () => {
    // Implement manual review logic here
    alert('Manual review requested'); // placeholder action
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call your verification API here.
    // For demo: show the banner like in the second screenshot.
    setShowAutoVerifyError(true);

    // On success, you might navigate:
     navigate("/reverification");
  };

  const handleNpiChange = (e) => {
    setNpiNumber(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  return (
    <div className="flex h-screen gap-6 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img src="/doctors-img.svg" alt="Medical professionals" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full px-4 py-8 border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          {/* Heading */}
          <h1 className="mb-3 text-xl font-semibold text-center text-secondary sm:text-2xl">
            Identity Verification
          </h1>
          <p className="mb-6 text-center md:px-4 px-0 text-sm font-medium text-[#374151] sm:text-base">
            Validate your credentials against the official NPI Registry. Your data remains private and encrypted.
          </p>

          <div className="p-3 mb-4 text-[14px] text-[#111827] border border-gray-200 rounded-md bg-gray-100">
            <div className="flex items-center gap-2">
              <span className="mt-0.5 text-base text-[#374151] shrink-0">
                <img src="/info.svg" alt="success" />
              </span>
              <p className="leading-snug">
                Manual review requested. Our team will follow up via your registered email.
              </p>
            </div>
          </div>

          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full rounded-md bg-primary py-2.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#123057]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedSection;
