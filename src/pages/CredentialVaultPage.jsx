import MainLayout from '../layouts/MainLayout';
import CredentialVaultContainer from '../components/CredentialVault/CredentialVaultContainer';
import UploadDocumentModal from '../components/Modals/CredentialVault/UploadDocumentModal';
const CredentialVaultPage = () => {
  return (
    <div className="bg-white h-100">
      <MainLayout>
        <CredentialVaultContainer />
        <UploadDocumentModal />
      </MainLayout>
    </div>
  );
};

export default CredentialVaultPage;
