import { useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function RejectRequestModal({ closeModal }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80 "></div>
      <div ref={modalRef} className="relative bg-white rounded-xl shadow-xl w-[420px] p-6 z-50">
        <h2 className="text-lg font-semibold">Reject Access Request</h2>
        <label className="block mt-5 mb-2 text-sm font-medium text-secondary">Reason for Rejection (Optional)</label>
        <textarea
          rows="4"
          placeholder="Provide a reason for rejecting this request..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary"
        ></textarea>
        <div className="flex flex-col items-center justify-between gap-4 mt-4 md:flex-row">
          <button
            className="w-full py-2 font-medium transition border rounded-md border-subtext/40 text-tertiary hover:bg-gray-50 "
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="w-full py-2 font-medium text-white transition bg-red-500 rounded-md hover:bg-red-600">
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}
