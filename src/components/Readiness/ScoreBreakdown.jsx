import {scoreData} from '../../constants/scoreData'
import { CircularProgressCard } from './CircularProgressCard';
const ScoreBreakdown = () => {
  return (
    <div className="w-full mt-6 bg-white rounded-xl shadow-sm hover:shadow-md  border border-tertiary/10 p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-secondary">Score Breakdown</h2>
      <p className="mb-6 text-sm text-tertiary">By category (Read Only)</p>
      <div className="flex  flex-wrap md:justify-between justify-center gap-4 md:gap-6 ">
        {scoreData.map((data, index) => (
          <CircularProgressCard 
            key={index} 
            category={data.category} 
            percentage={data.percentage} 
            isHigh={data.isHigh}
          />
        ))}
      </div>
      <p className="mt-6 text-xs text-tertiary">
        Read-only summary. Categories cannot be manually modified.
      </p>
    </div>
  );
};
export default ScoreBreakdown;