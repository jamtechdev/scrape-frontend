"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import Image from "next/image";


export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show header on login/auth pages and dashboard
  const hideHeader = pathname === '/login' || pathname === '/signup' || pathname === '/auth' || pathname?.startsWith('/dashboard');

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (hideHeader) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About' },
    { href: '/info', label: 'Info' },
    ...(isAuthenticated 
      ? [{ href: '/dashboard', label: 'Dashboard' }]
      : [
          { href: '/payment', label: 'Pricing' },
          { href: '/login', label: 'Login' }
        ]
    ),
    { href: '/terms-and-conditions', label: 'Terms' },
    { href: '/privacy-policy', label: 'Privacy' }
  ];

  return (
  <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-[999999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          {/* Logo - Removed "Scraper" */}
          <Link href="/" className="text-2xl font-black tracking-tight text-[#000000] hover:text-[#26996f] transition-colors">
             <Image
              src="/logo.jpeg"  
              alt="Meta Ads Library Logo"
              width={250}
              height={100}
              className="object-contain"
            />

          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition-all duration-200 text-sm font-bold uppercase tracking-wide ${
                  pathname === link.href 
                    ? 'text-[#26996f]' 
                    : 'text-[#000000] hover:text-[#26996f]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* CTA in Nav */}
            <Link 
              href="/signup" 
              className="bg-[#26996f] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-[#26996f]/20"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-[#000000] hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <i className="ri-close-line ri-xl"></i>
            ) : (
              <i className="ri-menu-line ri-xl"></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          {/* <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          /> */}
          
          {/* Mobile Menu */}
          <nav className="fixed top-[73px] left-0 right-0 bg-white border-b border-slate-100 shadow-xl z-50 md:hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top duration-300">
            <div className="flex flex-col py-6 px-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-4 rounded-xl text-lg font-bold transition-colors ${
                    pathname === link.href
                      ? 'bg-[#26996f]/10 text-[#26996f]'
                      : 'text-[#000000] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex justify-center bg-[#26996f] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#26996f]/20"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
