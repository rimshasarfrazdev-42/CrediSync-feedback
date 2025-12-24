// CredentialCenter.jsx
import React, { useState } from 'react';
import ChecklistTab from '../components/checklist&Notification/checklistTab';
import NotificationsTab from '../components/checklist&Notification/notificationsTab';
import { checklistItemsData, notificationsData } from '../constants/credentialData';
import MainLayout from '../layouts/MainLayout';
import { UpperHeader } from '../components/checklist&Notification/upperBanner';
import WelcomeBanner from '../components/DashBoard/WelcomeBanner';

export default function ChecklistNotification() {
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'notifications'
  const [checklistItems, setChecklistItems] = useState(checklistItemsData);
  const [notificationItems, setNotificationItems] = useState(notificationsData);

  return (
    <MainLayout>
      <div className="min-h-screen ">
       <WelcomeBanner
        heading="Checklist & Notifications"
        subHeading="Share your credentials securely with institutions"
        className="bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC]"
      />
        <div className="w-full h-full mt-6">
          <div className="flex items-center p-1 border md:gap-2 w-fit bg-tertiary/5 md:p-2 rounded-t-xl border-tertiary/10">
            {/* Checklist Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 border-b-2 pb-3 text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'checklist'
                  ? 'bg-white border border-gray-100 rounded-xl p-2  text-secondary'
                  : 'border-transparent p-2 text-slate-500 hover:text-slate-800'
              }`}
            >
              <img src="/checklist-icon.svg" alt="Checklist Icon" className="w-4 h-4" />
              <span>Checklist</span>
            </button>

            {/* Notifications Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2 border-b-2 pb-3 text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-white border border-gray-100 p-2 rounded-xl  text-secondary'
                  : 'border-transparent p-2 text-slate-500 hover:text-slate-800'
              }`}
            >
              <img
                src="/bell-icon.svg" // replace with your local image path
                alt="Notifications Icon"
                className="w-4 h-4"
              />
              <span>Notifications</span>
            </button>
          </div>
        </div>

        <div className="mx-auto bg-white border shadow-md rounded-r-xl rounded-b-xl border-slate-200">
          {/* Tabs header */}

          {/* Tab content */}
          <div className="px-4 pt-5 pb-6 sm:px-6 sm:pb-7 sm:pt-6">
            {activeTab === 'checklist' ? (
              <ChecklistTab
                items={checklistItems}
                onChecklistAction={(action, item) => {
                  // hook for actions like "Remind Later", "Upload Now", etc.
                  // you can integrate API calls here.
                  // console.log(action, item);
                }}
              />
            ) : (
              <NotificationsTab items={notificationItems} onItemsChange={setNotificationItems} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
