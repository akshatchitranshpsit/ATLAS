import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MessageSquare,
  Globe,
  Users,
  CalendarCheck,
  Languages,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [prompt, setPrompt] = useState('');

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleStartSubmit = (e) => {
    e.preventDefault();
    navigate('/auth', {
      state: {
        initialPrompt: prompt.trim(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#050811] text-white font-sans selection:bg-white selection:text-black">
      {/* =================================================================
          1. MINIMAL TOP NAVBAR (MINDTRIP.AI / WELCOME STYLE)
      ================================================================== */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent backdrop-blur-[2px]">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/atlas-logo.png"
            alt="ATLAS Logo"
            className="w-11 h-11 rounded-full object-cover border border-white/25 shadow-lg group-hover:scale-105 transition"
          />
          <div className="flex flex-col text-left">
            <span className="font-display font-extrabold text-xl tracking-widest text-white leading-none">
              ATLAS
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-white/70 mt-0.5">
              Stop Searching. Start Arriving.
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/85">
          <a href="#how-it-works" className="hover:text-white transition">How it works</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <Link to="/discover" className="hover:text-white transition">Explore</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white transition"
          >
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* =================================================================
          2. CLEAN FULL-BLEED VIDEO HERO AT THE VERY TOP (AURORA BOREALIS)
      ================================================================== */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        <video
          ref={videoRef}
          src="/aurora-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Soft subtle gradient overlay */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-black/30" />

        {/* Clean Centered Hero Typography & Single Pill Bar */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase text-white/90">
            <img src="/atlas-logo.png" alt="ATLAS" className="w-5 h-5 rounded-full object-cover" />
            <span>ATLAS · Stop Searching. Start Arriving.</span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-7xl tracking-tight text-white leading-[1.05]">
            Travel differently.
          </h1>

          <p className="text-lg sm:text-xl text-white/85 max-w-xl mx-auto font-normal leading-relaxed">
            Meet ATLAS — the autonomous travel assistant that turns your inspiration into personalized, bookable trips in seconds.
          </p>

          {/* Single Sleek Pill Input (Mindtrip Welcome Style) */}
          <form
            onSubmit={handleStartSubmit}
            className="mt-8 max-w-xl mx-auto flex items-center bg-white/95 backdrop-blur-md rounded-full p-2 pl-6 shadow-2xl"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Where do you want to go?"
              className="flex-1 bg-transparent text-black placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black hover:bg-neutral-800 text-white text-sm font-semibold flex items-center gap-2 transition shrink-0"
            >
              <span>Start planning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Minimal Video Play/Sound Control in Bottom Corner */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition"
            aria-label="Play or pause video"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition"
            aria-label="Mute or unmute video"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </section>

      {/* =================================================================
          3. HOW IT WORKS — CLEAN CHAT + MAP PREVIEW (MINDTRIP STYLE)
      ================================================================== */}
      <section id="how-it-works" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Everything in one place
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white">
            Just ask. Watch your trip come together.
          </h2>
          <p className="text-base text-white/65 leading-relaxed">
            No more 30 open browser tabs. Chat naturally to discover places, see them on an interactive map, and customize your day-by-day plan effortlessly.
          </p>
        </div>

        {/* Clean Split Showcase Card */}
        <div className="rounded-3xl bg-[#0C1222] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Left: Minimal Conversation */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-white/80">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Conversational Planning
              </div>

              <div className="p-4 rounded-2xl bg-white/5 text-sm text-white/90 leading-relaxed">
                &ldquo;Plan 6 days in Iceland chasing the Aurora Borealis with geothermal lagoons and scenic south coast stops.&rdquo;
              </div>

              <div className="space-y-3 text-sm text-white/75 leading-relaxed">
                <p className="font-medium text-white">
                  Here is your 6-day Iceland South Coast route:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                  <li>• Days 1–2: Reykjavik & Sky Lagoon Oceanside Spa</li>
                  <li>• Days 3–4: Vik Black Sand Beach & Glass Igloo Stay</li>
                  <li>• Days 5–6: Jökulsárlón Glacier Lagoon & Ice Caves</li>
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition"
              >
                Try the interactive planner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Clean Visual Map & Destination Preview */}
          <div className="lg:col-span-7 relative min-h-[380px] bg-[#080D1A] p-6 sm:p-8 flex flex-col justify-between">
            <img
              src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80"
              alt="Iceland Aurora"
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-[#080D1A]/30 to-transparent" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-medium text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Reykjavik → Vik → Jökulsárlón
              </span>
              <Link
                to="/itinerary"
                className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition"
              >
                Open Map View
              </Link>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-20">
              <div className="p-4 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15">
                <span className="text-[11px] text-emerald-400 font-semibold">Stop 01 · Day 1</span>
                <h4 className="font-display font-bold text-sm text-white mt-0.5">
                  Sky Lagoon Geothermal Spa
                </h4>
                <p className="text-xs text-white/65 mt-1">Reykjavik Peninsula · Bookable</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15">
                <span className="text-[11px] text-emerald-400 font-semibold">Stop 02 · Day 3</span>
                <h4 className="font-display font-bold text-sm text-white mt-0.5">
                  Panorama Glass Aurora Lodge
                </h4>
                <p className="text-xs text-white/65 mt-1">Hella South Coast · 98% Match</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. CLEAN ABOUT SECTION (#about)
      ================================================================== */}
      <section id="about" className="py-24 px-6 sm:px-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              About ATLAS
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              Built for the way you actually travel.
            </h2>
            <p className="text-base text-white/65 leading-relaxed">
              ATLAS brings together conversational discovery, live maps, multi-modal transport comparison, and real-time travel assistance in one calm, unified workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-[#0C1222] border border-white/10 space-y-3">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
              <h3 className="font-display font-bold text-lg text-white">Tailored to You</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Remembers your travel pace, budget, passport visa rules, and dietary preferences automatically.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0C1222] border border-white/10 space-y-3">
              <Globe className="w-6 h-6 text-sky-400" />
              <h3 className="font-display font-bold text-lg text-white">Compare & Book</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Compare flights, high-speed trains, and boutique stays side-by-side with 24-hour price holds.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0C1222] border border-white/10 space-y-3">
              <Users className="w-6 h-6 text-indigo-400" />
              <h3 className="font-display font-bold text-lg text-white">Plan Together</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Invite friends to vote on activities, align flights from different cities, and split expenses effortlessly.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0C1222] border border-white/10 space-y-3">
              <CalendarCheck className="w-6 h-6 text-amber-400" />
              <h3 className="font-display font-bold text-lg text-white">Adapts in Real Time</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Monitors weather shifts and flight changes 24/7, keeping your itinerary and emergency support ready.
              </p>
            </div>

            {/* Built-in Two-Way Translator (full-width feature card) */}
            <div className="md:col-span-2 lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-[#0C1222] border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-3">
                <Languages className="w-6 h-6 text-rose-400" />
                <h3 className="font-display font-bold text-lg text-white">Built-in Translator</h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  Speak with locals without the language barrier. ATLAS translates the local language into yours and your replies back into theirs, so you can order food, ask for directions, and handle emergencies with confidence.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="max-w-[85%] p-3.5 rounded-2xl rounded-bl-sm bg-white/5 border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">
                    Local · Japanese
                  </span>
                  <p className="text-white/90">駅はどこですか？</p>
                  <p className="text-xs text-emerald-400 mt-1">&ldquo;Where is the station?&rdquo;</p>
                </div>
                <div className="max-w-[85%] ml-auto p-3.5 rounded-2xl rounded-br-sm bg-emerald-400/10 border border-emerald-400/25">
                  <span className="block text-[10px] uppercase tracking-wider text-emerald-300/80 mb-1">
                    You · English
                  </span>
                  <p className="text-white/90">Straight ahead, then turn left.</p>
                  <p className="text-xs text-emerald-400 mt-1">まっすぐ行って、左に曲がってください。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6. MINIMAL BOTTOM CTA & FOOTER
      ================================================================== */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white">
            Where to next?
          </h2>
          <p className="text-base text-white/65">
            Start planning your next journey in seconds—free to explore.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/planner"
              className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition"
            >
              Launch AI Planner
            </Link>
            <Link
              to="/dashboard"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition"
            >
              Open Travel Dashboard
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 sm:px-12 border-t border-white/10 text-xs text-white/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/atlas-logo.png" alt="ATLAS Logo" className="w-7 h-7 rounded-full object-cover" />
            <span className="font-semibold text-white tracking-widest">ATLAS</span>
            <span>— Stop Searching. Start Arriving.</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/discover" className="hover:text-white transition">Destinations</Link>
            <Link to="/flights" className="hover:text-white transition">Flights & Rail</Link>
            <Link to="/hotels" className="hover:text-white transition">Hotels</Link>
            <Link to="/itinerary" className="hover:text-white transition">Itinerary</Link>
            <Link to="/emergency" className="hover:text-white transition">Emergency SOS</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
