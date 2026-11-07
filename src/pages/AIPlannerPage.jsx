import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  Play,
  CheckCircle2,
  Cpu,
  Code2,
  ArrowRight,
  RefreshCw,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { invokeSupervisorWorkflow } from '../services/api';

const PIPELINE_STEPS = [
  {
    agent: 'Supervisor Agent',
    action: 'Decomposing user prompt into sub-tasks & initializing LangGraph Shared Trip State',
    tool: 'StateGraphRouter(schema="TripPlanPydanticV2")',
    output: 'Task graph initialized: 6 parallel specialist branches + 1 verification gate.',
  },
  {
    agent: 'User Profile Agent',
    action: 'Retrieving traveller memory vectors, passport validity & dietary constraints',
    tool: 'pgvectorMemoryLookup(session="current")',
    output: 'Injected: Passport rules, dietary filter, and departure origin.',
  },
  {
    agent: 'Destination & Visa Agent',
    action: 'Auditing visa timelines, seasonal micro-climate & crowd density indices',
    tool: 'VisaPolicyAPI() + SeasonalCrowdIndex()',
    output: 'e-Visa eligible (5 days). Peak foliage index 9.6/10; early 07:30 temple slots assigned.',
  },
  {
    agent: 'Multi-Modal Transport Agent',
    action: 'Comparing non-stop flights, Shinkansen bullet trains & overnight coaches',
    tool: 'AmadeusFlightSearch() + RailRouteMatrix()',
    output: 'Selected NH-830 Non-Stop + Nozomi #215 Seat 12E (Mt. Fuji window). Saved ₹13,800.',
  },
  {
    agent: 'Stay & Proximity Agent',
    action: 'Scoring hotels & boutique ryokans by distance to daily itinerary clusters',
    tool: 'GeoClusterScorer(maxWalkMins=5)',
    output: 'Locked The Thousand Kyoto (2 min walk to JR hub) + Shibuya Stream Sky Hotel.',
  },
  {
    agent: 'Budget & Weather Agents',
    action: 'Verifying total cost against budget cap & attaching live rain-swap contingencies',
    tool: 'RailPassBreakEvenCalc() + OpenWeatherRadar()',
    output: 'Total cost 11% under budget cap. Day 3 afternoon rain contingency pre-loaded.',
  },
];

