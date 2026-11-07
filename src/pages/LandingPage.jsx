import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
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
  Plane,
  TrainFront,
  BedDouble,
  Bus,
  ShieldAlert,
  CloudSun,
  FileCheck2,
  Wallet,
  Map,
  Luggage,
  Mic,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

/* -------------------------------------------------------------------------
   DATA
-------------------------------------------------------------------------- */

const HERO_WORDS = ['differently.', 'fearlessly.', 'effortlessly.', 'together.', 'smarter.', 'freely.'];

const PLACEHOLDERS = [
  'Six days chasing the Northern Lights in Iceland…',
  'Kyoto in autumn, vegetarian food, bullet trains…',
  'A Ladakh road trip for 3 friends under ₹70,000…',
  'Swiss Alps by scenic train, from Delhi…',
];

const QUICK_PROMPTS = [
  { label: '🌌 Northern Lights', text: 'Plan 6 days chasing the Northern Lights in Iceland' },
  { label: '⛩️ Kyoto in autumn', text: 'Plan a 7-day autumn trip to Kyoto and Tokyo' },
  { label: '🏔️ Ladakh road trip', text: 'Plan a 7-day Ladakh road trip for 3 friends' },
];

const DESTINATIONS = [
  'Kyoto', 'Reykjavik', 'Zermatt', 'Leh', 'Phu Quoc', 'Udaipur',
  'Tromsø', 'Lisbon', 'Bali', 'Santorini', 'Banff', 'Hanoi',
];

const STATS = [
  { to: 12, suffix: '', label: 'Travel tools in one app' },
  { to: 8, suffix: '', label: 'Specialised AI agents' },
  { to: 24, suffix: '/7', label: 'SOS & disruption support' },
  { to: 100, suffix: '%', label: 'Bookings need your approval' },
];

const CAPABILITIES = [
  { title: 'Flight Booking', desc: 'Compare fares across airlines and lock the best price with a 24-hour hold.', tag: 'Fly', icon: Plane, gradient: 'from-sky-400 to-blue-600' },
  { title: 'Train Booking', desc: 'Bullet trains, Vande Bharat and scenic rail routes, seats reserved for you.', tag: 'Rail', icon: TrainFront, gradient: 'from-emerald-400 to-teal-600' },
  { title: 'Hotels & Stays', desc: 'Rooms ranked by how close they are to your plans, not just by price.', tag: 'Stay', icon: BedDouble, gradient: 'from-amber-400 to-orange-500' },
  { title: 'Bus & Road', desc: 'Overnight coaches and road legs that save you a night of hotel cost.', tag: 'Road', icon: Bus, gradient: 'from-lime-400 to-green-600' },
  { title: 'SOS & Safety', desc: 'One tap for embassy contacts, hospitals, and emergency rebooking, 24/7.', tag: 'Safe', icon: ShieldAlert, gradient: 'from-rose-400 to-red-600' },
  { title: 'Live Translator', desc: 'Understand locals and reply in their language, both ways, in real time.', tag: 'Talk', icon: Languages, gradient: 'from-fuchsia-400 to-purple-600' },
  { title: 'Weather Alerts', desc: 'Rain on the way? Your day is re-planned before you get wet.', tag: 'Adapt', icon: CloudSun, gradient: 'from-cyan-300 to-sky-500' },
  { title: 'Visa & Documents', desc: 'Know exactly which visa or permit you need, with a ready checklist.', tag: 'Cleared', icon: FileCheck2, gradient: 'from-indigo-400 to-violet-600' },
  { title: 'Budget Tracker', desc: 'See every rupee against your plan and find savings as you go.', tag: 'Save', icon: Wallet, gradient: 'from-yellow-300 to-amber-500' },
  { title: 'Smart Itinerary', desc: 'Day-by-day plans on an interactive map, easy to change on the fly.', tag: 'Plan', icon: Map, gradient: 'from-teal-300 to-cyan-600' },
  { title: 'Group Trips', desc: 'Vote on plans, sync arrivals from different cities, split the bill.', tag: 'Together', icon: Users, gradient: 'from-pink-400 to-rose-600' },
  { title: 'Booking Wallet', desc: 'Tickets, vouchers and confirmations in one place, always offline-ready.', tag: 'Carry', icon: Luggage, gradient: 'from-orange-400 to-red-500' },
];

