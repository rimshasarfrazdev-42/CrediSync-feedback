import { useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function DocumentViewModal({ doc, onClose, onOpenReplace, onOpenVerification, onOpenDelete }) {
  if (!doc) return null;
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const handleReplaceClick = () => {
    onClose();
    onOpenReplace(doc);
  };
  const handleVerificationClick = () => {
    onClose();
    onOpenVerification(doc);
  };
  const handleDeleteClick = () => {
    onClose();
    onOpenDelete(doc);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-secondary/80"></div>
      <div ref={modalRef} className="relative w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-xl">
        <div className="px-6 pt-6">
          <h2 className="text-xl font-semibold">{doc.type}</h2>
          <p className="text-sm text-tertiary">Document details and metadata</p>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center border border-dotted border-tertiary/30 bg-tertiary/5 rounded-xl h-60">
            <img src="/Dashboard/document.svg" className="w-10 opacity-60" />
            <p className="mt-1 text-sm font-medium text-tertiary">Document Preview</p>
            <p className="text-xs text-secondary">{doc.fileName || `${doc.type}.pdf`}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-tertiary">Document Type</p>
              <p className="font-medium">{doc.type}</p>
            </div>
            <div>
              <p className="text-sm text-tertiary">Status</p>
              <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                {doc.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-tertiary">Issuer</p>
              <p className="font-medium">{doc.issuer}</p>
            </div>
            <div>
              <p className="text-sm text-tertiary">Expiry Date</p>
              <p className="font-medium">{doc.expiry}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2 px-6 pb-6 sm:flex-nowrap">
          <button
            className="py-2.5 w-full rounded-md border border-secondary text-tertiary hover:bg-gray-50 transition"
            onClick={handleReplaceClick}
          >
            Replace File
          </button>
          <button
            className="py-2.5 w-full rounded-md bg-primary text-white hover:bg-[#093059] transition"
            onClick={handleVerificationClick}
          >
            Request Verification
          </button>
          <button
            className="py-2.5 w-full rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            onClick={handleDeleteClick}
          >
            Delete Document
          </button>
        </div>
      </div>
    </div>
  );
}
