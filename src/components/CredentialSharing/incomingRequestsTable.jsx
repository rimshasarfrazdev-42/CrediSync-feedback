const IncomingRequestsTable = ({ requests = [], openModal }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold sm:text-xl text-secondary">
        Incoming Access Requests
      </h2>
      <p className="mt-1 mb-3 text-xs sm:text-sm text-tertiary">
        Approve or reject credential access requests from verified institutions.
      </p>

      <div className="overflow-hidden bg-white lg:border rounded-xl border-tertiary/30">
        {/* Desktop header */}
        <div className="hidden md:grid md:grid-cols-4 bg-[#92949F1A] px-6 py-3 text-sm font-medium text-secondary">
          <div>Name</div>
          <div>Access Type</div>
          <div>Purpose</div>
          <div className="text-right">Actions</div>
        </div>

        {requests.map((row, index) => (
          <div
            key={index}
            className="border-t border-tertiary/10 first:border-t-0"
          >
            {/* ✅ Mobile view (clean, no extra padding layers, no mb-3) */}
            <div className="py-3 md:hidden">
              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-base font-semibold truncate text-secondary">
                      {row.Name}
                    </div>
                    <div className="mt-0.5 text-xs text-tertiary">
                      {row.accessType}
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div className="mt-2 text-xs text-tertiary">
                  <span className="font-medium text-secondary">Purpose: </span>
                  {row.Purpose}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 text-sm font-medium transition border rounded-lg border-primary text-primary hover:bg-blue-50"
                    onClick={() => openModal("approve", row)}
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    className="flex-1 px-4 py-2 text-sm font-medium text-red-500 transition border border-red-500 rounded-lg hover:bg-red-50"
                    onClick={() => openModal("reject", row)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop row */}
            <div className="items-center hidden px-3 py-2 text-sm border-t md:grid md:grid-cols-4 border-tertiary/10 text-tertiary">
              <div className="px-3">{row.Name}</div>
              <div className="px-2">{row.accessType}</div>
              <div>{row.Purpose}</div>
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  className="rounded-lg border border-primary px-4 py-1.5 text-xs font-medium text-primary transition hover:bg-blue-50"
                  onClick={() => openModal("approve", row)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-red-500 px-4 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                  onClick={() => openModal("reject", row)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomingRequestsTable;
