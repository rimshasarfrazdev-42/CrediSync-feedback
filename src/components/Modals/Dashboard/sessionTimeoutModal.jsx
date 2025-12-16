export default function SessionTimeoutModal({ seconds = 37 }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-secondary/80 "></div>
      <div className="relative bg-white rounded-xl shadow-xl w-[520px] p-6 z-50">
        <h2 className="text-lg font-semibold text-secondary">Session Timeout Warning</h2>
        <p className="text-sm text-tertiary mt-1">You’ve been inactive for 14 minutes.</p>
        <p className="text-sm text-tertiary">
          For your security, you’ll be logged out automatically in{' '}
          <span className="font-semibold">{seconds} seconds.</span>
        </p>
        <div className="flex justify-center my-6">
          <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
            <span className="text-4xl font-semibold text-primary">{seconds}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button className="w-1/2 bg-primary text-white py-3 rounded-md font-medium hover:bg-[#093557] transition">
            Stay Logged In
          </button>
          <button className="w-1/2 border border-subtext/40 py-3 rounded-md font-medium text-tertiary hover:bg-gray-50 transition">
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
}
