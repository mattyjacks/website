"use client";

import Link from "next/link";
import { Shield, Lock, Eye, Database, Share2, Cookie, Globe, FileText, Mail } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp } from "@/lib/animations/scroll-animations";

export default function PrivacyPolicyPage() {
  const headerRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const contentRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  return (
    <main className="min-h-screen px-4 py-14">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 12, 2025
          </p>
        </div>

        <div ref={contentRef} className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Introduction</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  MattyJacks (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Company&quot;) operates mattyjacks.com and related services (collectively, the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
                  By using our Service, you consent to the data practices described in this policy. We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the &quot;Last Updated&quot; date of this Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Personal Information</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
                  <li>Register or create an account</li>
                  <li>Contact us via email, phone, or other communication channels</li>
                  <li>Fill out forms or surveys</li>
                  <li>Subscribe to our newsletters or mailing lists</li>
                  <li>Purchase products or services</li>
                  <li>Participate in promotions, contests, or giveaways</li>
                </ul>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
                  This information may include: name, email address, phone number, mailing address, payment information, company name, job title, social media profiles, and any other information you choose to provide.
                </p>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Automatically Collected Information</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  When you access our Service, we automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
                  <li><strong>IP Address:</strong> We collect your IP address and may use it to determine your approximate geographic location</li>
                  <li><strong>Browser and Device Information:</strong> Browser type and version, operating system, device type, screen resolution, and unique device identifiers</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, referring website, search terms used, and interaction with our content</li>
                  <li><strong>Location Data:</strong> Geolocation information derived from your IP address or GPS data (with your permission)</li>
                  <li><strong>Cookies and Tracking Technologies:</strong> Information collected through cookies, web beacons, pixels, and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Cookies and Tracking Technologies</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We use cookies, web beacons, tracking pixels, and other tracking technologies to collect and store information about your preferences and browsing behavior. Cookies are small data files stored on your device that help us:
                </p>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our Service</li>
                  <li>Improve our Service and your user experience</li>
                  <li>Deliver targeted advertising and marketing</li>
                  <li>Track conversions and measure campaign effectiveness</li>
                  <li>Analyze traffic and user behavior patterns</li>
                </ul>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
                  Most web browsers are set to accept cookies by default. You can choose to set your browser to remove or reject cookies, but this may affect the availability and functionality of our Service.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Third-Party Services</h2>
                
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Google Analytics</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We use Google Analytics, a web analytics service provided by Google, Inc. (&quot;Google&quot;), to collect and analyze information about how visitors use our Service. Google Analytics uses cookies and similar technologies to track your interactions with our Service, including pages visited, time spent, and actions taken.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
                  Google may use this data to contextualize and personalize ads within its advertising network. To learn more about Google&apos;s privacy practices, visit: <a href="https://policies.google.com/privacy" className="text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 underline">https://policies.google.com/privacy</a>
                </p>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Vercel Hosting</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Our Service is hosted on Vercel, a cloud platform provider. Vercel may collect technical information such as your IP address, browser type, and system information for the purpose of providing hosting services and maintaining the security and performance of our website. For more information about Vercel&apos;s privacy practices, visit: <a href="https://vercel.com/legal/privacy-policy" className="text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 underline">https://vercel.com/legal/privacy-policy</a>
                </p>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Other Third-Party Services</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may also use other third-party service providers for analytics, advertising, payment processing, email marketing, customer relationship management, and other business purposes. These third parties may have access to your information as necessary to perform their functions but are obligated not to disclose or use it for other purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Eye className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">How We Use Your Information</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may use the information we collect from you for various purposes, including but not limited to:
                </p>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
                  <li>Providing, operating, and maintaining our Service</li>
                  <li>Improving, personalizing, and expanding our Service</li>
                  <li>Understanding and analyzing how you use our Service</li>
                  <li>Developing new products, services, features, and functionality</li>
                  <li>Communicating with you for customer service, updates, marketing, and promotional purposes</li>
                  <li>Processing transactions and sending transaction-related information</li>
                  <li>Sending you newsletters, marketing materials, and other information that may be of interest to you</li>
                  <li>Managing your account and providing customer support</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Monitoring and analyzing usage and trends</li>
                  <li>Detecting, preventing, and addressing technical issues, fraud, or illegal activities</li>
                  <li>Enforcing our terms, conditions, and policies</li>
                  <li>Conducting research and data analysis</li>
                  <li>Creating anonymized or aggregated data sets for business purposes</li>
                  <li>Marketing, advertising, and promotional activities</li>
                  <li>Any other purpose with your consent or as permitted by law</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Share2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Disclosure of Your Information</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may share your information in the following situations:
                </p>
                
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">With Third Parties</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may share your information with third-party service providers, partners, affiliates, contractors, vendors, and other parties who perform services on our behalf or with whom we conduct business. This includes but is not limited to:
                </p>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
                  <li>Analytics and advertising partners</li>
                  <li>Marketing and email service providers</li>
                  <li>Payment processors and financial institutions</li>
                  <li>Customer relationship management (CRM) platforms</li>
                  <li>Hosting and infrastructure providers</li>
                  <li>Data brokers and data aggregators</li>
                  <li>Business partners and affiliates</li>
                </ul>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Sale or Transfer of Data</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We reserve the right to sell, license, rent, transfer, or otherwise disclose your information to third parties for their own marketing, advertising, research, or other business purposes. This may include selling or licensing your information to:
                </p>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
                  <li>Data brokers and data marketplaces</li>
                  <li>Advertising networks and marketing companies</li>
                  <li>Business partners and affiliates</li>
                  <li>Other third parties for their commercial purposes</li>
                </ul>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Business Transfers</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                </p>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">Legal Requirements</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, or to protect our rights, property, or safety, or that of our users or the public.
                </p>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">With Your Consent</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may disclose your information for any other purpose with your consent or at your direction.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Data Security</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We use administrative, technical, and physical security measures designed to protect your information. However, no security system is impenetrable, and we cannot guarantee the security of our systems or databases, nor can we guarantee that information you supply will not be intercepted while being transmitted over the Internet.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
                  By using our Service, you acknowledge and accept that you transmit information at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Service.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Data Retention</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We will retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law. We may also retain cached or archived copies of your information. We may retain anonymized or aggregated data indefinitely for analytics and business purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Your Rights and Choices</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Depending on your location and applicable laws, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
                  <li><strong>Access:</strong> The right to request access to the personal information we hold about you</li>
                  <li><strong>Correction:</strong> The right to request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> The right to request deletion of your information, subject to certain exceptions</li>
                  <li><strong>Opt-Out:</strong> The right to opt-out of marketing communications</li>
                  <li><strong>Cookie Management:</strong> The right to control cookie settings through your browser</li>
                </ul>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
                  To exercise any of these rights, please contact us using the information provided below. We may require verification of your identity before processing your request. Please note that we may need to retain certain information for recordkeeping purposes or to complete transactions that you began prior to requesting a change or deletion.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
                  We reserve the right to deny requests that are unreasonably repetitive, require disproportionate technical effort, risk the privacy of others, or are impractical.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Children&apos;s Privacy</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information from our systems.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Third-Party Websites and Links</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Our Service may contain links to third-party websites and services that are not operated by us. If you click on a third-party link, you will be directed to that third party&apos;s site. We strongly advise you to review the privacy policy of every site you visit.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
                  We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Changes to This Privacy Policy</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this Privacy Policy.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. Your continued use of our Service after any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide by the modified policy.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">Contact Us</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-zinc-900 dark:text-zinc-100 font-semibold">MattyJacks</p>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    Email: <a href="mailto:Matt@MattyJacks.com" className="text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 underline">Matt@MattyJacks.com</a>
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    Phone: <a href="tel:+16039999420" className="text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 underline">603 999 9420</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 bg-emerald-50 dark:bg-emerald-950/20 mt-8">
            <p className="text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
              <strong>Acknowledgment:</strong> By using our Service, you acknowledge that you have read this Privacy Policy and agree to its terms. If you do not agree with this Privacy Policy, please do not access or use our Service.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-md hover:shadow-red-500/25 hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
