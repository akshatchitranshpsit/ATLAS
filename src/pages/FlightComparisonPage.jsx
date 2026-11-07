import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Train,
  Bus,
  Sparkles,
  CheckCircle2,
  Luggage,
  Leaf,
  TrendingUp,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { TRANSPORT_OPTIONS } from '../data/mockData';
import { useTravel } from '../context/TravelContext';

export default function FlightComparisonPage() {
  const { formatPrice, addBookingItem } = useTravel();
  const navigate = useNavigate();

  const [modeFilter, setModeFilter] = useState('All'); // 'All' | 'Flight' | 'Train' | 'Bus'
  const [sortBy, setSortBy] = useState('aiScore'); // 'aiScore' | 'price' | 'carbon'
  const [lockedIds, setLockedIds] = useState([]);

  const filteredOptions = TRANSPORT_OPTIONS.filter(
    (item) => modeFilter === 'All' || item.mode === modeFilter
  ).sort((a, b) => {
    if (sortBy === 'price') return a.priceINR - b.priceINR;
    if (sortBy === 'carbon') return a.carbonKg - b.carbonKg;
    return b.aiScore - a.aiScore;
  });

  const handleLockOption = (opt) => {
    if (lockedIds.includes(opt.id)) return;
    setLockedIds((prev) => [...prev, opt.id]);
    addBookingItem({
      type: opt.mode,
      title: `${opt.operator} · ${opt.code}`,
      subtitle: `${opt.from} → ${opt.to} (${opt.duration} · ${opt.stops})`,
      date: `Departs ${opt.depTime}`,
      priceINR: opt.priceINR,
    });
  };

  const getModeIcon = (mode) => {
    if (mode === 'Train') return <Train className="w-5 h-5 text-sky-400" />;
    if (mode === 'Bus') return <Bus className="w-5 h-5 text-emerald-400" />;
    return <Plane className="w-5 h-5 text-brand-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <Plane className="w-4 h-4" />
            Multi-Modal Transport Arbitrage Agent
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Flight, High-Speed Train & Bus Comparison
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate('/bookings')}
          className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-brand-500/40 text-sky-300 text-xs font-semibold self-start"
        >
          View Locked Fares in Booking Manager →
        </button>
      </div>

      {/* AI Transport Arbitrage Insight Banner */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-sky-400/35 bg-gradient-to-r from-brand-900/40 to-navy-900/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-400/20 border border-sky-400/40 flex items-center justify-center text-sky-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              Transport Agent Recommendation: Non-Stop ANA + Shinkansen Seat 12E Combo
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Flying non-stop into Tokyo (NH-830) and taking the Nozomi Shinkansen to Kyoto saves 3h 40m total transit time vs. 1-stop connecting flights, while reserving right-side Seat E for unobstructed Mt. Fuji views.
            </p>
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shrink-0">
          24h Free Fare Hold Active
        </span>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-xl border border-slate-800">
          {['All', 'Flight', 'Train', 'Bus'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setModeFilter(mode)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                modeFilter === mode
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode === 'All' ? 'All Modes (Flight · Rail · Bus)' : `${mode}s`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-navy-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
          >
            <option value="aiScore">AI Value & Reliability Score</option>
            <option value="price">Lowest Price First</option>
            <option value="carbon">Lowest Carbon Footprint (CO2)</option>
          </select>
        </div>
      </div>

      {/* Transport Comparison Cards */}
      <div className="space-y-4">
        {filteredOptions.map((opt) => {
          const isLocked = lockedIds.includes(opt.id);
          return (
            <div
              key={opt.id}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                {/* Operator & Route */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-slate-700 flex items-center justify-center shrink-0">
                    {getModeIcon(opt.mode)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/20 text-sky-300 border border-brand-500/30">
                        {opt.mode} · {opt.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {opt.aiBadge}
                      </span>
                      <span className="text-xs font-bold text-amber-300">
                        AI Score: {opt.aiScore}/100
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white">{opt.operator}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                      <span className="font-semibold text-white">
                        {opt.depTime} {opt.from}
                      </span>
                      <span className="text-sky-400 font-mono">── {opt.duration} ({opt.stops}) ──▶</span>
                      <span className="font-semibold text-white">
                        {opt.arrTime} {opt.to}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metadata Badges */}
                <div className="flex flex-wrap lg:flex-col gap-2 text-xs text-slate-300 lg:w-64">
                  <div className="flex items-center gap-1.5">
                    <Luggage className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{opt.baggage}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <Leaf className="w-3.5 h-3.5 shrink-0" />
                    <span>{opt.carbonKg} kg CO2 · {opt.refundable}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300 text-[11px]">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>{opt.prediction}</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase text-slate-400 block">
                      AI Verified Fare
                    </span>
                    <span className="font-display font-extrabold text-2xl text-white">
                      {formatPrice(opt.priceINR)}
                    </span>
                    <span className="block text-[10px] text-slate-400">per traveller · incl. taxes</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLockOption(opt)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      isLocked
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white shadow-glow'
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Held in Bookings
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Lock 24h Hold
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
