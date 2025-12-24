import { useEffect, useState } from 'react';
import WelcomeBanner from '../DashBoard/WelcomeBanner';
import ShareCredentialsModal from '../Modals/CredentialSharing/shareCredentialsModal';
import NoDataComponent from './noDataComponent';
const CredentialSharingContainer = ({ activeSharesContent, incomingRequestsContent }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    useEffect(() => {
      document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    }, [isModalOpen]);
  const [activeTab, setActiveTab] = useState('active');
  const renderedContent = activeTab === 'active' ? activeSharesContent : incomingRequestsContent;
  return (
    <> <WelcomeBanner
        heading="Credential Sharing"
        subHeading="Share your credentials securely with institutions"
        buttonText="Share Access"
        openModal={openModal}
        icon="/CredentialSharing/Share.svg"
      />
      <div className="w-full h-full mt-6">
      <div className="flex items-center p-1 border md:gap-2 w-fit bg-tertiary/5 md:p-2 rounded-t-xl border-tertiary/10 ">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg 
            ${activeTab === 'active' ? 'bg-white shadow-sm text-secondary' : ' text-subtext border-transparent'}`}
        >
          <img src="/CredentialSharing/activeShares.svg" alt="Active Shares" />
          Active Shares
        </button>
        <button
          onClick={() => setActiveTab('incoming')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg
            ${activeTab === 'incoming' ? 'bg-white shadow-sm text-secondary' : ' text-subtext border-transparent'}`}
        >
          <img src="/CredentialSharing/incomingRequest.svg" alt=" Incoming Requests" />
          Incoming Requests
        </button>
      </div>
      <div className="relative w-full p-2 bg-white border shadow-sm border-tertiary/20 rounded-b-xl hover:shadow-md ">
        {renderedContent || <NoDataComponent/> }
        
      </div>
    </div>
     {isModalOpen && <ShareCredentialsModal closeModal={closeModal} />}
    </>
  );
};

export default CredentialSharingContainer;
