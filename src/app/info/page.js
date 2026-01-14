"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { 
  Info, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  MessageCircle,
  Search,
  BarChart3,
  Download,
  Settings,
  Shield,
  CreditCard,
  Users
} from 'lucide-react';

export default function InfoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      questions: [
        {
          q: "How do I create an account?",
          a: "Simply click the 'Get Started' button on our homepage and fill out the registration form with your name, email, and password. You'll receive a confirmation email to verify your account."
        },
        {
          q: "Do I need a credit card to sign up?",
          a: "No credit card is required to create an account. You can explore our platform and see if it meets your needs before subscribing to a paid plan."
        },
        {
          q: "What browser is recommended?",
          a: "We recommend using the latest versions of Chrome, Firefox, Safari, or Edge for the best experience."
        }
      ]
    },
    {
      title: "Using the Platform",
      icon: Search,
      questions: [
        {
          q: "How do I search for ads?",
          a: "Navigate to the dashboard and use our search form. Enter keywords, select countries, set date ranges, and click search. Our system will fetch relevant ads from the Meta Ads Library."
        },
        {
          q: "What information can I see about each ad?",
          a: "For each ad, you can view the ad creative (images/videos), ad copy, delivery information, performance metrics, advertiser information, and engagement data."
        },
        {
          q: "Can I download ad media?",
          a: "Yes! You can download images and videos from ads directly from the platform. Simply click on the media file to download it."
        }
      ]
    },
    {
      title: "Export & Integration",
      icon: Download,
      questions: [
        {
          q: "How do I export data to Google Sheets?",
          a: "After performing a search, you can export your results to Google Sheets. Click the 'Export to Google Sheets' button and authorize the connection. Your data will be automatically synced."
        },
        {
          q: "What data is exported?",
          a: "All ad information including creative URLs, copy, delivery dates, advertiser info, and performance metrics are exported to your Google Sheet."
        },
        {
          q: "Can I export multiple searches?",
          a: "Yes, you can export data from multiple searches. Each export creates a new sheet or adds to an existing one based on your preferences."
        }
      ]
    },
    {
      title: "Account & Billing",
      icon: CreditCard,
      questions: [
        {
          q: "What subscription plans are available?",
          a: "We offer several subscription tiers to suit different needs. Visit our payment page to see current plans and pricing."
        },
        {
          q: "How do I cancel my subscription?",
          a: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
        },
        {
          q: "Do you offer refunds?",
          a: "Refund policies vary by plan. Please refer to our Terms and Conditions for detailed information about our refund policy."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      questions: [
        {
          q: "Is my data secure?",
          a: "Yes, we implement industry-standard security measures including SSL/TLS encryption, hashed passwords, and regular security audits to protect your data."
        },
        {
          q: "What data do you collect?",
          a: "We collect account information (name, email), usage data, and search queries. We do not access your personal Facebook account data. Please see our Privacy Policy for complete details."
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can delete your account at any time from your account settings. All your data will be permanently deleted according to our data retention policies."
        }
      ]
    },
    {
      title: "Support",
      icon: MessageCircle,
      questions: [
        {
          q: "How do I contact support?",
          a: "You can contact our support team through your dashboard or by email. We typically respond within 24-48 hours during business days."
        },
        {
          q: "Do you offer API access?",
          a: "API access is available for enterprise plans. Contact our sales team for more information about API integration options."
        },
        {
          q: "Where can I find documentation?",
          a: "Documentation and guides are available in your dashboard. You can also check our Terms of Service and Privacy Policy for detailed information."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#142952] to-[#5145a3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <Info className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Information & Help Center
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to know about Meta Ads Scraper
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Getting Started", href: "#getting-started" },
              { icon: FileText, title: "Documentation", href: "/terms-and-conditions" },
              { icon: MessageCircle, title: "Contact Support", href: "#support" },
              { icon: HelpCircle, title: "FAQs", href: "#faqs" }
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-[#142952] hover:text-white transition-all group"
              >
                <link.icon className="w-8 h-8 mb-3 text-[#142952] group-hover:text-white" />
                <span className="font-semibold text-center">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="space-y-12">
            {faqCategories.map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#142952] text-white rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIdx) => (
                    <div key={faqIdx} className="border-l-4 border-[#142952] pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.q}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-gray-600">
              More information and helpful links
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Terms of Service",
                description: "Read our terms and conditions",
                href: "/terms-and-conditions"
              },
              {
                icon: Shield,
                title: "Privacy Policy",
                description: "Learn how we protect your data",
                href: "/privacy-policy"
              },
              {
                icon: Users,
                title: "About Us",
                description: "Learn more about our company",
                href: "/about-us"
              }
            ].map((resource, idx) => (
              <Link
                key={idx}
                href={resource.href}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-[#142952] text-white rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5145a3] transition-colors">
                  <resource.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600">
                  {resource.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="support" className="py-16 bg-gradient-to-r from-[#142952] to-[#5145a3] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is here to help. Contact us through your dashboard or reach out directly.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-[#142952] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
