import React, { createContext, useContext, useState } from 'react';
import {
  TRIPS_DATA,
  INITIAL_ITINERARY,
  SPECIALIZED_AGENTS,
} from '../data/mockData';

const TravelContext = createContext(null);

export function TravelProvider({ children }) {
  const [currency, setCurrency] = useState('INR');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('voyager_token');
  };

  const [trips, setTrips] = useState(TRIPS_DATA);
  const [activeTripId, setActiveTripId] = useState('trip-japan');
  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0];

  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY);
  const [weatherAdapted, setWeatherAdapted] = useState(false);

  const [agentFeed, setAgentFeed] = useState([
    {
      id: 'ag-1',
      agent: 'Dynamic Itinerary & Weather Agent',
      badge: 'Weather Alert · Kyoto Day 3',
      type: 'action_required',
      timestamp: '2 mins ago',
      message:
        '80% probability of heavy rain detected in Kyoto on 16 Nov (14:00–18:00). Proposed swapping open-air Philosopher’s Path canal walk with covered Nishiki Market Food Tour & Samurai Kembu Indoor Theater.',
      impact: 'Saves outdoor discomfort + preserves 100% schedule flow',
      approved: false,
    },
    {
      id: 'ag-2',
      agent: 'Multi-Modal Transport Agent',
      badge: 'Fare Lock Active',
      type: 'approval',
      timestamp: '14 mins ago',
      message:
        'ANA Flight NH-830 (BOM → NRT Non-Stop) held at ₹44,800 before projected ₹5,400 surge. Free 24h hold active — awaiting your approval to issue ticket.',
      impact: 'Saves ₹5,400 per traveller',
      approved: false,
    },
    {
      id: 'ag-3',
      agent: 'User Profile Agent',
      badge: 'Dietary Verification',
      type: 'completed',
      timestamp: '1 hour ago',
      message:
        'Confirmed 100% plant-based kombu dashi broth (zero fish bonito) with Gion Machiya Ryokan & Engine Ramen Kyoto for your vegetarian preference.',
      impact: 'Verified via restaurant direct message',
      approved: true,
    },
  ]);

  const [budgetCategories, setBudgetCategories] = useState([
    { id: 'cat-flights', name: 'Flights & High-Speed Rail', allocated: 65000, spent: 53000, color: 'bg-blue-500' },
    { id: 'cat-stays', name: 'Hotels & Boutique Ryokans', allocated: 62000, spent: 51500, color: 'bg-cyan-400' },
    { id: 'cat-food', name: 'Dining & Culinary Tours', allocated: 25000, spent: 16400, color: 'bg-emerald-400' },
    { id: 'cat-activities', name: 'Attractions & Passes', allocated: 18000, spent: 11500, color: 'bg-indigo-400' },
    { id: 'cat-visa', name: 'Visa, Insurance & Buffer', allocated: 15000, spent: 6000, color: 'bg-amber-400' },
  ]);

  const [budgetOptimizations, setBudgetOptimizations] = useState([
    {
      id: 'opt-1',
      title: 'Kansai-Hiroshima Area Pass + Individual Nozomi Ticket vs. Full 7-Day JR Pass',
      agent: 'Budget Optimization Agent',
      savingsINR: 8400,
      description: 'After the Oct JR Pass price hike, buying regional Kansai pass + 1-way Nozomi saves ₹8,400 while unlocking faster Nozomi trains.',
      applied: false,
    },
    {
      id: 'opt-2',
      title: 'Direct Baggage Forwarding (Yamato Transport) vs. Station Coin Lockers + Taxi',
      agent: 'Stay & Proximity Agent',
      savingsINR: 3200,
      description: 'Forwarding 2 suitcases from Kyoto hotel to Tokyo hotel costs ₹1,800 vs. ₹5,000 in station taxis & oversized lockers.',
      applied: false,
    },
    {
      id: 'opt-3',
      title: 'Zero-FX Markup Card Routing for Yen Payments',
      agent: 'Budget Optimization Agent',
      savingsINR: 4900,
      description: 'Route JPY hotel & rail payments via Zero-Forex card instead of standard 3.5% + GST bank card.',
      applied: false,
    },
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 'bk-101',
      type: 'Flight',
      title: 'ANA All Nippon Airways · NH-830',
      subtitle: 'Mumbai (BOM) → Tokyo Narita (NRT) · Non-Stop',
      date: '14 Nov 2026 · 20:15 IST',
      pnr: 'VYG-NH830X',
      priceINR: 44800,
      status: 'Pending User Approval',
      agentNote: 'Fare locked by Transport Agent for 24h. Approve to issue e-ticket.',
      refundable: true,
    },
    {
      id: 'bk-102',
      type: 'Hotel',
      title: 'The Thousand Kyoto Sanctuary',
      subtitle: '3 Nights · Deluxe Twin Room · Breakfast Included',
      date: '14 Nov – 17 Nov 2026',
      pnr: 'KYT-99281-JP',
      priceINR: 50400,
      status: 'Confirmed',
      agentNote: '2 mins from Kyoto Station. Vegetarian breakfast pre-registered.',
      refundable: true,
    },
    {
      id: 'bk-103',
      type: 'Train',
      title: 'JR Central Nozomi #215 Shinkansen',
      subtitle: 'Kyoto Station → Tokyo Shibuya · Seat 12D & 12E (Mt. Fuji Side)',
      date: '16 Nov 2026 · 17:00 JST',
      pnr: 'JR-EX-77412',
      priceINR: 8200,
      status: 'Confirmed',
      agentNote: 'Oversized baggage compartment reserved automatically.',
      refundable: true,
    },
    {
      id: 'bk-104',
      type: 'Experience',
      title: 'teamLab Planets Tokyo & Shibuya Sky Sunset Slot',
      subtitle: 'Timed Entry VIP Pass · 2 Adults',
      date: '18 Nov 2026 · 16:30 JST',
      pnr: 'TML-44910',
      priceINR: 6400,
      status: 'Pending User Approval',
      agentNote: 'Sunset slot (16:30) sells out 3 weeks early — AI placed soft hold.',
      refundable: false,
    },
  ]);

  const [groupMembers, setGroupMembers] = useState([
    {
      id: 'm2',
      name: 'Riya Kapoor',
      role: 'Co-Traveller',
      city: 'Bengaluru',
      budgetCapINR: 175000,
      diet: 'Vegetarian',
      pace: 'Photography & Cafes',
      avatar: 'RK',
      paidINR: 52000,
    },
    {
      id: 'm3',
      name: 'Kabir Sharma',
      role: 'Explorer',
      city: 'New Delhi',
      budgetCapINR: 195000,
      diet: 'Flexitarian',
      pace: 'Adventure & Nightlife',
      avatar: 'KS',
      paidINR: 34000,
    },
  ]);

  const [groupPolls, setGroupPolls] = useState([
    {
      id: 'poll-1',
      question: 'Day 4 Excursion from Tokyo: Which day trip should the AI lock in?',
      agentNote: 'Group Sync Agent found 94% weather clarity in Hakone on Nov 17.',
      options: [
        { id: 'op-a', text: 'Hakone Open-Air Museum, Lake Ashi Pirate Ship & Mt. Fuji Ropeway', votes: 2, aiRecommended: true },
        { id: 'op-b', text: 'Nikko Toshogu Shrine & Kegon Waterfall Autumn Gorge', votes: 1, aiRecommended: false },
        { id: 'op-c', text: 'Kamakura Great Buddha & Enoshima Coastal Electric Train', votes: 0, aiRecommended: false },
      ],
    },
    {
      id: 'poll-2',
      question: 'Kyoto Accommodation Style for Nights 1–3?',
      agentNote: 'Both options are within ₹18,000/night group budget ceiling.',
      options: [
        { id: 'op-c', text: 'The Thousand Kyoto (Steps from Bullet Train + Modern Spa)', votes: 2, aiRecommended: true },
        { id: 'op-d', text: 'Traditional Gion Ryokan with Tatami Mats', votes: 1, aiRecommended: false },
      ],
    },
  ]);

  const formatPrice = (inrAmount) => {
    if (currency === 'USD') {
      const usd = Math.round(inrAmount / 84);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `₹${Number(inrAmount).toLocaleString('en-IN')}`;
  };

  const approveAgentAction = (id) => {
    setAgentFeed((prev) =>
      prev.map((item) => (item.id === id ? { ...item, approved: true, type: 'completed' } : item))
    );
    if (id === 'ag-1' && !weatherAdapted) {
      adaptItineraryForWeather();
    }
    if (id === 'ag-2') {
      approveBooking('bk-101');
    }
  };

  const dismissAgentAction = (id) => {
    setAgentFeed((prev) => prev.filter((item) => item.id !== id));
  };

  const adaptItineraryForWeather = () => {
    setWeatherAdapted(true);
    setItinerary((prev) =>
      prev.map((dayObj) => {
        if (dayObj.day !== 3) return dayObj;
        return {
          ...dayObj,
          weather: '14°C Rain Adapted (Indoor Cultural Route Active)',
          weatherRisk: 'Mitigated by AI',
          stops: dayObj.stops.map((stop) =>
            stop.id === 'st-302'
              ? {
                  ...stop,
                  title: 'Nishiki Covered Food Market & Samurai Kembu Indoor Theater',
                  type: 'Indoor Culture & Food',
                  indoor: true,
                  costINR: 1900,
                  status: 'AI Weather-Swapped ✓',
                  notes: 'Swapped automatically by Weather Agent to avoid 14:00 heavy rain while staying 10 mins from Kyoto Station.',
                }
              : stop
          ),
        };
      })
    );
  };

  const addItineraryStop = (dayNumber, newStop) => {
    setItinerary((prev) =>
      prev.map((dayObj) =>
        dayObj.day === dayNumber
          ? {
              ...dayObj,
              stops: [
                ...dayObj.stops,
                {
                  id: `st-${Date.now()}`,
                  time: newStop.time || '15:30',
                  title: newStop.title,
                  type: newStop.type || 'Custom Activity',
                  indoor: Boolean(newStop.indoor),
                  duration: newStop.duration || '90 mins',
                  costINR: Number(newStop.costINR) || 0,
                  status: 'Added by Traveller',
                  coords: { x: Math.floor(Math.random() * 60) + 20, y: Math.floor(Math.random() * 55) + 20 },
                  notes: newStop.notes || 'Route re-sequenced by Dynamic Itinerary Agent.',
                },
              ],
            }
          : dayObj
      )
    );
  };

  const applyBudgetOptimization = (optId) => {
    const target = budgetOptimizations.find((o) => o.id === optId);
    if (!target || target.applied) return;

    setBudgetOptimizations((prev) =>
      prev.map((o) => (o.id === optId ? { ...o, applied: true } : o))
    );

    setBudgetCategories((prev) =>
      prev.map((cat, idx) =>
        idx === 0
          ? { ...cat, spent: Math.max(10000, cat.spent - target.savingsINR) }
          : cat
      )
    );

    setTrips((prev) =>
      prev.map((t) =>
        t.id === activeTripId
          ? {
              ...t,
              spentINR: Math.max(20000, t.spentINR - target.savingsINR),
              savedByAI: t.savedByAI + target.savingsINR,
            }
          : t
      )
    );
  };

  const addExpense = ({ categoryId, amountINR, description }) => {
    const val = Number(amountINR) || 0;
    if (val <= 0) return;
    setBudgetCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, spent: c.spent + val } : c))
    );
    setTrips((prev) =>
      prev.map((t) => (t.id === activeTripId ? { ...t, spentINR: t.spentINR + val } : t))
    );
    setAgentFeed((prev) => [
      {
        id: `ag-${Date.now()}`,
        agent: 'Budget Optimization Agent',
        badge: 'Expense Logged',
        type: 'completed',
        timestamp: 'Just now',
        message: `Logged "${description}" (${formatPrice(val)}). Updated live trip burn-rate and remaining daily buffer.`,
        impact: 'Within safe budget threshold',
        approved: true,
      },
      ...prev,
    ]);
  };

  const approveBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'Confirmed', agentNote: 'User-approved! E-ticket & voucher synced to itinerary.' }
          : b
      )
    );
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'Cancelled (Full Refund Initiated)', agentNote: 'Refund tracked by Booking Agent.' }
          : b
      )
    );
  };

  const addBookingItem = (item) => {
    const newBk = {
      id: `bk-${Date.now()}`,
      type: item.type || 'Transport',
      title: item.title,
      subtitle: item.subtitle,
      date: item.date || activeTrip.dates,
      pnr: `VYG-${Math.floor(10000 + Math.random() * 90000)}`,
      priceINR: item.priceINR || 12000,
      status: 'Pending User Approval',
      agentNote: 'Held by ATLAS with 24h price protection. Approve in Booking Manager.',
      refundable: true,
    };
    setBookings((prev) => [newBk, ...prev]);
  };

  const votePoll = (pollId, optionId) => {
    setGroupPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? {
              ...p,
              options: p.options.map((o) =>
                o.id === optionId ? { ...o, votes: o.votes + 1 } : o
              ),
            }
          : p
      )
    );
  };

  const addGroupMember = (member) => {
    setGroupMembers((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        name: member.name,
        role: 'Traveller',
        city: member.city || 'Mumbai',
        budgetCapINR: Number(member.budgetCapINR) || 180000,
        diet: member.diet || 'Vegetarian',
        pace: member.pace || 'Balanced',
        avatar: member.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        paidINR: Number(member.paidINR) || 0,
      },
    ]);
  };

  const createNewTripFromAI = ({ destination, days, budgetINR, travellers }) => {
    const newId = `trip-${Date.now()}`;
    const newTrip = {
      id: newId,
      title: `${destination} AI Autonomous Expedition`,
      destination,
      origin: user?.homeAirport || 'Mumbai (BOM)',
      dates: `${days} Days · Upcoming Window`,
      days: Number(days) || 6,
      travellers: Number(travellers) || 2,
      status: 'AI Orchestrated',
      budgetINR: Number(budgetINR) || 150000,
      spentINR: Math.round((Number(budgetINR) || 150000) * 0.62),
      savedByAI: Math.round((Number(budgetINR) || 150000) * 0.16),
      visaStatus: 'Visa Requirements Verified by AI',
      weatherSummary: 'Optimal Seasonal Window Selected',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      coordinates: { lat: 35.0, lng: 135.0 },
      healthScore: 97,
    };
    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newId);
    return newTrip;
  };

  return (
    <TravelContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        trips,
        activeTripId,
        setActiveTripId,
        activeTrip,
        createNewTripFromAI,
        specializedAgents: SPECIALIZED_AGENTS,
        agentFeed,
        setAgentFeed,
        approveAgentAction,
        dismissAgentAction,
        itinerary,
        weatherAdapted,
        adaptItineraryForWeather,
        addItineraryStop,
        budgetCategories,
        budgetOptimizations,
        applyBudgetOptimization,
        addExpense,
        bookings,
        approveBooking,
        cancelBooking,
        addBookingItem,
        groupMembers,
        addGroupMember,
        groupPolls,
        votePoll,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const ctx = useContext(TravelContext);
  if (!ctx) {
    throw new Error('useTravel must be used inside a TravelProvider');
  }
  return ctx;
}
