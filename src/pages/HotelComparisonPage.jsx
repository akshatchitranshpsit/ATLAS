import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Hotel,
  Sparkles,
  Star,
  MapPin,
  Train,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { HOTELS_DATA } from '../data/mockData';
import { useTravel } from '../context/TravelContext';

export default function HotelComparisonPage() {
  const { formatPrice, addBookingItem } = useTravel();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('proximity'); // 'proximity' | 'price' | 'rating'
  const [selectedIds, setSelectedIds] = useState([]);

  const sortedHotels = [...HOTELS_DATA].sort((a, b) => {
    if (sortBy === 'price') return a.pricePerNightINR - b.pricePerNightINR;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.aiProximityScore - a.aiProximityScore;
  });

  const handleReserveStay = (hotel) => {
    if (selectedIds.includes(hotel.id)) return;
    setSelectedIds((prev) => [...prev, hotel.id]);
    addBookingItem({
      type: 'Hotel',
      title: hotel.name,
      subtitle: `${hotel.location} · ${hotel.category}`,
      date: '3 Nights · Free Cancellation Hold',
      priceINR: hotel.pricePerNightINR * 3,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <Hotel className="w-4 h-4" />
            Stay & Transit Cluster Proximity Agent
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Hotel, Ryokan & Stay Comparison
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Rank by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-navy-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          >
            <option value="proximity">AI Itinerary Proximity Score</option>
            <option value="price">Lowest Nightly Rate</option>
            <option value="rating">Guest Rating</option>
          </select>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedHotels.map((hotel) => {
          const isReserved = selectedIds.includes(hotel.id);
          return (
            <div
              key={hotel.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-navy-950/90 border border-sky-400/40 text-sky-300 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    {hotel.aiProximityScore}% Proximity Match
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-navy-950 text-xs font-extrabold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-navy-950" />
                    {hotel.rating} ({hotel.reviews})
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-semibold text-sky-300 uppercase">
                      {hotel.category}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white">{hotel.name}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3.5">
                  <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      {hotel.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                      <Train className="w-3.5 h-3.5 shrink-0" />
                      {hotel.transitTimeAvg}
                    </span>
                  </div>

                  {/* AI Verdict Box */}
                  <div className="p-3 rounded-xl bg-navy-950/90 border border-brand-500/30 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-sky-400 block mb-0.5">
                      Stay Agent Analysis:
                    </strong>
                    {hotel.aiVerdict}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5">
                    {hotel.amenities.map((am) => (
                      <span
                        key={am}
                        className="px-2.5 py-1 rounded-lg bg-navy-900 border border-slate-800 text-[11px] text-slate-300"
                      >
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">
                    AI Negotiated Rate
                  </span>
                  <span className="font-display font-extrabold text-2xl text-white">
                    {formatPrice(hotel.pricePerNightINR)}
                  </span>
                  <span className="text-xs text-slate-400"> / night</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleReserveStay(hotel)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      isReserved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white shadow-glow'
                    }`}
                  >
                    {isReserved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Added to Bookings
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Hold Room (Free Cancel)
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
