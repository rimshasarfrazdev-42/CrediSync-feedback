import { Share2 } from 'lucide-react';

const WelcomeBanner = ({ heading, subHeading, buttonText, openModal, className }) => {
  return (
    <div
      className={`
        w-full rounded-xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row 
        items-start md:items-center justify-between gap-4 md:gap-0
        ${className || 'bg-dashboard'}  // default bg-dashboard if no className passed
      `}
    >
      <div>
        <h2 className="text-xl font-bold text-black md:text-2xl">{heading}</h2>
        <p className="mt-1 text-sm md:text-base text-tertiary">{subHeading}</p>
      </div>
      {buttonText && (
        <button
          onClick={openModal}
          className="
            flex items-center gap-2 
            bg-primary text-white px-4 py-2 
            rounded-lg shadow-sm hover:bg-[#0b2857] 
            transition-colors
            w-full md:w-auto
            justify-center
          "
        >
          <Share2 size={18} />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default WelcomeBanner;
