const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="relative bg-white  p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <div className={`absolute top-2 right-2 p-2.5 rounded-lg`}>
        <img src={icon} alt="icon" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-secondary">{title}</h4>
        <p className="text-3xl font-semibold text-black mt-3">{value}</p>
        <p className="text-sm text-tertiary mt-1">{subtitle}</p>
      </div>
    </div>
  );
};
export default StatCard;
