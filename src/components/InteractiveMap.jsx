import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  CloudRain,
  Sun,
  Train,
  Compass,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function InteractiveMap({
  stops = [],
  cityTitle = 'Kyoto — Tokyo High-Speed Corridor',
  weatherNotice = '16°C Clear · Radar Active',
  routeDistanceKm = 14.2,
  transitSavedMins = 45,
}) {
  const [activeLayer, setActiveLayer] = useState('route'); // 'route' | 'weather' | 'transit'
  const [selectedStop, setSelectedStop] = useState(stops[0] || null);

  const normalizedStops =
    stops.length > 0
      ? stops
      : [
          { id: 'm1', time: '08:30', title: 'Kyoto Station Shinkansen Hub', type: 'Transit', coords: { x: 22, y: 65 }, status: 'Confirmed' },
          { id: 'm2', time: '10:30', title: 'Fushimi Inari Taisha Sanctuary', type: 'Culture', coords: { x: 45, y: 42 }, status: 'Optimal Window' },
          { id: 'm3', time: '14:00', title: 'Nishiki Covered Market & Gion', type: 'Dining', coords: { x: 68, y: 55 }, status: 'Indoor Safe' },
          { id: 'm4', time: '17:30', title: 'Shibuya Sky Observation Deck', type: 'Sightseeing', coords: { x: 84, y: 26 }, status: 'VIP Slot' },
        ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-brand-500/25">
      {/* Top Map Toolbar */}
      <div className="px-4 py-3 bg-navy-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white flex items-center gap-2">
              {cityTitle}
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                TSP Route Optimized
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Total Cluster Distance: {routeDistanceKm} km · AI Saved {transitSavedMins} mins transit
            </p>
          </div>
        </div>

        {/* Layer Switcher */}
        <div className="flex items-center gap-1.5 bg-navy-950/90 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveLayer('route')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              activeLayer === 'route'
                ? 'bg-brand-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            AI Route
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('weather')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              activeLayer === 'weather'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            Weather Radar
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('transit')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              activeLayer === 'transit'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            Rail Nodes
          </button>
        </div>
      </div>

      {/* Interactive Geospatial Canvas */}
      <div className="relative h-72 sm:h-80 w-full bg-[#071026] overflow-hidden select-none">
        {/* Subtle Coordinate Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="voyager-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#1e3a8a" strokeWidth="0.7" />
            </pattern>
            <radialGradient id="radar-rain" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#voyager-grid)" />

          {/* Stylized Topographic Contours & Coastlines */}
          <path
            d="M -20 220 Q 140 160 280 200 T 580 120 T 900 180"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.4"
          />
          <path
            d="M 40 290 Q 240 210 420 240 T 820 90"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Weather Radar Overlay when active */}
          {activeLayer === 'weather' && (
            <>
              <circle cx="68%" cy="35%" r="95" fill="url(#radar-rain)" />
              <circle cx="30%" cy="60%" r="70" fill="url(#radar-rain)" />
            </>
          )}

          {/* High-Speed Rail Corridor when active */}
          {activeLayer === 'transit' && (
            <path
              d="M 10% 80% C 35% 65%, 60% 45%, 92% 20%"
              fill="none"
              stroke="#818cf8"
              strokeWidth="3"
              strokeDasharray="10 5"
            />
          )}

          {/* Connected Stop Polyline */}
          {normalizedStops.map((stop, idx) => {
            if (idx === normalizedStops.length - 1) return null;
            const next = normalizedStops[idx + 1];
            return (
              <line
                key={`line-${stop.id}`}
                x1={`${stop.coords?.x || 20 + idx * 20}%`}
                y1={`${stop.coords?.y || 60 - idx * 12}%`}
                x2={`${next.coords?.x || 20 + (idx + 1) * 20}%`}
                y2={`${next.coords?.y || 60 - (idx + 1) * 12}%`}
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            );
          })}
        </svg>

        {/* Stop Pins */}
        {normalizedStops.map((stop, index) => {
          const x = stop.coords?.x || 20 + index * 22;
          const y = stop.coords?.y || 65 - index * 14;
          const isSelected = selectedStop?.id === stop.id;
          return (
            <button
              key={stop.id}
              type="button"
              onClick={() => setSelectedStop(stop)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
            >
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs transition-transform ${
                  isSelected
                    ? 'bg-sky-400 text-navy-950 scale-125 ring-4 ring-sky-400/30 shadow-glow'
                    : 'bg-brand-600 text-white hover:scale-110 ring-2 ring-navy-950'
                }`}
              >
                {index + 1}
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-navy-950/90 border border-slate-700/80 text-[10px] font-medium text-slate-200 whitespace-nowrap shadow">
                {stop.time} · {stop.title.slice(0, 22)}
                {stop.title.length > 22 ? '…' : ''}
              </div>
            </button>
          );
        })}

        {/* Weather / Telemetry Badge */}
        <div className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-2 text-xs flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-200 font-medium">{weatherNotice}</span>
        </div>

        {/* Selected Stop Inspector Card */}
        {selectedStop && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:w-80 bg-navy-950/95 backdrop-blur-md border border-brand-500/40 rounded-xl p-3 shadow-xl z-20">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Stop Details · {selectedStop.time}
                </span>
                <h4 className="text-xs font-bold text-white mt-0.5">{selectedStop.title}</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-500/20 text-brand-300 border border-brand-500/30 shrink-0">
                {selectedStop.type}
              </span>
            </div>
            {selectedStop.notes && (
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">{selectedStop.notes}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
