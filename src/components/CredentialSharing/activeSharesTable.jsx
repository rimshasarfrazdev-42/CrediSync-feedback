import { useState } from "react";
import ExtendExpiryModal from "../Modals/CredentialSharing/extendExpiryModal";
import { activeSharesData } from "../../constants/activeSharesData";

const ActiveSharesTable = () => {
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

  const openExtendModal = () => setIsExtendModalOpen(true);
  const closeExtendModal = () => setIsExtendModalOpen(false);

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold sm:text-xl text-secondary">Active Shares</h2>
      <p className="mt-1 mb-3 text-xs sm:text-sm text-tertiary">
        Manage and track institutions that currently have access to your credentials.
      </p>

      <div className="overflow-hidden bg-white lg:border rounded-xl border-tertiary/30">
        {/* Desktop header */}
        <div className="hidden md:grid md:grid-cols-5 bg-[#92949F1A] px-3 py-3 text-sm font-medium text-secondary">
          <div>Institution</div>
          <div>Access Type</div>
          <div className="px-4">Status</div>
          <div>Expiry Date</div>
          <div className="px-3 text-right">Actions</div>
        </div>

        {activeSharesData.map((row, index) => (
          <div
            key={index}
            className="border-t border-tertiary/10 first:border-t-0"
          >
          
            <div className="py-3 md:hidden">
              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-base font-semibold truncate text-secondary">
                      {row.institution}
                    </div>
                    <div className="mt-0.5 text-xs text-tertiary">
                      {row.accessType}
                    </div>
                  </div>

                  {/* ✅ Status + Expiry stacked (expiry under status) */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={[
                        "px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap",
                        row.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600",
                      ].join(" ")}
                    >
                      {row.status}
                    </span>

                    <div className="text-xs text-tertiary whitespace-nowrap">
                      Expiry: {row.expiry}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    className="flex-1 px-4 py-2 text-sm font-medium transition border rounded-lg border-primary text-primary hover:bg-blue-50"
                    onClick={openExtendModal}
                  >
                    Extend
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-red-500 transition border border-red-500 rounded-lg hover:bg-red-50">
                    Revoke
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop view */}
            <div className="items-center hidden py-3 text-sm md:grid md:grid-cols-5 text-tertiary">
              <div className="px-3">{row.institution}</div>
              <div className="px-2">{row.accessType}</div>
              <div className="px-4">
                <span
                  className={[
                    "px-3 py-1 text-xs font-medium rounded-full",
                    row.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600",
                  ].join(" ")}
                >
                  {row.status}
                </span>
              </div>
              <div>{row.expiry}</div>
              <div className="flex items-center justify-end gap-1 px-3">
                <button
                  className="rounded-lg border border-primary px-4 py-1.5 text-xs font-medium text-primary transition hover:bg-blue-50"
                  onClick={openExtendModal}
                >
                  Extend
                </button>
                <button className="rounded-lg border border-red-500 px-4 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50">
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
