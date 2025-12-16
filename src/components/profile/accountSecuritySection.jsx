import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, LogOut } from "lucide-react";
import LogoutAllDevicesModal from "../Modals/logoutModal";

function AccountSecuritySection() {
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("January 15, 2025");

  const [isMfaEnabled, setIsMfaEnabled] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [message, setMessage] = useState(null); // { type: "success" | "error", text: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setMessage(null);
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!formValues.newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (formValues.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters.";
    }

    if (!formValues.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      const formatted = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date());

      setLastUpdated(formatted);
      setMessage({
        type: "success",
        text: "Password updated successfully.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong while updating your password. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleToggleMfa = () => {
    setIsMfaEnabled((prev) => !prev);
  };

  const handleLogoutAllDevices = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout from all devices?"
    );
    if (!confirmed) return;

    setLoggingOut(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({
        type: "success",
        text: "You have been logged out from all devices.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Could not logout from all devices. Please try again.",
      });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white border shadow-sm border-slate-200 rounded-r-xl rounded-b-xl">
      {/* Header */}
      <div className="px-4 py-4 sm:px-6">
        <h2 className="text-sm font-semibold text-secondary sm:text-base">
          Account Security
        </h2>
        <p className="mt-1 text-xs text-tertiary sm:text-sm">
          Manage your password, MFA, and session activity.
        </p>
      </div>

      <div className="px-4 py-4 space-y-5 sm:px-6 sm:py-6">
        {/* Change Password */}
        <section className="border rounded-lg border-slate-200">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 sm:px-5">
            <Lock className="w-5 h-5 text-slate-700" />
            <h3 className="text-sm font-semibold text-secondary sm:text-base">
              Change Password
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-4 py-4 space-y-4 sm:px-5 sm:py-5"
          >
            {/* Current Password */}
            <div className="space-y-1">
              <label
                htmlFor="currentPassword"
                className="text-xs font-medium text-slate-700 sm:text-sm"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword.current ? "text" : "password"}
                  placeholder="Enter current password"
                  value={formValues.currentPassword}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 pr-10 py-2 text-sm outline-none transition
                  ${
                    errors.currentPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                      : "border-slate-300 focus:border-tertiary focus:ring-1 focus:ring-slate-500/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("current")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-tertiary hover:text-slate-700"
                  aria-label={
                    showPassword.current ? "Hide password" : "Show password"
                  }
                >
                  {showPassword.current ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-red-600 sm:text-sm">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label
                htmlFor="newPassword"
                className="text-xs font-medium text-slate-700 sm:text-sm"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword.new ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formValues.newPassword}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 pr-10 py-2 text-sm outline-none transition
                  ${
                    errors.newPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                      : "border-slate-300 focus:border-tertiary focus:ring-1 focus:ring-slate-500/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("new")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-tertiary hover:text-slate-700"
                  aria-label={
                    showPassword.new ? "Hide password" : "Show password"
                  }
                >
                  {showPassword.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-600 sm:text-sm">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium text-slate-700 sm:text-sm"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 pr-10 py-2 text-sm outline-none transition
                  ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                      : "border-slate-300 focus:border-tertiary focus:ring-1 focus:ring-slate-500/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("confirm")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-tertiary hover:text-slate-700"
                  aria-label={
                    showPassword.confirm ? "Hide password" : "Show password"
                  }
                >
                  {showPassword.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 sm:text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit + meta */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0d2a4d] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating..." : "Update Password"}
              </button>

              <p className="text-xs text-tertiary sm:text-sm">
                Last updated: {lastUpdated}
              </p>
            </div>
          </form>
        </section>

        {/* MFA Section */}
        <section className="flex flex-col gap-3 px-4 py-4 border rounded-lg border-slate-200 sm:px-5 sm:py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                {/* you can swap this img for ShieldCheck if you prefer */}
                <img src="shield-zap.svg" alt="MFA" className="w-5 h-5" />
                <h3 className="text-sm font-semibold text-secondary sm:text-base">
                  Multi-Factor Authentication (MFA)
                </h3>
              </div>
              <p className="mt-1 text-xs text-tertiary sm:text-sm">
                Protect your account with an additional verification step.
              </p>
            </div>

            {/* Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={isMfaEnabled}
              onClick={handleToggleMfa}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors ${
                isMfaEnabled
                  ? "bg-primary border-primary"
                  : "bg-slate-200 border-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  isMfaEnabled ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* Session Control */}
        <section className="flex flex-col gap-3 px-4 py-4 border rounded-lg border-slate-200 sm:px-5 sm:py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                {/* you can swap this img for LogOut if you prefer */}
                <img src="/session-icon.svg" alt="Session control" className="w-5 h-5" />
                <h3 className="text-sm font-semibold text-secondary sm:text-base">
                  Session Control
                </h3>
              </div>
              <p className="mt-1 text-xs text-tertiary sm:text-sm">
                Logout from all devices where you are currently signed in. You
                will need to log in again on this device.
              </p>
            </div>
          </div>

          <button
            type="button"
          onClick={() => setOpen(true)}
            disabled={loggingOut}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0d2a4d] w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loggingOut ? "Logging out..." : "Logout from All Devices"}
          </button>
        </section>
           <LogoutAllDevicesModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          // logout-all-devices logic
          setOpen(false);
        }}
      />

        {/* Global message */}
        {message && (
          <div
            className={`rounded-md px-3 py-2 text-xs sm:text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountSecuritySection;
