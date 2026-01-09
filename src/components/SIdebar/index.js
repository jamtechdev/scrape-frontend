"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/services/auth.service";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <i className="ri-xl ri-dashboard-line"></i>, href: "/dashboard" },
    { name: "History", icon: <i className="ri-xl ri-history-line"></i>, href: "/dashboard/history" },
    { name: "Google Sheet", icon: <i className="ri-xl ri-file-excel-2-line"></i>, href: "/dashboard/sheet" },
    { name: "Settings", icon: <i className="ri-xl ri-settings-2-line"></i>, href: "/dashboard/setting" },
  ];

  // Close mobile drawer on route change so it doesn't stay open after navigation
  useEffect(() => {
    setOpen((prev) => {
      // keep open on desktop, close on mobile after navigation
      if (typeof window === "undefined") return prev;
      return window.innerWidth >= 768 ? prev : false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-40 bg-black" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        className={`fixed top-0 w-60 h-screen overflow-y-auto overflow-x-hidden left-0 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 ${open ? "md:w-60" : "md:w-20"}
          md:bg-transparent bg-[#433974] flex flex-col justify-between`}
        // note: md:w-XX controlled via template string above
      >
        {/* TOP MENU */}
        <div>
          <div className="flex items-center justify-between px-4 py-4">
            <h1
              className={`font-semibold text-xl transition-all duration-300 text-white overflow-hidden
                ${!open ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0"}`}
            >
              Search
            </h1>

            {/* Small close button visible only on mobile */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <i className="ri-close-line ri-lg"></i>
            </button>
          </div>

          <nav className="mt-5 flex flex-col gap-2 px-3">
            {menu.map((item, i) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => {
                    // on mobile close after click
                    if (window.innerWidth < 768) setOpen(false);
                  }}
                  className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-300 min-h-[48px]
                    ${isActive ? "bg-[#f1eeff] text-[#6052a9]" : "text-white"}`}
                >
                  <span
                    className={`transition-all duration-300 
                      ${isActive ? "text-[#6052a9]" : "text-white"}`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`text-md font-semibold transition-all duration-300 overflow-hidden whitespace-nowrap
                      ${!open && "opacity-0 translate-x-5 fixed"}`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="px-3 pb-4 pt-4">
          {/* USER PROFILE */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300" />

            <div
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                ${!open && "opacity-0 translate-x-5 fixed"}`}
            >
              <p className="font-semibold text-white">John Doe</p>
              <p className="text-xs text-white/70">john@example.com</p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500 text-white transition-all duration-300 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={async () => {
              if (isLoggingOut) return;
              
              setIsLoggingOut(true);
              try {
                await logout();
                // Redirect to login page after successful logout
                router.push('/');
              } catch (error) {
                // Even if logout fails, redirect to login page
                // Silently handle logout errors - user will be logged out anyway
                router.push('/');
              } finally {
                setIsLoggingOut(false);
              }
            }}
            disabled={isLoggingOut}
          >
            <i className="ri-logout-circle-line text-lg text-white"></i>

            <span
              className={`text-sm font-semibold transition-all duration-300
                ${!open && "opacity-0 translate-x-5 fixed"}`}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
