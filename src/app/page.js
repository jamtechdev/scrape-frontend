"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Search, BarChart3, CloudDownload, ArrowRight, Zap, CheckCircle } from 'lucide-react';
export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Don't render homepage if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (

    <div className="min-h-screen bg-white font-sans selection:bg-[#26996f]/20 selection:text-[#000000]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white text-[#000000] py-4 md:pt-40 md:pb-32 px-4 border-b border-slate-100">
        {/* Subtle Decorative Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#26996f4a] rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#26996f4a] rounded-full blur-[100px]"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs md:text-sm font-medium text-[#26996f] mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#26996f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#26996f]"></span>
            </span>
            Trusted by top-tier marketers, brands and coaching groups
          </div>

          <h1 className="text-3xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-[#000000]">
            Find Winning Ads & Products <br />
            <span className="text-[#26996f]">
              Without Hours of Research
            </span>
          </h1>

          <p className="text-[#000] text-sm md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Automatically pull proven Meta ads by country and
            keyword into Google Sheets, complete with reach
            and advertiser insights. So you can spot winning
            products without the hours in manual research.
          </p>

          <div className="flex flex-row justify-center items-center gap-5">
            <Link href="/signup" className="group bg-[#26996f] hover:opacity-90 text-white p-3 md:px-10 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all shadow-lg shadow-[#26996f]/20 hover:scale-105 flex items-center gap-2">
              Start Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/privacy-policy" className="bg-white hover:bg-slate-50 border border-slate-200 text-[#000000] p-3 md:px-10 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-8 md:py-32 px-4 bg-[#26996f14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-3xl">
              <span className="text-white font-bold text-sm uppercase tracking-widest bg-[#26996f] px-3 py-1 rounded-md 
             border-b-4 border-[#1e7a58] shadow-lg active:translate-y-1 active:border-b-0">
                Features
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight mt-4 mb-3">
                Your All-in One Research tool
              </h2>
              <p className="text-[#000] leading-relaxed">
                Everything you need to track and find winning ads or products.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Advanced Search */}
            <div className="group bg-white p-5 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#26996f]/30 transition-all duration-500">
              <div className="w-16 h-16 bg-[#26996f] text-white rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-[#000000] mb-4 tracking-tight">
                Advanced Search
              </h3>
              <p className="text-[#000] leading-relaxed text-sm md:text-lg">
                Search Meta ads by keywords, countries, date ranges,
                and more. Find exactly what you're looking for with
                powerful filtering options.
              </p>
            </div>

            {/* Auto-Refreshing Data */}
            <div className="group bg-white p-5 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#26996f]/30 transition-all duration-500">
              <div className="w-16 h-16 bg-[#26996f] text-white rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-[#000000] mb-4 tracking-tight">
                Auto-Refreshing Data
              </h3>
              <p className="text-[#000] leading-relaxed text-sm md:text-lg">
                Your Google Sheets update in real time with reach,
                advertiser details, ad links, and key ad data, completely
                automatically.
              </p>
            </div>

            {/* Analytics & Insights */}
            <div className="group bg-white p-5 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#26996f]/30 transition-all duration-500">
              <div className="w-16 h-16 bg-[#26996f] text-white rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
                <CloudDownload className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-[#000000] mb-4 tracking-tight">
                Analytics & Insights
              </h3>
              <p className="text-[#000] leading-relaxed text-sm md:text-lg">
                Get detailed analytics on ad performance, delivery
                information, and creative trends. Make data-driven
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-8 md:py-24 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#000000] mb-3">How It Works</h2>
            <p className="text-[#000] leading-relaxed">
              Simple steps to start analyzing Facebook ads.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-12">
            {[
              {
                step: "01",
                title: "Search your market",
                desc: "Enter your keyword, select a country, and choose how many days back you want to analyze. Instantly pull relevant Meta ads from your niche with precise targeting.",
                icon: <Zap className="w-6 h-6 text-white" />
              },
              {
                step: "02",
                title: "Get your auto-updating spreadsheet",
                desc: "Receive everything neatly organized inside Google Sheets — including reach, advertiser info, creatives, and direct ad links. Your sheet updates automatically so your data is always fresh.",
                icon: <Search className="w-6 h-6 text-white" />
              },
              {
                step: "03",
                title: "Analyze & find winners",
                desc: "Review performance metrics, spot trends, and uncover winning products or ad frameworks you can model for your own campaigns.",
                icon: <CheckCircle className="w-6 h-6 text-white" />
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-300 hover:shadow-xl transition-all duration-500 relative z-10 h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-[#26996f] rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-5xl font-black text-[#000]  transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-[#000000] mb-4">{item.title}</h3>
                  <p className="text-[#000] leading-relaxed text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-8 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#26996f1a]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-black text-[#000000] mb-8 tracking-tight">
            Ready to Scale?
          </h2>
          <p className="text-[#000] text-sm md:text-xl mb-12 max-w-xl mx-auto">
            Join thousands of marketers and researchers using our
            platform to analyze Meta ads, uncover winning
            products, and stay ahead of the competition.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/signup"
              className="bg-[#26996f] hover:opacity-90 text-white p-3 md:px-10 md:py-4 rounded-lg md:rounded-2xl font-bold text-sm md:text-xl transition-all hover:scale-105 shadow-lg shadow-[#26996f]/20 flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>


  );
}
