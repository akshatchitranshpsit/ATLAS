import React, { useState } from 'react';
import {
  Wallet,
  Sparkles,
  TrendingDown,
  PlusCircle,
  CheckCircle2,
  ArrowRightLeft,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function BudgetDashboardPage() {
  const {
    activeTrip,
    budgetCategories,
    budgetOptimizations,
    applyBudgetOptimization,
    addExpense,
    formatPrice,
  } = useTravel();

  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCat, setExpenseCat] = useState(budgetCategories[2]?.id || 'cat-food');
  const [fxAmountINR, setFxAmountINR] = useState(10000);

  const handleLogExpense = (e) => {
    e.preventDefault();
    if (!expenseDesc.trim() || !expenseAmount) return;
    addExpense({
      categoryId: expenseCat,
      amountINR: Number(expenseAmount),
      description: expenseDesc.trim(),
    });
    setExpenseDesc('');
    setExpenseAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
          <Wallet className="w-4 h-4" />
          Budget Optimization & FX Arbitrage Agent
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
          Travel Budget & Financial Intelligence
        </h1>
      </div>

      {/* Top Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <span className="text-xs text-slate-400">Total Trip Budget Ceiling</span>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            {formatPrice(activeTrip.budgetINR)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {formatPrice(Math.round(activeTrip.budgetINR / activeTrip.days))} / day target allocation
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <span className="text-xs text-slate-400">Committed & Spent</span>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-sky-400 mt-1">
            {formatPrice(activeTrip.spentINR)}
          </div>
          <p className="text-xs text-emerald-400 mt-1">
            {formatPrice(activeTrip.budgetINR - activeTrip.spentINR)} remaining safe buffer
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-emerald-500/30">
          <span className="text-xs text-emerald-300 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4" />
            Saved by Autonomous AI Agent
          </span>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-400 mt-1">
            {formatPrice(activeTrip.savedByAI)}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Via rail pass break-even math & fare locks
          </p>
        </div>
      </div>

      {/* Main Two Columns: Category Breakdown + AI Cost-Saving Arbitrage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Category Breakdown + Log Expense */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-bold text-lg text-white">
              Category Allocation vs. Actual Burn
            </h2>

            <div className="space-y-4">
              {budgetCategories.map((cat) => {
                const pct = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
                return (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{cat.name}</span>
                      <span className="text-slate-300">
                        <strong className="text-white">{formatPrice(cat.spent)}</strong> /{' '}
                        {formatPrice(cat.allocated)} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-navy-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${cat.color} rounded-full transition-all duration-300`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Log New Expense Form */}
          <form onSubmit={handleLogExpense} className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4" />
              Log Live Trip Expense
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={expenseDesc}
                onChange={(e) => setExpenseDesc(e.target.value)}
                placeholder="Description (e.g., Matcha Cafe)"
                className="bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Amount in INR (₹)"
                className="bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
              <select
                value={expenseCat}
                onChange={(e) => setExpenseCat(e.target.value)}
                className="bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {budgetCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition"
            >
              Add Expense & Recalculate Burn Rate
            </button>
          </form>
        </div>

        {/* Right: AI Cost Arbitrage Cards + Zero-FX Calculator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-brand-500/35 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                AI Cost-Saving Arbitrage
              </h2>
              <span className="text-[11px] text-emerald-400 font-semibold">1-Click Apply</span>
            </div>

            <div className="space-y-3">
              {budgetOptimizations.map((opt) => (
                <div
                  key={opt.id}
                  className="p-4 rounded-xl bg-navy-900/90 border border-slate-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-white">{opt.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 shrink-0">
                      Save {formatPrice(opt.savingsINR)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{opt.description}</p>
                  <div className="pt-1 flex justify-end">
                    {opt.applied ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        Optimization Applied
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => applyBudgetOptimization(opt.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-xs transition"
                      >
                        Apply & Save {formatPrice(opt.savingsINR)}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Zero-FX Multi-Currency Calculator */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4" />
              Zero-FX Live Currency Arbitrage Preview
            </h3>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Enter INR (₹) Amount:</label>
              <input
                type="number"
                value={fxAmountINR}
                onChange={(e) => setFxAmountINR(Number(e.target.value) || 0)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Japanese Yen</span>
                <span className="font-bold text-white">¥{Math.round(fxAmountINR * 1.82).toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">US Dollar</span>
                <span className="font-bold text-white">${(fxAmountINR / 84).toFixed(1)}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Swiss Franc</span>
                <span className="font-bold text-white">CHF {(fxAmountINR / 95).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
