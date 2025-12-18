import { useEffect, useMemo, useState } from "react";
import { Camera } from "lucide-react";

// adjust these relative paths if needed
import TermsAndConditionsModal from "../Modals/LegalAndConsentManagement/TermsAndConditionsModal";
import PrivacyPolicyModal from "../Modals/LegalAndConsentManagement/PrivacyPolicyModal";

export default function UserProfileForm({ user, onSave }) {
  const [formData, setFormData] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);

  // ✅ validation errors
  const [errors, setErrors] = useState({});

  // which legal modal is open: "TermsAndConditions" | "PrivacyPolicy" | null
  const [activeModal, setActiveModal] = useState(null);

  // ✅ keep form in sync if `user` prop changes
  useEffect(() => {
    setFormData(user || {});
    setErrors({});
    setIsEditing(false);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error on typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, avatarFile: "Only JPG, PNG, or WEBP images are allowed." }));
      return;
    }
    if (file.size > maxSize) {
      setErrors((prev) => ({ ...prev, avatarFile: "Image size must be 3MB or less." }));
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatarUrl: imageUrl,
      avatarFile: file,
    }));

    setErrors((prev) => ({ ...prev, avatarFile: "" }));
  };

  const handleCloseModal = () => setActiveModal(null);

  // ✅ validators
  const validators = useMemo(
    () => ({
      firstName: (v) => {
        if (!v?.trim()) return "First name is required.";
        if (v.trim().length < 2) return "First name must be at least 2 characters.";
        if (!/^[a-zA-Z\s.'-]+$/.test(v.trim())) return "First name contains invalid characters.";
        return "";
      },
      lastName: (v) => {
        if (!v?.trim()) return "Last name is required.";
        if (v.trim().length < 2) return "Last name must be at least 2 characters.";
        if (!/^[a-zA-Z\s.'-]+$/.test(v.trim())) return "Last name contains invalid characters.";
        return "";
      },
      phone: (v) => {
        if (!v?.trim()) return "Contact number is required.";
        const digits = v.replace(/[^\d]/g, "");
        if (digits.length < 10 || digits.length > 15) return "Enter a valid contact number.";
        return "";
      },
      address: (v) => {
        if (!v?.trim()) return "Address is required.";
        if (v.trim().length < 6) return "Address must be at least 6 characters.";
        return "";
      },
      role: (v) => {
        if (!v?.trim()) return "Role is required.";
        return "";
      },
    }),
    []
  );

  const validateAll = () => {
    const newErrors = {};

    // validate only editable fields (email is disabled)
    newErrors.firstName = validators.firstName(formData.firstName);
    newErrors.lastName = validators.lastName(formData.lastName);
    newErrors.phone = validators.phone(formData.phone);
    newErrors.address = validators.address(formData.address);
    newErrors.role = validators.role(formData.role);

    // remove empty messages
    Object.keys(newErrors).forEach((k) => {
      if (!newErrors[k]) delete newErrors[k];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user || {});
    setErrors({});
    setIsEditing(false);
  };

  return (
    <>
      <div className="w-full p-4 mx-auto bg-white border border-gray-200 shadow-sm rounded-b-xl lg:rounded-r-xl sm:p-6">
        {/* Card header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-secondary sm:text-[18px]">
            Profile Information
          </h2>
          <p className="mt-1 text-xs text-gray-500 sm:text-[14px]">
            Update your basic details and contact information.
          </p>
        </div>

        {/* Top Profile Section */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={formData.avatarUrl || "/default-avatar.png"}
                alt={formData.firstName || "User avatar"}
                className="object-cover w-16 h-16 border border-gray-200 rounded-full sm:w-20 sm:h-20"
              />
              {isEditing && (
                <label
                  htmlFor="avatarUpload"
                  className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full cursor-pointer shadow transition"
                >
                  <Camera className="w-4 h-4 text-white " />
                  <input
                    type="file"
                    id="avatarUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900 sm:text-[20px]">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="text-sm text-gray-500 sm:text-[16px]">
                {formData.appraisalRole || "Licensed Appraiser"}
              </p>
            </div>
          </div>
        </div>

        {errors.avatarFile && (
          <p className="mb-4 text-sm text-red-600">{errors.avatarFile}</p>
        )}

        <hr className="w-full mb-6 border-gray-200" />

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First / Last Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 sm:text-[18px]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter First Name"
                className={`block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 sm:text-[18px]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter Last Name"
                className={`block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email / Contact Number */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 sm:text-[18px]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                disabled
                className="block w-full px-3 py-2 mt-1 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 sm:text-[18px]">
                Contact Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="(555) 201-1488"
                className={`block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>

          {/* Address / Role */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 sm:text-[18px]">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="1200 Lakeshore Dr, Suite 200"
                className={`block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 sm:text-[18px]">
                Role
              </label>
              <select
                name="role"
                value={formData.role || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Role</option>
                <option value="licensed-appraiser">MD/DO</option>
                <option value="trainee">NP</option>
                <option value="reviewer">CRNA</option>
                <option value="reviewer">PA</option>
                <option value="reviewer">AA</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>
          </div>

          {/* Terms text */}
          <p className="text-xs text-gray-500 sm:text-[14px]">
            View{" "}
            <button
              type="button"
              className="font-medium underline text-primary underline-offset-2"
              onClick={() => setActiveModal("TermsAndConditions")}
            >
              Terms &amp; Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-medium underline text-primary underline-offset-2"
              onClick={() => setActiveModal("PrivacyPolicy")}
            >
              Privacy Policy
            </button>
            .
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-4 sm:flex-row">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex justify-center px-5 py-2 text-sm font-medium text-white bg-[#143A76] rounded-lg hover:bg-[#0f2d59]"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex justify-center px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-5 py-2 text-sm font-medium text-white bg-[#143A76] rounded-lg hover:bg-[#0f2d59]"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* Legal modals */}
      {activeModal === "TermsAndConditions" && (
        <TermsAndConditionsModal closeModal={handleCloseModal} />
      )}
      {activeModal === "PrivacyPolicy" && (
        <PrivacyPolicyModal closeModal={handleCloseModal} />
      )}
    </>
  );
}
