import React, { useState } from 'react';
import {
  TicketCheck,
  Plane,
  Train,
  Hotel,
  Sparkles,
  CheckCircle2,
  XCircle,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function BookingManagementPage() {
  const { bookings, approveBooking, cancelBooking, formatPrice } = useTravel();
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'Pending') return b.status.includes('Pending');
    if (statusFilter === 'Confirmed') return b.status === 'Confirmed';
    return true;
  });

  const getIcon = (type) => {
    if (type === 'Flight') return <Plane className="w-5 h-5 text-brand-400" />;
    if (type === 'Train') return <Train className="w-5 h-5 text-sky-400" />;
    if (type === 'Hotel') return <Hotel className="w-5 h-5 text-emerald-400" />;
    return <Sparkles className="w-5 h-5 text-amber-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <TicketCheck className="w-4 h-4" />
            User-Approved Booking Execution Gate
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Booking Management & E-Ticket Ledger
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-xl border border-slate-800 self-start">
          {['All', 'Pending', 'Confirmed'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === tab
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'Pending' ? 'Awaiting Approval' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((item) => {
          const isPending = item.status.includes('Pending');
          const isConfirmed = item.status === 'Confirmed';
          return (
            <div
              key={item.id}
              className={`glass-card rounded-2xl p-5 border transition ${
                isPending ? 'border-amber-400/40 shadow-glow' : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-slate-700 flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-navy-950 border border-slate-700 text-sky-300">
                        {item.type} · PNR: {item.pnr}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isConfirmed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isPending
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-white">{item.title}</h3>
                    <p className="text-xs text-slate-300">{item.subtitle}</p>
                    <p className="text-[11px] text-sky-400 pt-0.5">
                      Schedule: {item.date} · {item.agentNote}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase text-slate-400 block">Total Amount</span>
                    <span className="font-display font-extrabold text-xl text-white">
                      {formatPrice(item.priceINR)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPending && (
                      <button
                        type="button"
                        onClick={() => approveBooking(item.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve & Issue Ticket
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedVoucher(item)}
                      className="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <QrCode className="w-3.5 h-3.5 text-sky-400" />
                      QR Voucher
                    </button>

                    {!item.status.includes('Cancelled') && (
                      <button
                        type="button"
                        onClick={() => cancelBooking(item.id)}
                        className="p-2 rounded-xl bg-navy-950 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition"
                        title="Cancel Booking"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Digital QR Voucher Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-card rounded-2xl max-w-md w-full p-6 border border-brand-400/40 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-400/40 flex items-center justify-center mx-auto text-sky-400">
              <QrCode className="w-9 h-9" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                ATLAS Verified Digital Pass
              </span>
              <h3 className="font-display font-bold text-lg text-white mt-1">
                {selectedVoucher.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedVoucher.subtitle}</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">PNR / Booking Ref:</span>
                <span className="font-mono font-bold text-sky-400">{selectedVoucher.pnr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-white">{selectedVoucher.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold">{selectedVoucher.status}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedVoucher(null)}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
