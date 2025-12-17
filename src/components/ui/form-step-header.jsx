import React from 'react';
import { Progress } from '../../components/ui/progress';

function FormStepHeader({ info, step, progress }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-[60%]">
        {/* Heading */}
        <p className="text-xl font-semibold leading-snug sm:text-2xl lg:text-3xl text-secondary">Step {step} of 6</p>

        {/* Sub Text */}
        <p className="text-sm sm:text-base lg:text-[22px] text-subtext font-medium leading-relaxed">{info}</p>
      </div>
      <div className="w-[30%]">
        <Progress value={progress} />
        <p className="text-sm sm:text-base lg:text-[22px] text-end mt-1 font-medium text-secondary">{progress}%</p>
      </div>
    </div>
  );
}

export default FormStepHeader;
