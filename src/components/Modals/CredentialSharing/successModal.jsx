export default function SuccessModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-secondary/80 "></div>
      <div className="relative bg-white rounded-xl shadow-xl w-fit lg:w-[35%]  p-4 z-50 ">
        <div className="flex gap-2 mb-3">
          <img src="/CredentialSharing/checkCircle.svg" alt="Checked Circle" />
          <h2 className="text-lg font-semibold text-secondary">Success</h2>
        </div>
        <p className="text-xs text-tertiary ">
          Your credentials have been shared successfully. The institution will be notified.
        </p>
        <div className="flex items-center justify-between gap-4 mt-4">
          <button className="w-full bg-primary text-white py-2 rounded-md  hover:bg-[#093557] transition">
            View Active Shares
          </button>
        </div>
      </div>
    </div>
  );
}
