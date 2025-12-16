// src/pages/AccountSettings.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // <-- important
import MainLayout from "../layouts/MainLayout";
import UserProfileForm from "../components/profile/userProfileForm";
import BillingManagementContainer from "../components/profile/billingManagementContainer";
import DeleteAccountContainer from "../components/profile/deleteAccountContainer";
import AccountSecuritySection from "../components/profile/accountSecuritySection";
import WelcomeBanner from "../components/DashBoard/WelcomeBanner";
import DelegatedAccessContainer from "../components/profile/delegatedAccessContainer";
import NotificationsContainer from "../components/profile/notificationsContainer";

export default function AccountSettings() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "profile", label: "Profile", icon: "/profile.svg", alt: "Profile" },
    { id: "security", label: "Security", icon: "/lock.svg", alt: "Security" },
    {
      id: "notifications",
      label: "Notifications",
      icon: "/bell-icon.svg",
      alt: "Notifications",
    },
    { id: "account", label: "Account", icon: "/wallet.svg", alt: "Account" },
    {
      id: "delegated",
      label: "Delegated Access",
      icon: "/delegate.svg",
      alt: "Delegated Access",
    },
    {
      id: "deactivate",
      label: "Deactivate Account",
      icon: "/trash.svg",
      alt: "Deactivate Account",
    },
  ];

  // helper to get a valid tab from URL
  const getTabFromSearch = () => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    const isValid = tabs.some((t) => t.id === tab);
    return isValid ? tab : "profile";
  };

  const [activeTab, setActiveTab] = useState(getTabFromSearch);

  // Update tab when URL query changes (e.g., user clicks menu while already on this page)
  useEffect(() => {
    const tabFromUrl = getTabFromSearch();
    setActiveTab(tabFromUrl);
  }, [location.search]); // runs whenever ?tab=... changes

  const user = {
    firstName: "John",
    lastName: "Mitchell",
    email: "you@hospital.org",
    phone: "(555) 201-1488",
    address: "1200 Lakeshore Dr, Suite 200",
    role: "",
    appraisalRole: "Licensed Appraiser",
    avatarUrl: "/avatar.svg",
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // keep URL in sync too (nice for refresh/deep-link)
    navigate(`?tab=${tabId}`, { replace: true });
  };

  return (
    <MainLayout>
      <WelcomeBanner
        heading="Settings & Profile Management"
        subHeading="Manage your account settings, security preferences, and notifications."
        className="bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC]"
      />
      <div className="min-h-screen mt-6">
        <div className="w-full mx-auto">
          {/* Tabs header */}
          <div className="border-slate-200">
            <div className="overflow-x-auto">
              <div className="flex flex-wrap items-center gap-1 p-1 border w-fit md:flex-nowrap md:gap-2 md:p-2 bg-tertiary/10 border-tertiary/10 rounded-t-xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 mb-[-1px] rounded-t-xl border-b-2 text-xs sm:text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-slate-200 bg-white rounded-xl text-slate-900"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab.icon && (
                      <img
                        src={tab.icon}
                        alt={tab.alt || tab.label}
                        className="flex-shrink-0 w-4 h-4"
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab content */}
          <div>
            {activeTab === "profile" && (
              <UserProfileForm
                user={user}
                onSave={(updated) => {
                  console.log("Save profile", updated);
                }}
              />
            )}

            {activeTab === "security" && <AccountSecuritySection />}

            {activeTab === "notifications" && <NotificationsContainer />}

            {activeTab === "account" && <BillingManagementContainer />}

            {activeTab === "delegated" && <DelegatedAccessContainer />}

            {activeTab === "deactivate" && <DeleteAccountContainer />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
