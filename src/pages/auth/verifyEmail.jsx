import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const [otp, setOtp] = useState(new Array(6).fill('')); // 6-digit OTP
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (!/^[0-9]?$/.test(element.value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    const isValid = enteredOtp.length === 6 && enteredOtp === '123456'; // Replace '123456' with actual OTP logic
    if (!isValid) {
      setError(true);
    } else {
      setError(false);
      navigate('/verification'); // Navigate on success
    }
  };

  return (
    <div
      className="flex h-screen gap-6 p-4 bg-white"
      style={{
        background: 'radial-gradient(circle at top, #e6f3ff 0, #f6fbff 45%, #ffffff 100%)',
      }}
    >
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl md:flex">
        <img
          src="/doctors-img.svg"
          alt="Business Meeting"
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      {/* Right Side - Verification Card */}
      <div className="flex items-center justify-center w-full px-2 bg-white border shadow-sm md:w-1/2 rounded-2xl">
        <div className="w-full p-6 bg-white">
          <div className="flex items-center justify-center my-4"></div>

          {/* Heading */}
          <h2 className="mb-1 text-[31px] font-semibold text-center text-secondary">
            Please verify your email address
          </h2>

          <p className="max-w-xl mx-auto mb-6 text-sm font-medium text-center text-subtext sm:text-[18px]">
            Enter the 6-digit code we’ve sent to you@hospital.org
          </p>

          {/* OTP Input */}
          <div className="w-[500px] mx-auto flex justify-between py-6">
            {otp.map((data, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                placeholder="-"
                className="h-10 text-lg font-medium text-center text-black border rounded-md w-15 sm:w-12 sm:h-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="mb-4 text-xs text-center text-red-500 sm:text-sm">
              Wrong authenticator code. Verify again!
            </p>
          )}

          <p className="mb-2 text-xs text-gray-600 sm:text-base">
            Didn’t receive a code?{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Resend Code
            </a>
          </p>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleVerify}
            className="w-full py-2.5 rounded-md bg-primary text-white font-semibold hover:bg-[#123057] flex justify-center items-center"
          >
            Verify Email
          </button>

          {/* Divider */}
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}
