import React from 'react';
import { Clock3, CircleCheck } from 'lucide-react';

function CardHeader({ heading, subText, status }) {
  const showIcon = status !== 'Required';
  const isUploaded = status === 'Uploaded';
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 py-2">
        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center w-full">
          <p className="text-xl sm:text-[25px] font-semibold text-secondary leading-tight break-words mb-2">{heading}</p>

          <p className="text-sm sm:text-[16px] font-normal text-subtext leading-tight break-words">{subText}</p>
        </div>

        {/* STATUS BADGE */}
        <div
          className={`px-3 border rounded-full py-1.5 flex items-center gap-2 self-start sm:self-center transition-colors duration-200 
          ${isUploaded
              ? 'border-active text-active bg-transparent'
              : 'border-tertiary border-opacity-40 text-tertiary'
            }`}
        >
          {showIcon && (
            isUploaded ? <CircleCheck className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />
          )}

          <p className="text-[14px] font-medium">
            {status || 'Required'}
          </p>
        </div>
      </div>
    </>
  );
}

export default CardHeader;
