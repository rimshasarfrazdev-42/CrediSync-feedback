import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(""); // "" | error message string

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Keep refs so we can focus without document.getElementById
  const inputRefs = useRef([]);

  const config = useMemo(() => {
    const mode = searchParams.get("mode") || "signup";
    const email = searchParams.get("email") || "you@hospital.org";
    const next = searchParams.get("next") || "/verification";
    const heading = mode === "reset" ? "Verify your email to reset password" : "Please verify your email address";
    const subText = `Enter the 6-digit code we’ve sent to\u00A0${email}`;
    return { mode, email, next, heading, subText };
  }, [searchParams]);

  const focusIndex = (i) => {
    const el = inputRefs.current[i];
    if (el) el.focus();
  };

  const setOtpAt = (index, value) => {
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // Handles typing, paste into a single box, and OS autofill putting "123456" into first box
  const handleChange = (e, index) => {
    const raw = e.target.value;

    // allow only digits
    const digits = raw.replace(/\D/g, "");
    if (!digits) {
      // clearing current box
      setOtpAt(index, "");
      setError("");
      return;
    }

    setError("");

    // If user pasted/typed multiple digits into one input, spread them forward
    const chars = digits.split("");
    setOtp((prev) => {
      const next = [...prev];
      let i = index;
      for (const ch of chars) {
        if (i > 5) break;
        next[i] = ch;
        i++;
      }
      return next;
    });

    // Focus next empty / next position
    const nextIndex = Math.min(index + digits.length, 5);
    if (nextIndex < 5) focusIndex(nextIndex);
    else focusIndex(5);
  };

  // Smooth backspace behavior (no need to select each box)
  const handleKeyDown = (e, index) => {
    if (e.key !== "Backspace") return;

    e.preventDefault();
    setError("");

    setOtp((prev) => {
      const next = [...prev];

      // If current has value: clear it
      if (next[index]) {
        next[index] = "";
        return next;
      }

      // If current empty: move back and clear previous
      if (index > 0) {
        next[index - 1] = "";
        // focus previous after state update
        setTimeout(() => focusIndex(index - 1), 0);
      }
      return next;
    });
  };

  // Paste handler: fill all boxes starting from current index
  const handlePaste = (e, index) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    const digits = text.replace(/\D/g, "").slice(0, 6);
    if (!digits) return;

    setError("");

    setOtp((prev) => {
      const next = [...prev];
      let i = index;
      for (const ch of digits) {
        if (i > 5) break;
        next[i] = ch;
        i++;
      }
      return next;
    });

    const lastIndex = Math.min(index + digits.length - 1, 5);
    setTimeout(() => focusIndex(lastIndex), 0);
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    // Error for incomplete code
    if (enteredOtp.length < 6 || otp.some((x) => x === "")) {
      setError("Please enter the 6-digit code sent to your email.");
      return;
    }

    // Replace with API validation
    const isValid = enteredOtp === "123456";

    if (!isValid) {
      setError("The code you entered is incorrect. Please try again.");
      return;
    }

    setError("");

    navigate(config.next, {
      replace: true,
      state: { email: config.email, mode: config.mode },
    });
  };

  const handleResend = () => {
    console.log("Resend OTP:", { email: config.email, purpose: config.mode });
  };

  return (
    <div className="flex lg:h-screen gap-6 p-4 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img
          src="/doctors-img.svg"
          alt="Business Meeting"
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      {/* Right Side - Verification Card */}
      <div className="flex items-center justify-center w-full px-4 bg-white border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          <div className="flex items-center justify-center my-4" />

          <h2 className="mb-1 text-center font-semibold text-secondary text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
            {config.heading}
          </h2>

          <p className="mx-auto mb-6 max-w-xs sm:max-w-md md:max-w-xl text-center font-medium text-[#374151] text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
            {config.subText}
          </p>

          {/* OTP Input */}
          <div className="mx-auto mb-4 grid w-full max-w-[320px] grid-cols-6 gap-2 sm:gap-3 md:max-w-[380px]">
            {otp.map((val, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6} // allow paste/autofill; we control display anyway
                value={val}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                onFocus={(e) => e.target.select()}
                placeholder="-"
                className="h-10 sm:h-11 md:h-12 w-full rounded-md border text-center font-medium text-black text-[14px] sm:text-[16px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="mb-4 text-center text-red-500 text-[11px] sm:text-[13px] md:text-[14px]">
              {error}
            </p>
          )}

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerify}
            className="w-full rounded-md bg-primary py-2.5 sm:py-3 text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-white hover:bg-[#123057] flex items-center justify-center"
          >
            Verify Email
          </button>

          {/* Move resend under button (better UX) */}
          <p className="mt-3 mb-3 text-center text-[#374151] text-[11px] sm:text-[13px] md:text-[14px]">
            Didn’t receive a code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-primary hover:underline"
            >
              Resend Code
            </button>
          </p>

          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}
