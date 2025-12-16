import { useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function ShareCredentialsModal({ closeModal }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);
  const [accessExpiryOpen, setAccessExpiryOpen] = useState(false);
  const [accessTypeOpen, setAccessTypeOpen] = useState(null);
  const [selectedAccessType, setSelectedAccessType] = useState('View Only');
  const [selectedAccessExpiry, setSelectedAccessExpiry] = useState('7 Days');
  const accessTypeRef = useRef(null);
  const accessExpiryRef = useRef(null);
  const handleSelectOption = (value, setState, closeMenu) => {
    setState(value);
    closeMenu(false);
  };
  useClickOutside(accessTypeRef, () => setAccessTypeOpen(false));
  useClickOutside(accessExpiryRef, () => setAccessExpiryOpen(false));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ">
      <div className="absolute inset-0 bg-secondary/80 "></div>
      <div
        ref={modalRef}
        className="relative bg-white  rounded-xl shadow-xl max-w-[720px] max-h-[90vh] overflow-y-auto p-4 z-50 "
      >
        <h2 className="text-lg font-semibold sm:text-xl text-secondary">Share Credentials</h2>
        <p className="text-xs sm:text-sm text-tertiary ">
          Securely share your verified documents with hospitals or agencies.
        </p>
        <div className="mt-3 space-y-3 sm:mt-6">
          <div className="grid grid-cols-1 gap-3 p-3 border border-gray-200 rounded-lg sm:grid-cols-2 sm:gap-4 sm:p-4">
            <div>
              <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">
                Search Institution Name
              </label>
              <input
                type="text"
                placeholder="Search Institution Name..."
                className="w-full border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary "
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium sm:text-base text-secondary">Search State</label>
              <input
                type="text"
                placeholder="Search Institution State..."
                className="w-full border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary "
              />
            </div>
            <div className="col-span-1 py-2 text-sm font-medium text-center text-gray-600 sm:col-span-2"> or</div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-[16px] font-medium text-secondary mb-1">Invite Institution by Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full border rounded-lg px-3 py-1.5 focus:outline-none  focus:ring-1 focus:ring-primary "
              />
            </div>
          </div>
          <div className="relative " ref={accessTypeRef}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label className="mb-1 text-sm font-medium sm:text-base text-secondary">Access Type</label>
                <button
                  onClick={() => setAccessTypeOpen(!accessTypeOpen)}
                  className="border  border-tertiary-30 rounded-md focus:border-primary px-3 py-2 text-sm flex items-center justify-between gap-1 text-[16px] font-medium text-secondary mb-1 w-full"
                >
                  {selectedAccessType}
                  <img className="" src="/Dashboard/downArrows.svg" alt="Down arrow" />
                </button>
                {accessTypeOpen && (
                  <div className="absolute z-20 w-full bg-white border rounded-md shadow-lg ">
                    {['View Only', 'View Only + Download'].map((option, i) => (
                      <p
                        key={i}
                        onClick={() => handleSelectOption(option, setSelectedAccessType, setAccessTypeOpen)}
                        className="px-3  text-[13px] hover:bg-dashboard cursor-pointer w-full  rounded-md py-1.5 bg-white focus:outline-none focus:ring-1 "
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative" ref={accessExpiryRef}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label className="mb-1 text-sm font-medium sm:text-base text-secondary">Access Expiry</label>
                <button
                  onClick={() => setAccessExpiryOpen(!accessExpiryOpen)}
                  className="border  border-tertiary-30 rounded-md focus:border-primary px-3 py-2 text-sm flex items-center justify-between gap-1 text-[16px] font-medium text-secondary mb-1 w-full"
                >
                  {selectedAccessExpiry}
                  <img className="" src="/Dashboard/downArrows.svg" alt="Down arrow" />
                </button>
                {accessExpiryOpen && (
                  <div className="absolute  w-[49%] bg-white shadow-lg rounded-md border z-20 ">
                    {['7 Days', '30 Days', 'Never', 'Custom'].map((option, i) => (
                      <p
                        key={i}
                        onClick={() => handleSelectOption(option, setSelectedAccessExpiry, setAccessExpiryOpen)}
                        className="px-3  text-[13px] hover:bg-dashboard cursor-pointer w-full  rounded-md py-1.5 bg-white focus:outline-none focus:ring-1 "
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[16px] font-medium text-secondary mb-1">Custom Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary "
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs sm:text-sm text-secondary">
            <input
              type="checkbox"
              className="
      h-4 w-4 mt-0.5 flex-shrink-0
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
              className="w-full py-2 font-medium transition border rounded-md border-subtext/40 text-tertiary hover:bg-tertiary/5 "
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-[#093557] transition">
              Generate Link & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
