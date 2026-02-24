import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', to: '/', isActive: isHome },
    { label: 'Sell Phone', to: '/sell', isActive: location.pathname === '/sell' },
    { label: 'How It Works', to: '/how-it-works', isActive: location.pathname === '/how-it-works' },
    { label: 'FAQ', to: '/faq', isActive: location.pathname === '/faq' },
  ];

  return (
    <>
      <nav className={`bg-white/95 backdrop-blur-md border-b border-gray-100 py-0 px-4 sm:px-6 md:px-12 sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-gray-200/60' : 'shadow-none'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dn2sab6qc/image/upload/v1771700003/Cashmymobile_logo_y7ndez.png"
              alt="Cash My Mobile"
              className="h-9 sm:h-10 w-auto object-contain"
              style={{ filter: 'invert(13%) sepia(94%) saturate(5541%) hue-rotate(3deg) brightness(95%) contrast(117%)' }}
            />
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, to, isActive }) => (
              <Link key={label} to={to}
                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}>
                {label}
                {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <Link to="/sell" className="hidden md:block">
              <button className="group bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 flex items-center gap-1.5">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>

            {/* Mobile CTA (small) */}
            <Link to="/sell" className="md:hidden">
              <button className="bg-red-600 text-white px-3.5 py-2 rounded-lg font-semibold text-xs transition-all shadow-md shadow-red-200">
                Get Quote
              </button>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`fixed top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="px-4 py-4 space-y-1">
          {navLinks.map(({ label, to, isActive }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />}
              {label}
            </Link>
          ))}
          <div className="pt-3 pb-1">
            <Link to="/sell" className="block">
              <button className="w-full group bg-red-600 hover:bg-red-700 text-white px-5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-red-200 flex items-center justify-center gap-2">
                Get My Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
