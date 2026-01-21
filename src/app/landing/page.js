"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-[#26996f]">
              Adtrova
            </div>
            <nav className="flex gap-6 items-center">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-[#26996f] transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/about-us" 
                className="text-gray-700 hover:text-[#26996f] transition-colors"
              >
                About
              </Link>
              <Link 
                href="/payment" 
                className="text-gray-700 hover:text-[#26996f] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-[#26996f] transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Facebook Ads
            <span className="block text-[#26996f] mt-2">Like Never Before</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Powerful tool to search, analyze, and track Facebook and Instagram ads from the Meta Ads Library. 
            Get insights into competitor strategies, ad performance, and creative trends.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#26996f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#26996f] transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="/privacy-policy"
              className="bg-white text-[#26996f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to analyze and track Facebook ads effectively
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Advanced Search
            </h3>
            <p className="text-gray-600">
              Search Facebook ads by keywords, countries, date ranges, and more. 
              Find exactly what you're looking for with powerful filtering options.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Analytics & Insights
            </h3>
            <p className="text-gray-600">
              Get detailed analytics on ad performance, delivery information, 
              and creative trends. Make data-driven decisions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Export & Integrate
            </h3>
            <p className="text-gray-600">
              Export your findings to Google Sheets, download media files, 
              and integrate with your workflow seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to start analyzing Facebook ads
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-[#26996f] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sign Up
              </h3>
              <p className="text-gray-600">
                Create your free account and get started in minutes
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#26996f] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Search Ads
              </h3>
              <p className="text-gray-600">
                Enter keywords, select countries, and set date ranges to find relevant ads
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#26996f] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Analyze & Export
              </h3>
              <p className="text-gray-600">
                Review results, analyze performance, and export data to Google Sheets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-[#26996f] to-[#26996f] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of marketers and researchers using our platform to analyze Facebook ads
          </p>
          <Link
            href="/"
            className="bg-white text-[#26996f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Adtrova</h3>
              <p className="text-sm">
                Powerful tool for analyzing and tracking Facebook and Instagram ads from the Meta Ads Library.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
              <p className="text-sm">
                For support and inquiries, please contact us through your account dashboard.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Adtrova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
