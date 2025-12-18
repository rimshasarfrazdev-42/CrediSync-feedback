import { useNavigate } from "react-router-dom";

export default function TopBar({ toggleSidebar, isSidebarOpen, openModal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notification");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-tertiary/20">
      <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5">
        {/* Left */}
        <div className="flex items-center min-w-0 gap-2 sm:gap-4">
          {!isSidebarOpen ? (
            <div className="flex items-center min-w-0 gap-2 sm:gap-4">
              <button
                className="flex items-center justify-center p-1 transition-colors rounded-md hover:bg-gray-100 shrink-0"
                onClick={toggleSidebar}
                aria-label="Open Menu"
                type="button"
              >
                <img
                  src="/Dashboard/hamburger.svg"
                  alt="Open Menu"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                />
              </button>

              <img
                src="/Dashboard/logo.svg"
                alt="logo"
                className="w-32 sm:w-40 md:w-44 max-w-[55vw] object-contain"
              />
            </div>
          ) : (
            <h1 className="text-[16px] sm:text-lg md:text-xl font-semibold text-secondary truncate">
              Dashboard
            </h1>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            className="relative flex items-center justify-center p-1 transition-colors rounded-md cursor-pointer hover:bg-gray-50"
            onClick={handleClick}
            aria-label="Notifications"
          >
            <img
              src="/Dashboard/bellIcon.svg"
              alt="Notification Icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
            />
            <span className="absolute -top-1 -right-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center bg-white font-semibold text-primary border border-primary/20">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={openModal}
            className="transition-opacity rounded-full hover:opacity-80"
            aria-label="User menu"
          >
            <img
              src="/Dashboard/userIcon.svg"
              alt="User Icon"
              className="w-8 h-8 cursor-pointer sm:w-9 sm:h-9"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
