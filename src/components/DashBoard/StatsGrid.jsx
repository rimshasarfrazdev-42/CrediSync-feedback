import StatCard from "./StatCard";
import { stats } from "../../constants/dashboardData/stats";
const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
};
export default StatsGrid;
