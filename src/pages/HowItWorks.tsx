import {
  Smartphone,
  CheckCircle2,
  Box,
  Wallet,
  ArrowRight,
  Zap,
  Printer,
  Package,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Lock,
  Star,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header />

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-20 pb-10 sm:pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            Simple 4-Step Process
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-4 sm:mb-6">
            How It <span className="text-red-600">Works</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed px-2">
            Selling your phone has never been easier. Follow our simple 4-step process to turn your old device into cash in 24 hours.
          </p>
          <Link to="/sell">
            <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl flex items-center gap-2 mx-auto transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto justify-center">
              Get Your Quote Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      {/* ── 4 STEPS ── */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-8">

          {[
            {
              num: 1,
              icon: Smartphone,
              title: 'Select Your Device',
              color: 'from-red-500 to-red-600',
              light: 'bg-red-50',
              iconColor: 'text-red-600',
              border: 'border-red-100',
              tag: 'Takes 60 seconds',
              tagBg: 'bg-red-50 text-red-600',
              body: [
                'Choose your phone model from our extensive list of iPhones (11–16 series) and Samsung Galaxy devices (S21–S25). Select the condition — Good, Poor, or Broken.',
                'Be honest about your device\'s condition. Our instant quote calculator will show you the exact price based on your selection. The whole process takes less than 60 seconds!',
              ],
            },
            {
              num: 2,
              icon: CheckCircle2,
              title: 'Accept Your Quote',
              color: 'from-red-600 to-red-700',
              light: 'bg-red-50',
              iconColor: 'text-red-600',
              border: 'border-red-100',
              tag: 'No obligation',
              tagBg: 'bg-red-50 text-red-600',
              body: [
                'Happy with the price? Fill in your details including your UK bank account information for payment and choose your preferred postage method.',
                "You can either print our free prepaid shipping label at home or request a free packaging kit to be sent to you. We'll email everything within minutes of your order.",
              ],
            },
            {
              num: 3,
              icon: Box,
              title: 'Ship Your Phone',
              color: 'from-blue-500 to-blue-600',
              light: 'bg-blue-50',
              iconColor: 'text-blue-600',
              border: 'border-blue-100',
              tag: 'Fully insured',
              tagBg: 'bg-blue-50 text-blue-600',
              body: [
                'Pack your phone securely in a box or padded envelope. Remove your SIM card and perform a factory reset to protect your data.',
                'Drop off your package at any post office or courier collection point. Your device is fully insured during transit, so you can relax knowing it\'s protected.',
              ],
            },
            {
              num: 4,
              icon: Wallet,
              title: 'Get Paid Fast',
              color: 'from-green-500 to-green-600',
              light: 'bg-green-50',
              iconColor: 'text-green-600',
              border: 'border-green-100',
              tag: 'Within 24 hours',
              tagBg: 'bg-green-50 text-green-600',
              body: [
                'Once we receive your device, our expert technicians inspect it to verify the condition matches your description. Payment is sent within 24 hours.',
                'Money is transferred directly to your UK bank account via faster payments. No vouchers, no gift cards — just cash in your account the very next day!',
              ],
            },
          ].map(({ num, icon: Icon, title, color, light, iconColor, border, tag, tagBg, body }) => (
            <div key={num} className={`bg-white rounded-2xl sm:rounded-3xl border ${border} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}>
              <div className="flex flex-col md:flex-row">
                {/* Step number — top bar on mobile, left sidebar on md+ */}
                <div className={`bg-gradient-to-br ${color} md:w-24 flex flex-row md:flex-col items-center gap-3 md:gap-0 px-4 py-3 md:px-0 md:py-0 md:justify-center`}>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest md:hidden">Step</div>
                  <div className="text-2xl md:text-7xl font-extrabold text-white/30">{num}</div>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest hidden md:block md:mt-8 md:order-first">Step</div>
                </div>
                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 sm:w-12 sm:h-12 ${light} ${iconColor} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900">{title}</h2>
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${tagBg} flex-shrink-0`}>{tag}</span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {body.map((para, i) => (
                      <p key={i} className="text-gray-500 leading-relaxed text-xs sm:text-sm">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below steps */}
        <div className="max-w-5xl mx-auto mt-8 sm:mt-12 flex flex-col items-center gap-3 px-4">
          <Link to="/sell" className="w-full sm:w-auto">
            <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5 text-sm sm:text-base w-full justify-center">
              Get Your Quote Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <p className="text-xs sm:text-sm text-gray-400 text-center">No obligation · Free postage · Paid in 24 hours</p>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> Why Choose Our Service?
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Simple, Secure & <span className="text-red-600">Rewarding</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto px-2">We've made selling phones simple, secure, and rewarding.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            {[
              { icon: Zap, title: 'Instant Quote', desc: 'Get a real-time valuation based on your device model and condition. Our pricing is transparent and competitive.', bg: 'bg-red-50', color: 'text-red-600', border: 'hover:border-red-200' },
              { icon: Printer, title: 'Free Postage', desc: 'Choose between printing a prepaid label or receiving a free packaging kit delivered to your door.', bg: 'bg-blue-50', color: 'text-blue-600', border: 'hover:border-blue-200' },
              { icon: ShieldCheck, title: 'Device Inspection', desc: 'Our certified technicians carefully inspect your device to ensure it matches the described condition.', bg: 'bg-red-50', color: 'text-red-600', border: 'hover:border-red-200' },
              { icon: TrendingUp, title: 'Fast Payment', desc: 'Payments are processed via UK bank transfer within 24 hours of receiving your device.', bg: 'bg-green-50', color: 'text-green-600', border: 'hover:border-green-200' },
            ].map(({ icon: Icon, title, desc, bg, color, border }) => (
              <div key={title} className={`group p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gray-50 border-2 border-transparent ${border} hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex gap-4 sm:gap-5`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bg} ${color} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTAGE OPTIONS ── */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
              <Package className="w-3.5 h-3.5" /> Postage Options
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Choose Your <span className="text-red-600">Postage Method</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto px-2">Select the option that works best for you — both are completely free.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Print Label */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Printer className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-red-200 font-semibold mb-0.5">Option 1</div>
                  <h3 className="text-base sm:text-xl font-extrabold text-white">Print Our Label</h3>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                {[
                  'Receive prepaid label via email within minutes',
                  'Print at home or at any print shop',
                  'Drop off at any post office same day',
                  'Fastest option — start shipping immediately',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-600">{item}</span>
                  </div>
                ))}
                <Link to="/sell" className="block mt-4 sm:mt-5">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 group">
                    Choose This Option <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Send a Pack */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-semibold mb-0.5">Option 2</div>
                  <h3 className="text-base sm:text-xl font-extrabold text-white">Send a Pack</h3>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                {[
                  'Free packaging kit delivered to your address',
                  'Includes secure packaging and prepaid label',
                  'No printer needed — everything included',
                  'Arrives within 2–3 working days',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-600">{item}</span>
                  </div>
                ))}
                <Link to="/sell" className="block mt-4 sm:mt-5">
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 group">
                    Choose This Option <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEES ── */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Our Guarantees
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4 px-2">
              Your <span className="text-red-600">Peace of Mind</span> is Our Priority
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {[
              { icon: Clock, title: '24-Hour Payment', desc: 'We guarantee payment within 24 hours of receiving your device. Most customers get paid the very next day.', bg: 'bg-green-50', color: 'text-green-600', stat: '24hrs', statLabel: 'Guaranteed' },
              { icon: Lock, title: 'Data Security', desc: 'Military-grade data wiping ensures all your personal information is permanently and securely erased.', bg: 'bg-red-50', color: 'text-red-600', stat: '100%', statLabel: 'Data Wiped' },
              { icon: ShieldCheck, title: 'Insured Shipping', desc: "Your device is fully insured during transit. If anything goes wrong, you're completely covered.", bg: 'bg-blue-50', color: 'text-blue-600', stat: '£1000', statLabel: 'Cover' },
            ].map(({ icon: Icon, title, desc, bg, color, stat, statLabel }) => (
              <div key={title} className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-transparent hover:border-red-100 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Mobile: horizontal row; sm+: centered vertical */}
                <div className="flex sm:flex-col sm:items-center items-center gap-4 sm:gap-0 mb-3 sm:mb-0">
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 ${bg} ${color} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <div className="sm:text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-red-600 leading-none">{stat}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest sm:mb-3">{statLabel}</div>
                  </div>
                </div>
                <div className="sm:text-center">
                  <h3 className="font-extrabold text-gray-900 text-sm sm:text-lg mb-1 sm:mb-3">{title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 md:px-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
          {[
            { value: '50,000+', label: 'Phones Bought' },
            { value: '£12M+', label: 'Paid to Customers' },
            { value: '24hrs', label: 'Average Payout' },
            { value: '4.9★', label: 'Trustpilot Rating' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white sm:bg-transparent rounded-2xl sm:rounded-none p-3 sm:p-0 border border-gray-100 sm:border-0">
              <div className="text-xl sm:text-3xl font-extrabold text-gray-900">{value}</div>
              <div className="text-gray-400 text-[11px] sm:text-xs font-medium mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative bg-white overflow-hidden py-12 sm:py-20 px-4 sm:px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-red-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-red-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Star className="w-3.5 h-3.5 text-red-500" fill="currentColor" /> Trusted by 50,000+ Customers
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-5 leading-tight">
            Ready to Get <span className="text-red-600">Started?</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg mb-7 sm:mb-10 max-w-xl mx-auto px-2">
            Join thousands of satisfied customers who have turned their old phones into cash. Get your instant quote in less than 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/sell" className="w-full sm:w-auto">
              <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5 w-full justify-center text-sm sm:text-base">
                Get Your Quote Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/" className="w-full sm:w-auto">
              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl transition-all w-full text-sm sm:text-base">
                Back to Home
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-7 sm:mt-10">
            {[
              { icon: ShieldCheck, text: 'Free & Secure', color: 'text-red-500' },
              { icon: Clock, text: 'Paid in 24 Hours', color: 'text-red-600' },
              { icon: Lock, text: 'Data Wiped', color: 'text-red-500' },
              { icon: BadgeCheck, text: 'No Hidden Fees', color: 'text-red-500' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm">
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color}`} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
