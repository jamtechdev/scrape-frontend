"use client";

import { useEffect, useState } from 'react'; // Added useState
import Link from 'next/link';
import { 
  Info, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  MessageCircle,
  Search,
  Download,
  Shield,
  CreditCard,
  Users,
  ChevronDown // Added for the accordion trigger
} from 'lucide-react';

// Sub-component for individual Accordion items
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-[#26996f] transition-colors"
      >
        <span className="text-sm md:text-lg font-semibold text-gray-900">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-sm md:text-lg text-gray-600 leading-relaxed pl-1">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function InfoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      questions: [
        { q: "How do I create an account?", a: "Simply click the 'Get Started' button on our homepage and fill out the registration form with your name, email, and password. You'll receive a confirmation email to verify your account." },
        { q: "Do I need a credit card to sign up?", a: "No credit card is required to create an account. You can explore our platform and see if it meets your needs before subscribing to a paid plan." },
        { q: "What browser is recommended?", a: "We recommend using the latest versions of Chrome, Firefox, Safari, or Edge for the best experience." }
      ]
    },
    {
      title: "Using the Platform",
      icon: Search,
      questions: [
        { q: "How do I search for ads?", a: "Navigate to the dashboard and use our search form. Enter keywords, select countries, set date ranges, and click search." },
        { q: "What information can I see about each ad?", a: "For each ad, you can view the ad creative, copy, delivery information, performance metrics, and engagement data." },
        { q: "Can I download ad media?", a: "Yes! You can download images and videos from ads directly from the platform." }
      ]
    },
    {
        title: "Export & Integration",
        icon: Download,
        questions: [
          { q: "How do I export data to Google Sheets?", a: "After performing a search, click the 'Export to Google Sheets' button and authorize the connection. Your data will be automatically synced." },
          { q: "What data is exported?", a: "All ad information including creative URLs, copy, delivery dates, and metrics are exported." }
        ]
    },
    {
        title: "Privacy & Security",
        icon: Shield,
        questions: [
          { q: "Is my data secure?", a: "Yes, we implement industry-standard security measures including SSL/TLS encryption and regular security audits." },
          { q: "Can I delete my account?", a: "Yes, you can delete your account at any time from your account settings." }
        ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#26996f] to-[#005939] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <Info className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Information & Help Center</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">Everything you need to know about Adtrova </p>
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
                className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-[#26996f] hover:text-white transition-all group"
              >
                <link.icon className="w-8 h-8 mb-3 text-[#26996f] group-hover:text-white" />
                <span className="font-semibold text-center">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs with Accordions */}
      <section id="faqs" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about our platform</p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <category.icon className="w-5 h-5 text-[#26996f]" />
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <div className="px-6">
                  {category.questions.map((faq, faqIdx) => (
                    <AccordionItem key={faqIdx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

         {/* Contact Section */}
      <section id="support" className="py-10 md:py-16 bg-gradient-to-r from-[#26996f] to-[#005939] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-sm md:text-xl text-green-100 mb-8">
            Our support team is here to help. Contact us through your dashboard or reach out directly.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-[#26996f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}