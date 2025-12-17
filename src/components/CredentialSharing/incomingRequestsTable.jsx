
const IncomingRequestsTable = ({ requests = [], openModal }) => {
  
  return (
    <div className="w-full p-4 bg-white">
      <h2 className="text-xl font-semibold text-secondary">Incoming Access Requests</h2>
      <p className="mt-2 mb-4 text-sm text-tertiary">
        Approve or reject credential access requests from verified institutions.
      </p>
      <div className="overflow-hidden bg-white border border-tertiary/30 rounded-xl">
        <div className="hidden grid-cols-4 px-6 py-3 text-sm font-medium md:grid bg-[#92949F1A] text-secondary">
          <div>Name</div>
          <div>Access Type</div>
          <div>Purpose</div>
          <div className="text-right">Actions</div>
        </div>
        {requests.map((row, index) => (
          <div
            key={index}
            className="p-4 border-t md:p-0 md:border-t-0"
          >
            <div
              className="block p-3 mb-3 border border-gray-200 rounded-lg shadow-sm md:hidden text-tertiary"
            >
              <div className=" text-lg font-semibold text-secondary">{row.Name}</div>
              <div className="text-sm mt-0.5">{row.Purpose}</div>
              <div className="text-smmt-0.5">{row.accessType}</div>
              <div className="flex items-center gap-2 mt-4">
                <button className="w-1/2 px-4 py-2 text-sm font-medium transition border rounded-lg border-primary text-primary hover:bg-blue-50"  onClick={() => openModal("approve", row)}>
                  Approve
                </button>
                <button className="w-1/2 px-4 py-2 text-sm font-medium text-red-500 transition border border-red-500 rounded-lg hover:bg-red-50" onClick={() => openModal("reject", row)}>
                  Reject
                </button>
              </div>
            </div>
            <div
              className="hidden  md:grid md:grid-cols-4 px-3 py-1.5 border-t text-tertiary border-tertiary/10 text-sm items-center"
            >
              <div className="px-3">{row.Name}</div>
              <div className="px-2">{row.accessType}</div>
              <div>{row.Purpose}</div>
              <div className="flex items-center justify-end gap-1">
                <button className="px-4 py-1.5 text-xs font-medium border border-primary text-primary rounded-lg hover:bg-blue-50 transition"  onClick={() => openModal("approve", row)}>
                  Approve
                </button>
                <button className="px-4 py-1.5 text-xs border font-medium border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"     onClick={() => openModal("reject", row)}>
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
