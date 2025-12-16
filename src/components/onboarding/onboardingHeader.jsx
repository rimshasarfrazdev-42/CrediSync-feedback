export const Header = () => {
  return (
    <header className="w-full py-4 lg:py-8">
      <div className="flex flex-col w-full gap-3 p-5 bg-white border shadow-sm rounded-3xl border-zinc-200 sm:p-6 lg:p-8">
        {/* Heading */}
        <p className="text-sm font-bold leading-snug text-gray-900 ">Provider Onboarding</p>

        {/* Sub Text */}
        <p className="text-sm font-medium leading-relaxed text-gray-700 sm:text-base lg:text-lg">
          Complete the steps to finish your profile. Your data is stored securely and PHI-safe.
        </p>
      </div>
    </header>
  );
};
