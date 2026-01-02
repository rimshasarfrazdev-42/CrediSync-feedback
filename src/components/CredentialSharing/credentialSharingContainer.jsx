import { useEffect, useState } from "react";
import WelcomeBanner from "../DashBoard/WelcomeBanner";
import ShareCredentialsModal from "../Modals/CredentialSharing/shareCredentialsModal";
import NoDataComponent from "./noDataComponent";

const CredentialSharingContainer = ({ activeSharesContent, incomingRequestsContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const [activeTab, setActiveTab] = useState("active");
  const renderedContent = activeTab === "active" ? activeSharesContent : incomingRequestsContent;

  return (
    <>
      <WelcomeBanner
        heading="Credential Sharing"
        subHeading="Share your credentials securely with institutions"
        buttonText="Share Access"
        openModal={openModal}
        icon="/CredentialSharing/Share.svg"
      />

      <div className="w-full mt-6">
        {/* ✅ Tabs: one line + scroll on mobile */}
        <div className="max-w-full overflow-x-auto">
          <div className="inline-flex items-center gap-2 p-1 border rounded-t-xl border-tertiary/10 bg-tertiary/5 md:p-2">
            <button
              onClick={() => setActiveTab("active")}
              className={[
                "flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-semibold",
                "whitespace-nowrap",
                activeTab === "active"
                  ? "bg-white shadow-sm text-secondary"
                  : "text-subtext",
              ].join(" ")}
            >
              <img src="/CredentialSharing/activeShares.svg" alt="Active Shares" />
              Active Shares
            </button>

            <button
              onClick={() => setActiveTab("incoming")}
              className={[
                "flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-semibold",
                "whitespace-nowrap",
                activeTab === "incoming"
                  ? "bg-white shadow-sm text-secondary"
                  : "text-subtext",
              ].join(" ")}
            >
              <img src="/CredentialSharing/incomingRequest.svg" alt="Incoming Requests" />
              Incoming Requests
            </button>
          </div>
        </div>

        {/* ✅ Content wrapper: remove extra p-2 padding */}
        <div className="relative w-full p-3 bg-white border shadow-sm rounded-b-xl border-tertiary/20 hover:shadow-md sm:p-4">
          {renderedContent || <NoDataComponent />}
        </div>
      </div>

      {isModalOpen && <ShareCredentialsModal closeModal={closeModal} />}
    </>
  );
};

export default CredentialSharingContainer;
