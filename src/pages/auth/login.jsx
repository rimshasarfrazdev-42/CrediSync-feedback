import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅ ADD THIS
import { routePaths } from '../../constants/paths';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate(); // ⬅ ADD THIS

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const WELCOME_KEY = "credisync_welcome_seen";

const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ after login success
  const hasSeenWelcome = localStorage.getItem(WELCOME_KEY) === "true";

  if (hasSeenWelcome) {
    navigate("/dashboard"); // or routePaths.Dashboard
  } else {
    navigate(routePaths.Home); // your Welcome screen route
  }
};


  const viewPasswordHandler = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex h-screen gap-6 bg-white lg:p-2">
      {/* Left Side */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img src="/doctors-img.svg" alt="Medical professionals" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center w-full px-4 shadow-sm lg:border lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          <h1 className="text-[22px] sm:text-[28px] font-semibold text-center text-slate-900">Login</h1>
          <p className="mt-1 text-[14px] sm:text-[16px] font-medium text-center text-slate-800 mb-6">
            Sign in to continue your credentialing journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="you@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2.5 border rounded-md"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">Password</label>
              {showPassword ? (
                <Eye
                  size={18}
                  className="absolute text-gray-500 cursor-pointer text-md top-11 right-4 hover:text-gray-700"
                  onClick={viewPasswordHandler}
                />
              ) : (
                <EyeOff
                  size={18}
                  className="absolute text-gray-500 cursor-pointer text-md top-11 right-4 hover:text-gray-700"
                  onClick={viewPasswordHandler}
                />
              )}
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2.5 border rounded-md"
              />

              <div className="flex items-center justify-between mt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 border border-gray-400 rounded-sm accent-primary focus:ring-0"
                  />
                  <span className="text-sm select-none text-secondary">Remember me</span>
                </label>

                <Link to={routePaths.ResetPassword} className="text-primary text-[14px] sm:text-[16px]">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 font-semibold text-white bg-primary rounded-md">
              Log In
            </button>

            <p className="mt-3 text-[14px] sm:text-[16px] text-center">
              Don't have an account?{' '}
              <Link to={routePaths.register} className="font-medium text-primary">
                Sign Up
              </Link>
            </p>
            {/* thin line + institution link */}
            <div className="pt-4 mt-6 text-[14px] sm:text-[16px] text-center border-t border-gray-200 text- text-slate-700">
              <span>Are you an institution? </span>
              <a
                href="https://org-credisync.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary"
              >
                Login or Signup here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
