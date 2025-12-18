// SidebarItem.jsx
import { NavLink, useLocation } from "react-router-dom";

export default function SidebarItem({ icon, text, path, tab }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab");

  // Build target URL
  const to = tab ? `${path}?tab=${tab}` : path;


  const isActiveCustom =
    location.pathname === path &&
    (tab ? currentTab === tab : true);

  return (
    <NavLink
      to={to}
      className={() =>
        `flex items-center gap-2 px-2 py-2 w-full rounded-md transition ${
          isActiveCustom
            ? "bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC] font-medium"
            : "hover:bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC] "
        }`
      }
    >
      <img src={icon} alt={text} className="w-5 h-5" />
      <span className="text-sm">{text}</span>
    </NavLink>
  );
}
