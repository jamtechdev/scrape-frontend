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

     <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0a0f1d] text-white pt-40 pb-32 px-4">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-sm font-medium text-blue-300 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#142952]0"></span>
            </span>
            Trusted by 5,000+ top-tier marketers
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            Discover Facebook Ads <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Like Never Before
            </span>
          </h1>
          
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Powerful tool to search, analyze, and track Facebook and Instagram ads from the Meta Ads Library. 
            Get insights into competitor strategies, ad performance, and creative trends.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link href="/signup" className="group bg-blue-600 hover:bg-[#142952]0 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105 flex items-center gap-2">
               Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/privacy-policy" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 px-10 py-4 rounded-xl font-bold text-lg transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES BENTO GRID */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#fff] font-bold text-sm uppercase tracking-widest bg-[#142952] px-3 py-1 rounded-md">
                Features
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-4 mb-3">
                Powerful Features
              </h2>
                <p className="text-slate-600 leading-relaxed">
                Everything you need to analyze and track Facebook ads effectively.
              </p>
            </div>
          </div>

          {/* Features Grid */}
       <div className="grid md:grid-cols-3 gap-8">
          
          {/* Advanced Search */}
          <div className="group bg-white p-10 rounded-[2rem] border border-[#ccddff] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-[#142952] text-[#fff] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Advanced Search
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Search Facebook ads by keywords, countries, date ranges, and more. 
              Find exactly what you're looking for with powerful filtering options.
            </p>
          </div>

          {/* Analytics & Insights */}
          <div className="group bg-white p-10 rounded-[2rem] border border-[#ccddff] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-[#142952] text-[#fff] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Analytics & Insights
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Get detailed analytics on ad performance, delivery information, 
              and creative trends. Make data-driven decisions.
            </p>
          </div>

          {/* Export & Integrate */}
          <div className="group bg-white p-10 rounded-[2rem] border border-[#ccddff] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-[#142952] text-[#fff] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <CloudDownload className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Export & Integrate
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Export your findings to Google Sheets, download media files, 
              and integrate with your workflow seamlessly.
            </p>
          </div>

        </div>

        </div>
      </section>

      {/* HOW IT WORKS WITH CONNECTORS */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3"> How It Works</h2>
           <p className="text-slate-600 leading-relaxed">
               Simple steps to start analyzing Facebook ads.
           </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                step: "01", 
                title: "Create Account", 
                desc: "Sign up in seconds. No credit card required to start your discovery journey.",
                icon: <Zap className="w-6 h-6 text-[#fff]" />
              },
              { 
                step: "02", 
                title: "Apply Filters", 
                desc: "Search by industry, landing page URL, or specific brand names to narrow down results.",
                icon: <Search className="w-6 h-6 text-[#fff]" />
              },
              { 
                step: "03", 
                title: "Scale Success", 
                desc: "Analyze the engagement metrics and copy the frameworks to your own ad account.",
                icon: <CheckCircle className="w-6 h-6 text-[#fff]" />
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-500 relative z-10 h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-[#142952] rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-5xl font-black text-[#142952] group-hover:text-[#142952] transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#0a0f1d] py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Ready to build <br/>Started?
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto">
            Join thousands of marketers and researchers using our platform to analyze Facebook ads.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
            href="/signup"
            className="bg-blue-600 hover:bg-[#142952]0 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
          >
            Start Free Trial
          </Link>
          </div>
        </div>
      </section>
    </div>

  );
}