export default function AIPlannerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    formatPrice,
    createNewTripFromAI,
    setAgentFeed,
  } = useTravel();

  const [prompt, setPrompt] = useState(
    location.state?.initialPrompt ||
      'Plan a 7-day cultural & scenic trip to Kyoto, Osaka & Tokyo from Mumbai for 2 adults under ₹1,85,000 with vegetarian dining and bullet train views.'
  );
  const [destination, setDestination] = useState('Kyoto & Tokyo, Japan');
  const [days, setDays] = useState(7);
  const [travellers, setTravellers] = useState(2);
  const [budgetINR, setBudgetINR] = useState(185000);

  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(PIPELINE_STEPS.length);
  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'json'
  const [orchestrationSummary, setOrchestrationSummary] = useState(
    'Supervisor Agent has synthesized all 6 specialist agent outputs into a conflict-free, budget-verified travel state.'
  );

  const handleRunOrchestration = async (e) => {
    e.preventDefault();
    setIsRunning(true);
    setActiveStepIndex(0);

    for (let i = 1; i <= PIPELINE_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 320));
      setActiveStepIndex(i);
    }

    const res = await invokeSupervisorWorkflow(prompt, {
      destination,
      days,
      travellers,
      budgetINR,
      userPreferences: user,
    });

    if (res?.supervisor_summary) {
      setOrchestrationSummary(res.supervisor_summary);
    }
    setIsRunning(false);
  };

  const handleCommitTrip = () => {
    const created = createNewTripFromAI({
      destination,
      days,
      budgetINR,
      travellers,
    });
    setAgentFeed((prev) => [
      {
        id: `ag-${Date.now()}`,
        agent: 'Supervisor Agent',
        badge: 'New Trip State Committed',
        type: 'completed',
        timestamp: 'Just now',
        message: `Created "${created.title}" (${days} Days, ${travellers} Travellers, Budget ${formatPrice(
          budgetINR
        )}) and synchronized all 8 specialized agents.`,
        impact: 'Active trip state updated across all pages',
        approved: true,
      },
      ...prev,
    ]);
    navigate('/itinerary');
  };

  const structuredPydanticJSON = {
    supervisor_version: 'langgraph-v2.4',
    trip_metadata: {
      destination,
      origin_hub: user?.homeAirport || 'Mumbai (BOM)',
      duration_days: Number(days),
      travellers_count: Number(travellers),
      target_budget_inr: Number(budgetINR),
      optimized_cost_inr: Math.round(Number(budgetINR) * 0.86),
      projected_ai_savings_inr: Math.round(Number(budgetINR) * 0.14),
    },
    traveller_constraints: {
      passport: user?.passportCountry || 'Guest (Sign in to sync passport)',
      dietary_vector: user?.dietary || 'Standard',
      autonomy_mode: user?.autonomyLevel || 'Hybrid — Ask Before Payment',
    },
    agent_signoffs: {
      visa_agent: 'APPROVED_E_VISA_ELIGIBLE',
      transport_agent: 'FARE_LOCKED_24H_HOLD',
      stay_agent: 'PROXIMITY_SCORE_99',
      weather_agent: 'DAY3_RAIN_SWAP_RULE_ARMED',
      budget_agent: 'WITHIN_CEILING_TRUE',
    },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <Bot className="w-4 h-4" />
            LangGraph Supervisor Multi-Agent Studio
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Autonomous AI Travel Planner
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-navy-900 p-1 rounded-xl border border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setViewMode('visual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'visual' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Agent Pipeline View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'json' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Shared State JSON (Pydantic)
          </button>
        </div>
      </div>

      {/* Prompt & Structured Parameters Form */}
      <form
        onSubmit={handleRunOrchestration}
        className="glass-card rounded-2xl p-5 sm:p-6 border border-brand-500/35 shadow-glow space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            Natural Language Mission Prompt for Supervisor Agent
          </label>
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-navy-950 border border-slate-700/80 focus:border-sky-400 rounded-xl p-3.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Target Destination(s)
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Duration (Days)
            </label>
            <input
              type="number"
              min={2}
              max={30}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Travellers
            </label>
            <input
              type="number"
              min={1}
              max={15}
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Total Budget Ceiling (INR ₹)
            </label>
            <input
              type="number"
              step={5000}
              value={budgetINR}
              onChange={(e) => setBudgetINR(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Profile Vector:{' '}
              <strong className="text-slate-200">{user?.dietary || 'Not Signed In (Guest Mode)'}</strong>
              {user?.homeAirport ? (
                <>
                  {' '}
                  · <strong className="text-slate-200">{user.homeAirport}</strong>
                </>
              ) : null}
            </span>
          </div>

          <button
            type="submit"
            disabled={isRunning}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white text-xs font-bold shadow-glow flex items-center gap-2 transition disabled:opacity-60"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Orchestrating LangGraph Agents...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Multi-Agent Orchestration
              </>
            )}
          </button>
        </div>
      </form>

      {/* Pipeline Output or Structured JSON */}
      {viewMode === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Step-by-Step Agent Execution Trace */}
          <div className="lg:col-span-7 space-y-3">
            {PIPELINE_STEPS.map((step, index) => {
              const isDone = index < activeStepIndex;
              const isCurrent = index === activeStepIndex && isRunning;
              return (
                <div
                  key={step.agent}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDone
                      ? 'glass-card border-brand-500/30'
                      : isCurrent
                      ? 'bg-brand-900/30 border-sky-400 animate-pulse'
                      : 'bg-navy-950/50 border-slate-800 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      {step.agent}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-300">Running...</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{step.action}</p>
                  <div className="mt-2 px-2.5 py-1 rounded bg-navy-950 border border-slate-800 font-mono text-[11px] text-brand-300">
                    Tool Call: {step.tool}
                  </div>
                  {isDone && (
                    <p className="mt-2 text-xs text-emerald-300 font-medium">→ {step.output}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Supervisor Final Synthesis & Commit Panel */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-emerald-500/30 h-fit sticky top-24">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Supervisor Synthesis Ready
            </span>
            <h3 className="font-display font-bold text-xl text-white mt-3">
              {destination} ({days} Days)
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{orchestrationSummary}</p>

            <div className="mt-5 space-y-2.5 bg-navy-950/80 p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Budget Ceiling:</span>
                <span className="text-white font-semibold">{formatPrice(budgetINR)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Optimized Allocation:</span>
                <span className="text-emerald-400 font-bold">
                  {formatPrice(Math.round(budgetINR * 0.86))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Projected Arbitrage Savings:</span>
                <span className="text-sky-400 font-bold">
                  {formatPrice(Math.round(budgetINR * 0.14))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Weather & Route Protection:</span>
                <span className="text-emerald-300">Active (24/7 Radar)</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={handleCommitTrip}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Sparkles className="w-4 h-4" />
                Commit Plan & Open Interactive Itinerary
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/flights')}
                className="w-full py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 border border-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                Inspect Multi-Modal Flight & Rail Holds
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-6 border border-brand-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              LangGraph Shared State · Pydantic Structured Output
            </span>
            <span className="text-xs text-emerald-400 font-mono">status: 200 OK</span>
          </div>
          <pre className="bg-navy-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto">
            {JSON.stringify(structuredPydanticJSON, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
