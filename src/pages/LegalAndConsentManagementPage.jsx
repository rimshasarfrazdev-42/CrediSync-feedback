import React from 'react';
import LegalAndConsentInfo from '../components/LegalAndConsentManagement/LegalAndConsentInfo';
import LegalAndConsentManagementContainer from '../components/LegalAndConsentManagement/LegalAndConsentManagementContainer';
import MainLayout from '../layouts/MainLayout';
import ConsentLogs from '../components/LegalAndConsentManagement/ConsentLogs';
import NoDataComponent from '../components/CredentialSharing/NoDataComponent';
const LegalAndConsentManagementPage = () => {
  return (
    <div className="h-100 bg-white">
      <MainLayout>
        <LegalAndConsentManagementContainer
          legalInfoContent={<LegalAndConsentInfo />}
          consentLogsContent={<ConsentLogs /> || <NoDataComponent/>}
        />
      </MainLayout>
    </div>
  );
};

export default LegalAndConsentManagementPage;
