// NotificationsTab.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Search as SearchIcon,
  Clock3,
  CheckCircle2,
  CircleAlert
} from "lucide-react";

const ICON_CONFIG = {
  warning: {
    Icon: Clock3,
    className: "text-pending/50",
  },
  success: {
    Icon: CheckCircle2,
    className: "text-active/50",
  },
  info: {
    Icon: CircleAlert,
    className: "text-info/50 rotate-180 transition-transform",
  },
  error: {
    Icon: CircleAlert,
    className: "text-expired/50",
  },
};

function formatTimeAgo(createdAt) {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.max(Math.round(diffMs / 60000), 1);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export default function NotificationsTab({ items, onItemsChange }) {
  const [notifications, setNotifications] = useState(items || []);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setNotifications(items || []);
  }, [items]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(notifications.map((n) => n.category).filter(Boolean))
    );
    return unique;
  }, [notifications]);

  const processedNotifications = useMemo(() => {
    let list = [...notifications];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q)
      );
    }

    if (filterCategory !== "all") {
      list = list.filter((n) => n.category === filterCategory);
    }

    list.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      if (sortOrder === "oldest") return aDate - bDate;
      return bDate - aDate; // newest
    });

    return list;
  }, [notifications, search, filterCategory, sortOrder]);

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleRowClick = (id) => {
    const updated = notifications.map((n) =>
      n.id === id
        ? { ...n, status: "read", isNew: false }
        : n
    );
    setNotifications(updated);
    if (onItemsChange) onItemsChange(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({
      ...n,
      status: "read",
      isNew: false,
    }));
    setNotifications(updated);
    if (onItemsChange) onItemsChange(updated);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setSelectedIds([]);
    if (onItemsChange) onItemsChange([]);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold sm:text-xl text-secondary">
            Notifications
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Stay informed about your credentialing activities.
          </p>
        </div>

        <div className="flex gap-4 text-xs sm:text-sm">
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="font-semibold text-[16px] text-primary hover:underline"
          >
            Mark All as Read
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="rounded-lg bg-primary text-[16px] px-3.5 py-2 font-semibold text-white hover:bg-[#082b5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 p-4 mt-4 border border-gray-100 rounded-lg shadow-md sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 flex items-center pointer-events-none left-3">
            <SearchIcon className="w-4 h-4 text-slate-400" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notifications..."
            className="w-full rounded-lg border border-slate-200  py-2.5 pl-9 pr-3 text-xs sm:text-sm text-secondary placeholder:text-slate-400 focus:border-primary bg-white outline-none "
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-sky-500 sm:w-44"
          >
            <option value="all">All Notifications</option>
            <option value="expiry-alert">Expiry Alerts</option>
            <option value="verification">Verifications</option>
            <option value="access-req">Access Requests</option>
            {/* {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))} */}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-sky-500 sm:w-36"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex flex-col gap-3 mt-5">
        {processedNotifications.map((n) => {
          const isRead = n.status === "read";
          const { Icon, className } =
            ICON_CONFIG[n.type] || ICON_CONFIG.info;

          return (
            <div
              key={n.id}
              className={`rounded-xl border border-slate-100 bg-white px-4 py-4 sm:px-6 sm:py-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:bg-slate-50 transition-colors ${n.isHighlighted && !isRead
                  ? "border-l-4 border-l-primary"
                  : ""
                }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start flex-1 gap-3 ">
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleToggleSelect(n.id)}
className="mt-1"
                  >
                    <span
                      className={`inline-flex h-4 w-4 items-center justify-center rounded border ${selectedIds.includes(n.id)
                          ? "border-primary bg-primary"
                          : "border-slate-300 bg-white"
                        }`}
                    >
                      {selectedIds.includes(n.id) && (
                        <span className="w-2 h-2 bg-white rounded-sm" />
                      )}
                    </span>
                  </button>

                  {/* Icon + content */}
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleRowClick(n.id)}
                  >
                    <div className="flex  gap-2 sm:flex-row sm:items-start sm:gap-3">
                      <Icon className={`w-5 h-5 ${className} mt-1 `} />

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold sm:text-base leading-none m-0 pt-0 text-secondary">
                            {n.title}
                          </h3>
                          {n.isNew && (
                            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                              New
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600">
                          {n.message}
                        </p>
                        {n.actionLabel && (
                          <button
                            type="button"
                            className="flex justify-center gap-2 mt-2 text-xs font-semibold sm:text-sm text-primary hover:underline"
                          >
                            {n.actionLabel} <span><img src="/share.svg" alt="" /></span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-end">
                  <span className="text-xs whitespace-nowrap text-slate-400">
                    {formatTimeAgo(n.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {processedNotifications.length === 0 && (
          <p className="py-6 text-sm text-center text-slate-500">
            No notifications found.
          </p>
        )}
      </div>
    </div>
  );
}
