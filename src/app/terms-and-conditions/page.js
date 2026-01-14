"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Info, 
  UserCircle, 
  ShieldAlert, 
  Database, 
  Copyright, 
  CreditCard, 
  Activity, 
  Scale, 
  ShieldCheck, 
  LogOut, 
  AlertTriangle, 
  RefreshCw, 
  Gavel, 
  Layers, 
  Mail 
} from 'lucide-react';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-[#142952] mb-2">Terms and Conditions</h1>
          <p className="text-gray-500 mb-8 text-sm pl-2">Last Updated: January 2024</p>

          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6" /> 1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using Meta Ads Scraper ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions ("Terms") govern your access to and use of our Service. By using the Service, 
                you agree to comply with and be bound by these Terms.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Info className="w-6 h-6" /> 2. Description of Service
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Meta Ads Scraper is a web-based application that provides access to publicly available Facebook and Instagram 
                ad data through Facebook's Ads Library API. Our Service allows you to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Search for ads by keywords, countries, and date ranges</li>
                <li>View ad content, delivery information, and performance metrics</li>
                <li>Export ad data to Google Sheets</li>
                <li>Download ad media files</li>
                <li>Analyze and track ad campaigns</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time with or without notice.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <UserCircle className="w-6 h-6" /> 3. User Accounts
              </h2>
              
              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">3.1 Account Registration</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use certain features of the Service, you must register for an account. When you register, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">3.2 Account Responsibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                that occur under your account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Not share your account credentials with others</li>
                <li>Use a strong, unique password</li>
                <li>Log out of your account when using shared devices</li>
                <li>Report any security breaches immediately</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <ShieldAlert className="w-6 h-6" /> 4. Acceptable Use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction (including copyright laws)</li>
                <li>Transmit any worms, viruses, or any code of a destructive nature</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
                <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Service without express written permission</li>
                <li>Use the Service to collect or store personal data about other users</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Use the Service in any manner that could damage, disable, overburden, or impair our servers</li>
              </ul>

              <p className="text-gray-700 leading-relaxed bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <strong className="text-[#142952]">Important:</strong> Violation of these terms may result in immediate termination of your account 
                and legal action.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Database className="w-6 h-6" /> 5. Facebook Ads Library Data
              </h2>
              
              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">5.1 Data Source</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Service accesses publicly available ad data from Facebook's Ads Library through Facebook's official APIs. 
                We comply with Facebook's Platform Policy and Terms of Service.
              </p>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">5.2 Data Usage</h3>
              <p className="text-gray-700 leading-relaxed mb-2">You agree to use the ad data obtained through our Service:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Only for lawful purposes</li>
                <li>In compliance with Facebook's Terms of Service and Platform Policy</li>
                <li>In compliance with applicable data protection laws</li>
                <li>Not for spamming, harassment, or other abusive purposes</li>
                <li>Not to violate any third-party rights</li>
              </ul>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">5.3 Data Accuracy</h3>
              <p className="text-gray-700 leading-relaxed">
                We do not guarantee the accuracy, completeness, or timeliness of ad data obtained through the Service. 
                Ad data is provided "as is" from Facebook's Ads Library API.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Copyright className="w-6 h-6" /> 6. Intellectual Property
              </h2>
              
              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">6.1 Our Intellectual Property</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by Meta Ads Scraper and are 
                protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">6.2 User Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of any content you submit, post, or display on or through the Service. By submitting 
                content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and 
                distribute your content solely for the purpose of providing and improving the Service.
              </p>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">6.3 Third-Party Content</h3>
              <p className="text-gray-700 leading-relaxed">
                Ad content displayed through our Service is owned by the respective advertisers and Facebook. You may not 
                reproduce, distribute, or create derivative works from ad content without proper authorization.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <CreditCard className="w-6 h-6" /> 7. Payment and Billing
              </h2>
              
              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">7.1 Subscription Plans</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you purchase a subscription to the Service, you agree to pay all fees associated with your subscription 
                plan. Subscription fees are billed in advance on a recurring basis.
              </p>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">7.2 Payment Terms</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>We reserve the right to change our pricing with 30 days' notice</li>
                <li>You are responsible for any taxes applicable to your subscription</li>
                <li>Failed payments may result in suspension or termination of your account</li>
              </ul>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">7.3 Cancellation</h3>
              <p className="text-gray-700 leading-relaxed">
                You may cancel your subscription at any time. Cancellation will take effect at the end of your current 
                billing period. You will continue to have access to the Service until the end of your billing period.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Activity className="w-6 h-6" /> 8. Service Availability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to provide reliable service but do not guarantee that the Service will be available at all times. 
                The Service may be unavailable due to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Scheduled maintenance</li>
                <li>Unscheduled maintenance or repairs</li>
                <li>Technical issues or failures</li>
                <li>Facebook API outages or changes</li>
                <li>Force majeure events</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We are not liable for any loss or damage resulting from Service unavailability.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6" /> 9. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, META ADS SCRAPER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY 
                OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our total liability for any claims arising from or related to the Service shall not exceed the amount you 
                paid us in the twelve (12) months preceding the claim.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6" /> 10. Indemnification
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Meta Ads Scraper, its officers, directors, employees, 
                and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable 
                attorneys' fees, arising out of or in any way connected with your access to or use of the Service, your 
                violation of these Terms, or your violation of any rights of another.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <LogOut className="w-6 h-6" /> 11. Termination
              </h2>
              
              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">11.1 Termination by You</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may terminate your account at any time by contacting us or using the account deletion feature in your 
                account settings.
              </p>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">11.2 Termination by Us</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We may terminate or suspend your account immediately, without prior notice, if:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>You breach these Terms</li>
                <li>You engage in fraudulent, abusive, or illegal activity</li>
                <li>We are required to do so by law</li>
                <li>You fail to pay subscription fees</li>
                <li>We discontinue the Service</li>
              </ul>

              <h3 className="text-xl font-bold text-[#142952] mb-3 mt-6">11.3 Effect of Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the Service will immediately cease. We may delete your account and 
                data, though we may retain certain information as required by law or for legitimate business purposes.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" /> 12. Disclaimers
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND 
                NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be 
                corrected. We do not warrant or make any representations regarding the use or results of the Service in terms 
                of accuracy, reliability, or otherwise.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <RefreshCw className="w-6 h-6" /> 13. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">We reserve the right to modify these Terms at any time. We will notify you of any changes by:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Posting the new Terms on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending you an email notification (for material changes)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of the Service after changes become effective constitutes acceptance of the updated Terms. 
                If you do not agree to the changes, you must stop using the Service and terminate your account.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Gavel className="w-6 h-6" /> 14. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without 
                regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be 
                resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Layers className="w-6 h-6" /> 15. Severability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited 
                or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#142952] mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6" /> 16. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#142952]">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> support@yourdomain.com</p>
                <p className="text-gray-700 mb-2"><strong>Address:</strong> [Your Company Address]</p>
                <p className="text-gray-700"><strong>Phone:</strong> [Your Contact Number]</p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                These Terms and Conditions are effective as of the "Last Updated" date and apply to all users of our Service.
              </p>
              <div className="mt-4 flex gap-4">
                <Link 
                  href="/privacy-policy" 
                  className="text-[#142952] font-bold hover:underline text-sm"
                >
                  View Privacy Policy
                </Link>
                <Link 
                  href="/" 
                  className="text-[#142952] font-bold hover:underline text-sm"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
