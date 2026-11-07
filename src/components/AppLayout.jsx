import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Bot,
  Globe2,
  Plane,
  Hotel,
  Map,
  Wallet,
  Users,
  ShieldAlert,
  UserCheck,
  TicketCheck,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  LogIn,
  Home,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

const NAV_GROUPS = [
  {
    title: 'Autonomous Core',
    items: [
      { to: '/dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
      { to: '/planner', label: 'AI Travel Planner', icon: Bot, badge: 'LangGraph' },
      { to: '/itinerary', label: 'Interactive Itinerary', icon: Map },
    ],
  },
  {
    title: 'Discovery & Compare',
    items: [
      { to: '/discover', label: 'Destination Discovery', icon: Globe2 },
      { to: '/flights', label: 'Flight, Train & Bus', icon: Plane },
      { to: '/hotels', label: 'Hotel Comparison', icon: Hotel },
    ],
  },
  {
    title: 'Finance, Group & Bookings',
    items: [
      { to: '/budget', label: 'Travel Budget', icon: Wallet },
      { to: '/group', label: 'Group Travel Hub', icon: Users },
      { to: '/bookings', label: 'Booking Management', icon: TicketCheck },
    ],
  },
  {
    title: 'Safety & Traveller',
    items: [
      { to: '/emergency', label: 'Emergency Assistance', icon: ShieldAlert, alert: true },
      { to: '/profile', label: 'Profile & Preferences', icon: UserCheck },
      { to: '/auth', label: 'Sign In / Switch User', icon: LogIn },
    ],
  },
];

export default function AppLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    currency,
    setCurrency,
    trips,
    activeTripId,
    setActiveTripId,
    activeTrip,
    isAuthenticated,
    user,
    logout,
    agentFeed,
  } = useTravel();
  const location = useLocation();
  const navigate = useNavigate();

  const pendingApprovals = agentFeed.filter((a) => !a.approved).length;

  return (
    <div className="min-h-screen navy-gradient-bg text-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 bg-navy-950/90 border-r border-slate-800/80 backdrop-blur-xl fixed inset-y-0 left-0 z-40">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/atlas-logo.png"
              alt="ATLAS Logo"
              className="w-10 h-10 rounded-xl object-cover border border-brand-400/40 shadow-glow"
            />
            <span className="font-display font-extrabold text-base tracking-widest text-white">
              ATLAS
            </span>
          </Link>
        </div>

        {/* Active Trip Quick Selector */}
        <div className="p-3.5 border-b border-slate-800/80">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Active Shared Trip State
          </label>
          <div className="relative">
            <select
              value={activeTripId}
              onChange={(e) => setActiveTripId(e.target.value)}
              className="w-full appearance-none bg-navy-900 border border-brand-500/30 hover:border-brand-400/60 rounded-xl px-3 py-2 pr-8 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id} className="bg-navy-950 text-white">
                  {trip.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>{activeTrip.dates}</span>
            <span className="text-emerald-400 font-medium">● 8 Agents Synced</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-navy-800/60 transition"
            >
              <Home className="w-4 h-4 text-sky-400" />
              Landing Page Overview
            </Link>
          </div>

          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-600/90 to-sky-500/80 text-white shadow-glow'
                            : item.alert
                            ? 'text-rose-300 hover:bg-rose-500/15 hover:text-rose-200'
                            : 'text-slate-300 hover:bg-navy-800/70 hover:text-white'
                        }`
                      }
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-sky-400/20 text-sky-300 border border-sky-400/30 font-semibold">
                          {item.badge}
                        </span>
                      )}
                      {item.alert && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Supervisor Status Box */}
        <div className="p-3.5 border-t border-slate-800/80 bg-navy-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-400/40 flex items-center justify-center text-sky-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">Supervisor Agent</div>
              <div className="text-[11px] text-slate-400 truncate">
                {pendingApprovals > 0
                  ? `${pendingApprovals} action(s) awaiting approval`
                  : 'All trip parameters optimal'}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 lg:pl-64 xl:pl-72 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 sticky top-0 z-30 bg-navy-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-navy-900 border border-slate-800 text-slate-200"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-navy-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-white">{activeTrip.title}</span>
              <span className="text-slate-500">|</span>
              <span className="text-sky-400">{activeTrip.visaStatus}</span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Currency Switcher */}
            <div className="flex items-center bg-navy-900 border border-slate-800 rounded-xl p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  currency === 'INR' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  currency === 'USD' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>

            {/* Quick AI Planner CTA */}
            <button
              type="button"
              onClick={() => navigate('/planner')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white text-xs font-semibold shadow-glow transition"
            >
              <Bot className="w-3.5 h-3.5" />
              Ask Supervisor AI
            </button>

            {/* SOS Quick Button */}
            <button
              type="button"
              onClick={() => navigate('/emergency')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">SOS Assist</span>
            </button>

            {/* User Auth / Profile Pill */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-navy-900 border border-slate-800 hover:border-brand-500/50 transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="hidden xl:block text-left">
                    <div className="text-xs font-semibold text-white leading-tight">{user.name}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{user.homeAirport}</div>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/auth');
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-navy-900 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold text-slate-300 hover:text-rose-300 transition"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-3.5 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 border border-brand-500/40 text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] bg-navy-950 border-r border-slate-800 h-full flex flex-col z-10 p-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <img
                    src="/atlas-logo.png"
                    alt="ATLAS Logo"
                    className="w-8 h-8 rounded-lg object-cover border border-brand-400/40"
                  />
                  <span className="font-display font-bold tracking-widest text-white">ATLAS</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {NAV_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      {group.title}
                    </div>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.to;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                              active
                                ? 'bg-brand-600 text-white'
                                : 'text-slate-300 hover:bg-navy-800'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
