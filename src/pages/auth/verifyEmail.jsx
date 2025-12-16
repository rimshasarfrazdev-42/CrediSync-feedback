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
    >
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img src="/doctors-img.svg" alt="Business Meeting" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side - Verification Card */}
      <div className="flex items-center justify-center w-full px-2 bg-white border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          <div className="flex items-center justify-center my-4"></div>

          {/* Heading */}
          <h2
            className="mb-1 text-center font-semibold text-secondary 
               text-[20px] sm:text-[24px] md:text-[28px] lg:text-[31px]"
          >
            Please verify your email address
          </h2>

          <p
            className="mx-auto mb-6 max-w-xs sm:max-w-md md:max-w-xl 
              text-center font-medium text-[#374151] 
              text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]"
          >
            Enter the 6-digit code we’ve sent to&nbsp;you@hospital.org
          </p>

          {/* OTP Input */}
          <div
            className="mx-auto mb-4 grid w-full max-w-[320px] 
                grid-cols-6 gap-2 sm:gap-3 md:max-w-[380px]"
          >
            {otp.map((data, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                placeholder="-"
                className="h-10 sm:h-11 md:h-12 
                 w-full rounded-md border 
                 text-center font-medium text-black 
                 text-[14px] sm:text-[16px] 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p
              className="mb-4 text-center text-red-500 
                text-[11px] sm:text-[13px] md:text-[14px]"
            >
              Wrong authenticator code. Verify again!
            </p>
          )}

          <p
            className="mb-3 text-center text-[#374151] 
              text-[11px] sm:text-[13px] md:text-[14px]"
          >
            Didn’t receive a code?{' '}
            <button type="button" className="font-medium text-primary hover:underline">
              Resend Code
            </button>
          </p>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleVerify}
            className="w-full rounded-md bg-primary 
             py-2.5 sm:py-3 
             text-[13px] sm:text-[14px] md:text-[15px] 
             font-semibold text-white 
             hover:bg-[#123057] 
             flex items-center justify-center"
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
