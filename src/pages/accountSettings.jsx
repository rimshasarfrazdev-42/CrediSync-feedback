// src/pages/AccountSettings.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import UserProfileForm from "../components/profile/userProfileForm";
import BillingManagementContainer from "../components/profile/billingManagementContainer";
import DeleteAccountContainer from "../components/profile/deleteAccountContainer";
import AccountSecuritySection from "../components/profile/accountSecuritySection";
import WelcomeBanner from "../components/DashBoard/WelcomeBanner";
import DelegatedAccessContainer from "../components/profile/delegatedAccessContainer";
import NotificationsContainer from "../components/profile/notificationsContainer";

export default function AccountSettings() {
  const tabsContainerRef = useRef(null);

  const scrollTabs = (direction = "right") => {
    if (!tabsContainerRef.current) return;
    const container = tabsContainerRef.current;
    const scrollAmount = 180;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "profile", label: "Profile", icon: "/profile.svg", alt: "Profile" },
    { id: "security", label: "Security", icon: "/lock.svg", alt: "Security" },
    { id: "notifications", label: "Notifications", icon: "/bell-icon.svg", alt: "Notifications" },
    { id: "account", label: "Account", icon: "/wallet.svg", alt: "Account" },
    { id: "delegated", label: "Delegated Access", icon: "/delegate.svg", alt: "Delegated Access" },
    { id: "deactivate", label: "Deactivate Account", icon: "/trash.svg", alt: "Deactivate Account" },
  ];

  const getTabFromSearch = () => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    const isValid = tabs.some((t) => t.id === tab);
    return isValid ? tab : "profile";
  };

  const [activeTab, setActiveTab] = useState(getTabFromSearch);

  useEffect(() => {
    setActiveTab(getTabFromSearch());
  }, [location.search]);

  // auto-scroll active tab into view on small screens (mobile + tablet)
  useEffect(() => {
    const el = document.getElementById(`tab-${activeTab}`);
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeTab]);

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
            <div className="relative">
              {/* Scroll buttons on MOBILE + TABLET only (hide on lg+) */}
              {/* <button
                type="button"
                onClick={() => scrollTabs("left")}
                className="absolute z-10 px-2 py-1 -translate-y-1/2 rounded-full shadow-sm left-1 top-1/2 bg-white/90 text-slate-600 ring-1 ring-slate-200 lg:hidden"
                aria-label="Scroll tabs left"
              >
                ‹
              </button> */}

              {/* Scroll container:
                  - mobile/tablet: horizontal scroll (no wrap)
                  - lg+: same UI as before (wrap + w-fit) */}
              <div
                ref={tabsContainerRef}
                className="overflow-x-auto lg:overflow-visible"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className="flex items-center gap-1 p-1 border flex-nowrap bg-tertiary/10 border-tertiary/10 rounded-t-xl w-max lg:w-fit lg:flex-wrap lg:gap-2 lg:p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      type="button"
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex shrink-0 items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 mb-[-1px] rounded-t-xl border-b-2 text-xs sm:text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? "border-slate-200 bg-white rounded-xl text-[#111827] font-semibold"
                          : "border-transparent text-[#374151] font-semibold hover:text-slate-800"
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
{/* 
              <button
                type="button"
                onClick={() => scrollTabs("right")}
                className="absolute z-10 px-2 py-1 -translate-y-1/2 rounded-full shadow-sm right-1 top-1/2 bg-white/90 text-slate-600 ring-1 ring-slate-200 lg:hidden"
                aria-label="Scroll tabs right"
              >
                ›
              </button> */}
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
