import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { routePaths } from "../../constants/paths"; // use when you hook up navigation

const ProfessionalRoleSection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'md_do',
      title: 'MD/DO',
      subtitle: 'Physician',
    },
    {
      id: 'np',
      title: 'NP',
      subtitle: 'Nurse Practitioner',
    },
    {
      id: 'crna',
      title: 'CRNA',
      subtitle: 'Certified Registered Nurse Anesthetist',
    },
    {
      id: 'pa',
      title: 'PA',
      subtitle: 'Physician Assistant',
    },
    {
      id: 'aa',
      title: 'AA',
      subtitle: 'Anesthesiologist Assistant',
    },
    // Add more roles here if needed
  ];

  const handleContinue = () => {
    if (!selectedRole) return;

    // This is where you will integrate your API call
    // e.g. await saveRoleSelection(selectedRole);
    navigate('/onboarding');

    console.log('Selected role:', selectedRole);
  };

  return (
    <div className="flex h-screen gap-6 p-4 bg-white">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 border rounded-2xl lg:flex">
        <img src="/doctors-img.svg" alt="Medical professionals" className="object-cover w-full h-full rounded-2xl" />
      </div>

      {/* Right Side - Content */}
      <div className="flex items-center justify-center w-full px-4 border shadow-sm lg:w-1/2 rounded-2xl">
        <div className="w-full bg-white">
          {/* Heading */}
          <h1 className="mb-3 text-center text-2xl font-semibold text-secondary sm:text-[31px]">
            Select Your Professional Role
          </h1>
          <p className="mb-6 text-center text-sm font-medium text-secondary sm:text-[20px]">
            Choose the designation that best matches your practice to tailor your onboarding.
          </p>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2">
            {roles.map((role) => {
              const isActive = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex h-full flex-col justify-between rounded-lg border p-3 text-left transition-shadow focus:outline-none focus:ring-2 focus:ring-[#163B6D]/60 ${
                    isActive ? 'border-[#163B6D] bg-primary/10 shadow-md' : 'border-[#d7dde6] bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-secondary">{role.title}</div>
                      <div className="mt-1 text-xs text-[#374151]">{role.subtitle}</div>
                    </div>

                    <span
                      className={`mt-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                        isActive ? 'border-[#163B6D] bg-primary' : 'bg-[#92949F]'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info line */}
          <div className="flex items-start gap-2 mb-4">
            <img src="/sheild.svg" alt="shield" className="mt-0.5 h-4 w-4" />
            <p className="text-sm text-gray-500">Role selection helps tailor compliance steps; no PHI is shared.</p>
          </div>

          {/* Continue button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full rounded-md py-2.5 text-[16px] font-semibold transition-colors ${
              selectedRole ? 'bg-primary text-white hover:bg-[#123057]' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalRoleSection;
