import { Mail, Phone, MapPin, ShieldCheck, Clock, BadgeCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">

      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-red-600" />

      {/* CTA strip */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div>
            <p className="text-white font-extrabold text-lg sm:text-xl">Ready to sell your phone?</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Get a free instant quote — no obligation, paid in 24 hours.</p>
          </div>
          <Link to="/sell" className="w-full sm:w-auto flex-shrink-0">
            <button className="w-full sm:w-auto group bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-7 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900 hover:-translate-y-0.5 whitespace-nowrap text-sm sm:text-base">
              Get My Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 border-b border-gray-800">

        {/* Brand column — full width on mobile */}
        <div className="col-span-2 md:col-span-1 space-y-5 sm:space-y-6">
          <Link to="/" className="flex items-center w-fit">
            <img
              src="https://res.cloudinary.com/dn2sab6qc/image/upload/v1771700003/Cashmymobile_logo_y7ndez.png"
              alt="Cash My Mobile"
              className="h-8 sm:h-9 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            The UK's most trusted phone buying service. Get competitive prices for your devices, fast and hassle-free.
          </p>
          {/* Trust badges */}
          <div className="space-y-2 sm:space-y-2.5">
            {[
              { icon: ShieldCheck, text: 'Secure & Certified' },
              { icon: Clock, text: 'Paid Within 24 Hours' },
              { icon: BadgeCheck, text: '4.9★ Trustpilot Rating' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                <Icon className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4 sm:mb-6">Quick Links</h4>
          <ul className="space-y-2.5 sm:space-y-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'Sell Your Phone', href: '/sell' },
              { label: 'How It Works', href: '/how-it-works' },
              { label: 'About Us', href: '/about' },
              { label: 'FAQ', href: '/faq' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link to={href}
                  className="text-xs sm:text-sm text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4 sm:mb-6">Support & Legal</h4>
          <ul className="space-y-2.5 sm:space-y-3">
            {[
              { label: 'Contact Us', href: '/contact' },
              { label: 'FAQ', href: '/faq' },
              { label: 'How It Works', href: '/how-it-works' },
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Privacy Policy', href: '/privacy' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link to={href}
                  className="text-xs sm:text-sm text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact — full width on mobile */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4 sm:mb-6">Contact Us</h4>
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Email us</p>
                <a href="mailto:hello@cashmymobile.co.uk" className="text-xs sm:text-sm text-gray-400 hover:text-red-400 transition-colors break-all">
                  hello@cashmymobile.co.uk
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Call us</p>
                <a href="tel:+442071234567" className="text-xs sm:text-sm text-gray-400 hover:text-red-400 transition-colors">
                  +44 20 7123 4567
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Based in</p>
                <p className="text-xs sm:text-sm text-gray-400">London, United Kingdom</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs text-gray-600">
          © 2026 Cash My Mobile Ltd. All rights reserved. Registered in England & Wales.
        </p>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/terms" className="text-xs text-gray-600 hover:text-red-400 transition-colors">Terms</Link>
          <Link to="/privacy" className="text-xs text-gray-600 hover:text-red-400 transition-colors">Privacy</Link>
          <div className="flex items-center gap-1.5 bg-red-600/10 border border-red-600/20 px-2.5 sm:px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
            <span className="text-xs text-red-400 font-semibold">SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