const STEPS = [
  {
    n: '01',
    icon: MessageSquare,
    title: 'Tell ATLAS where',
    desc: 'Describe the trip in your own words: a place, a mood, a budget. Our AI agents do the research.',
    color: 'text-sky-300',
  },
  {
    n: '02',
    icon: ShieldCheck,
    title: 'Review & approve',
    desc: 'Compare flights, trains and stays side by side. ATLAS holds prices for 24 hours and you decide.',
    color: 'text-emerald-300',
  },
  {
    n: '03',
    icon: Plane,
    title: 'Travel with backup',
    desc: 'Weather shifts, delays, language gaps, emergencies. ATLAS stays with you until you are home.',
    color: 'text-amber-300',
  },
];

const TRANSLATIONS = [
  {
    lang: 'Japanese',
    flag: '🇯🇵',
    local: '駅はどこですか？',
    toYou: 'Where is the station?',
    you: 'Straight ahead, then turn left.',
    toLocal: 'まっすぐ行って、左に曲がってください。',
  },
  {
    lang: 'French',
    flag: '🇫🇷',
    local: 'Où est la gare ?',
    toYou: 'Where is the station?',
    you: 'Straight ahead, then turn left.',
    toLocal: 'Tout droit, puis tournez à gauche.',
  },
  {
    lang: 'Hindi',
    flag: '🇮🇳',
    local: 'स्टेशन कहाँ है?',
    toYou: 'Where is the station?',
    you: 'Straight ahead, then turn left.',
    toLocal: 'सीधे जाइए, फिर बाएँ मुड़ जाइए।',
  },
  {
    lang: 'Spanish',
    flag: '🇪🇸',
    local: '¿Dónde está la estación?',
    toYou: 'Where is the station?',
    you: 'Straight ahead, then turn left.',
    toLocal: 'Siga recto y luego gire a la izquierda.',
  },
  {
    lang: 'Thai',
    flag: '🇹🇭',
    local: 'สถานีรถไฟอยู่ที่ไหน',
    toYou: 'Where is the train station?',
    you: 'Straight ahead, then turn left.',
    toLocal: 'ตรงไปแล้วเลี้ยวซ้าย',
  },
];

/* -------------------------------------------------------------------------
   SMALL HELPERS
-------------------------------------------------------------------------- */

/** Fades and lifts its children into view the first time they scroll on screen. */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/** Counts up to a number once it scrolls into view. */
function CountUp({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/** Types and deletes a list of phrases, returning the text typed so far. */
function useTypewriter(phrases, active) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!active) return undefined;
    let phraseIndex = 0;
    let chars = 0;
    let deleting = false;
    let timer;

    const step = () => {
      const phrase = phrases[phraseIndex];
      if (!deleting) {
        chars += 1;
        setText(phrase.slice(0, chars));
        if (chars === phrase.length) {
          deleting = true;
          timer = setTimeout(step, 1700);
          return;
        }
        timer = setTimeout(step, 55);
      } else {
        chars -= 1;
        setText(phrase.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(step, 350);
          return;
        }
        timer = setTimeout(step, 24);
      }
    };

    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [phrases, active]);

  return text;
}

/** Updates CSS variables so a card can paint a glow under the cursor. */
function trackSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

/* -------------------------------------------------------------------------
   PAGE
-------------------------------------------------------------------------- */

