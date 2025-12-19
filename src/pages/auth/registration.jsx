import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import PrivacyPolicyModal from "../legal/privacyPolicyModal";
import TermsConditionsModal from "../legal/TermConditionModal";
import { routePaths } from "../../constants/paths";

export default function SignUp() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ keep a single derived state for checkbox checked
  const agreementChecked = privacyAccepted && termsAccepted;

  // ✅ if both are accepted, always keep checkbox checked visually
  // (this is just for clarity; derived boolean already ensures that)
  useEffect(() => {
    // no-op intentionally: derived state controls UI
  }, [privacyAccepted, termsAccepted]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (!agreementChecked) newErrors.terms = "You must accept Terms & Privacy Policy";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Form submitted (demo mode — no API)");
      setIsLoading(false);
      navigate("/verify-email");
    }, 1000);
  };

  // Clicking checkbox toggles acceptance only when both already accepted.
  // If not accepted, we don’t open any modal automatically (per your request).
  const handleAgreementCheckboxChange = () => {
    if (agreementChecked) {
      // allow user to uncheck -> resets both acceptances
      setTermsAccepted(false);
      setPrivacyAccepted(false);
      setErrors((prev) => ({ ...prev, terms: "" }));
    } else {
      // do nothing (user must open modals via links)
      toast.info("Please review and accept Terms & Conditions and Privacy Policy.");
    }
  };

  return (
    <div
      className="flex h-screen gap-6 p-3 bg-white sm:p-4 md:p-6"
     
    >
      {/* Left Image */}
      <div className="hidden w-1/2 lg:h-[960px] border rounded-2xl lg:flex">
        <img
          src="/doctors-img.svg"
          alt="Medical professionals"
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center w-full px-3 bg-white shadow-sm lg:border lg:w-1/2 rounded-2xl sm:px-4 md:px-6">
        <div className="w-full">
          <div className="mb-5 text-center">
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-secondary">Registration</h2>
            <p className="mt-1 text-[14px] sm:text-[16px] font-medium text-tertiary">
              Protected under HIPAA &amp; SOC 2 Standards
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* First / Last Name */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:outline-none text-[14px] sm:text-[15px] ${
                    errors.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:outline-none text-[14px] sm:text-[15px] ${
                    errors.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@hospital.org"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2.5 border rounded-md focus:ring-2 focus:outline-none text-[14px] sm:text-[15px] ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Strong Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:outline-none text-[14px] sm:text-[15px] ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label className="block mb-1 text-[14px] sm:text-[16px] font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:outline-none text-[14px] sm:text-[15px] ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreementChecked}
                onChange={handleAgreementCheckboxChange}
                className="mt-[3px] h-3.5 w-3.5 rounded border border-[#b6bfd1]"
              />

              {/* ✅ clicking normal text will NOT open privacy modal */}
              <label htmlFor="terms" className="text-[12px] sm:text-[13px] leading-snug text-slate-600">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-[#1f4fbf] underline underline-offset-[2px]"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTerms(true);
                  }}
                >
                  Terms &amp; Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#1f4fbf] underline underline-offset-[2px]"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPrivacy(true);
                  }}
                >
                  Privacy Policy
                </button>
                .
              </label>
            </div>

            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

            {/* Modals */}
            <TermsConditionsModal
              open={showTerms}
              onClose={() => setShowTerms(false)}
              onAccept={() => {
                setTermsAccepted(true);
                setShowTerms(false);
                setErrors((prev) => ({ ...prev, terms: "" }));
              }}
            />

            <PrivacyPolicyModal
              open={showPrivacy}
              onClose={() => setShowPrivacy(false)}
              onAccept={() => {
                setPrivacyAccepted(true);
                setShowPrivacy(false);
                setErrors((prev) => ({ ...prev, terms: "" }));
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-md bg-primary text-white font-semibold hover:bg-[#123057] flex justify-center items-center disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-[14px] sm:text-[16px] text-center font-medium text-gray-600">
              Already have an account?{" "}
              <Link to={routePaths.Login} className="font-semibold cursor-pointer text-primary hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
