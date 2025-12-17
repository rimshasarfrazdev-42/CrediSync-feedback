import { useState } from "react";

import IncomingRequestsTable from "./incomingRequestsTable";
import ApproveRequestModal from "../Modals/CredentialSharing/approveRequestModal";
import RejectRequestModal from "../Modals/CredentialSharing/rejectRequestModal";
import { incomingRequestsData } from "../../constants/incomingRequestsData";
const IncomingRequestsContainer = () => {
  const [modalType, setModalType] = useState(null); 
  const [selectedRequest, setSelectedRequest] = useState(null);
  const openModal = (type, request) => {
    setSelectedRequest(request);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRequest(null);
  };

  return (
    <>
      <IncomingRequestsTable
        requests={incomingRequestsData}
        openModal={openModal}
      />

      {modalType === "approve" && (
        <ApproveRequestModal closeModal={closeModal} request={selectedRequest} />
      )}
      {modalType === "reject" && (
        <RejectRequestModal closeModal={closeModal} request={selectedRequest} />
      )}
    </>
  );
};

export default IncomingRequestsContainer;
