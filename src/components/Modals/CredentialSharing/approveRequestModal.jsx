import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function ApproveRequestModal({ closeModal }) {
  const [accessExpiryOpen, setAccessExpiryOpen] = useState(false);
  const [selectedAccessExpiry, setSelectedAccessExpiry] = useState('7 Days');
  const accessExpiryRef = useRef(null);
  useClickOutside(accessExpiryRef, () => setAccessExpiryOpen(false));
  const handleSelectOption = (value, setState, closeMenu) => {
    setState(value);
    closeMenu(false);
  };
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
        <h2 className="mb-3 text-lg font-semibold text-secondary">Approve Access Request</h2>
        <div className="p-4 mb-3 text-sm text-gray-700 rounded-lg bg-[#92949F1A]">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-subtext">Institution:</span>
            <span className=" text-secondary">Stanford Health Care</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-subtext">Requested Access:</span>
            <span className=" text-secondary">View + Download</span>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4" ref={accessExpiryRef}>
          <div>
            <label className="text-[16px] font-medium text-secondary mb-1">Access Expiry</label>
            <button
              onClick={() => setAccessExpiryOpen(!accessExpiryOpen)}
              className="border  border-tertiary-30 rounded-md focus:border-primary px-3 py-2 text-sm flex items-center justify-between gap-1 text-[16px] font-medium text-secondary mb-1 w-full"
            >
              {selectedAccessExpiry}
              <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
            </button>
            {accessExpiryOpen && (
              <div className="absolute bg-white shadow-lg rounded-md border z-20 w-[90%]  ">
                {['7 Days', '30 Days', 'Never', 'Custom'].map((option, i) => (
                  <p
                    key={i}
                    onClick={() => handleSelectOption(option, setSelectedAccessExpiry, setAccessExpiryOpen)}
                    className="px-3  text-[13px] hover:bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC] cursor-pointer w-full  rounded-md py-1.5 bg-white focus:outline-none  "
                  >
                    {option}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <label className="flex items-start gap-2 mt-2 text-sm text-secondary sm:text-base">
          <input
            type="checkbox"
            className="
            mt-[4px]
            h-4 w-4 
            shrink-0
            appearance-none 
            border border-tertiary rounded-sm 
          checked:border-primary
          checked:bg-white 
            checked:before:content-['✔'] 
            before:flex before:items-center before:justify-center
          before:text-primary before:text-xs
           "
          />
          I consent to share my credentials with the selected institution under the CrediSync Privacy Policy.
        </label>
        <div className="flex flex-col items-center justify-between gap-4 mt-4 md:flex-row">
          <button
            className="w-full py-2 font-medium transition border rounded-md border-subtext/40 text-tertiary hover:bg-gray-50 "
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-[#093557] transition">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
