import { useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
import { X } from 'lucide-react';

export default function DocumentViewModal({
  doc,
  onClose,
  onOpenReplace,
  onOpenVerification,
  onOpenDelete,
}) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-secondary/80" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-xl max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-4 pt-4 sm:px-6 sm:pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold sm:text-xl">{doc.type}</h2>
            <X className="cursor-pointer" onClick={onClose} />
          </div>
          <p className="mt-1 text-sm text-tertiary">
            Document details and metadata
          </p>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto sm:p-6">
          {/* Preview */}
          <div className="flex flex-col items-center justify-center h-40 border border-dotted border-tertiary/30 bg-tertiary/5 rounded-xl sm:h-60">
            <img
              src="/CredentialVault/document.svg"
              alt="document"
              className="w-10 opacity-60"
            />
            <p className="mt-1 text-sm font-medium text-tertiary">
              Document Preview
            </p>
            <p className="max-w-full text-xs truncate text-secondary">
              {doc.fileName || `${doc.type}.pdf`}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 sm:gap-6">
            <div>
              <p className="text-sm text-tertiary">Document Type</p>
              <p className="font-medium">{doc.type}</p>
            </div>

            <div>
              <p className="text-sm text-tertiary">Status</p>
              <span className="inline-block px-3 py-1 text-xs font-medium text-[#22C55E] bg-green-100 rounded-full">
                {doc.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-tertiary">Issuer</p>
              <p className="font-medium">{doc.issuer || '—'}</p>
            </div>

            <div>
              <p className="text-sm text-tertiary">Expiry Date</p>
              <p className="font-medium">{doc.expiry || '—'}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-2 px-4 pb-4 sm:flex-row sm:gap-3 sm:px-6 sm:pb-6">
          <button
            onClick={handleReplaceClick}
            className="w-full py-2.5 rounded-md border border-secondary text-tertiary hover:bg-gray-50 transition"
          >
            Replace File
          </button>

          <button
            onClick={handleVerificationClick}
            className="w-full py-2.5 rounded-md bg-primary text-white hover:bg-[#093059] transition"
          >
            Request Verification
          </button>

          <button
            onClick={handleDeleteClick}
            className="w-full py-2.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete Document
          </button>
        </div>
      </div>
    </div>
  );
}
