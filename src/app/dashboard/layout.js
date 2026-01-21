"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/SIdebar";


export default function Layout({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  // start closed on mobile, open on desktop
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    // set initial state once on client
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768; // md breakpoint
    setOpen(isDesktop);
    // update on resize so developer preview behaves
    const onResize = () => {
      if (typeof window !== 'undefined') {
        setOpen(window.innerWidth >= 768 ? true : false);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

  // Show loading or nothing while checking auth
  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0f1d] overflow-hidden">
      <div className="flex h-screen">
        {/* Sidebar (desktop & mobile drawer) - Fixed */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* MAIN CONTENT */}
        <div className={`flex-1 flex flex-col h-screen ${open ? 'md:ml-60' : 'md:ml-20'} transition-all duration-300 overflow-hidden`}>
          {/* Topbar - Fixed at top */}
          <Topbar open={open} setOpen={setOpen} />

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 min-h-0" style={{ scrollbarWidth: 'thin' }}>
            <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
