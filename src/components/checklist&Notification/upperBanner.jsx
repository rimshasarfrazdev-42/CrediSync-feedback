export const UpperHeader = () => {
  return (
    <header className="w-full">
      <div className="flex flex-col bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC] w-full gap-3 p-5 bg-white border shadow-sm rounded-3xl border-zinc-200 sm:p-6 lg:p-8">
        {/* Heading */}
        <p className="text-2xl font-bold leading-snug text-secondary sm:text-3xl lg:text-[31px]">Checklist & Notifications</p>

        {/* Sub Text */}
        <p className="text-sm font-medium leading-relaxed text-subtext sm:text-base ">
         Share your credentials securely with institutions
        </p>
      </div>
    </header>
  );
};
