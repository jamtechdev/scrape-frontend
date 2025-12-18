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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="text-black bg-[url('/auth-bg.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="flex min-h-screen">
        {/* Sidebar (desktop & mobile drawer) */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* MAIN CONTENT */}
        <div
          className={`w-full transition-all duration-300 md:mt-5 md:h-[calc(100vh-20px)] md:rounded-tl-2xl overflow-hidden`}
          // if you want content shift when desktop sidebar collapsed, keep padding left logic here
        >
          <Topbar open={open} setOpen={setOpen} />

          <div className="p-6 md:h-[calc(100vh-84px)] h-[calc(100vh-64px)] overflow-y-auto bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
}
