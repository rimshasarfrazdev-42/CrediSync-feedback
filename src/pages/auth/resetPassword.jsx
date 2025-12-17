import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../constants/paths";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // 🔹 Email validation error
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      navigate("/create-new-password");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex h-screen gap-6 p-4 bg-white">
      {/* Left Side - Image */}
   <div className="hidden w-1/2 border lg:flex rounded-2xl">
  <img
    src="/doctors-img.svg"
    alt="Medical professionals"
    className="object-cover w-full h-full rounded-2xl"
  />
</div>

   
      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full px-4 border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          {/* Heading */}
     <h1 className="mb-1 text-2xl font-semibold text-center sm:text-3xl md:text-4xl lg:text-5xl text-slate-900">
  Reset Your Password
</h1>
<p className="mb-6 text-sm font-medium text-center sm:text-base md:text-lg lg:text-xl text-slate-900">
  Enter your email address and we&apos;ll send you instructions to
  reset your password.
</p>


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-[18px] font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@hospital.org"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-2.5 text-sm text-black bg-white border border-[#d7dde6] rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1f4fbf]/70 focus:border-[#1f4fbf]"
              />

              {/* 🔹 Email Error */}
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2.5 text-[16px] font-semibold text-white transition-colors bg-primary rounded-md hover:bg-[#123057]"
            >
              Send Reset Instruction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
