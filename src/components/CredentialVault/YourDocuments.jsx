import { useState, useRef } from 'react';
import { statusColors, yourDocuments } from '../../constants/yourDocumentsData';
import useClickOutside from '../../hooks/useClickOutside';
import { RotateCcw } from 'lucide-react';
export default function YourDocuments({ onViewDocument }) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [actionOpenIndex, setActionOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const actionMenuRef = useRef(null);
  const statusRef = useRef(null);
  const actionRefs = useRef({});
  const handleView = (doc) => {
    onViewDocument(doc);
    setActionOpenIndex(null);
  };
  const handleResetFilter = () => {
    setSelectedStatus('Status');
    setStatusOpen(false);
  };

  useClickOutside(statusRef, () => setStatusOpen(false));
  useClickOutside(actionMenuRef, () => setActionOpenIndex(null));
  const filteredDocuments =
    selectedStatus === 'Status' ? yourDocuments : yourDocuments.filter((doc) => doc.status === selectedStatus);
  const displayedDocuments = showAll ? filteredDocuments : filteredDocuments.slice(0, 3);
  return (
    <div className="relative w-full p-4  border shadow-sm sm:p-6 mt-6 rounded-xl hover:shadow-md border-tertiary/10">
      <div className="relative flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">Your Documents</h2>
          <p className="text-xs sm:text-sm text-tertiary">All credentials and certifications</p>
        </div>
        <div ref={statusRef} className="relative flex items-center gap-2 w-full sm:w-auto sm:max-w-xs">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center justify-between w-full gap-1 px-3 py-2 text-sm border rounded-md border-tertiary-30 hover:bg-dashboard"
          >
            {selectedStatus}
            <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
          </button>

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
            <div className="absolute right-0 top-full z-20 w-full mt-1 bg-white border rounded-md shadow-lg sm:w-fit">
              {['Active', 'Completed', 'Expired'].map((option) => (
                <p
                  key={option}
                  onClick={() => {
                    setSelectedStatus(option);
                    setStatusOpen(false);
                  }}
                  className="px-3 py-1 text-[13px] cursor-pointer
          sm:hover:bg-gradient-to-r sm:hover:from-[#F4F9FF] sm:hover:to-[#F8FAFC]
          active:bg-gradient-to-r active:from-[#F4F9FF] active:to-[#F8FAFC]"
                >
                  {option}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm min-w-[650px]">
            <thead>
              <tr className="text-left border-b text-secondary bg-[#92949F1A]">
                <th className="py-3 px-3 whitespace-nowrap min-w-[180px]">Document Type</th>
                <th className="py-3 whitespace-nowrap min-w-[160px]">Issuer</th>
                <th className="py-3 whitespace-nowrap min-w-[120px]">Status</th>
                <th className="py-3 whitespace-nowrap min-w-[110px]">Upload Date</th>
                <th className="py-3 whitespace-nowrap min-w-[110px]">Expiry Date</th>
                <th className="py-3 whitespace-nowrap min-w-[90px]">Actions</th>
              </tr>
            </thead>
            <tbody className="text-tertiary">
              {displayedDocuments.map((doc, index) => (
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
                  <td ref={(el) => (actionRefs.current[index] = el)} className="relative">
                    <button
                      className="p-1"
                      onClick={() => setActionOpenIndex(actionOpenIndex === index ? null : index)}
                    >
                      <img src="/Dashboard/movesVertical.svg" alt="" />
                    </button>
                    {actionOpenIndex === index && (
                      <div
                        ref={actionMenuRef}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="absolute right-[90%] top-[-18%] z-30 w-24 bg-white border rounded-lg shadow-lg text-xs"
                      >
                        <p
                          onClick={() => handleView(doc)}
                          className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[#F4F9FF]"
                        >
                          <img src="/Dashboard/view.svg" />
                          View
                        </p>
                        <p className="flex items-center gap-2 px-2 py-1 cursor-pointer sm:hover:bg-gradient-to-r sm:hover:from-[#F4F9FF] sm:hover:to-[#F8FAFC]">
                          <img src="/Dashboard/download.svg" alt="" />
                          Download
                        </p>
                        <p className="flex items-center gap-2 px-2 py-1 cursor-pointer sm:hover:bg-gradient-to-r sm:hover:from-[#F4F9FF] sm:hover:to-[#F8FAFC]">
                          <img src="/Dashboard/share.svg" alt="" />
                          Share
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="space-y-3">
          {displayedDocuments.map((doc, index) => (
            <div
              key={index}
              ref={(el) => (actionRefs.current[index] = el)}
              className="relative p-3 border rounded-lg shadow-xs bg-white/80"
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
                  <img src="/Dashboard/movesVertical.svg" />
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-3 text-xs">
                <span className={`px-3 py-1  w-fit rounded-full ${statusColors[doc.status]}`}>{doc.status}</span>
                <span className=" text-tertiary">Upload: {doc.upload}</span>
                <span className="text-tertiary">Expiry: {doc.expiry}</span>
              </div>
              {actionOpenIndex === index && (
                <div
                  ref={actionMenuRef}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute right-2 top-10 z-30 w-28 bg-white border rounded-lg shadow-lg text-xs"
                >
                  <p
                    onClick={() => handleView(doc)}
                    className="flex items-center gap-2 px-2 py-1 cursor-pointer active:bg-[#F4F9FF]"
                  >
                    <img src="/Dashboard/view.svg" />
                    View
                  </p>
                  <p className="flex items-center gap-2 px-2 py-1 cursor-pointer active:bg-[#F4F9FF]">
                    <img src="/Dashboard/download.svg" />
                    Download
                  </p>
                  <p className="flex items-center gap-2 px-2 py-1 cursor-pointer active:bg-[#F4F9FF]">
                    <img src="/Dashboard/share.svg" />
                    Share
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 sm:mt-5">
        <button
          className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'View Less' : 'View All Documents'}
        </button>
      </div>
    </div>
  );
}
