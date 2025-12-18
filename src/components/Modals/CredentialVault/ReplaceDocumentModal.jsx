import { useEffect, useRef } from "react";
import useClickOutside from '../../../hooks/useClickOutside';
export default function ReplaceDocumentModal({ doc, onClose }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);
  if (!doc) return null;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-secondary/80"></div>
      <div ref={modalRef} className="relative w-full max-w-xl bg-white border shadow-xl rounded-xl border-tertiary/20 ">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Replace Document</h2>
          <p className="text-sm text-tertiary">
            Upload a new version of {doc.type} to keep your credentials up to date.
          </p>
        </div>
        <div className="px-6 pb-4 space-y-3">
          <div>
            <p className="mb-1 text-lg font-medium">Upload File</p>
            <label className="flex flex-col items-center justify-center w-full transition border-2 border-dashed cursor-pointer border-tertiary/30 bg-[#92949F1A] rounded-xl h-36 hover:bg-tertiary/10">
              <img src="/CredentialVault/upload.svg" className="mb-2" />
              <p className="text-sm font-medium text-subtext">
                Drag and drop your file here
              </p>
              <p className="mt-1 text-xs text-tertiary">
                or click to browse
              </p>
              <p className="mt-1 text-xs text-tertiary">
                Supported: PDF, JPG, DOCX (Max 10MB)
              </p>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-lg text-secondary">Issue Date (Optional)</label>
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                className="w-full p-3 mt-1 text-sm border rounded-md outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="text-lg text-secondary">Expire Date (Optional)</label>
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                className="w-full p-3 mt-1 text-sm border rounded-md outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 p-3 text-sm border rounded-md bg-[#163B6D1A] border-primary/50 text-primary">
            <img src="/CredentialVault/InfoIcon.svg" className="align-middle" />
            <p>
              New uploads will undergo verification by the CrediSync team 
              before being marked as verified.
            </p>
          </div>
          <p className="text-base text-tertiary">
            All credential verification requests are logged for audit compliance 
            (HIPAA & SOC 2).
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3 px-4 pb-4 sm:flex-row">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-tertiary transition bg-gray-100 rounded-md hover:bg-gray-200 border border-secondary"
          >
            Cancel
          </button>
          <button className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-[#093059] transition">
            Upload & Replace File
          </button>
        </div>
      </div>
    </div>
  );
}