"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Info, 
  Database, 
  Lock, 
  Share2, 
  UserCheck, 
  Cookie, 
  Globe, 
  Mail, 
  RefreshCw, 
  FileText,
  AlertCircle,
  CreditCard,
  UserCircle,
  CheckCircle2
} from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#26996f4a] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 -right-24 w-80 h-80 bg-[#26996f4a] rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 md:p-12 z-[1000] relative">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-10 h-10 text-[#26996f]" />
            <h1 className="text-2xl md:text-4xl font-bold text-[#26996f]">Privacy Policy</h1>
          </div>
          <p className="text-[#000] mb-8">Last Updated: January 14, 2026</p>

          <div className="prose prose-lg max-w-none">
            
            {/* 1. Introduction */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#000] mb-4 border-b pb-2">
                <Info className="w-6 h-6 text-[#26996f]" /> 1. Introduction
              </h2>
              <p className="text-sm md:text-base text-[#000] leading-relaxed mb-4">
                Adtrova ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our Adtrova application and services (the "Service").
              </p>
              <p className="text-sm md:text-base text-[#000] leading-relaxed">
                By using our Service, you agree to the collection and use of information in 
                accordance with this policy.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#000] mb-4 border-b pb-2">
                <Database className="w-6 h-6 text-[#26996f]" /> 2. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-[#000] mb-3 mt-6">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-[#000] space-y-2 mb-4 text-sm md:text-base">
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and password.</li>
                <li><strong>Search Queries:</strong> We collect the keywords, countries, and date ranges you search for.</li>
                <li><strong>User Preferences:</strong> We may collect your preferences and settings related to the Service.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#000] mb-3 mt-6">2.2 Automatically Collected</h3>
              <ul className="list-disc pl-6 text-[#000] space-y-2 mb-4 text-sm md:text-base">
                <li><strong>Usage Data:</strong> Pages visited, features used, and time spent.</li>
                <li><strong>Device Info:</strong> IP address, browser type, and operating system.</li>
                <li><strong>Log Data:</strong> Server logs including access times and viewed pages.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#000] mb-3 mt-6">2.3 Facebook Data</h3>
              <p className="text-[#000] mb-2 text-sm md:text-base">Via Facebook's Ads Library API, we collect:</p>
              <ul className="list-disc pl-6 text-[#000] space-y-2 mb-4 text-sm md:text-base">
                <li><strong>Ad Data:</strong> Publicly available content, delivery info, and performance metrics.</li>
                <li><strong>Search Parameters:</strong> Criteria used to query the Ads Library.</li>
              </ul>
              <div className="flex gap-3 bg-[rgb(20 41 82 / 11%)] p-5 rounded-lg border-l-4 border-[#26996f] shadow-sm">
                <AlertCircle className="w-6 h-6 text-[#26996f] shrink-0" />
                <p className="text-[#000] text-sm leading-relaxed">
                  <strong>Important:</strong> We only access publicly available ad data. We do <strong>not</strong> access your personal Facebook account data, friends list, or private information.
                </p>
              </div>
            </section>

            {/* 3. How We Use Information */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#000] mb-4 border-b pb-2">
                <RefreshCw className="w-6 h-6 text-[#26996f]" /> 3. How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Provision</h3>
                  <ul className="list-disc pl-5 text-[#000] text-sm space-y-1 text-sm md:text-base">
                    <li>Maintain and improve the Service</li>
                    <li>Process searches and display results</li>
                    <li>Manage and authenticate accounts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Legal & Support</h3>
                  <ul className="list-disc pl-5 text-[#000] text-sm space-y-1 text-sm md:text-base">
                    <li>Respond to customer inquiries</li>
                    <li>Comply with legal obligations</li>
                    <li>Prevent fraud and enforce terms</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Payment & Billing (From Image Reference) */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#000] mb-4 border-b pb-2">
                <CreditCard className="w-6 h-6 text-[#26996f]" /> 4. Payment and Billing
              </h2>
              <p className="text-[#000] mb-4">As referenced in our Terms and Conditions:</p>
              <ul className="list-disc pl-6 text-[#000] space-y-2 text-sm md:text-base">
                <li><strong>Subscription:</strong> Access is based on the subscription plan chosen during registration.</li>
                <li><strong>Payment:</strong> All payments are processed through secure third-party processors.</li>
                <li><strong>Refunds:</strong> Refund requests are governed by our refund policy stated in the Terms.</li>
              </ul>
            </section>

            {/* 5. Security */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#000] mb-4 border-b pb-2">
                <Lock className="w-6 h-6 text-[#26996f]" /> 5. Data Storage & Security
              </h2>
              <p className="text-[#000] mb-4 text-sm md:text-base">We implement industry-standard technical measures:</p>
              <div className="bg-gray-50 p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-[#000]">
                  <CheckCircle2 className="w-4 h-4 text-[#26996f]" /> SSL/TLS Encryption
                </div>
                <div className="flex items-center gap-2 text-sm text-[#000]">
                  <CheckCircle2 className="w-4 h-4 text-[#26996f]" /> Hashed Passwords
                </div>
                <div className="flex items-center gap-2 text-sm text-[#000]">
                  <CheckCircle2 className="w-4 h-4 text-[#26996f]" /> Restricted DB Access
                </div>
                <div className="flex items-center gap-2 text-sm text-[#000]">
                  <CheckCircle2 className="w-4 h-4 text-[#26996f]" /> Regular Security Audits
                </div>
              </div>
            </section>

            {/* 6. Rights & Choices */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#000] mb-4 border-b pb-2">
                <UserCheck className="w-6 h-6 text-[#26996f]" /> 6. Your Rights and Choices
              </h2>
              <p className="text-[#000] mb-4 text-sm md:text-base">Under GDPR, CCPA, and other regional laws, you have the right to:</p>
              <div className="flex flex-wrap gap-2">
                {['Access Data', 'Correct Info', 'Delete Account', 'Data Portability', 'Opt-out'].map((tag) => (
                  <span key={tag} className="bg-green-100 text-[#26996f] px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* 7. Contact Info */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#000] mb-4 border-b pb-2">
                <Mail className="w-6 h-6 text-[#26996f]" /> 7. Contact Us
              </h2>
              <div className="bg-[#f8f9fc] border border-blue-100 p-6 rounded-lg text-sm md:text-base">
                <p className="text-[#000] mb-2 font-medium">For any inquiries regarding your data:</p>
                <p className="text-[#000]"><strong>Email:</strong> privacy@metaadsscraper.com</p>
                <p className="text-[#000]"><strong>DPO:</strong> dpo@metaadsscraper.com</p>
                <p className="text-[#000] mt-4 text-xs italic">
                  Note: This page is built to comply with Facebook Platform Policies and GDPR/CCPA standards.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#000] text-sm">
                  © 2026 Adtrova. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <Link href="/terms-and-conditions" className="flex items-center gap-1 text-[#26996f] hover:underline text-sm font-medium">
                    <FileText className="w-4 h-4" /> Terms of Service
                  </Link>
                  <Link href="/" className="text-[#000] hover:text-gray-900 text-sm font-medium">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}