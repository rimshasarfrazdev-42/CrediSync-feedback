export default function TopBar({ toggleSidebar, openModal }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-tertiary/20 px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="xl:hidden" onClick={toggleSidebar}>
          <img src="/Dashboard/hamburger.svg" alt="Hamburger Menu" />
        </button>
        <h1 className="text-xl font-semibold text-secondary">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <img src="/Dashboard/bellIcon.svg" alt="Notification Icon" />
          <span className="absolute -top-1 -right-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center bg-white font-semibold text-primary">
            3
          </span>
        </div>
        <img src="/Dashboard/userIcon.svg" alt="User Icon" className="cursor-pointer" onClick={openModal} />
      </div>
    </header>
  );
}