export default function LandingPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [langIndex, setLangIndex] = useState(0);

  const typedPlaceholder = useTypewriter(PLACEHOLDERS, prompt === '');

  // Rotating hero word
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % HERO_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  // Navbar blur + scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Translator demo rotates languages; picking one restarts the timer
  useEffect(() => {
    const id = setInterval(() => setLangIndex((i) => (i + 1) % TRANSLATIONS.length), 5200);
    return () => clearInterval(id);
  }, [langIndex]);

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
    navigate('/auth', { state: { initialPrompt: prompt.trim() } });
  };

  const t = TRANSLATIONS[langIndex];

  return (
    <div className="min-h-screen bg-[#050811] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-gradient-to-r from-amber-300 via-rose-400 to-sky-400"
        style={{ width: `${progress}%` }}
      />

      {/* ===================================================================
          NAVBAR
      ==================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 px-6 sm:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#050811]/75 backdrop-blur-xl border-b border-white/10'
            : 'py-4 bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/atlas-logo.png"
            alt="ATLAS Logo"
            className="w-10 h-10 rounded-full object-cover border border-white/25 shadow-lg group-hover:scale-105 transition"
          />
          <div>
            <span className="block font-display font-extrabold text-lg tracking-widest text-white leading-none">
              ATLAS
            </span>
            <span className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mt-0.5">
              Stop Searching. Start Arriving.
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/85">
          <a href="#features" className="hover:text-white transition">What you can do</a>
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
            to="/auth"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-amber-100 transition shadow-lg shadow-white/10"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ===================================================================
          HERO
      ==================================================================== */}
      <section className="relative h-screen min-h-[640px] w-full flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        <video
          ref={videoRef}
          src="/aurora-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-black/30" />

        {/* Drifting colour glows over the video */}
        <div className="aurora-blob absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="aurora-blob aurora-blob-delay absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="font-display font-bold text-5xl sm:text-7xl tracking-tight text-white leading-[1.05]">
            <span className="block">Travel</span>
            <span className="block relative h-[1.15em] overflow-hidden" aria-live="polite">
              <span
                key={wordIndex}
                className="atlas-word absolute inset-x-0 top-0 bg-gradient-to-r from-amber-200 via-rose-300 to-sky-300 bg-clip-text text-transparent"
              >
                {HERO_WORDS[wordIndex]}
              </span>
            </span>
          </h1>

          <p className="font-hero-sub italic text-2xl sm:text-[28px] text-white/95 max-w-2xl mx-auto font-medium leading-snug tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Meet <span className="not-italic font-display font-semibold tracking-widest text-amber-200 text-lg sm:text-xl align-baseline">ATLAS</span>, the autonomous travel assistant that turns your inspiration into{' '}
            <span className="underline decoration-amber-200/50 decoration-1 underline-offset-4 text-amber-100">
              personalized, bookable trips
            </span>{' '}
            in seconds.
          </p>

          <form
            onSubmit={handleStartSubmit}
            className="mt-8 max-w-xl mx-auto flex items-center bg-white/95 backdrop-blur-md rounded-full p-2 pl-6 shadow-2xl shadow-black/40 ring-1 ring-white/40 focus-within:ring-4 focus-within:ring-amber-200/40 transition"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={typedPlaceholder || 'Where do you want to go?'}
              aria-label="Where do you want to go?"
              className="flex-1 bg-transparent text-black placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black hover:bg-neutral-800 text-white text-sm font-semibold flex items-center gap-2 transition shrink-0 group"
            >
              <span>Start planning</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {QUICK_PROMPTS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setPrompt(chip.text)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 transition"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#features"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition"
          aria-label="Scroll to features"
        >
          Scroll
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>

        {/* Video controls */}
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

      {/* ===================================================================
          DESTINATION RIBBON
      ==================================================================== */}
      <div className="relative border-y border-white/10 bg-[#070B16] py-4 overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex w-max items-center gap-10 text-sm uppercase tracking-[0.3em] text-white/40">
          {[...DESTINATIONS, ...DESTINATIONS].map((place, i) => (
            <span key={`${place}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
              {place}
              <MapPin className="w-3.5 h-3.5 text-amber-300/60" />
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070B16] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070B16] to-transparent" />
      </div>

      {/* ===================================================================
          STATS
      ==================================================================== */}
      <section className="px-6 sm:px-12 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="text-center lg:px-6">
              <div className="font-display font-extrabold text-4xl sm:text-5xl bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-white/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================================================================
          FEATURES
      ==================================================================== */}
      <section id="features" className="relative py-24 px-6 sm:px-12 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Your pocket travel agent
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white">
              One app. Every journey covered.
            </h2>
            <p className="text-base text-white/65 leading-relaxed">
              From the moment you dream of a destination to the moment you land back home, ATLAS handles the booking, the route, and the unexpected.
            </p>
          </Reveal>

          <div className="relative h-10 mb-12 hidden sm:block" aria-hidden="true">
            <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-white/20" />
            <Plane className="atlas-fly absolute top-1/2 -translate-y-1/2 w-7 h-7 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]" />
            <MapPin className="absolute -top-1 left-0 w-5 h-5 text-emerald-400" />
            <MapPin className="absolute -top-1 right-0 w-5 h-5 text-rose-400" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <Reveal key={cap.title} delay={(i % 4) * 80}>
                  <Link
                    to="/auth"
                    onMouseMove={trackSpotlight}
                    className="spotlight group relative block h-full p-5 sm:p-6 rounded-3xl bg-[#0C1222]/90 border border-white/10 hover:border-white/30 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-[#050811] border border-white/10" />
                    <span className="absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-[#050811] border border-white/10" />

                    <div
                      className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${cap.gradient} shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="relative font-display font-bold text-base sm:text-lg text-white">
                      {cap.title}
                    </h3>
                    <p className="relative mt-1.5 text-xs sm:text-sm text-white/60 leading-relaxed">
                      {cap.desc}
                    </p>
                    <div className="relative mt-4 border-t border-dashed border-white/15 pt-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
                      <span>{cap.tag}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          HOW IT WORKS
      ==================================================================== */}
      <section id="how-it-works" className="py-24 px-6 sm:px-12 border-t border-white/10 bg-[#070B16]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              How it works
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white">
              Three steps to wheels up.
            </h2>
          </Reveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="hidden md:block absolute top-14 left-[16%] right-[16%] border-t-2 border-dashed border-white/15"
              aria-hidden="true"
            />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.n} delay={i * 140}>
                  <div className="relative h-full p-8 rounded-3xl bg-[#0C1222] border border-white/10 text-center space-y-4">
                    <div className="relative mx-auto w-16 h-16 rounded-full bg-[#050811] border border-white/15 flex items-center justify-center">
                      <Icon className={`w-7 h-7 ${step.color}`} />
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">{step.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          ABOUT
      ==================================================================== */}
      <section id="about" className="py-24 px-6 sm:px-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-2xl mb-14 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              About ATLAS
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              Built for the way you actually travel.
            </h2>
            <p className="text-base text-white/65 leading-relaxed">
              ATLAS brings together conversational discovery, live maps, multi-modal transport comparison, and real-time travel assistance in one calm, unified workspace.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, color: 'text-emerald-400', title: 'Tailored to You', text: 'Remembers your travel pace, budget, passport visa rules, and dietary preferences automatically.' },
              { icon: Globe, color: 'text-sky-400', title: 'Compare & Book', text: 'Compare flights, high-speed trains, and boutique stays side-by-side with 24-hour price holds.' },
              { icon: Users, color: 'text-indigo-400', title: 'Plan Together', text: 'Invite friends to vote on activities, align flights from different cities, and split expenses effortlessly.' },
              { icon: CalendarCheck, color: 'text-amber-400', title: 'Adapts in Real Time', text: 'Monitors weather shifts and flight changes 24/7, keeping your itinerary and emergency support ready.' },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 90}>
                  <div
                    onMouseMove={trackSpotlight}
                    className="spotlight relative h-full p-7 rounded-3xl bg-[#0C1222] border border-white/10 hover:border-white/25 space-y-3 overflow-hidden transition-colors"
                  >
                    <Icon className={`relative w-6 h-6 ${card.color}`} />
                    <h3 className="relative font-display font-bold text-lg text-white">{card.title}</h3>
                    <p className="relative text-sm text-white/65 leading-relaxed">{card.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Interactive translator demo */}
          <Reveal className="mt-6">
            <div className="relative p-7 sm:p-10 rounded-3xl bg-[#0C1222] border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden">
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-600 flex items-center justify-center shadow-lg">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Built-in Translator</h3>
                <p className="text-sm sm:text-base text-white/65 leading-relaxed">
                  Speak with locals without the language barrier. ATLAS translates the local language into yours and your replies back into theirs, so you can order food, ask for directions, and handle emergencies with confidence.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {TRANSLATIONS.map((item, i) => (
                    <button
                      key={item.lang}
                      type="button"
                      onClick={() => setLangIndex(i)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
                        i === langIndex
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'
                      }`}
                    >
                      {item.flag} {item.lang}
                    </button>
                  ))}
                </div>
              </div>

              <div key={t.lang} className="relative space-y-3 text-sm">
                <div className="fade-up max-w-[88%] p-4 rounded-2xl rounded-bl-sm bg-white/5 border border-white/10">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/50 mb-1.5">
                    <Mic className="w-3 h-3 text-rose-400 animate-pulse" />
                    Local · {t.lang}
                  </span>
                  <p className="text-white text-base">{t.local}</p>
                  <p className="text-xs text-emerald-400 mt-1.5">&ldquo;{t.toYou}&rdquo;</p>
                </div>
                <div className="fade-up fade-up-delay max-w-[88%] ml-auto p-4 rounded-2xl rounded-br-sm bg-emerald-400/10 border border-emerald-400/25">
                  <span className="block text-[10px] uppercase tracking-wider text-emerald-300/80 mb-1.5">
                    You · English
                  </span>
                  <p className="text-white text-base">{t.you}</p>
                  <p className="text-xs text-emerald-300 mt-1.5">{t.toLocal}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================================
          FINAL CTA
      ==================================================================== */}
      <section className="px-6 sm:px-12 pb-24">
        <Reveal>
          <div className="relative max-w-5xl mx-auto rounded-[2.5rem] border border-white/15 overflow-hidden px-6 py-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-fuchsia-500/10 to-amber-400/20" />
            <div className="aurora-blob absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="aurora-blob aurora-blob-delay absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-rose-400/20 blur-3xl" />

            <div className="relative max-w-2xl mx-auto space-y-6">
              <Sparkles className="w-8 h-8 text-amber-300 mx-auto" />
              <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-white">
                Where to next?
              </h2>
              <p className="text-base sm:text-lg text-white/70">
                Start planning your next journey in seconds. Free to explore.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/auth"
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-amber-100 transition shadow-xl shadow-white/10 flex items-center gap-2 group"
                >
                  Start planning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/discover"
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition"
                >
                  Explore destinations
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          ABOUT THE CREATOR & FOOTER
      ==================================================================== */}
      <footer className="pt-16 pb-12 px-6 sm:px-12 border-t border-white/10 bg-gradient-to-b from-[#050811] to-[#03050b] text-xs text-white/60">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* About the Creator Card */}
          <Reveal>
            <div
              onMouseMove={trackSpotlight}
              className="spotlight relative rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
            >
              <div className="flex items-center gap-4 sm:gap-5 text-center sm:text-left flex-col sm:flex-row">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300/25 via-rose-400/20 to-sky-400/25 border border-white/20 flex items-center justify-center font-display font-extrabold text-xl text-amber-200 shadow-lg shrink-0">
                  AC
                </div>
                <div>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300/90 mb-1">
                    About the Creator
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Akshat Chitransh
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 mt-1 max-w-xl">
                    Creator &amp; Lead Architect of <span className="text-white font-medium">ATLAS</span> — building autonomous AI travel intelligence for modern explorers.
                  </p>
                </div>
              </div>

              {/* Connect on Gmail Button with Official Multicolor Gmail SVG Logo */}
              <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                <span className="text-[11px] uppercase tracking-widest text-white/45">
                  Connect with the Creator
                </span>
                <a
                  href="mailto:akshatchitransh25@gmail.com"
                  className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-amber-200/40 transition-all shadow-lg"
                >
                  {/* Official Gmail Multicolor SVG Logo */}
                  <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M2 6.5V18c0 1.1.9 2 2 2h2V9.8l6 4.5 6-4.5V20h2c1.1 0 2-.9 2-2V6.5c0-1.8-2.1-2.8-3.5-1.7L12 10 5.5 4.8C4.1 3.7 2 4.7 2 6.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M18 20h2c1.1 0 2-.9 2-2V9.8l-4 3V20z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M18 4.8V11l4-3V6.5c0-1.8-2.1-2.8-3.5-1.7L18 4.8z"
                      />
                      <path
                        fill="#EA4335"
                        d="M6 11V4.8L12 10l6-5.2V11l-6 4.5L6 11z"
                      />
                      <path
                        fill="#C5221F"
                        d="M2 6.5V8l4 3V4.8L5.5 4.8C4.1 3.7 2 4.7 2 6.5z"
                      />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-wider text-white/45 leading-none">
                      Gmail
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white group-hover:text-amber-200 transition-colors">
                      akshatchitransh25@gmail.com
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Navigation Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            <div className="flex items-center gap-3">
              <img src="/atlas-logo.png" alt="ATLAS Logo" className="w-8 h-8 rounded-full object-cover border border-white/20" />
              <span className="font-display font-bold text-sm text-white tracking-widest">ATLAS</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-white/65">
              <Link to="/discover" className="hover:text-white transition">Destinations</Link>
              <Link to="/flights" className="hover:text-white transition">Flights &amp; Rail</Link>
              <Link to="/hotels" className="hover:text-white transition">Hotels</Link>
              <Link to="/itinerary" className="hover:text-white transition">Itinerary</Link>
              <Link to="/emergency" className="hover:text-white transition">Emergency SOS</Link>
            </div>
          </div>

          {/* General Copyright Syntax & Made with Love in India */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center text-center space-y-3">
            <p className="text-xs sm:text-sm text-white/75 font-medium">
              Copyright &copy; {new Date().getFullYear()} <span className="text-white font-semibold">ATLAS&trade;</span> &mdash; Created &amp; Developed by{' '}
              <span className="text-amber-200 font-semibold">Akshat Chitransh</span>. All Rights Reserved.
            </p>
            <p className="text-[11px] text-white/40 max-w-3xl leading-relaxed">
              All rights, title, and interest in and to the ATLAS platform, including its autonomous travel assistant interface, source code, branding, logos, and design architecture, are the exclusive intellectual property of Akshat Chitransh. Unauthorized reproduction, redistribution, modification, or commercial use without prior written permission is strictly prohibited.
            </p>
            <div className="pt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white/90 font-medium">
              <span>Made with</span>
              <span className="text-rose-500 animate-pulse text-base leading-none" role="img" aria-label="love">
                ❤️
              </span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
