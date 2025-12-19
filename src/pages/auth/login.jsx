import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";   // ⬅ ADD THIS
import { routePaths } from "../../constants/paths";

const Login = () => {
  const navigate = useNavigate();   // ⬅ ADD THIS

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ email, password, rememberMe });

    // 🚀 After login success → Navigate to dashboard
    navigate(routePaths.Dashboard); 
    // OR navigate("/dashboard") if your path is plain string
  };

  return (
    <div className="flex h-screen gap-6 p-2 bg-white">
      {/* Left Side */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img
          src="/doctors-img.svg"
          alt="Medical professionals"
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center w-full px-4 shadow-sm lg:border lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          <h1 className="text-[22px] sm:text-[28px] font-semibold text-center text-slate-900">
            Login
          </h1>
          <p className="mt-1 text-[14px] sm:text-[16px] font-medium text-center text-slate-800 mb-6">
            Sign in to continue your credentialing journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">
                Email Address
              </label>
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
            <div>
              <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2.5 border rounded-md"
              />

              <div className="flex items-center justify-between mt-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm">Remember me</span>
                </label>

                <Link to={routePaths.ResetPassword} className="text-primary">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 font-semibold text-white bg-primary rounded-md"
            >
              Log In
            </button>

            <p className="mt-3 text-center">
              Don't have an account?{" "}
              <Link
                to={routePaths.register}
                className="font-medium text-primary"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
