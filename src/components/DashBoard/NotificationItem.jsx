 export const NotificationItem = ({ icon, title, subtitle }) => (
  <div className="flex items-start p-3 hover:bg-dashboard rounded-lg transition duration-150 border-b">
    <div className={` mr-4 mt-1 flex-shrink-0 `}>
      <img src={icon} alt="title" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-subtext leading-snug">{title}</h3>
      <p className="text-xs text-tertiary mt-0.5">{subtitle}</p>
    </div>
  </div>
);