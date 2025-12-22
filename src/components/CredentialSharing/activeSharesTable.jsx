import { useState } from 'react';
import ExtendExpiryModal from '../Modals/CredentialSharing/extendExpiryModal';
import { activeSharesData } from "../../constants/activeSharesData";

const ActiveSharesTable = () => {
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

  const openExtendModal = () => setIsExtendModalOpen(true);
  const closeExtendModal = () => setIsExtendModalOpen(false);

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold text-secondary">Active Shares</h2>
      <p className="mt-2 mb-4 text-sm text-tertiary">
        Manage and track institutions that currently have access to your credentials.
      </p>
      <div className="overflow-hidden bg-white border border-tertiary/30 rounded-xl">
       <div className="hidden grid-cols-5 px-3 py-3 text-sm font-medium md:grid bg-[#92949F1A] text-secondary">
          <div>Institution</div>
          <div>Access Type</div>
          <div className='px-4 '>Status</div>
          <div>Expiry Date</div>
          <div className="text-right px-3">Actions</div>
        </div>
        {activeSharesData.map((row, index) => (
          <div key={index} className="p-4 border-t md:p-0 md:border-t-0">
            {/* Mobile view */}
            <div className="block p-3 mb-3 border border-gray-200 rounded-lg shadow-sm md:hidden">
              <div className="text-lg font-semibold text-secondary">{row.institution}</div>
              <div className="text-sm text-gray-600 mt-0.5">{row.accessType}</div>
              <div className="flex items-center justify-between mt-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {row.status}
                </span>
                <div className="text-sm text-gray-500">Expires: {row.expiry}</div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  className="w-1/2 px-4 py-2 text-sm font-medium transition border rounded-lg border-primary text-primary hover:bg-blue-50"
                  onClick={openExtendModal}
                >
                  Extend
                </button>
                <button className="w-1/2 px-4 py-2 text-sm font-medium text-red-500 transition border border-red-500 rounded-lg hover:bg-red-50">
                  Revoke
                </button>
              </div>
            </div>

            {/* Desktop view */}
            <div className="items-center hidden px-3 py-3 text-sm border-t md:grid md:grid-cols-5 text-tertiary border-tertiary/10">
              <div>{row.institution}</div>
              <div className="px-2">{row.accessType}</div>
              <div className="ml-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {row.status}
                </span>
              </div>
              <div>{row.expiry}</div>
              <div className="flex items-center justify-end gap-1">
                <button
                  className="px-4 py-1.5 text-xs font-medium border border-primary text-primary rounded-lg hover:bg-blue-50 transition"
                  onClick={openExtendModal}
                >
                  Extend
                </button>
                <button className="px-4 py-1.5 text-xs border font-medium border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition">
                  Revoke
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isExtendModalOpen && <ExtendExpiryModal closeModal={closeExtendModal} />}
    </div>
  );
};

export default ActiveSharesTable;
