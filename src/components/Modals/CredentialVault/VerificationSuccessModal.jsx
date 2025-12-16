import { useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function VerificationSuccessModal({ onClose }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-secondary/80"></div>
      <div ref={modalRef} className="relative w-full max-w-xl p-8 text-center bg-white shadow-xl rounded-2xl">
        <div className="flex justify-center mb-4">
          <img src="/CredentialVault/checked.svg" alt="check Icon" />
        </div>
        <h2 className="mb-1 text-2xl font-semibold text-secondary">Verification Request Sent</h2>
        <p className="mb-4 text-sm leading-relaxed text-tertiary">
          Your document has been submitted for manual review. You'll be notified once it's verified.
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-[#093759] transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
