import {
  ShieldCheck,
  Clock,
  Package,
  MapPin,
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  Users,
  BadgeCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  HeadphonesIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header />

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-red-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            About Cash My Mobile
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-6">
            We're on a Mission to Make<br />
            Selling Phones <span className="text-red-600">Simple</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Simple, secure, and rewarding for UK customers. Trusted by over 50,000 people across the country.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '24hrs', label: 'Payment Time', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
              { value: '100%', label: 'Secure Process', icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-50' },
              { value: 'Free', label: 'Postage', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
              { value: 'UK', label: 'Based Service', icon: MapPin, color: 'text-red-600', bg: 'bg-red-50' },
            ].map(({ value, label, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-red-100 transition-all duration-300">
                <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-2xl font-extrabold ${color} mb-0.5`}>{value}</div>
                <div className="text-xs text-gray-400 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-4 py-2 rounded-full">
                <Star className="w-3.5 h-3.5" fill="currentColor" /> Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                How We Became the UK's Trusted Phone Buying Service
              </h2>
              <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
                <p>
                  Selling your old phone used to be a hassle. Complex processes, hidden fees, delayed payments, and concerns about data security made it more trouble than it was worth. We knew there had to be a better way.
                </p>
                <p>
                  That's why we created Cash My Mobile — a service built on trust, transparency, and speed. We've streamlined the entire process into just four simple steps, removed all the hidden costs, and guarantee payment within 24 hours.
                </p>
                <p>
                  We're committed to providing a reliable service with honest assessments and competitive pricing. Our focus is on making the selling process as smooth and straightforward as possible.
                </p>
              </div>
              <Link to="/sell">
                <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Right — visual stats card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl -rotate-2 scale-105" />
              <div className="relative bg-white rounded-3xl border border-red-100 shadow-xl p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900">Cash My Mobile</div>
                    <div className="text-xs text-gray-400">UK's Most Trusted Service</div>
                  </div>
                </div>
                {[
                  { label: 'Phones Bought', value: '50,000+', color: 'bg-red-600', pct: '90%' },
                  { label: 'Paid to Customers', value: '£12M+', color: 'bg-green-500', pct: '85%' },
                  { label: 'Customer Rating', value: '4.9 / 5.0', color: 'bg-amber-400', pct: '98%' },
                  { label: 'Same-Day Payment', value: '99%', color: 'bg-blue-500', pct: '99%' },
                ].map(({ label, value, color, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-600 font-medium">{label}</span>
                      <span className="font-extrabold text-gray-900">{value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-4 py-2 rounded-full mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> Our Values
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Principles That <span className="text-red-600">Guide Us</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">These principles guide everything we do.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Trust & Security',
                desc: 'We prioritize your data security and privacy. All devices undergo military-grade data wiping before being processed.',
                bg: 'bg-red-50', color: 'text-red-600', border: 'hover:border-red-200',
              },
              {
                icon: Zap,
                title: 'Speed & Efficiency',
                desc: 'From quote to payment in 24 hours. We value your time and make the process lightning fast at every step.',
                bg: 'bg-blue-50', color: 'text-blue-600', border: 'hover:border-blue-200',
              },
              {
                icon: HeadphonesIcon,
                title: 'Customer First',
                desc: 'Your satisfaction is our success. We go above and beyond to ensure a smooth, stress-free experience.',
                bg: 'bg-green-50', color: 'text-green-600', border: 'hover:border-green-200',
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                desc: 'We offer competitive prices and will match any genuine higher quote from competitors. You deserve maximum value.',
                bg: 'bg-red-50', color: 'text-red-600', border: 'hover:border-red-200',
              },
            ].map(({ icon: Icon, title, desc, bg, color, border }) => (
              <div key={title} className={`group p-8 rounded-3xl bg-gray-50 border-2 border-transparent ${border} hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex gap-5`}>
                <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Checklist */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-4 py-2 rounded-full">
                <Users className="w-3.5 h-3.5" /> Why Choose Us?
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                What Sets Us <span className="text-red-600">Apart</span>
              </h2>
              <div className="space-y-3 pt-2">
                {[
                  'Free postage with prepaid labels or packaging kits',
                  'Instant quotes with transparent pricing',
                  'Payment within 24 hours via bank transfer',
                  'Military-grade data wiping for security',
                  'Fully insured shipping for your peace of mind',
                  'Accept all conditions — Good, Poor, or Broken',
                  'Support for iPhone 11–16 and Samsung S21–S25 series',
                  'UK-based company with local support',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Link to="/sell">
                  <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-200 hover:-translate-y-0.5">
                    Sell My Phone <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link to="/how-it-works">
                  <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-7 py-3 rounded-xl transition-all">
                    How It Works
                  </button>
                </Link>
              </div>
            </div>

            {/* Testimonial card */}
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', location: 'London', initials: 'SJ', color: 'bg-red-600', quote: 'Absolutely brilliant service! Got £850 for my iPhone 15 Pro Max in under 3 days. Highly recommend!', stars: 5 },
                { name: 'Michael Chen', location: 'Manchester', initials: 'MC', color: 'bg-blue-600', quote: 'Fair price, fast payment, and excellent customer service. Will definitely use again.', stars: 5 },
                { name: 'Emma Williams', location: 'Birmingham', initials: 'EW', color: 'bg-green-600', quote: 'Sold my old iPhone 12 for £250! The free postage label made it so easy. Payment came through the next day.', stars: 5 },
              ].map(({ name, location, initials, color, quote, stars }) => (
                <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 p-5">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{initials}</div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{name}</div>
                      <div className="text-xs text-gray-400">{location}</div>
                    </div>
                    <BadgeCheck className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-red-200" /> Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight max-w-2xl mx-auto">
                The Fastest, Safest, and Most Rewarding Way to Sell Your Phone in the UK
              </h2>
              <p className="text-red-200 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                We believe everyone should get maximum value for their devices without the hassle, worry, or waiting.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: ShieldCheck, text: 'Safe & Secure' },
                  { icon: Clock, text: 'Paid in 24 Hours' },
                  { icon: Lock, text: 'Data Wiped' },
                  { icon: BadgeCheck, text: 'No Hidden Fees' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-xl">
                    <Icon className="w-4 h-4 text-red-200" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative bg-white overflow-hidden py-20 px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 text-red-500" fill="currentColor" /> Trusted by 50,000+ Customers
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Experience the <span className="text-red-600">Difference</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
            Join our growing community of satisfied customers. Get your instant quote today and see why we're the UK's most trusted phone buying service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sell">
              <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5">
                Get Your Quote Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/how-it-works">
              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-10 py-4 rounded-2xl transition-all">
                How It Works
              </button>
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">Free quote · No obligation · Payment in 24 hours</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
