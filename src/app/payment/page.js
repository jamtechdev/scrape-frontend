"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Check, 
  CreditCard, 
  Zap, 
  TrendingUp, 
  Crown,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Star
} from 'lucide-react';

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small projects',
      icon: Zap,
      features: [
        'Up to 100 searches per month',
        'Basic ad analytics',
        'Export to Google Sheets',
        'Email support',
        '5GB storage',
        'Basic filters and search'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for marketing teams and agencies',
      icon: TrendingUp,
      features: [
        'Unlimited searches',
        'Advanced analytics & insights',
        'Export to Google Sheets',
        'Priority email support',
        '50GB storage',
        'Advanced filters & search',
        'Ad performance tracking',
        'Competitor analysis tools'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with custom needs',
      icon: Crown,
      features: [
        'Everything in Professional',
        'Custom search limits',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
        'Priority support (24/7)',
        'Custom training sessions',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    // Here you would typically redirect to checkout or payment processing
    if (planId === 'enterprise') {
      // Handle enterprise contact
      alert('Please contact us for enterprise pricing');
    } else {
      // Redirect to payment processing
      window.location.href = `/login?plan=${planId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#142952] to-[#5145a3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <CreditCard className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Select the perfect plan for your needs. All plans include a free trial period.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 transition-all ${
                    plan.popular
                      ? 'border-[#142952] scale-105 md:scale-110'
                      : 'border-gray-200 hover:border-[#142952]'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#142952] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${
                      plan.popular ? 'bg-[#142952] text-white' : 'bg-gray-100 text-[#142952]'
                    }`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-[#142952] text-white hover:bg-[#5145a3] shadow-lg'
                        : 'bg-gray-100 text-[#142952] hover:bg-gray-200'
                    }`}
                  >
                    {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Plans Include
            </h2>
            <p className="text-lg text-gray-600">
              Core features available with every subscription
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Bank-level encryption and privacy protection'
              },
              {
                icon: Clock,
                title: 'Regular Updates',
                description: 'New features and improvements regularly'
              },
              {
                icon: Users,
                title: 'Community Support',
                description: 'Access to our user community and resources'
              }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#142952] text-white rounded-lg mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Marketers Worldwide
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Meta Ads Scraper has revolutionized how we analyze competitor strategies.',
                author: 'Sarah Johnson',
                role: 'Marketing Director'
              },
              {
                quote: 'The export features and analytics are exactly what our team needed.',
                author: 'Michael Chen',
                role: 'Agency Owner'
              },
              {
                quote: 'Best investment we made for our advertising research this year.',
                author: 'Emily Davis',
                role: 'Digital Strategist'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Payment FAQs
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all plans include a free trial period so you can explore the platform before committing.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-l-4 border-[#142952] pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#142952] to-[#5145a3] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your plan and start analyzing Facebook ads today
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-[#142952] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Sign Up Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
