import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const { setUser, setIsAuthenticated } = useTravel();
  const navigate = useNavigate();
  const location = useLocation();
  const pendingPrompt = location.state?.initialPrompt || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    homeAirport: 'Mumbai (BOM)',
    dietary: 'No Dietary Restrictions',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName =
      formData.name.trim() ||
      (formData.email ? formData.email.split('@')[0] : 'Traveller');

    setUser({
      name: displayName,
      email: formData.email.trim(),
      phone: '',
      homeAirport: formData.homeAirport,
      passportCountry: 'India (Ordinary Passport)',
      passportExpiry: '',
      dietary: formData.dietary,
      travelPace: 'Balanced Cultural & Scenic',
      cabinPreference: 'Economy Plus / High-Speed Rail Window',
      autonomyLevel: 'Hybrid — Auto-Hold Free Cancellation, Ask Before Payment',
      budgetTier: 'Smart Premium',
      loyaltyCards: [],
    });
    setIsAuthenticated(true);
    if (pendingPrompt) {
      navigate('/planner', { state: { initialPrompt: pendingPrompt } });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen navy-gradient-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <img
            src="/atlas-logo.png"
            alt="ATLAS Logo"
            className="w-12 h-12 rounded-2xl object-cover border border-brand-400/40 shadow-glow"
          />
          <div className="text-left">
            <span className="font-display font-extrabold text-2xl tracking-widest text-white block leading-none">
              ATLAS
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400">
              Stop Searching. Start Arriving.
            </span>
          </div>
        </Link>
        <h2 className="mt-5 font-display font-bold text-2xl sm:text-3xl text-white">
          {mode === 'login' ? 'Sign in to ATLAS' : 'Create Your ATLAS Account'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Sync your passport vault, dietary vector, and multi-agent trip memory
        </p>
        {pendingPrompt && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-400/30 text-sky-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate max-w-xs sm:max-w-sm">
              Sign in to plan: &ldquo;{pendingPrompt}&rdquo;
            </span>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-brand-500/30 shadow-glow">
          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-navy-950 rounded-xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2 rounded-lg text-xs font-semibold transition ${
                mode === 'login' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`py-2 rounded-lg text-xs font-semibold transition ${
                mode === 'signup' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700/80 focus:border-sky-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700/80 focus:border-sky-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700/80 focus:border-sky-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Home Airport Hub</label>
                  <select
                    value={formData.homeAirport}
                    onChange={(e) => setFormData({ ...formData, homeAirport: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option>Mumbai (BOM)</option>
                    <option>New Delhi (DEL)</option>
                    <option>Bengaluru (BLR)</option>
                    <option>Hyderabad (HYD)</option>
                    <option>London (LHR)</option>
                    <option>Singapore (SIN)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Dietary Vector</label>
                  <select
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option>No Dietary Restrictions</option>
                    <option>Vegetarian (Eggless & Jain Friendly)</option>
                    <option>Vegan (100% Plant Based)</option>
                    <option>Halal Verified</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition"
            >
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>End-to-end encrypted passport & booking state</span>
          </div>
        </div>
      </div>
    </div>
  );
}
