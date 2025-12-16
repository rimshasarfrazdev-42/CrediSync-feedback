import React from 'react';
import { Clock3, CircleCheck  } from 'lucide-react';

function CardHeader({ heading, subText, status }) {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 py-2">
        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center w-full">
          <p className="text-xl sm:text-[25px] font-semibold text-secondary leading-tight break-words mb-2">{heading}</p>

          <p className="text-sm sm:text-[16px] font-normal text-cardSubText leading-tight break-words">{subText}</p>
        </div>

        {/* STATUS BADGE */}
        <div className={`px-4 border  rounded-full text-tertiary py-1 flex items-center gap-2 self-start sm:self-center ${status === 'Uploaded' ? 'border-green-500 text-green-600' : 'border-tertiary border-opacity-40'}`}>
          {status !== 'Uploaded' ? <Clock3 className="h-4 w-4" /> : <CircleCheck className={` ${status === 'Uploaded' && 'text-green-600'} h-4 w-4`} />}
          <p className={`text-[14px] ${status === 'Uploaded' ? 'text-green-600' : 'text-tertiary'}`}>{status || 'Required'}</p>
        </div>
      </div>
    </>
  );
}

export default CardHeader;
