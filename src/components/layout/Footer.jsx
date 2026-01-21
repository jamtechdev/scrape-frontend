"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on login/auth pages and dashboard
  const hideFooter = pathname === '/login' || pathname === '/signup' || pathname === '/auth' || pathname?.startsWith('/dashboard');

  if (hideFooter) {
    return null;
  }

  return (
    <footer className="bg-white text-[#000000] py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="col-span-1">
            <h3 className="text-[#000000] font-black text-xl mb-6 tracking-tight">
              <Image
                src="/logo.jpeg"
                alt="Meta Ads Library Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </h3>
            <p className="text-[#000] text-sm leading-relaxed">
              Powerful tool for analyzing and tracking Facebook and Instagram ads from the Meta Ads Library. Stay ahead of the competition with data-driven insights.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-[#000000] font-bold text-sm uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/about-us" className="text-[#000] hover:text-[#26996f] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/info" className="text-[#000] hover:text-[#26996f] transition-colors">
                  Information
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-[#000] hover:text-[#26996f] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-[#000000] font-bold text-sm uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/terms-and-conditions" className="text-[#000] hover:text-[#26996f] transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#000] hover:text-[#26996f] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-[#000000] font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/" className="text-[#000] hover:text-[#26996f] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[#000] hover:text-[#26996f] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-[#26996f] font-bold hover:underline transition-all">
                  Get Started Free
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#000] font-medium">
          <p>&copy; {new Date().getFullYear()} Meta Ads Library. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#26996f] cursor-pointer">Twitter</span>
            <span className="hover:text-[#26996f] cursor-pointer">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
