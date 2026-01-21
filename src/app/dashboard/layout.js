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
    const isDesktop = window.innerWidth >= 768; // md breakpoint
    setOpen(isDesktop);
    // update on resize so developer preview behaves
    const onResize = () => setOpen(window.innerWidth >= 768 ? true : false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
    <div className="min-h-screen bg-[#0a0f1d]">
      <div className="flex min-h-screen">
        {/* Sidebar (desktop & mobile drawer) */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* MAIN CONTENT */}
        <div className={`flex-1 flex flex-col min-h-screen ${open ? 'md:ml-60' : 'md:ml-20'} transition-all duration-300`}>
          <Topbar open={open} setOpen={setOpen} />

          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
