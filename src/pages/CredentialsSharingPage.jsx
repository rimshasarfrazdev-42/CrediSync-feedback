import MainLayout from '../layouts/MainLayout';
import ActiveSharesTable from '../components/CredentialSharing/activeSharesTable';
import IncomingRequestsContainer from '../components/CredentialSharing/incomingRequestsContainer';
import CredentialSharingContainer from '../components/CredentialSharing/CredentialSharingContainer';
export const CredentialsSharingPage = () => {
  return (
    <>
      <div className="bg-white h-100">
        <MainLayout>
          <CredentialSharingContainer
            activeSharesContent={<ActiveSharesTable />}
            incomingRequestsContent={<IncomingRequestsContainer />}
          />
        </MainLayout>
      </div>
    </>
  );
};
