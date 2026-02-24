import {
  Smartphone,
  ShieldCheck,
  Zap,
  BadgeCheck,
  CheckCircle2,
  Box,
  Wallet,
  TrendingUp,
  Clock,
  Lock,
  HeadphonesIcon,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header />

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-red-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        {/* ── MOBILE LAYOUT (< md) ── */}
        <div className="md:hidden relative px-4 pt-8 pb-0">
          {/* Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              UK's Most Trusted Phone Buying Service
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-gray-900 text-center mb-3">
            Turn Your Old Phone Into{' '}
            <span className="text-red-600">Cash</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed text-center mb-6 px-2">
            Get competitive prices in minutes. Safe, secure, and hassle-free.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <Link to="/sell">
              <button className="w-full group bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-200 text-base">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="#how-it-works">
              <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl transition-all text-sm">
                How It Works
              </button>
            </a>
          </div>

          {/* Phone image card — clean, no absolute overlays */}
          <div className="relative mx-auto w-full max-w-[320px]">
            {/* Soft background blob behind phone */}
            <div className="absolute inset-x-4 bottom-0 h-3/4 bg-gradient-to-t from-red-100 to-red-50 rounded-3xl" />
            <img
              src="https://res.cloudinary.com/dn2sab6qc/image/upload/v1771700755/Hero_Image_caeavu.png"
              alt="Sell your phone for cash"
              className="relative z-10 w-full h-[260px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Trust chips row — 3 chips, single line */}
          <div className="flex justify-center gap-3 pt-5 pb-6">
            <div className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
              <TrendingUp className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              <div>
                <div className="text-xs font-extrabold text-gray-900 leading-none">£420</div>
                <div className="text-[10px] text-gray-400 leading-none mt-0.5">avg payout</div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
              <Clock className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
              <div>
                <div className="text-xs font-extrabold text-gray-900 leading-none">24 hrs</div>
                <div className="text-[10px] text-gray-400 leading-none mt-0.5">paid within</div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center gap-1.5 bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-2.5">
              <Star className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" fill="currentColor" />
              <div>
                <div className="text-xs font-extrabold text-gray-900 leading-none">4.9★</div>
                <div className="text-[10px] text-gray-400 leading-none mt-0.5">rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (md+) ── */}
        <div className="hidden md:grid relative max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-0 grid-cols-2 gap-12 items-end">
          {/* Left */}
          <div className="space-y-8 pb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              UK's Most Trusted Phone Buying Service
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
              Turn Your Old<br />Phone Into{' '}
              <span className="text-red-600">Cash</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Get competitive prices for your phone in minutes. Safe, secure, and hassle-free. We buy all models in any condition.
            </p>
            <div className="flex gap-4">
              <Link to="/sell">
                <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#how-it-works">
                <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all">
                  How It Works
                </button>
              </a>
            </div>
            <div className="flex gap-6 pt-2">
              {[
                { icon: ShieldCheck, label: 'Secure Payment', color: 'text-red-500' },
                { icon: Zap, label: 'Instant Quote', color: 'text-red-600' },
                { icon: BadgeCheck, label: 'Best Price', color: 'text-red-500' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 text-gray-500 text-sm">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — phone image with floating cards */}
          <div className="relative flex justify-center">
            <div className="absolute -left-4 top-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 z-20">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Average payout</div>
                <div className="text-lg font-extrabold text-gray-900">£420</div>
              </div>
            </div>
            <div className="absolute -right-2 top-1/3 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 z-20">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Paid within</div>
                <div className="text-lg font-extrabold text-gray-900">24 Hours</div>
              </div>
            </div>
            <div className="absolute left-8 bottom-20 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 z-20">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-red-600" fill="currentColor" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Customer rating</div>
                <div className="text-lg font-extrabold text-gray-900">4.9 / 5.0</div>
              </div>
            </div>
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-red-100/60 to-transparent rounded-[2.5rem] z-0" />
              <img
                src="https://res.cloudinary.com/dn2sab6qc/image/upload/v1771700755/Hero_Image_caeavu.png"
                alt="Sell your phone for cash"
                className="relative z-10 w-72 md:w-80 h-[480px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hidden md:block border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-5 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: '50,000+', label: 'Phones Bought' },
              { value: '£12M+', label: 'Paid to Customers' },
              { value: '24hrs', label: 'Average Payout' },
              { value: '4.9★', label: 'Trustpilot Rating' },
            ].map(({ value, label }) => (
              <div key={label} className="py-1">
                <div className="text-xl sm:text-2xl font-extrabold text-gray-900">{value}</div>
                <div className="text-gray-400 text-xs font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-full mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" /> Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto px-2">
              Four simple steps to turn your old device into cash — takes less than 60 seconds.
            </p>
          </div>

          {/* Steps — 2-col on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
            <div className="hidden md:block absolute top-[52px] left-[14%] right-[14%] h-px bg-gradient-to-r from-red-200 via-red-200 to-red-200 z-0" />

            {[
              { num: 1, icon: Smartphone, title: 'Select Device', desc: 'Choose your model and storage. Our instant calculator shows your exact price in seconds.', color: 'from-red-500 to-red-600', light: 'bg-red-50', iconColor: 'text-red-600' },
              { num: 2, icon: CheckCircle2, title: 'Accept Quote', desc: 'Happy with the price? Fill in your details and choose your preferred free postage method.', color: 'from-red-500 to-red-600', light: 'bg-red-50', iconColor: 'text-red-600' },
              { num: 3, icon: Box, title: 'Ship Your Phone', desc: 'Pack securely and drop at any post office. Your device is fully insured during transit.', color: 'from-blue-500 to-blue-600', light: 'bg-blue-50', iconColor: 'text-blue-600' },
              { num: 4, icon: Wallet, title: 'Get Paid Fast', desc: 'We inspect and pay directly to your bank within 24 hours. No vouchers — just real cash.', color: 'from-green-500 to-green-600', light: 'bg-green-50', iconColor: 'text-green-600' },
            ].map(({ num, icon: Icon, title, desc, color, light, iconColor }) => (
              <div key={num} className="relative z-10 group">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br ${color} text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-extrabold text-sm sm:text-lg mb-3 sm:mb-5 shadow-lg`}>
                    {num}
                  </div>
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 ${light} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-lg text-gray-900 mb-1.5 sm:mb-3 leading-tight">{title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed hidden sm:block">{desc}</p>
                  <p className="text-gray-500 text-xs leading-relaxed sm:hidden">{desc.split('.')[0]}.</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info strip */}
          <div className="mt-6 sm:mt-10 grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Lightning Fast Payment</h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">We process payments within 24 hours of receiving your device. Most customers get paid the very next day via bank transfer.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Your Data is Safe</h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">We use military-grade data wiping procedures to ensure all your personal information is permanently erased from your device.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col items-center gap-3 sm:gap-4">
            <Link to="/sell" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group bg-red-600 hover:bg-red-700 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5">
                Get Your Quote Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 font-medium">
              <span>Free instant quote</span><span>•</span>
              <span>No obligation</span><span>•</span>
              <span>Get paid in 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-4 py-2 rounded-full mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> Why We're Different
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">Why Choose Cash My Mobile?</h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto px-2">
              We're not just another phone buying service. Here's what makes us the UK's most trusted.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {[
              { icon: TrendingUp, title: 'Best Prices Guaranteed', desc: 'We offer competitive prices that beat most competitors. Get the true value of your device — we price match any genuine quote.', bg: 'bg-blue-50', color: 'text-blue-600', border: 'hover:border-blue-200', tag: 'Price Match' },
              { icon: Clock, title: 'Paid in 24 Hours', desc: 'Get paid within 24 hours of us receiving your device. Direct bank transfer — no vouchers, no gift cards, just real cash.', bg: 'bg-red-50', color: 'text-red-600', border: 'hover:border-red-200', tag: 'Lightning Fast' },
              { icon: ShieldCheck, title: 'Safe & Secure', desc: "Your data is wiped using military-grade methods. We're fully certified, insured, and compliant with UK data protection laws.", bg: 'bg-red-50', color: 'text-red-600', border: 'hover:border-red-200', tag: 'Certified' },
              { icon: BadgeCheck, title: 'Trusted Service', desc: 'Thousands of happy customers across the UK. Transparent pricing, honest assessments, and no hidden fees — ever.', bg: 'bg-green-50', color: 'text-green-600', border: 'hover:border-green-200', tag: '4.9★ Rated' },
              { icon: Lock, title: 'Data Protection', desc: 'We ensure all your personal data is completely and permanently erased from your device before it leaves our facility.', bg: 'bg-amber-50', color: 'text-amber-600', border: 'hover:border-amber-200', tag: 'GDPR Compliant' },
              { icon: HeadphonesIcon, title: 'Expert Support', desc: 'Our friendly UK-based team is here to help at every step. Questions? We\'re just a call or email away — always.', bg: 'bg-rose-50', color: 'text-rose-600', border: 'hover:border-rose-200', tag: 'UK Based' },
            ].map(({ icon: Icon, title, desc, bg, color, border, tag }) => (
              <div key={title} className={`group p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gray-50 border-2 border-transparent ${border} hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 ${bg} ${color} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <span className={`text-xs font-bold ${bg} ${color} px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap ml-2`}>{tag}</span>
                </div>
                <h3 className="text-base sm:text-xl font-extrabold mb-2 sm:mb-3 text-gray-900">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-xs sm:text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="faq" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 text-xs font-bold px-4 py-2 rounded-full mb-4">
              <Star className="w-3.5 h-3.5" fill="currentColor" /> 4.9 / 5.0 Average Rating
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">What Our Customers Say</h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto px-2">
              Don't just take our word for it. Here's what real customers think about us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: 'Sarah Johnson', location: 'London', initials: 'SJ', color: 'bg-red-600', quote: 'Absolutely brilliant service! Got £850 for my iPhone 15 Pro Max. The whole process took less than 3 days from quote to payment. Highly recommend!', device: 'iPhone 15 Pro Max', earned: '£850' },
              { name: 'Michael Chen', location: 'Manchester', initials: 'MC', color: 'bg-red-500', quote: 'I was skeptical at first, but Cash My Mobile exceeded my expectations. Fair price, fast payment, and excellent customer service. Will definitely use again.', device: 'Samsung Galaxy S24', earned: '£620' },
              { name: 'Emma Williams', location: 'Birmingham', initials: 'EW', color: 'bg-green-600', quote: 'Sold my old iPhone 12 that I thought was worthless. Got £250! The free postage label made it so easy. Payment came through the next day.', device: 'iPhone 12', earned: '£250' },
            ].map(({ name, location, initials, color, quote, device, earned }) => (
              <div key={name} className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4 sm:mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-1 text-xs sm:text-sm">
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Device badge */}
                <div className="bg-red-50 rounded-xl px-3 py-2 flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-red-700 truncate">{device}</span>
                  </div>
                  <span className="text-sm font-extrabold text-green-600 flex-shrink-0 ml-2">{earned}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 ${color} rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0`}>
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-xs sm:text-sm truncate">{name}</div>
                    <div className="text-xs text-gray-500">{location}</div>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating summary */}
          <div className="mt-6 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left">
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">4.9</div>
              <div className="flex gap-1 mt-2 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Based on 2,400+ reviews</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-100" />
            <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center w-full md:w-auto">
              {[
                { pct: '94%', label: '5-star reviews' },
                { pct: '98%', label: 'Would recommend' },
                { pct: '99%', label: 'Paid on time' },
              ].map(({ pct, label }) => (
                <div key={label}>
                  <div className="text-xl sm:text-2xl font-extrabold text-red-600">{pct}</div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-100" />
            <Link to="/sell" className="w-full md:w-auto">
              <button className="w-full md:w-auto group bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-200 whitespace-nowrap hover:-translate-y-0.5 text-sm sm:text-base">
                Join Them Today
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative bg-white overflow-hidden py-14 sm:py-20 px-4 sm:px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-red-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-5 sm:mb-6">
            <Zap className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /> Instant Quote — No Obligation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-5 leading-tight px-2">
            Ready to Turn Your Phone{' '}
            <span className="text-red-600">Into Cash?</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-7 sm:mb-10 max-w-xl mx-auto px-2">
            Join over 50,000 customers who've already sold their phones with us. Get your free quote in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link to="/sell" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group bg-red-600 hover:bg-red-700 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5 text-sm sm:text-base">
                Get My Free Quote
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl transition-all text-sm sm:text-base">
                Learn How It Works
              </button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-7 sm:mt-10">
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
