"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Don't show header on login/auth pages and dashboard
  const hideHeader = pathname === '/login' || pathname === '/auth' || pathname?.startsWith('/dashboard');

  if (hideHeader) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-[#433974] hover:text-[#5145a3] transition-colors">
            Meta Ads Scraper
          </Link>
          <nav className="flex gap-6 items-center">
            <Link 
              href="/" 
              className={`transition-colors ${
                pathname === '/' 
                  ? 'text-[#433974] font-semibold' 
                  : 'text-gray-700 hover:text-[#433974]'
              }`}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-[#433974] transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-[#433974] transition-colors"
              >
                Login
              </Link>
            )}
            <Link 
              href="/terms-and-conditions" 
              className={`transition-colors ${
                pathname === '/terms-and-conditions' 
                  ? 'text-[#433974] font-semibold' 
                  : 'text-gray-700 hover:text-[#433974]'
              }`}
            >
              Terms
            </Link>
            <Link 
              href="/privacy-policy" 
              className={`transition-colors ${
                pathname === '/privacy-policy' 
                  ? 'text-[#433974] font-semibold' 
                  : 'text-gray-700 hover:text-[#433974]'
              }`}
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
