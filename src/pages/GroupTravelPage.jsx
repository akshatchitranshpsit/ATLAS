import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Vote,
  UserPlus,
  CheckCircle2,
  Calculator,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function GroupTravelPage() {
  const {
    groupMembers,
    addGroupMember,
    groupPolls,
    votePoll,
    formatPrice,
  } = useTravel();

  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('Hyderabad');
  const [newDiet, setNewDiet] = useState('Vegetarian');
  const [newBudget, setNewBudget] = useState(180000);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addGroupMember({
      name: newName.trim(),
      city: newCity,
      diet: newDiet,
      budgetCapINR: newBudget,
      pace: 'Balanced',
      paidINR: 25000,
    });
    setNewName('');
  };

  const totalGroupPaid = groupMembers.reduce((sum, m) => sum + (m.paidINR || 0), 0);
  const fairSharePerPerson = Math.round(totalGroupPaid / Math.max(1, groupMembers.length));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          Multi-Origin Group Consensus & Sync Agent
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
          Group Travel Planning, Voting & Expense Split
        </h1>
      </div>

      {/* AI Consensus Banner */}
      <div className="glass-card rounded-2xl p-5 border border-brand-500/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            AI Group Harmony Score: 95% Compatibility
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Group Sync Agent aligned departure flights from Mumbai (BOM), Bengaluru (BLR), and New Delhi (DEL) to arrive at Tokyo Narita Terminal 1 within 40 minutes of each other. Lowest common budget cap ({formatPrice(175000)}) set as group ceiling.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shrink-0">
          Multi-City Arrival Synced
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Group Members & Invite Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <h2 className="font-display font-bold text-lg text-white">
              Traveller Squad & Preference Vectors ({groupMembers.length})
            </h2>

            <div className="space-y-3">
              {groupMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-xl bg-navy-900/90 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-[11px] text-slate-400">
                        Origin: {member.city} · Diet: {member.diet} · Pace: {member.pace}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs shrink-0">
                    <span className="text-slate-400 block text-[10px]">Max Budget</span>
                    <span className="font-bold text-sky-400">
                      {formatPrice(member.budgetCapINR)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Invite Co-Traveller Form */}
            <form onSubmit={handleAddMember} className="pt-3 border-t border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5" />
                Add Co-Traveller to Shared Trip State
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Name (e.g., Ananya Nair)"
                  className="bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Origin City"
                  className="bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="Budget Cap INR"
                  className="bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition"
              >
                Add Traveller & Re-Sync Group Constraints
              </button>
            </form>
          </div>

          {/* Automated Bill Split Ledger */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Shared Expense Split Settlement
            </h3>
            <p className="text-xs text-slate-400">
              Total Group Pre-Bookings Paid: <strong className="text-white">{formatPrice(totalGroupPaid)}</strong> · Equal Share:{' '}
              <strong className="text-sky-400">{formatPrice(fairSharePerPerson)} / person</strong>
            </p>
            <div className="space-y-2 pt-1">
              {groupMembers.map((m) => {
                const diff = m.paidINR - fairSharePerPerson;
                return (
                  <div
                    key={`split-${m.id}`}
                    className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-white">
                      {m.name} (Paid {formatPrice(m.paidINR)})
                    </span>
                    {diff >= 0 ? (
                      <span className="text-emerald-400 font-bold">
                        Gets back {formatPrice(diff)}
                      </span>
                    ) : (
                      <span className="text-amber-300 font-bold">
                        Owes {formatPrice(Math.abs(diff))}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Group Polls & Voting */}
        <div className="lg:col-span-6 space-y-5">
          {groupPolls.map((poll) => {
            const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0) || 1;
            return (
              <div key={poll.id} className="glass-card rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <Vote className="w-4 h-4" />
                    Live Group Poll
                  </span>
                  <span className="text-xs text-slate-400">{totalVotes} votes cast</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">{poll.question}</h3>
                <p className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                  🤖 {poll.agentNote}
                </p>

                <div className="space-y-2.5">
                  {poll.options.map((opt) => {
                    const pct = Math.round((opt.votes / totalVotes) * 100);
                    return (
                      <div
                        key={opt.id}
                        className="p-3.5 rounded-xl bg-navy-900/90 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-xs font-medium text-white">
                            {opt.text}
                            {opt.aiRecommended && (
                              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                AI Consensus Pick
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => votePoll(poll.id, opt.id)}
                            className="px-3 py-1 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shrink-0 transition"
                          >
                            Vote ({opt.votes})
                          </button>
                        </div>
                        <div className="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-500 to-sky-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
