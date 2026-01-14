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
      <section className="bg-gradient-to-r from-[#142952] to-[#5145a3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <Users className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Meta Ads Scraper
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Empowering marketers and researchers with powerful tools to analyze and understand Facebook and Instagram advertising
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Meta Ads Scraper was born from a simple need: to make Facebook and Instagram ad data more accessible 
                and actionable. As digital marketers ourselves, we understood the frustration of trying to analyze 
                competitor strategies and track advertising trends without the right tools.
              </p>
              <p>
                We built this platform to provide marketers, researchers, and businesses with a comprehensive solution 
                for exploring the Meta Ads Library. Our mission is to democratize access to advertising insights, 
                helping you make data-driven decisions that drive real results.
              </p>
              <p>
                Today, Meta Ads Scraper serves thousands of users worldwide, from independent marketers to large 
                agencies, all working to understand and improve their advertising strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#142952] text-white rounded-xl mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To empower businesses and marketers with comprehensive, accessible, and actionable insights from 
                Facebook and Instagram advertising data. We believe that everyone should have the tools they need 
                to understand advertising trends and make informed decisions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We're committed to providing a reliable, user-friendly platform that respects privacy, complies 
                with all regulations, and delivers real value to our users.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Values</h3>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Privacy First', desc: 'We protect your data and respect your privacy' },
                  { icon: Zap, title: 'Innovation', desc: 'We continuously improve our platform' },
                  { icon: Heart, title: 'User-Centric', desc: 'Your success is our success' },
                  { icon: Globe, title: 'Accessibility', desc: 'Making insights available to everyone' }
                ].map((value, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#142952]/10 rounded-lg flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-[#142952]" />
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

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and features designed to help you succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Advanced Analytics',
                description: 'Deep insights into ad performance, delivery, and engagement metrics'
              },
              {
                icon: Award,
                title: 'Competitive Intelligence',
                description: 'Track competitor strategies and identify advertising trends'
              },
              {
                icon: Zap,
                title: 'Easy Export',
                description: 'Export data to Google Sheets and download media files seamlessly'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#142952] text-white rounded-lg flex items-center justify-center mb-4">
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

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-[#142952] to-[#5145a3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Meta Ads Scraper?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're committed to providing the best experience for our users
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Comprehensive data from Facebook Ads Library',
              'User-friendly interface with powerful features',
              'Secure and privacy-focused platform',
              'Regular updates and new features',
              'Excellent customer support',
              'Flexible export options'
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of marketers using Meta Ads Scraper to analyze and understand Facebook advertising
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-[#142952] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5145a3] transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="/"
              className="bg-white text-[#142952] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
