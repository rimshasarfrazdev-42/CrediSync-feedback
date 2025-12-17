import { useState } from 'react';
import WelcomeBanner from '../DashBoard/WelcomeBanner';
import YourDocuments from './YourDocuments';
import UploadDocumentModal from '../../components/Modals/CredentialVault/UploadDocumentModal';
import DocumentViewModal from '../../components/Modals/CredentialVault/DocumentViewModal';
import ReplaceDocumentModal from '../../components/Modals/CredentialVault/ReplaceDocumentModal';
import RequestVerificationModal from '../../components/Modals/CredentialVault/RequestVerificationModal';
import VerificationSuccessModal from '../../components/Modals/CredentialVault/VerificationSuccessModal';
import DeleteDocumentModal from '../../components/Modals/CredentialVault/DeleteDocumentModal';
const CredentialVaultContainer = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [replaceDoc, setReplaceDoc] = useState(null);
  const [verificationDoc, setVerificationDoc] = useState(null);
  const [deleteDoc, setDeleteDoc] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  const closeViewModal = () => {
    setSelectedDoc(null);
    document.body.style.overflow = 'auto';
  };
  const closeReplaceModal = () => {
    setReplaceDoc(null);
    document.body.style.overflow = 'auto';
  };
  const closeVerificationModal = () => {
    setVerificationDoc(null);
    document.body.style.overflow = 'auto';
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    document.body.style.overflow = 'auto';
  };
  const closeDeleteModal = () => {
    setDeleteDoc(null);
    document.body.style.overflow = 'auto';
  };
  const openReplaceModal = (doc) => {
    setReplaceDoc(doc);
  };
  const openVerificationModal = (doc) => {
    setVerificationDoc(doc);
  };
  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const openDeleteModal = (doc) => {
    setDeleteDoc(doc);
  };
  return (
    <>
      <WelcomeBanner
        heading="Credential Vault"
        subHeading="Manage and track all your healthcare credentials"
        buttonText="Upload Document"
        openModal={() => setIsUploadModalOpen(true)}
        icon="/CredentialVault/upload1.svg"
      />

      <YourDocuments onViewDocument={(doc) => setSelectedDoc(doc)} />
      <UploadDocumentModal isOpen={isUploadModalOpen} onClose={closeUploadModal} />
      {selectedDoc && (
        <DocumentViewModal
          doc={selectedDoc}
          onClose={closeViewModal}
          onOpenReplace={openReplaceModal}
          onOpenVerification={openVerificationModal}
          onOpenDelete={openDeleteModal}
        />
      )}
      {replaceDoc && <ReplaceDocumentModal doc={replaceDoc} onClose={closeReplaceModal} />}
      {verificationDoc && (
        <RequestVerificationModal doc={verificationDoc} onClose={closeVerificationModal} onSuccess={openSuccessModal} />
      )}
      {showSuccessModal && <VerificationSuccessModal onClose={closeSuccessModal} />}
      {deleteDoc && <DeleteDocumentModal doc={deleteDoc} onClose={closeDeleteModal} />}
    </>
  );
};
export default CredentialVaultContainer;
