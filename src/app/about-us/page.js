"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Target,
  Award,
  TrendingUp,
  Zap,
  Shield,
  Heart,
  Globe,
  CheckCircle2
} from 'lucide-react';

export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#26996f] to-[#005939] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <Users className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            About Adtrova
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
            Empowering marketers, brands, and researchers with
            powerful tools to discover, analyze, and understand
            Meta advertising.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-5 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="text-sm md:text-lg text-gray-700 space-y-4">
              <p>
                Adtrova was built from real marketer frustration.
              </p>
              <p>
                As performance marketers ourselves, we experienced
                how difficult it was to research competitors, track trends,
                and find winning ads inside Meta’s ecosystem. Valuable
                insights existed, but they were scattered, hidden, and
                extremely time consuming to collect.
              </p>
              <p>
                So we created Adtrova, a smarter and structured way to
                explore Meta’s public ad data and turn it into actionable
                intelligence.
              </p>
              <p>
                Our goal was simple, make ad research faster, clearer,
                and more useful for everyone. </p>
              <p>
                Today, Adtrova supports thousands of users worldwide,
                including solo dropshippers, creators, brands, agencies,
                and media buyers who rely on real data to build
                smarter campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-5 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#26996f] text-white rounded-xl mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To give businesses and marketers easy access to
                powerful Meta ad insights so better decisions can be
                made with less guesswork.
                We believe transparency in advertising leads to better
                products, better marketing, and healthier competition.
                That is why we focus on transforming publicly available
                ad data into practical, structured insights you can
                actually use.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Adtrova is built to be reliable, intuitive, compliant, and
                valuable so you can focus on growth instead of data
                chaos.
              </p>
            </div>
            <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Values</h3>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Privacy First', desc: 'We respect your data and operate within Meta’s policies using only publicly available information.' },
                  { icon: Zap, title: 'Innovation', desc: 'We continuously improve Adtrova to keep you ahead of trends.' },
                  { icon: Heart, title: 'User Centric', desc: 'Your success shapes our product roadmap.' },
                  { icon: Globe, title: 'Accessibility', desc: 'Powerful ad intelligence should be available to everyone, not just large agencies' }
                ].map((value, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#26996f]/10 rounded-lg flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-[#26996f]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-5 md:py-16 bg-gradient-to-r from-[#26996f] to-[#005939] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold mb-4">
              Why Choose Adtrova?
            </h2>
            <p className="text-sm md:text-xl text-green-100 max-w-2xl mx-auto">
              Comprehensive access to public Meta ad data
              Clean and easy to use interface
              Built for both beginners and professionals
              Secure, compliant, and privacy focused
              Regular updates and new features
              Reliable automation into Google Sheets
              Fast and helpful customer support
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-5 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#000000] mb-3">What We Offer
            </h2>
            <p className="text-[#000] leading-relaxed">
              Comprehensive tools and features designed to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Smart Ad Intelligence',
                description: 'Understand what is working across Meta with clear performance signals, trends, and creative analysis.'
              },
              {
                icon: Award,
                title: 'Competitor Insights',
                description: 'Monitor rival brands, study their strategies, and spot winning patterns early.'
              },
              {
                icon: Zap,
                title: 'Seamless Google Sheets Export',
                description: 'Automatically send ads, reach, creatives, and links into structured spreadsheets that update themselves.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#26996f] text-white rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-[#26996f] to-[#005939] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-sm md:text-xl text-green-100 mb-8">
            Join thousands of marketers using <b>Adtrova</b> to discover winning ads, track trends, and scale smarter on Meta.
          </p>
          <div className="flex flex-row justify-center items-center gap-5">
            <Link href="/login" className="group bg-[#26996f] hover:opacity-90 text-white p-3 md:px-10 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all shadow-lg shadow-[#26996f]/20 hover:scale-105 flex items-center gap-2">
              Get Started
              {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
            </Link>
            <Link href="/" className="bg-white hover:bg-slate-50 border border-slate-200 text-[#000000] p-3 md:px-10 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>




    </div>
  );
}
