import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function RequestVerificationModal({ doc, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [reason, setReason] = useState('');
  const [notifyMe, setNotifyMe] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useClickOutside(modalRef, onClose);
  if (!doc) return null;
  const documentTypes = [
    'Medical License',
    'Board Certification',
    'DEA Registration',
    'State License',
    'NPI Certificate',
    'Malpractice Insurance',
  ];
  const handleSubmit = () => {
    console.log({
      document: doc,
      docType: selectedDocType,
      reason,
      notifyMe,
    });
    onClose();
    onSuccess();
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80"></div>
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl overflow-hidden bg-white border shadow-xl  rounded-xl border-tertiary/20"
      >
        <div className="px-6 pt-6 ">
          <h2 className="text-xl font-semibold text-secondary">Request Document Verification</h2>
          <p className="mt-1 text-base text-tertiary">
            Submit this document for manual verification by the CrediSync credentialing team.
          </p>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block mb-2 text-lg font-semibold text-secondary">Document Type</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm text-left bg-white border rounded-lg border-tertiaryy/30 text-subtext hover:bg-tertiary/10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <span className={selectedDocType ? 'text-secondary' : 'text-tertiary'}>
                  {selectedDocType || 'Select document type'}
                </span>
                <svg
                  className={`w-5 h-5 text-tertiary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border rounded-lg shadow-lg border-tertiary/20 max-h-60">
                  {documentTypes.map((type, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDocType(type);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-subtext hover:bg-tertiary/10 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold text-secondary">Reason for Verification Request</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Uploaded updated license, please verify."
              rows={5}
              className="w-full px-4 py-3 text-lg border rounded-lg resize-none border-tertiary/30 text-subtext placeholder-tertiary/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="notify"
              checked={notifyMe}
              onChange={(e) => setNotifyMe(e.target.checked)}
              className="w-4 h-4 mt-1 rounded cursor-pointer text-primary border-tertiary/30"
            />
            <label htmlFor="notify" className="text-base cursor-pointer select-none text-secondary">
              Notify me when verification is complete
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-3 px-6 pb-6 sm:flex-row">
          <button
            onClick={onClose}
            className="px-6 py-2.5 w-full rounded-md border border-gray-300 bg-white text-subtext font-medium hover:bg-tertiary/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 w-full rounded-md bg-primary text-white font-medium hover:bg-[#093759] transition-colors"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
