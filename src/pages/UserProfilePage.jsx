import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  ShieldCheck,
  Award,
  Save,
  CheckCircle2,
  Cpu,
  LogIn,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

const EMPTY_PROFILE = {
  name: '',
  email: '',
  phone: '',
  homeAirport: 'Mumbai (BOM)',
  passportCountry: 'India (Ordinary Passport)',
  passportExpiry: '',
  dietary: 'No Dietary Restrictions',
  travelPace: 'Balanced Cultural & Scenic',
  cabinPreference: 'Economy Plus / High-Speed Rail Window',
  autonomyLevel: 'Hybrid — Auto-Hold Free Cancellation, Ask Before Payment',
  budgetTier: 'Smart Premium',
  loyaltyCards: [],
};

export default function UserProfilePage() {
  const { isAuthenticated, user, setUser, setIsAuthenticated } = useTravel();
  const [formState, setFormState] = useState(user || EMPTY_PROFILE);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-5">
        <div className="glass-card rounded-2xl p-8 border border-brand-500/30 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-sky-400 mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">
            No Active Account Signed In
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            You are currently browsing ATLAS in guest mode. Sign in or create an account to save your passport vault, dietary preferences, and AI autonomy settings.
          </p>
          <div className="pt-2">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white text-xs font-bold shadow-glow transition"
            >
              <LogIn className="w-4 h-4" />
              Go to Sign In / Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    setUser(formState);
    setIsAuthenticated(true);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            User Profile Agent · pgvector Preference Store
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Traveller Profile, Passport Vault & AI Autonomy
          </h1>
        </div>
        {savedNotice && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Profile Vector Synced to All 8 Agents
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Editable Profile & AI Autonomy Form */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-8 glass-card rounded-2xl p-6 space-y-5"
        >
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-400" />
            Personal & Autonomous Preference Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Legal Name (As on Passport)</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Email for E-Tickets & Alerts</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Home Departure Airport</label>
              <select
                value={formState.homeAirport}
                onChange={(e) => setFormState({ ...formState, homeAirport: e.target.value })}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
              >
                <option>Mumbai (BOM)</option>
                <option>New Delhi (DEL)</option>
                <option>Bengaluru (BLR)</option>
                <option>Hyderabad (HYD)</option>
                <option>Chennai (MAA)</option>
                <option>London (LHR)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Passport & Nationality</label>
              <input
                type="text"
                value={formState.passportCountry}
                onChange={(e) => setFormState({ ...formState, passportCountry: e.target.value })}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Dietary Constraint Vector</label>
              <select
                value={formState.dietary}
                onChange={(e) => setFormState({ ...formState, dietary: e.target.value })}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
              >
                <option>No Dietary Restrictions</option>
                <option>Vegetarian (Eggless & Jain Friendly)</option>
                <option>Pure Vegetarian</option>
                <option>Vegan (100% Plant-Based)</option>
                <option>Halal Certified</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Preferred Travel Pace</label>
              <select
                value={formState.travelPace}
                onChange={(e) => setFormState({ ...formState, travelPace: e.target.value })}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
              >
                <option>Balanced Cultural & Scenic</option>
                <option>Relaxed Slow Travel (Max 2 Stops/Day)</option>
                <option>High-Energy Explorer</option>
                <option>Workcation & High-Speed Wi-Fi Priority</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sky-400 font-bold mb-1">
                Supervisor Agent Autonomy Level
              </label>
              <select
                value={formState.autonomyLevel}
                onChange={(e) => setFormState({ ...formState, autonomyLevel: e.target.value })}
                className="w-full bg-navy-950 border border-brand-500/40 rounded-xl px-3.5 py-2.5 text-white font-medium"
              >
                <option>Hybrid — Auto-Hold Free Cancellation, Ask Before Payment</option>
                <option>Conservative — Always Ask Before Holding or Modifying</option>
                <option>Full Autonomous — Auto-Execute Within Budget & Weather Rules</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white text-xs font-bold shadow-glow flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            Save & Update User Profile Agent Memory
          </button>
        </form>

        {/* Right: Passport Vault & Loyalty Programs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Passport & Visa Vault
              </span>
              <span className="text-[11px] text-slate-400">Encrypted</span>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Document:</span>
                <span className="text-white font-semibold">{user.passportCountry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Synced Airline & Hotel Loyalty Tiers
            </h3>
            {user.loyaltyCards && user.loyaltyCards.length > 0 ? (
              <div className="space-y-2.5">
                {user.loyaltyCards.map((card) => (
                  <div
                    key={card.program}
                    className="p-3 rounded-xl bg-navy-950 border border-slate-800 text-xs"
                  >
                    <div className="font-bold text-white">{card.program}</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span className="text-amber-300 font-medium">{card.tier}</span>
                      <span className="font-mono">{card.number}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No loyalty programs linked yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
