import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  Wallet,
  Plane,
  Hotel,
  Map,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  CloudRain,
  Calendar,
  Users,
  TrendingDown,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import InteractiveMap from '../components/InteractiveMap';

export default function DashboardPage() {
  const {
    activeTrip,
    trips,
    activeTripId,
    setActiveTripId,
    formatPrice,
    agentFeed,
    approveAgentAction,
    dismissAgentAction,
    itinerary,
    bookings,
  } = useTravel();
  const navigate = useNavigate();

  const pendingBookings = bookings.filter((b) => b.status.includes('Pending')).length;

  return (
    <div className="space-y-6">
      {/* Top Active Trip Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border border-brand-500/30 shadow-glow">
        <img
          src={activeTrip.heroImage}
          alt={activeTrip.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className=" inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/70 relative p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {activeTrip.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-500/20 text-sky-300 border border-brand-500/30">
                  {activeTrip.visaStatus}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-navy-900/80 text-slate-300 border border-slate-700">
                  AI Readiness: {activeTrip.healthScore}%
                </span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                {activeTrip.title}
              </h1>
              <p className="text-sm text-slate-300 mt-1.5 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  {activeTrip.dates} ({activeTrip.days} Days)
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-400" />
                  {activeTrip.travellers} Travellers · Origin: {activeTrip.origin}
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <CloudRain className="w-4 h-4" />
                  {activeTrip.weatherSummary}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/planner')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white text-xs font-semibold shadow-glow flex items-center gap-2 transition"
              >
                <Bot className="w-4 h-4" />
                Modify with Supervisor AI
              </button>
              <button
                type="button"
                onClick={() => navigate('/itinerary')}
                className="px-4 py-2.5 rounded-xl bg-navy-900/90 hover:bg-navy-800 border border-slate-700 text-slate-100 text-xs font-semibold flex items-center gap-2 transition"
              >
                <Map className="w-4 h-4 text-sky-400" />
                Open Live Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/budget" className="glass-card glass-card-hover rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Allocated vs. Spent</span>
            <Wallet className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 font-display font-bold text-2xl text-white">
            {formatPrice(activeTrip.spentINR)}{' '}
            <span className="text-xs font-normal text-slate-400">
              / {formatPrice(activeTrip.budgetINR)}
            </span>
          </div>
          <div className="mt-2 w-full h-1.5 bg-navy-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-sky-400"
              style={{
                width: `${Math.min(100, Math.round((activeTrip.spentINR / activeTrip.budgetINR) * 100))}%`,
              }}
            />
          </div>
          <p className="mt-2 text-[11px] text-emerald-400">
            {formatPrice(activeTrip.budgetINR - activeTrip.spentINR)} remaining buffer
          </p>
        </Link>

        <Link to="/budget" className="glass-card glass-card-hover rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Saved by AI Arbitrage</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 font-display font-bold text-2xl text-emerald-400">
            {formatPrice(activeTrip.savedByAI)}
          </div>
          <p className="mt-2 text-[11px] text-slate-300">
            Via non-stop fare lock, regional rail pass math & Zero-FX routing
          </p>
        </Link>

        <Link to="/bookings" className="glass-card glass-card-hover rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Reservations & AI Holds</span>
            <Plane className="w-4 h-4 text-brand-400" />
          </div>
          <div className="mt-2 font-display font-bold text-2xl text-white">
            {bookings.length} Active Items
          </div>
          <p className="mt-2 text-[11px] text-amber-300">
            {pendingBookings > 0
              ? `${pendingBookings} AI price-lock(s) awaiting 1-click approval`
              : 'All bookings confirmed & synced'}
          </p>
        </Link>

        <Link to="/emergency" className="glass-card glass-card-hover rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Autonomous Risk & SOS Guard</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 font-display font-bold text-2xl text-white">24/7 Active</div>
          <p className="mt-2 text-[11px] text-slate-300">
            Indian Embassy Tokyo + St. Luke’s Hospital pinned offline
          </p>
        </Link>
      </div>

      {/* Main Two-Column Grid: Autonomous Agent Feed + Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Autonomous Agent Action Feed */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                  LangGraph Shared State Stream
                </span>
                <h2 className="font-display font-bold text-lg text-white">
                  Autonomous Agent Decisions & Approvals
                </h2>
              </div>
              <Link
                to="/planner"
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                Full Console <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {agentFeed.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition ${
                    item.approved
                      ? 'bg-navy-900/50 border-slate-800'
                      : 'bg-navy-900/90 border-brand-500/40 shadow-glow'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.agent}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </div>

                  <div className="mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-500/20 text-brand-200 border border-brand-500/30">
                    {item.badge}
                  </div>

                  <p className="mt-2 text-xs text-slate-200 leading-relaxed">{item.message}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-emerald-400 font-medium">
                      Impact: {item.impact}
                    </span>

                    {!item.approved ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => approveAgentAction(item.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-xs transition"
                        >
                          Approve & Execute
                        </button>
                        <button
                          type="button"
                          onClick={() => dismissAgentAction(item.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-navy-950 hover:bg-slate-800 text-slate-400 text-xs transition"
                        >
                          Dismiss
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        Executed in Trip State
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Geospatial Map + Trip Switcher */}
        <div className="lg:col-span-6 space-y-6">
          <InteractiveMap
            stops={itinerary[0]?.stops || []}
            cityTitle={`${activeTrip.destination} · Day 1 Cluster`}
            weatherNotice={activeTrip.weatherSummary}
            routeDistanceKm={itinerary[0]?.routeDistanceKm || 12.4}
            transitSavedMins={itinerary[0]?.transitSavedMins || 42}
          />

          {/* Switch Active Trip Portfolio */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-sm text-white">
                Your Managed Trip Portfolio ({trips.length})
              </h3>
              <Link to="/planner" className="text-xs text-sky-400 hover:underline">
                + Plan New Trip
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {trips.map((trip) => {
                const isCurrent = trip.id === activeTripId;
                return (
                  <button
                    key={trip.id}
                    type="button"
                    onClick={() => setActiveTripId(trip.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      isCurrent
                        ? 'bg-brand-600/20 border-sky-400'
                        : 'bg-navy-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{trip.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 truncate">{trip.dates}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-sky-400 font-semibold">{formatPrice(trip.budgetINR)}</span>
                      <span className="text-emerald-400">{trip.healthScore}% Ready</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
