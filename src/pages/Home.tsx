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
  Star,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  Truck,
  Infinity,
  DollarSign,
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
              src="https://res.cloudinary.com/dn2sab6qc/image/upload/v1772096282/ChatGPT_Image_Feb_26_2026_12_29_14_AM_ngndnp.png"
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
                <div className="text-xs font-extrabold text-gray-900 leading-none">Fast</div>
                <div className="text-[10px] text-gray-400 leading-none mt-0.5">bank transfer</div>
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

          {/* Right — phone image */}
          <div className="relative flex justify-center">
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
              { num: 4, icon: Wallet, title: 'Get Paid Fast', desc: 'We inspect and pay directly to your bank account. No vouchers — just real cash.', color: 'from-green-500 to-green-600', light: 'bg-green-50', iconColor: 'text-green-600' },
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
        </div>
      </section>

      {/* ── SELECT BY BRANDS ── */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
              Select By <span className="text-red-600">Brands</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
              Choose your device brand to see instant prices and get paid quickly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {/* Apple Card */}
            <Link to="/sell?brand=apple" className="group">
              <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden transition-all duration-500 hover:border-red-300 hover:shadow-2xl hover:shadow-red-100/50 hover:-translate-y-1">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-gray-50/50" />
                
                {/* Content */}
                <div className="relative p-5 sm:p-6 md:p-8">
                  {/* Apple Logo */}
                  <div className="flex justify-center mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Phone Image */}
                  <div className="relative h-40 sm:h-48 md:h-52 mb-4 sm:mb-5 flex items-center justify-center px-2">
                    <img 
                      src="https://sellyourfone.co.uk/wp-content/uploads/2024/08/apple-phones-67e692ff-1-595x364.webp"
                      alt="Apple iPhones"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                    />
                  </div>

                  {/* Text & CTA */}
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-red-600 transition-colors">
                      Sell my Apple iPhone
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-red-600 group-hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md shadow-red-200 group-hover:shadow-lg">
                      <span className="text-sm">Get Instant Quote</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-full blur-xl" />
                <div className="absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br from-gray-500/5 to-slate-500/5 rounded-full blur-xl" />
              </div>
            </Link>

            {/* Samsung Card */}
            <Link to="/sell?brand=samsung" className="group">
              <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden transition-all duration-500 hover:border-red-300 hover:shadow-2xl hover:shadow-red-100/50 hover:-translate-y-1">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-indigo-50/20" />
                
                {/* Content */}
                <div className="relative p-5 sm:p-6 md:p-8">
                  {/* Samsung Logo */}
                  <div className="flex justify-center mb-4 sm:mb-5">
                    <div className="h-10 sm:h-12 px-4 sm:px-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-base sm:text-lg tracking-wider">SAMSUNG</span>
                    </div>
                  </div>

                  {/* Phone Image */}
                  <div className="relative h-40 sm:h-48 md:h-52 mb-4 sm:mb-5 flex items-center justify-center px-2">
                    <img 
                      src="https://sellyourfone.co.uk/wp-content/uploads/2024/08/samsung-phones-d86ef8cf-1-595x364.webp"
                      alt="Samsung Galaxy Phones"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                    />
                  </div>

                  {/* Text & CTA */}
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-red-600 transition-colors">
                      Sell my Samsung Galaxy
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-red-600 group-hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md shadow-red-200 group-hover:shadow-lg">
                      <span className="text-sm">Get Instant Quote</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-xl" />
                <div className="absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-full blur-xl" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── POPULAR DEVICES ── */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Apple Devices */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Popular <span className="text-red-600">Apple</span> Devices
              </h2>
              <Link to="/sell?brand=apple" className="flex items-center gap-1 text-red-600 font-semibold text-sm hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { name: 'iPhone 16 Pro Max', price: '£850', image: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-16-pro-max/default.png' },
                { name: 'iPhone 16 Pro', price: '£750', image: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-16-pro/default.png' },
                { name: 'iPhone 16 Plus', price: '£650', image: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-16-plus/default.png' },
                { name: 'iPhone 16', price: '£550', image: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-16/default.png' },
                { name: 'iPhone 15 Pro Max', price: '£720', image: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-15-pro-max/default.png' },
                { name: 'iPhone 15 Pro', price: '£620', image: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-15-pro/default.png' },
              ].map((device) => (
                <Link to={`/sell?device=${encodeURIComponent(device.name)}`} key={device.name}>
                  <div className="group bg-white border-2 border-gray-100 rounded-2xl p-4 hover:border-red-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="bg-gray-50 rounded-xl p-4 mb-3 flex items-center justify-center h-32 sm:h-40">
                      <img 
                        src={device.image} 
                        alt={device.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x300/f3f4f6/6b7280?text=' + encodeURIComponent(device.name);
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-2 text-center leading-tight">{device.name}</h3>
                    <div className="text-center">
                      <span className="text-red-600 font-extrabold text-sm sm:text-base">{device.price}</span>
                      <span className="text-gray-400 text-xs ml-1">from</span>
                    </div>
                    <button className="w-full mt-3 bg-red-50 text-red-600 font-semibold text-xs py-2 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-all">
                      Get Quote
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Samsung Devices */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Popular <span className="text-red-600">Samsung</span> Devices
              </h2>
              <Link to="/sell?brand=samsung" className="flex items-center gap-1 text-red-600 font-semibold text-sm hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { name: 'Galaxy S24 Ultra', price: '£680', image: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s24-ultra/default.png' },
                { name: 'Galaxy S24 Plus', price: '£580', image: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s24-plus/default.png' },
                { name: 'Galaxy S24', price: '£480', image: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s24/default.png' },
                { name: 'Galaxy S23 Ultra', price: '£550', image: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s23-ultra/default.png' },
                { name: 'Galaxy Z Fold 5', price: '£720', image: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-z-fold-5/default.png' },
                { name: 'Galaxy Z Flip 5', price: '£520', image: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-z-flip-5/default.png' },
              ].map((device) => (
                <Link to={`/sell?device=${encodeURIComponent(device.name)}`} key={device.name}>
                  <div className="group bg-white border-2 border-gray-100 rounded-2xl p-4 hover:border-red-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="bg-gray-50 rounded-xl p-4 mb-3 flex items-center justify-center h-32 sm:h-40">
                      <img 
                        src={device.image} 
                        alt={device.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x300/f3f4f6/6b7280?text=' + encodeURIComponent(device.name);
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-2 text-center leading-tight">{device.name}</h3>
                    <div className="text-center">
                      <span className="text-red-600 font-extrabold text-sm sm:text-base">{device.price}</span>
                      <span className="text-gray-400 text-xs ml-1">from</span>
                    </div>
                    <button className="w-full mt-3 bg-red-50 text-red-600 font-semibold text-xs py-2 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-all">
                      Get Quote
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              Our <span className="text-red-600">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: Zap, title: 'INSTANT QUOTES', desc: 'Get competitive prices for your phone in under 60 seconds.' },
              { icon: DollarSign, title: 'FAST PAYMENTS', desc: 'Bank transfer sent promptly after receiving your device.' },
              { icon: ThumbsUp, title: 'BEST PRICES', desc: 'We price match any genuine quote — guaranteed top value.' },
              { icon: Truck, title: 'FREE SHIPPING', desc: 'Free prepaid postage label or packaging kit sent to you.' },
              { icon: Infinity, title: 'EASY PROCESS', desc: '4 simple steps from quote to payment — no hassle.' },
              { icon: ShieldCheck, title: 'SECURE TRANSACTIONS', desc: 'Military-grade data wiping and encrypted payments.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-red-200">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
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
              { icon: Clock, text: 'Fast Bank Transfer', color: 'text-red-600' },
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
