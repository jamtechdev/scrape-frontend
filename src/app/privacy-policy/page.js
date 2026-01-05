"use client";

import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: January 2024</p>

          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
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

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and password.</li>
                <li><strong>Search Queries:</strong> We collect the keywords, countries, and date ranges you search for when using our ad search functionality.</li>
                <li><strong>User Preferences:</strong> We may collect your preferences and settings related to the Service.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Information Automatically Collected</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Usage Data:</strong> We collect information about how you interact with our Service, including pages visited, features used, and time spent.</li>
                <li><strong>Device Information:</strong> We may collect device information such as IP address, browser type, operating system, and device identifiers.</li>
                <li><strong>Log Data:</strong> We collect server logs that may include IP addresses, access times, and pages viewed.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Facebook Data</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                When you use our Service to search for Facebook ads, we access Facebook's Ads Library API. We collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Ad Data:</strong> Publicly available ad information from Facebook's Ads Library, including ad content, delivery information, page information, and performance metrics.</li>
                <li><strong>Search Parameters:</strong> Your search criteria (keywords, countries, date ranges) used to query Facebook's Ads Library.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <strong>Important:</strong> We only access publicly available ad data from Facebook's Ads Library. 
                We do not access your personal Facebook account data, friends list, or private information.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the collected information for the following purposes:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.1 Service Provision</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>To provide, maintain, and improve our Service</li>
                <li>To process your searches and display ad results</li>
                <li>To create and manage your account</li>
                <li>To authenticate and authorize your access</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.2 Data Analysis</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>To analyze usage patterns and improve our Service</li>
                <li>To generate aggregated, anonymized reports</li>
                <li>To understand how users interact with our Service</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.3 Communication</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>To send you service-related notifications</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send you important updates about our Service</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.4 Legal Compliance</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To comply with legal obligations</li>
                <li>To enforce our Terms of Service</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Facebook Data Usage</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.1 Facebook Ads Library API</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Service uses Facebook's Ads Library API to access publicly available ad data. 
                We use this data to display ad search results, store ad information for faster retrieval, 
                generate reports and analytics, and provide ad classification features.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.2 Data Storage</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>We store ad data retrieved from Facebook's Ads Library in our secure database</li>
                <li>This data is stored to improve search performance and provide historical access</li>
                <li>We maintain this data in accordance with Facebook's terms and applicable laws</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.3 Data Sharing with Facebook</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We do not share your personal information with Facebook</li>
                <li>We only access publicly available ad data through Facebook's official APIs</li>
                <li>We comply with Facebook's Platform Policy and Terms of Service</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Storage and Security</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">5.1 Data Storage</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your data is stored on secure servers provided by our hosting partners</li>
                <li>We use industry-standard encryption to protect data in transit and at rest</li>
                <li>Database access is restricted to authorized personnel only</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">5.2 Security Measures</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We implement appropriate technical and organizational measures:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Encryption:</strong> Data is encrypted using SSL/TLS protocols</li>
                <li><strong>Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
                <li><strong>Regular Audits:</strong> We conduct regular security assessments</li>
                <li><strong>Secure Authentication:</strong> Passwords are hashed using industry-standard algorithms</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">5.3 Data Retention</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Account Data:</strong> Retained while your account is active</li>
                <li><strong>Search History:</strong> Retained for service improvement and user convenience</li>
                <li><strong>Ad Data:</strong> Retained in accordance with our service requirements and legal obligations</li>
                <li><strong>Deletion:</strong> You may request deletion of your data at any time</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.1 Service Providers</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We may share information with third-party service providers who perform services on our behalf:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Hosting Services: Cloud infrastructure providers</li>
                <li>Database Services: Database hosting and management</li>
                <li>Email Services: For sending notifications and communications</li>
                <li>Analytics Services: For understanding usage patterns (anonymized data only)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.2 Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We may disclose your information if required by law or in response to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Court orders or legal processes</li>
                <li>Government requests</li>
                <li>Law enforcement requests</li>
                <li>Protection of our rights, property, or safety</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.3 Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.4 With Your Consent</h3>
              <p className="text-gray-700 leading-relaxed">
                We may share your information with your explicit consent for specific purposes.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You have the following rights regarding your personal information:</p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> You can access and review your personal information through your account settings.</li>
                <li><strong>Correction:</strong> You can update or correct your personal information at any time through your account settings.</li>
                <li><strong>Deletion:</strong> You can request deletion of your account and associated data by contacting us.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your data in a machine-readable format.</li>
                <li><strong>Opt-Out:</strong> You can opt-out of non-essential communications by adjusting your notification preferences.</li>
                <li><strong>Account Deletion:</strong> You can delete your account at any time, which will result in the deletion of your personal information.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Cookies and Tracking Technologies</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">8.1 Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Maintain your session</li>
                <li>Remember your preferences</li>
                <li>Analyze usage patterns</li>
                <li>Improve our Service</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">8.2 Cookie Types</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the Service to function</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">8.3 Cookie Management</h3>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. However, disabling cookies may affect Service functionality.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Our Service may integrate with third-party services:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">9.1 Facebook</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>We use Facebook's Ads Library API to access publicly available ad data</li>
                <li>We comply with Facebook's Platform Policy</li>
                <li>For Facebook's privacy practices, see: <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Privacy Policy</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">9.2 Google Services</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>We use Google Sheets API for exporting data (with your authorization)</li>
                <li>We use Google OAuth for authentication</li>
                <li>For Google's privacy practices, see: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Privacy Policy</a></li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service is not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If you believe we have collected information 
                from a child under 13, please contact us immediately.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. 
                These countries may have different data protection laws. We take appropriate measures to ensure your 
                information is protected in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending you an email notification (for material changes)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Your continued use of the Service after changes become effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@yourdomain.com</p>
                <p className="text-gray-700 mb-2"><strong>Address:</strong> [Your Company Address]</p>
                <p className="text-gray-700"><strong>Phone:</strong> [Your Contact Number]</p>
                <p className="text-gray-700 mt-4">
                  For data protection inquiries, you can also contact our Data Protection Officer at: dpo@yourdomain.com
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Compliance</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We comply with applicable data protection laws, including:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>GDPR</strong> (General Data Protection Regulation) - for EU users</li>
                <li><strong>CCPA</strong> (California Consumer Privacy Act) - for California residents</li>
                <li>Other applicable regional data protection laws</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">15. Facebook Platform Policy Compliance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We comply with Facebook's Platform Policy, including:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Data Use:</strong> We only use Facebook data for the purposes stated in this policy</li>
                <li><strong>Data Retention:</strong> We retain Facebook data only as necessary for our Service</li>
                <li><strong>Data Sharing:</strong> We do not share Facebook data with third parties except as described in this policy</li>
                <li><strong>User Consent:</strong> We obtain appropriate consent before accessing Facebook data</li>
                <li><strong>Data Security:</strong> We implement appropriate security measures to protect Facebook data</li>
              </ul>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                This Privacy Policy is effective as of the "Last Updated" date and applies to all users of our Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

