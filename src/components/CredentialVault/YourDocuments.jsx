import { useState, useRef } from 'react';
import { statusColors, yourDocuments } from '../../constants/yourDocumentsData';
import useClickOutside from '../../hooks/useClickOutside';

export default function YourDocuments({ onViewDocument }) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [actionOpenIndex, setActionOpenIndex] = useState(null);

  const statusRef = useRef(null);
  const actionRefs = useRef({});

  const handleView = (doc) => {
    onViewDocument(doc);
    setActionOpenIndex(null);
  };

  useClickOutside(statusRef, () => setStatusOpen(false));
  useClickOutside({ current: actionRefs.current[actionOpenIndex] }, () =>
    setActionOpenIndex(null)
  );

  // Filter logic
  const filteredDocuments =
    selectedStatus === 'Status'
      ? yourDocuments
      : yourDocuments.filter((doc) => doc.status === selectedStatus);

  return (
    <div className="relative w-full p-4 mt-6 border shadow-sm sm:p-6 sm:mt-8 rounded-xl hover:shadow-md border-tertiary/10">
      <div className="relative flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">Recent Documents</h2>
          <p className="text-xs sm:text-sm text-tertiary">Your latest credential updates</p>
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full sm:w-auto sm:max-w-xs" ref={statusRef}>
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center justify-between w-full gap-1 px-3 py-2 text-sm border rounded-md sm:justify-start sm:w-auto border-tertiary-30 hover:bg-dashboard"
          >
            {selectedStatus}
            <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
          </button>
          {statusOpen && (
            <div className="absolute right-0 z-20 w-full mt-1 bg-white border rounded-md shadow-lg sm:right-auto sm:w-fit">
              {['Active', 'Completed', 'Expired'].map((option, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setSelectedStatus(option);
                    setStatusOpen(false);
                  }}
                  className="px-3 py-1 text-[13px] hover:bg-dashboard cursor-pointer"
                >
                  {option}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP / TABLET TABLE VIEW */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm min-w-[650px]">
            <thead>
              <tr className="text-left border-b text-secondary bg-tertiary/10">
                <th className="py-3 px-3 min-w-[150px]">Document Type</th>
                <th className="py-3 min-w-[150px]">Issuer</th>
                <th className="py-3 min-w-[120px]">Status</th>
                <th className="py-3 min-w-[120px]">Upload Date</th>
                <th className="py-3 min-w-[120px]">Expiry Date</th>
                <th className="py-3 min-w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody className="text-tertiary">
              {filteredDocuments.map((doc, index) => (
                <tr
                  key={index}
                  className="relative transition border-b hover:bg-dashboard"
                >
                  <td className="flex items-center gap-2 px-3 py-5">
                    <img src="/Dashboard/document.svg" alt="Document Icon" />
                    {doc.type}
                  </td>
                  <td className="py-3">{doc.issuer}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3">{doc.upload}</td>
                  <td className="py-3">{doc.expiry}</td>
                  <td
                    className="relative py-3"
                    ref={(el) => (actionRefs.current[index] = el)}
                  >
                    <button
                      className="p-1"
                      onClick={() =>
                        setActionOpenIndex(
                          actionOpenIndex === index ? null : index
                        )
                      }
                    >
                      <img
                        src="/Dashboard/movesVertical.svg"
                        alt="Three dots icon"
                      />
                    </button>
                    {actionOpenIndex === index && (
                      <div className="text-secondary absolute right-[90%] top-[-18%] w-24 bg-white shadow-lg rounded-lg border z-30 text-xs">
                        <p
                          onClick={() => handleView(doc)}
                          className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dashboard"
                        >
                          <img src="/Dashboard/view.svg" alt="View Icon" />
                          View
                        </p>
                        <p className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dashboard">
                          <img src="/Dashboard/download.svg" alt="Download Icon" />
                          Download
                        </p>
                        <p className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dashboard">
                          <img src="/Dashboard/share.svg" alt="Share Icon" />
                          Share
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {/* If no results */}
              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-tertiary">
                    No documents found for "{selectedStatus}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="block sm:hidden">
        {filteredDocuments.length === 0 && (
          <div className="py-4 text-sm text-center text-tertiary">
            No documents found for "{selectedStatus}"
          </div>
        )}

        <div className="space-y-3">
          {filteredDocuments.map((doc, index) => (
            <div
              key={index}
              className="relative p-3 border rounded-lg shadow-xs bg-white/80"
              ref={(el) => (actionRefs.current[index] = el)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src="/Dashboard/document.svg"
                    alt="Document Icon"
                    className="flex-shrink-0 w-6 h-6"
                  />
                  <div>
                    <p className="text-sm font-medium">{doc.type}</p>
                    <p className="text-xs text-tertiary">Issuer: {doc.issuer}</p>
                  </div>
                </div>

                <button
                  className="flex-shrink-0 p-1"
                  onClick={() =>
                    setActionOpenIndex(
                      actionOpenIndex === index ? null : index
                    )
                  }
                >
                  <img
                    src="/Dashboard/movesVertical.svg"
                    alt="Three dots icon"
                    className="w-4 h-4"
                  />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${statusColors[doc.status]}`}
                >
                  {doc.status}
                </span>
                <span className="text-tertiary">
                  Upload: <span className="font-medium">{doc.upload}</span>
                </span>
                <span className="text-tertiary">
                  Expiry: <span className="font-medium">{doc.expiry}</span>
                </span>
              </div>

              {actionOpenIndex === index && (
                <div className="absolute z-30 text-xs bg-white border rounded-lg shadow-lg right-2 top-10 w-28 text-secondary">
                  <p
                    onClick={() => handleView(doc)}
                    className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dashboard"
                  >
                    <img src="/Dashboard/view.svg" alt="View Icon" />
                    View
                  </p>
                  <p className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dashboard">
                    <img src="/Dashboard/download.svg" alt="Download Icon" />
                    Download
                  </p>
                  <p className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dashboard">
                    <img src="/Dashboard/share.svg" alt="Share Icon" />
                    Share
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-5">
        <button className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-[#093059] transition">
          View All Documents
        </button>
      </div>
    </div>
  );
}
