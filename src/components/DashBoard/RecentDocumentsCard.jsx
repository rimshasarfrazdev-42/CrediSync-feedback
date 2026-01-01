import { useState, useRef } from "react";
import { recentDocuments, statusColors } from "../../constants/dashboardData/documents";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Trash2Icon } from "lucide-react";
import DeleteDocumentModal from "../Modals/CredentialVault/DeleteDocumentModal";

export default function RecentDocumentsCard({ onViewDocument }) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [actionOpenIndex, setActionOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const statusRef = useRef(null);

  // one ref for action menu wrapper (works)
  const actionMenuRef = useRef(null);

  const navigate = useNavigate();

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useClickOutside(statusRef, () => setStatusOpen(false));
  useClickOutside(actionMenuRef, () => setActionOpenIndex(null));

  const handleClick = () => navigate("/credential-vault");

  const handleResetFilter = () => {
    setSelectedStatus("Status");
    setShowAll(false);
    setStatusOpen(false);
  };

  const filteredDocuments =
    selectedStatus === "Status"
      ? recentDocuments
      : recentDocuments.filter((doc) => doc.status === selectedStatus);

  const visibleDocuments = showAll ? filteredDocuments : filteredDocuments.slice(0, 3);

  const handleView = (doc) => {
    onViewDocument?.(doc);
    setActionOpenIndex(null);
  };

  const openDeleteModal = (doc) => {
    setSelectedDoc(doc);
    setIsDeleteOpen(true);
    setActionOpenIndex(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedDoc(null);
  };

  const handleConfirmDelete = () => {
    // ✅ put your delete API/state logic here
    console.log("Confirmed delete:", selectedDoc);
  };

  return (
    <>
      <div className="relative w-full p-4 mt-6 border shadow-sm sm:p-6 rounded-xl hover:shadow-md border-tertiary/10">
        {/* Header */}
        <div className="relative flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold sm:text-lg">Recent Documents</h2>
            <p className="text-xs sm:text-sm text-tertiary">Your latest credential updates</p>
          </div>

          {/* Filter + Reset */}
          <div ref={statusRef} className="relative flex items-center w-full gap-2 sm:w-auto sm:max-w-xs">
            <button
              type="button"
              onClick={() => setStatusOpen((v) => !v)}
              className="flex items-center justify-between w-full gap-1 px-3 py-2 text-sm border rounded-md sm:justify-start sm:w-auto border-tertiary-30 hover:bg-dashboard"
            >
              {selectedStatus}
              <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
            </button>

            {selectedStatus !== "Status" && (
              <button
                type="button"
                onClick={handleResetFilter}
                title="Reset filter"
                className="p-2 transition border rounded-md hover:bg-dashboard"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}

            {statusOpen && (
              <div className="absolute right-0 z-20 w-full mt-1 bg-white border rounded-md shadow-lg top-full sm:right-auto">
                {["Active", "Pending", "Expired"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(option);
                      setShowAll(false);
                      setStatusOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[13px] cursor-pointer hover:bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm min-w-[650px]">
              <thead>
                <tr className="text-left border-b text-secondary bg-[#92949F1A]">
                  <th className="py-3 px-3 min-w-[150px]">Document Type</th>
                  <th className="py-3 min-w-[150px]">Issuer</th>
                  <th className="py-3 min-w-[120px]">Status</th>
                  <th className="py-3 min-w-[120px]">Upload Date</th>
                  <th className="py-3 min-w-[120px]">Expiry Date</th>
                  <th className="py-3 px-3 min-w-[80px] text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-tertiary">
                {visibleDocuments.map((doc, index) => (
                  <tr key={index} className="border-b">
                    <td className="flex items-center gap-2 px-3 py-5">
                      <img src="/Dashboard/document.svg" alt="" />
                      {doc.type}
                    </td>
                    <td>{doc.issuer}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td>{doc.upload}</td>
                    <td>{doc.expiry}</td>

                    <td className="relative px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setActionOpenIndex(actionOpenIndex === index ? null : index)}
                      >
                        <img src="/Dashboard/movesVertical.svg" alt="" />
                      </button>

                      {actionOpenIndex === index && (
                        <div
                          ref={actionMenuRef}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="absolute right-[40%] top-[-22%] w-28 bg-white shadow-lg rounded-lg border z-30 text-xs"
                        >
                          <button
                            type="button"
                            onClick={() => handleView(doc)}
                            className="flex items-center w-full gap-2 px-2 py-2 hover:bg-dashboard"
                          >
                            <img src="/Dashboard/view.svg" alt="" /> View
                          </button>

                          <button
                            type="button"
                            className="flex items-center w-full gap-2 px-2 py-2 hover:bg-dashboard"
                          >
                            <img src="/Dashboard/download.svg" alt="" /> Download
                          </button>

                          <button
                            type="button"
                            className="flex items-center w-full gap-2 px-2 py-2 hover:bg-dashboard"
                          >
                            <img src="/Dashboard/share.svg" alt="" /> Share
                          </button>

                          <button
                            type="button"
                            onClick={() => openDeleteModal(doc)}
                            className="flex items-center w-full gap-2 px-2 py-2 text-red-500 hover:bg-dashboard"
                          >
                            <Trash2Icon className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {visibleDocuments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-tertiary">
                      No documents found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile */}
        <div className="block space-y-3 sm:hidden">
          {visibleDocuments.map((doc, index) => (
            <div key={index} className="relative p-3 bg-white border rounded-lg">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <img src="/Dashboard/document.svg" className="w-6 h-6" alt="" />
                  <div>
                    <p className="text-sm font-medium">{doc.type}</p>
                    <p className="text-xs text-tertiary">Issuer: {doc.issuer}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActionOpenIndex(actionOpenIndex === index ? null : index)}
                >
                  <img src="/Dashboard/movesVertical.svg" className="w-4 h-4" alt="" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className={`px-3 py-1 rounded-full ${statusColors[doc.status]}`}>{doc.status}</span>
                <span>Upload: {doc.upload}</span>
                <span>Expiry: {doc.expiry}</span>
              </div>

              {actionOpenIndex === index && (
                <div
                  ref={actionMenuRef}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute z-30 w-32 text-xs bg-white border rounded-lg shadow-lg right-2 top-10"
                >
                  <button
                    type="button"
                    onClick={() => handleView(doc)}
                    className="w-full px-2 py-2 text-left hover:bg-dashboard"
                  >
                    View
                  </button>
                  <button type="button" className="w-full px-2 py-2 text-left hover:bg-dashboard">
                    Download
                  </button>
                  <button type="button" className="w-full px-2 py-2 text-left hover:bg-dashboard">
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(doc)}
                    className="w-full px-2 py-2 text-left text-red-500 hover:bg-dashboard"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredDocuments.length > 3 && (
          <div className="mt-4">
            <button
              type="button"
              onClick={handleClick}
              className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-[#093059]"
            >
              View All Documents
            </button>
          </div>
        )}
      </div>

      {/* ✅ Delete modal once */}
      {isDeleteOpen && (
        <DeleteDocumentModal
          doc={selectedDoc}
          onClose={closeDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  );
}
