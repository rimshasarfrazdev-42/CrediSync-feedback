export const CredentialReadinessCard = ({ heading, subHeading, button, percentage = 85 }) => {
  const radius = 80;
  const arcLength = Math.PI * radius;
  const offset = arcLength - (percentage / 100) * arcLength;
  return (
    <div className="w-full h-full mt-4 rounded-xl border border-tertiary/10 shadow-sm p-6 flex flex-col items-center sm:items-start hover:shadow-md">
      <h2 className="text-xl font-semibold text-black">{heading}</h2>
      <p className="text-sm text-tertiary mb-2">{subHeading}</p>
      <div className="flex flex-col items-center w-full">
        <div className="relative mb-4 flex items-center justify-center">
          <svg viewBox="0 0 200 110" className="w-full max-w-xs">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path
              d="M20 100 A80 80 0 0 1 180 100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M20 100 A80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeDasharray={arcLength}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute top-[60%] -translate-y-1/2 flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-semibold">{percentage}%</span>
            <span className="mt-1 text-md text-tertiary font-medium">
              {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Poor'}
            </span>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-subtext">Automatically updated upon each credential change.</p>
          <p className="text-xs text-tertiary mt-1">
            Last updated: Oct 29, 2025 — 02:42 PM
          </p>
        </div>
        {button && button}
      </div>
    </div>
  );
};
