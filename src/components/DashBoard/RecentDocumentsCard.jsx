import { useState, useRef } from 'react';
import { recentDocuments, statusColors } from '../../constants/dashboardData/documents';
import useClickOutside from '../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';

export default function RecentDocumentsCard() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [actionOpenIndex, setActionOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const statusRef = useRef(null);
  const actionRefs = useRef({});
  const navigate = useNavigate();

  useClickOutside(statusRef, () => setStatusOpen(false));
  useClickOutside({ current: actionRefs.current[actionOpenIndex] }, () => setActionOpenIndex(null));

  const handleClick = () => {
    navigate('/credential-vault');
  };

  // 🔄 Reset Filter
  const handleResetFilter = () => {
    setSelectedStatus('Status');
    setShowAll(false);
    setStatusOpen(false);
  };

  const filteredDocuments =
    selectedStatus === 'Status'
      ? recentDocuments
      : recentDocuments.filter((doc) => doc.status === selectedStatus);

  const visibleDocuments = showAll ? filteredDocuments : filteredDocuments.slice(0, 3);

  return (
    <div className="relative w-full p-4 mt-6 border shadow-sm sm:p-6 rounded-xl hover:shadow-md border-tertiary/10">
      {/* Header */}
      <div className="relative flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">Recent Documents</h2>
          <p className="text-xs sm:text-sm text-tertiary">Your latest credential updates</p>
        </div>

        {/* Filter + Reset */}
        <div ref={statusRef} className="relative flex items-center gap-2 w-full sm:w-auto sm:max-w-xs">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center justify-between w-full gap-1 px-3 py-2 text-sm border rounded-md sm:justify-start sm:w-auto border-tertiary-30 hover:bg-dashboard"
          >
            {selectedStatus}
            <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
          </button>

          {/* 🔄 Reset Icon */}
          {selectedStatus !== 'Status' && (
            <button
              onClick={handleResetFilter}
              title="Reset filter"
              className="p-2 border rounded-md hover:bg-dashboard transition"
            >
                <RotateCcw className='w-5 h-5 ' />
            </button>
          )}

          {statusOpen && (
            <div className="absolute right-0 top-full z-20 w-full mt-1 bg-white border rounded-md shadow-lg sm:right-auto">
              {['Active', 'Pending', 'Expired'].map((option) => (
                <p
                  key={option}
                  onClick={() => {
                    setSelectedStatus(option);
                    setShowAll(false);
                    setStatusOpen(false);
                  }}
                  className="px-3 py-1 text-[13px] cursor-pointer hover:bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC]"
                >
                  {option}
                </p>
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
                <tr
                  key={index}
                  className="relative transition border-b hover:bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC]"
                >
                  <td className="flex items-center gap-2 px-3 py-5">
                    <img src="/Dashboard/document.svg" />
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
                  <td
                    className="relative py-3 text-right px-4"
                    ref={(el) => (actionRefs.current[index] = el)}
                  >
                    <button onClick={() => setActionOpenIndex(actionOpenIndex === index ? null : index)}>
                      <img src="/Dashboard/movesVertical.svg" />
                    </button>

                    {actionOpenIndex === index && (
                      <div className="absolute right-[40%] top-[-22%] w-24 bg-white shadow-lg rounded-lg border z-30 text-xs">
                        <p className="flex items-center gap-2 px-2 py-1 hover:bg-dashboard cursor-pointer">
                          <img src="/Dashboard/view.svg" /> View
                        </p>
                        <p className="flex items-center gap-2 px-2 py-1 hover:bg-dashboard cursor-pointer">
                          <img src="/Dashboard/download.svg" /> Download
                        </p>
                        <p className="flex items-center gap-2 px-2 py-1 hover:bg-dashboard cursor-pointer">
                          <img src="/Dashboard/share.svg" /> Share
                        </p>
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
      <div className="block sm:hidden space-y-3">
        {visibleDocuments.map((doc, index) => (
          <div
            key={index}
            ref={(el) => (actionRefs.current[index] = el)}
            className="relative p-3 border rounded-lg bg-white"
          >
            <div className="flex justify-between">
              <div className="flex gap-2">
                <img src="/Dashboard/document.svg" className="w-6 h-6" />
                <div>
                  <p className="text-sm font-medium">{doc.type}</p>
                  <p className="text-xs text-tertiary">Issuer: {doc.issuer}</p>
                </div>
              </div>
              <button onClick={() => setActionOpenIndex(actionOpenIndex === index ? null : index)}>
                <img src="/Dashboard/movesVertical.svg" className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <span className={`px-3 py-1 rounded-full ${statusColors[doc.status]}`}>{doc.status}</span>
              <span>Upload: {doc.upload}</span>
              <span>Expiry: {doc.expiry}</span>
            </div>

            {actionOpenIndex === index && (
              <div className="absolute right-2 top-10 w-28 bg-white border rounded-lg shadow-lg z-30 text-xs">
                <p className="px-2 py-1 hover:bg-dashboard">View</p>
                <p className="px-2 py-1 hover:bg-dashboard">Download</p>
                <p className="px-2 py-1 hover:bg-dashboard">Share</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredDocuments.length > 3 && (
        <div className="mt-4">
          <button
            onClick={handleClick}
            className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-[#093059]"
          >
            View All Documents
          </button>
        </div>
      )}
    </div>
  );
}
