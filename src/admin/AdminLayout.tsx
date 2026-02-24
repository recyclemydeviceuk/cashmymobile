import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Smartphone, BarChart2,
  Globe, Settings, LogOut, Menu, X, ChevronRight,
  ExternalLink,
} from 'lucide-react';

const BASE = '/admin-cashmymobile';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: BASE },
  { label: 'Orders', icon: Package, to: `${BASE}/orders` },
  { label: 'Devices', icon: Smartphone, to: `${BASE}/devices` },
  { label: 'Pricing Feed', icon: BarChart2, to: `${BASE}/pricing` },
  { label: 'Utilities', icon: Settings, to: `${BASE}/utilities` },
  { label: 'API Gateway', icon: Globe, to: `${BASE}/api-gateway` },
];

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin-cashmymobile/login');
  };

  return (
    <div className="h-screen bg-gray-950 flex overflow-hidden">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 z-40 flex flex-col
        bg-[#030712] border-r border-white/[0.06]
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-auto
      `}>
        {/* ── Logo ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <Link to="/" className="flex items-center gap-3 group" target="_blank">
            <img
              src="https://res.cloudinary.com/dn2sab6qc/image/upload/v1771700003/Cashmymobile_logo_y7ndez.png"
              alt="Cash My Mobile"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Admin badge */}
        <div className="mx-4 mb-5">
          <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/40">
              <span className="text-white text-[10px] font-black">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white leading-tight truncate">Admin Panel</p>
              <p className="text-[10px] text-gray-500 leading-tight">cashmymobile.co.uk</p>
            </div>
            <div className="ml-auto flex-shrink-0">
              <span className="w-2 h-2 bg-emerald-400 rounded-full block shadow-sm shadow-emerald-400/60" />
            </div>
          </div>
        </div>

        {/* ── Nav ── */}
        <div className="px-3 mb-2">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-2 mb-2">Navigation</p>
        </div>
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
          {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
            const active = to === BASE
              ? location.pathname === BASE || location.pathname === BASE + '/'
              : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${active
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50'
                    : 'text-gray-500 hover:text-white hover:bg-white/[0.06]'}
                `}
              >
                {!active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-red-500 rounded-r-full transition-all duration-200 group-hover:h-5 opacity-0 group-hover:opacity-100" />
                )}
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="mt-auto">
          <div className="mx-3 mb-3 h-px bg-white/[0.06]" />
          <div className="px-3 pb-5 space-y-0.5">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all group"
            >
              <ExternalLink className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1">View Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-all group"
            >
              <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1 text-left">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 lg:px-6 h-14 flex items-center gap-4 flex-shrink-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb / Title */}
          <div className="flex-1 min-w-0">
            {title && (
              <h1 className="text-base font-semibold text-white truncate">{title}</h1>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-red-900/40">
                A
              </div>
              <span className="text-xs font-medium text-gray-300 pr-2">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto overflow-x-hidden">
          {subtitle && (
            <p className="text-sm text-gray-500 -mt-2 mb-4 font-medium">{subtitle}</p>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
