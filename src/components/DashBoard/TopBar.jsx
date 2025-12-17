import { useNavigate } from 'react-router-dom';
export default function TopBar({ toggleSidebar, isSidebarOpen, openModal }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/notification');
  };
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-tertiary/20 px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <div className="flex gap-4">
            <button
              className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-md transition-colors"
              onClick={toggleSidebar}
            >
              <img src="/Dashboard/hamburger.svg" alt="Open Menu" className="w-9 h-9" />
            </button>
            <img src="/Dashboard/logo.svg" alt="logo" className="w-44" />
          </div>
        )}
        {isSidebarOpen && <h1 className="text-xl font-semibold text-secondary">Dashboard</h1>}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer" onClick={handleClick}>
          <img src="/Dashboard/bellIcon.svg" alt="Notification Icon" className="w-9 h-9" />
          <span className="absolute -top-1 -right-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center bg-white font-semibold text-primary border border-primary/20">
            3
          </span>
        </div>
        <img
          src="/Dashboard/userIcon.svg"
          alt="User Icon"
          className="cursor-pointer hover:opacity-80 transition-opacity w-9 h-9"
          onClick={openModal}
        />
      </div>
    </header>
  );
}
