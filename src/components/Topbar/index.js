"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Topbar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <header className="flex justify-between items-center h-16 px-6 border-b bg-white">
      <div className="flex items-center gap-3 w-full">
        {/* Hamburger (always visible) */}
        <button
          className="flex h-10 w-10 min-w-10 items-center justify-center rounded-lg border bg-[#433974] text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Open sidebar"
        >
          <i className="ri-menu-2-line ri-lg"></i>
        </button>

        {/* Desktop expand/collapse button (visible on md+) */}
        <button
          className="hidden md:flex h-10 w-10 min-w-10 items-center justify-center rounded-lg bg-[#433974] text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >
          <i className="ri-menu-2-line ri-lg"></i>
        </button>

        <div className="relative w-full xl:max-w-[430px]">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            id="search-input"
            type="text"
            placeholder="Search or type command..."
            className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 bg-[#433974] rounded-full flex items-center justify-center text-white text-sm font-medium">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {user?.name || 'User'}
          </span>
          <i className="ri-arrow-down-s-line text-gray-500"></i>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <i className="ri-logout-box-line mr-2"></i>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
