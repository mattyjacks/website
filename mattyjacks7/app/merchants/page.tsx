"use client";

import { useRef } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Shield, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Globe, 
  Users, 
  Phone,
  ShoppingCart,
  Store,
  Heart,
  Plane,
  Car,
  Gamepad2,
  Wallet,
  Trophy,
  Briefcase,
  Package,
  Pill,
  Sparkles,
  FileText,
  Clock,
  DollarSign,
  Lock,
  Headphones,
  ArrowRight
} from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, slideInGrid, scaleIn } from "@/lib/animations/scroll-animations";

export default function MerchantsPage() {
  const heroRef = useRef<HTMLElement>(null);
  
  const heroContentRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const benefitsRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const industriesRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const featuresRef = useScrollAnimation<HTMLDivElement>(scaleIn);
  const ctaRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  const highRiskIndustries = [
    { name: "Adult Entertainment", icon: Heart },
    { name: "Airlines & Travel Booking", icon: Plane },
    { name: "Auto Warranty", icon: Car },
    { name: "CBD Products", icon: Pill },
    { name: "Credit Repair & Monitoring", icon: TrendingUp },
    { name: "Dating Services", icon: Users },
    { name: "Debt Collection", icon: FileText },
    { name: "E-Cigarette & Vape", icon: Sparkles },
    { name: "Fantasy Sports", icon: Trophy },
    { name: "Firearms", icon: Shield },
    { name: "Online Gaming", icon: Gamepad2 },
    { name: "Nutraceuticals", icon: Pill },
    { name: "Pawn Shops", icon: Store },
    { name: "Payday Lenders", icon: Wallet },
    { name: "Subscription Boxes", icon: Package },
    { name: "Multi-level Marketing", icon: Users },
    { name: "High Ticket Coaching", icon: Briefcase },
    { name: "Health & Beauty", icon: Sparkles },
    { name: "Business Opportunities", icon: TrendingUp },
    { name: "Continuity Billing", icon: Clock },
  ];

  const lowRiskIndustries = [
    { name: "E-commerce & Retail", icon: ShoppingCart },
    { name: "Professional Services", icon: Briefcase },
    { name: "Business Consulting", icon: Users },
    { name: "Software & SaaS", icon: Zap },
    { name: "Education & Training", icon: FileText },
    { name: "Local Services", icon: Store },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-[70vh] flex items-center pt-32 pb-16 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-zinc-900 dark:to-emerald-950/20"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div ref={heroContentRef} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-6 animate-bounce">
              <Zap className="w-4 h-4" />
              <span>3 Day Approvals</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
              Merchant Account Solutions for Every Business
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
              Secure, reliable payment processing for <span className="font-bold text-emerald-600 dark:text-emerald-400">USA & Canada</span> based businesses. From low-risk to high-risk industries, we&apos;ve got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg hover:shadow-red-500/25 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a
                href="tel:+16039999420"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-zinc-900 dark:text-white bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                <Phone className="mr-2 w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>603-999-9420</span>
              </a>
            </div>

            <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Secured through our giant partner company
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="px-4 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">
              Why Choose <span className="font-bold text-red-600 dark:text-red-500">Our Services</span>
            </p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
              Built for Your Success
            </h2>
          </div>

          <div ref={benefitsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Fast Approvals",
                description: "Same-day approval for low-risk accounts. High-risk approvals in 5-10 business days."
              },
              {
                icon: Shield,
                title: "High-Risk Specialists",
                description: "20+ proven bank relationships. We handle what traditional banks won't."
              },
              {
                icon: DollarSign,
                title: "Transparent Pricing",
                description: "No hidden fees, no long-term contracts. Highly competitive rates."
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Dedicated account managers and round-the-clock customer support."
              },
              {
                icon: Globe,
                title: "USA & Canada Focus",
                description: "Specialized solutions for North American businesses with local support."
              },
              {
                icon: CreditCard,
                title: "Multiple Payment Options",
                description: "Accept credit cards, debit cards, ACH, e-checks, and mobile payments."
              },
              {
                icon: Lock,
                title: "Chargeback Prevention",
                description: "Advanced fraud detection and chargeback protection tools included."
              },
              {
                icon: TrendingUp,
                title: "Scale with Confidence",
                description: "E-commerce gateways, POS terminals, and recurring billing solutions."
              },
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-500 hover:-translate-y-2 transition-all duration-300 ease-out"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-Risk Industries Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div ref={industriesRef} className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">
              We Specialize In <span className="font-bold text-red-600 dark:text-red-500">High-Risk</span>
            </p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent mb-4">
              High-Risk Industries We Serve
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
              Traditional banks turn you away? We specialize in getting high-risk businesses approved with competitive rates and reliable service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {highRiskIndustries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-800/50 group-hover:scale-110 transition-all duration-200">
                    <IconComponent className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200">
                    {industry.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
              Don&apos;t see your industry? We work with many more high-risk sectors.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors"
            >
              Contact us to discuss your specific needs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Low-Risk Industries Section */}
      <section className="px-4 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">
              Low-Risk <span className="font-bold text-red-600 dark:text-red-500">Solutions Too</span>
            </p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent mb-4">
              Traditional Merchant Accounts
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
              Not every business is high-risk. We offer competitive rates and same-day approval for traditional businesses too.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {lowRiskIndustries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-5 rounded-xl bg-white dark:bg-zinc-950 border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 group-hover:scale-110 transition-all duration-200">
                    <IconComponent className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-200">
                    {industry.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-zinc-900 dark:to-emerald-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">
              Complete <span className="font-bold text-red-600 dark:text-red-500">Payment Solutions</span>
            </p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
              Everything You Need to Accept Payments
            </h2>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                Merchant Account Experts
              </h3>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>20+ Proven Bank Relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Medium & High-Risk Accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Fast Merchant Account Approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>E-Commerce & Retail Options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>B2B Vendors Supported</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                Multiple Payment Solutions
              </h3>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Multiple E-Commerce Gateways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Chargeback Prevention Tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>ACH, E-Check, Credit Cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>3D Secure Checkout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Mobile Payment Processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>EMV Chip Readers</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                Technology & Support
              </h3>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Gateway Recurring Billing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Secure Payment Vault</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>E-Commerce Cart Plugins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>POS Systems & Terminals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>International Merchant Accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">✓</span>
                  <span>Dedicated Account Managers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20 border-t border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={ctaRef}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Accepting Payments?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
              Whether you&apos;re high-risk or low-risk, we have the solution for your USA or Canada based business. Get started today with transparent pricing and expert support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-600 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <span>Get Your Free Quote</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a
                href="tel:+16039999420"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                <Phone className="mr-2 w-5 h-5" />
                <span>603-999-9420</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-emerald-50">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Fast Approvals</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>Competitive Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
