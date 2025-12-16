import React, { useState } from 'react';
import WelcomeBanner from '../DashBoard/WelcomeBanner';
const LegalAndConsentManagementContainer = ({ legalInfoContent, consentLogsContent }) => {
  const [activeTab, setActiveTab] = useState('active');
  const renderedContent = activeTab === 'active' ? legalInfoContent : consentLogsContent;
  return (
    <>
      {' '}
      <WelcomeBanner
        heading="Legal & Consent Management"
        subHeading="Review and accept all compliance and policy documents required for your credentialing process."
      />
      <div className="w-full mt-4">
        <div className="flex items-center gap-2 w-fit bg-tertiary/5 p-2 rounded-t-xl border border-tertiary/10 ">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg 
              ${activeTab === 'active' ? 'bg-white shadow-sm text-secondary' : ' text-subtext border-transparent'}`}
          >
            Legal Information
          </button>
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg
              ${activeTab === 'incoming' ? 'bg-white shadow-sm text-secondary' : ' text-subtext border-transparent'}`}
          >
            Consent Logs
          </button>
        </div>
        <div className="w-full border border-tertiary/20 bg-white rounded-b-xl p-2 shadow-sm hover:shadow-md relative ">
          {renderedContent}
        </div>
      </div>
    </>
  );
};
export default LegalAndConsentManagementContainer;
