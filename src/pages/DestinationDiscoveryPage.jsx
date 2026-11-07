import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe2,
  Search,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Sun,
  Calendar,
  ArrowRight,
  X,
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/mockData';
import { useTravel } from '../context/TravelContext';

export default function DestinationDiscoveryPage() {
  const { formatPrice } = useTravel();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [selectedVisaDest, setSelectedVisaDest] = useState(null);

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    const matchesRegion = regionFilter === 'All' || dest.region === regionFilter;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.vibeTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4" />
            Destination & Visa Intelligence Agent
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            AI Destination Discovery & Visa Research
          </h1>
        </div>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, country, or vibe (e.g., 'Northern Lights', 'Japan', 'Ladakh', 'Luxury')..."
            className="w-full bg-navy-950 border border-slate-800 focus:border-sky-400 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-navy-950 p-1 rounded-xl border border-slate-800">
          {['All', 'India', 'Asia', 'Europe'].map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setRegionFilter(region)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                regionFilter === region
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/90 border border-brand-400/40 text-sky-300 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  {dest.aiMatch}% AI Match
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-navy-950 text-[11px] font-bold">
                  {dest.visaType}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                      {dest.country}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white">{dest.name}</h3>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-slate-300 leading-relaxed">{dest.tagline}</p>

                <div className="mt-4 grid grid-cols-2 gap-2.5 bg-navy-950/80 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Avg. Daily Budget</span>
                    <span className="font-bold text-white">{formatPrice(dest.avgDailyCostINR)} / day</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Best Window</span>
                    <span className="font-semibold text-sky-300">{dest.bestSeason}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Current Weather</span>
                    <span className="text-amber-300 flex items-center gap-1">
                      <Sun className="w-3 h-3" />
                      {dest.weatherNow}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Safety Score</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {dest.safetyIndex} / 10
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dest.vibeTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-navy-900 border border-slate-800 text-[10px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedVisaDest(dest)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
                Visa & Rules
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate('/planner', {
                    state: {
                      initialPrompt: `Plan a 7-day trip to ${dest.name}, ${dest.country} with optimal flights, stays, and route clustering.`,
                    },
                  })
                }
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                Plan with AI
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visa & Travel Requirement Research Modal */}
      {selectedVisaDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-card rounded-2xl max-w-lg w-full p-6 border border-brand-400/40 shadow-glow relative">
            <button
              type="button"
              onClick={() => setSelectedVisaDest(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-900 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
              Visa & Compliance Agent Briefing
            </span>
            <h3 className="font-display font-bold text-xl text-white mt-1">
              {selectedVisaDest.name}, {selectedVisaDest.country}
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-navy-950 border border-brand-500/30">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Visa Category (Indian Passport):</span>
                <span className="font-bold text-emerald-400">{selectedVisaDest.visaType}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedVisaDest.visaDetails}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Top AI-Clustered Attractions
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                {selectedVisaDest.highlights.map((h) => (
                  <li key={h} className="p-2 rounded-lg bg-navy-900/80 border border-slate-800">
                    • {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedVisaDest(null)}
                className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = selectedVisaDest;
                  setSelectedVisaDest(null);
                  navigate('/planner', {
                    state: {
                      initialPrompt: `Plan a trip to ${target.name}, ${target.country} and prepare ${target.visaType} documentation checklist.`,
                    },
                  });
                }}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
              >
                Launch AI Planner for {selectedVisaDest.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
