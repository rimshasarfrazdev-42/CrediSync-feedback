import { useState } from 'react';
export const CircularProgressCard = ({ category, percentage }) => {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${percentage}, ${circumference}`;
  const progressColor = "stroke-[#0A376B]";
  const trackColor = "stroke-[#E0E4E7]";
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      className="flex flex-col items-center shrink-0 min-w-[100px] p-2 relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute -top-10 z-20 bg-primary w-44 text-white text-xs px-2 py-1 rounded-md shadow-md  transition-opacity duration-200">
          Click to view related details in Checklist & Notifications.
          <div className="absolute mb-1 left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-8 border-t-primary"></div>
        </div>
      )}
      <div className="w-full max-w-[120px] relative cursor-pointer">
        <svg viewBox="0 0 36 36" className="w-full h-full transform">
          <path
            className={`fill-none ${trackColor}`}
            strokeWidth="2.5"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`fill-none ${progressColor} transition-all duration-700 ease-in-out`}
            strokeWidth="2.5"
            strokeDasharray={strokeDasharray}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-semibold text-primary">
          <span className="text-xl md:text-2xl">{percentage}%</span>
        </div>
      </div>
      <p className="mt-1 text-sm font-medium text-secondary">{category}</p>
    </div>
  );
};