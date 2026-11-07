import React, { useState } from 'react';
import {
  Map,
  CloudRain,
  Sparkles,
  Plus,
  Clock,
  CheckCircle2,
  Navigation,
  Sun,
  Building2,
  Trees,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import InteractiveMap from '../components/InteractiveMap';

export default function InteractiveItineraryPage() {
  const {
    activeTrip,
    itinerary,
    weatherAdapted,
    adaptItineraryForWeather,
    addItineraryStop,
    formatPrice,
  } = useTravel();

  const [selectedDayNum, setSelectedDayNum] = useState(1);
  const [newStopTitle, setNewStopTitle] = useState('');
  const [newStopTime, setNewStopTime] = useState('15:30');
  const [newStopType, setNewStopType] = useState('Culture');
  const [newStopCost, setNewStopCost] = useState(1200);

  const currentDay = itinerary.find((d) => d.day === selectedDayNum) || itinerary[0];

  const handleAddStop = (e) => {
    e.preventDefault();
    if (!newStopTitle.trim()) return;
    addItineraryStop(currentDay.day, {
      time: newStopTime,
      title: newStopTitle.trim(),
      type: newStopType,
      indoor: true,
      duration: '75 mins',
      costINR: newStopCost,
    });
    setNewStopTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <Map className="w-4 h-4" />
            Dynamic Itinerary, Weather & TSP Route Agent
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            {activeTrip.title} — Live Itinerary
          </h1>
        </div>

        {/* Weather Auto-Adaptation Action */}
        <div className="flex flex-wrap items-center gap-3">
          {!weatherAdapted ? (
            <button
              type="button"
              onClick={() => {
                adaptItineraryForWeather();
                setSelectedDayNum(3);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-lg transition"
            >
              <CloudRain className="w-4 h-4" />
              Weather Alert Day 3: Auto-Adapt for Rain
            </button>
          ) : (
            <span className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Day 3 Rain Contingency Active (Indoor Route Swapped)
            </span>
          )}
        </div>
      </div>

      {/* Day Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {itinerary.map((dayItem) => {
          const isSelected = dayItem.day === selectedDayNum;
          return (
            <button
              key={dayItem.day}
              type="button"
              onClick={() => setSelectedDayNum(dayItem.day)}
              className={`px-4 py-3 rounded-2xl border text-left shrink-0 transition ${
                isSelected
                  ? 'glass-card border-sky-400 shadow-glow'
                  : 'bg-navy-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-extrabold uppercase text-sky-400">
                  Day {dayItem.day} · {dayItem.city}
                </span>
                <span className="text-[11px] text-slate-400">{dayItem.date}</span>
              </div>
              <div className="text-xs font-semibold text-white mt-1 truncate max-w-[220px]">
                {dayItem.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Split View: Day Timeline + Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Stops Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  Day {currentDay.day}: {currentDay.title}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentDay.date} · Cluster Distance: {currentDay.routeDistanceKm} km · Saved{' '}
                  {currentDay.transitSavedMins} mins via TSP sequencing
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                {currentDay.weather}
              </span>
            </div>

            {/* Timeline Items */}
            <div className="mt-5 space-y-4 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-500/30">
              {currentDay.stops.map((stop, idx) => (
                <div key={stop.id} className="relative pl-10">
                  <div className="w-7 h-7 rounded-full bg-brand-600 border-2 border-navy-950 text-white text-xs font-bold flex items-center justify-center absolute left-0.5 top-1">
                    {idx + 1}
                  </div>

                  <div className="p-4 rounded-xl bg-navy-900/90 border border-slate-800 hover:border-brand-500/40 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-brand-500/20 text-sky-300 font-mono text-xs font-bold">
                          {stop.time}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-navy-950 border border-slate-700 text-slate-300 flex items-center gap-1">
                          {stop.indoor ? (
                            <>
                              <Building2 className="w-3 h-3 text-sky-400" />
                              Indoor Safe
                            </>
                          ) : (
                            <>
                              <Trees className="w-3 h-3 text-emerald-400" />
                              Outdoor
                            </>
                          )}
                        </span>
                      </div>

                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          stop.status.includes('Conflict')
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {stop.status}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-white mt-2">
                      {stop.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{stop.notes}</p>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-400" />
                        Duration: {stop.duration}
                      </span>
                      <span className="text-white font-semibold">
                        Est. Cost: {stop.costINR > 0 ? formatPrice(stop.costINR) : 'Included / Free'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Real-Time Stop Form */}
          <form
            onSubmit={handleAddStop}
            className="glass-card rounded-2xl p-5 border border-brand-500/30 space-y-3"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Real-Time Itinerary Modification — Add Stop to Day {currentDay.day}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                value={newStopTime}
                onChange={(e) => setNewStopTime(e.target.value)}
                placeholder="15:30"
                className="bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                value={newStopTitle}
                onChange={(e) => setNewStopTitle(e.target.value)}
                placeholder="Activity title (e.g., Uji Matcha Tasting)"
                className="sm:col-span-2 bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="number"
                value={newStopCost}
                onChange={(e) => setNewStopCost(e.target.value)}
                placeholder="Cost INR"
                className="bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Insert & Re-Optimize Day {currentDay.day} Route
            </button>
          </form>
        </div>

        {/* Right: Interactive Geospatial Map */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <InteractiveMap
            stops={currentDay.stops}
            cityTitle={`Day ${currentDay.day} · ${currentDay.city} Route Cluster`}
            weatherNotice={currentDay.weather}
            routeDistanceKm={currentDay.routeDistanceKm}
            transitSavedMins={currentDay.transitSavedMins}
          />
        </div>
      </div>
    </div>
  );
}
