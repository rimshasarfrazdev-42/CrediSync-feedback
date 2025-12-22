import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../constants/paths';
import { Link } from 'react-router-dom';

export default function CreateNewPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 🔹 Validation errors
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate new password
    if (!validatePassword(newPassword)) {
      setNewPasswordError('Password must be 8+ characters, include uppercase, lowercase, number & special character.');
      isValid = false;
    } else {
      setNewPasswordError('');
    }

    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // If all good → navigate
    if (isValid) {
      navigate('/reset-success');
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex h-screen gap-6 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img src="/doctors-img.svg" alt="Medical professionals" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full px-4 border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          {/* Heading */}
          <h1 className="mb-1 text-xl font-semibold text-center sm:text-2xl text-slate-900">Create New Password</h1>
          <p className="mb-6 text-md font-medium text-center text-[#374151] sm:text-lg">
            Enter your email address and we&apos;ll send you instructions to reset your password
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-[18px] font-medium text-gray-700">New Password</label>

              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  placeholder="Strong Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="w-full p-2.5 pr-10 text-sm text-black bg-white border border-[#d7dde6] rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1f4fbf]/70 focus:border-[#1f4fbf]"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {newPasswordError && <p className="mt-1 text-sm text-red-600">{newPasswordError}</p>}
            </div>

            <div>
              <label className="block mb-1 text-[18px] font-medium text-gray-700">Confirm Password</label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full p-2.5 pr-10 text-sm text-black bg-white border border-[#d7dde6] rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1f4fbf]/70 focus:border-[#1f4fbf]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {confirmPasswordError && <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>}
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2.5 text-[16px] font-semibold text-white transition-colors bg-[#163B6D] rounded-md hover:bg-[#123057]"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
