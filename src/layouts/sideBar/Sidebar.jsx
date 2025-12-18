import { topMenu, bottomMenu } from "../../constants/menuConfig";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SideBar({ isSidebarOpen, toggleSidebar }) {
  const location = useLocation();

  // On mobile: never allow sidebar to stay open automatically (e.g., on refresh)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 1180px)").matches;
    if (isMobile && isSidebarOpen) {
      toggleSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close sidebar automatically after clicking any item (route/tab change)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile && isSidebarOpen) {
      toggleSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  return (
    <aside
      className={`
        w-[260px] h-screen bg-white border-r border-tertiary/10
        flex flex-col justify-between py-4 items-center z-50
        transition-transform duration-300 ease-in-out
        fixed inset-y-0 left-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="w-full">
        <div className="flex items-center justify-between gap-4 px-4 py-2 pb-3 mb-4 border-b">
          <div className="flex items-center gap-2 ">
            <img src="/Dashboard/logo.svg" alt="logo" className="w-60" />
          </div>
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-10 h-8 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <img
              src="/Dashboard/arrow.svg"
              alt="Close Menu"
              className="transition-transform duration-300"
            />
          </button>
        </div>

        <nav className="px-2 space-y-2 text-secondary">
          {topMenu.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              text={item.text}
              active={i === 0}
              path={item.path}
              tab={item.tab}
            />
          ))}
        </nav>
      </div>

      <div className="w-full px-4 space-y-2 text-secondary ">
        {bottomMenu.map((item, i) => (
          <SidebarItem
            key={i}
            icon={item.icon}
            text={item.text}
            path={item.path}
            tab={item.tab}
          />
        ))}
      </div>
    </aside>
  );
}
