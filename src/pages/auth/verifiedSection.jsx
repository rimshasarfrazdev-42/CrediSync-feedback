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
    <div className="flex h-screen gap-6 p-4 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img src="/doctors-img.svg" alt="Medical professionals" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full px-4 border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          {/* Heading */}
          <h1 className="mb-3 text-center text-2xl font-semibold text-secondary sm:text-[31px]">
            Identity Verification
          </h1>
          <p className="mb-6 text-center text-sm font-medium text-[#374151] sm:text-[20px]">
            Validate your credentials against the official NPI Registry. Your data remains private and encrypted.
          </p>

          <div className="p-3 mb-4 text-[16px] text-[#111827] border border-gray-200 rounded-md bg-gray-100">
            <div className="flex items-center gap-2">
              <span className="mt-0.5 text-base text-[#163B6D]">
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
