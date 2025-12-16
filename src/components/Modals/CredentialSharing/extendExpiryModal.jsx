import { useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function ExtendExpiryModal({ closeModal }) {
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
      <div ref={modalRef} className="relative bg-white rounded-xl shadow-xl w-[520px] p-6 z-50">
        <h2 className="mb-2 text-lg font-semibold text-secondary">Extend Expiry</h2>
        <label htmlFor="expiry"> New Expiry Date</label>
        <input
          className="w-full p-2 my-2 border rounded-md outline-none"
          type="date"
          name="expiry"
          id=""
          placeholder="MM/DD/YYYY"
        />
        <div className="flex flex-col items-center justify-between gap-4 mt-4 md:flex-row">
          <button
            className="w-full py-3 font-medium transition border rounded-md border-subtext/40 text-tertiary hover:bg-gray-50 "
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-[#093557] transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
