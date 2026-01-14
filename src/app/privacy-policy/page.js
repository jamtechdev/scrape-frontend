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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-10 h-10 text-[#142952]" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-500 mb-8">Last Updated: January 14, 2026</p>

          <div className="prose prose-lg max-w-none">
            
            {/* 1. Introduction */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <Info className="w-6 h-6 text-[#142952]" /> 1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Meta Ads Scraper ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our Meta Ads Scraper application and services (the "Service").
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our Service, you agree to the collection and use of information in 
                accordance with this policy.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <Database className="w-6 h-6 text-[#142952]" /> 2. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and password.</li>
                <li><strong>Search Queries:</strong> We collect the keywords, countries, and date ranges you search for.</li>
                <li><strong>User Preferences:</strong> We may collect your preferences and settings related to the Service.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Automatically Collected</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Usage Data:</strong> Pages visited, features used, and time spent.</li>
                <li><strong>Device Info:</strong> IP address, browser type, and operating system.</li>
                <li><strong>Log Data:</strong> Server logs including access times and viewed pages.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Facebook Data</h3>
              <p className="text-gray-700 mb-2">Via Facebook's Ads Library API, we collect:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Ad Data:</strong> Publicly available content, delivery info, and performance metrics.</li>
                <li><strong>Search Parameters:</strong> Criteria used to query the Ads Library.</li>
              </ul>
              <div className="flex gap-3 bg-[rgb(20 41 82 / 11%)] p-5 rounded-lg border-l-4 border-[#142952] shadow-sm">
                <AlertCircle className="w-6 h-6 text-[#142952] shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Important:</strong> We only access publicly available ad data. We do <strong>not</strong> access your personal Facebook account data, friends list, or private information.
                </p>
              </div>
            </section>

            {/* 3. How We Use Information */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <RefreshCw className="w-6 h-6 text-[#142952]" /> 3. How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Provision</h3>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    <li>Maintain and improve the Service</li>
                    <li>Process searches and display results</li>
                    <li>Manage and authenticate accounts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Legal & Support</h3>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    <li>Respond to customer inquiries</li>
                    <li>Comply with legal obligations</li>
                    <li>Prevent fraud and enforce terms</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Payment & Billing (From Image Reference) */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <CreditCard className="w-6 h-6 text-[#142952]" /> 4. Payment and Billing
              </h2>
              <p className="text-gray-700 mb-4">As referenced in our Terms and Conditions:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Subscription:</strong> Access is based on the subscription plan chosen during registration.</li>
                <li><strong>Payment:</strong> All payments are processed through secure third-party processors.</li>
                <li><strong>Refunds:</strong> Refund requests are governed by our refund policy stated in the Terms.</li>
              </ul>
            </section>

            {/* 5. Security */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <Lock className="w-6 h-6 text-[#142952]" /> 5. Data Storage & Security
              </h2>
              <p className="text-gray-700 mb-4">We implement industry-standard technical measures:</p>
              <div className="bg-gray-50 p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> SSL/TLS Encryption
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Hashed Passwords
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Restricted DB Access
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Regular Security Audits
                </div>
              </div>
            </section>

            {/* 6. Rights & Choices */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <UserCheck className="w-6 h-6 text-[#142952]" /> 6. Your Rights and Choices
              </h2>
              <p className="text-gray-700 mb-4">Under GDPR, CCPA, and other regional laws, you have the right to:</p>
              <div className="flex flex-wrap gap-2">
                {['Access Data', 'Correct Info', 'Delete Account', 'Data Portability', 'Opt-out'].map((tag) => (
                  <span key={tag} className="bg-blue-100 text-[#142952] px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* 7. Contact Info */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <Mail className="w-6 h-6 text-[#142952]" /> 7. Contact Us
              </h2>
              <div className="bg-[#f8f9fc] border border-blue-100 p-6 rounded-lg">
                <p className="text-gray-700 mb-2 font-medium">For any inquiries regarding your data:</p>
                <p className="text-gray-700"><strong>Email:</strong> privacy@metaadsscraper.com</p>
                <p className="text-gray-700"><strong>DPO:</strong> dpo@metaadsscraper.com</p>
                <p className="text-gray-700 mt-4 text-xs italic">
                  Note: This page is built to comply with Facebook Platform Policies and GDPR/CCPA standards.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                  © 2026 Meta Ads Scraper. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <Link href="/terms-and-conditions" className="flex items-center gap-1 text-[#433974] hover:underline text-sm font-medium">
                    <FileText className="w-4 h-4" /> Terms of Service
                  </Link>
                  <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
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