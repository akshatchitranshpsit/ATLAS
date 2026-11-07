import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Building,
  HeartPulse,
  PlaneTakeoff,
  FileWarning,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { EMERGENCY_DATA } from '../data/mockData';
import { useTravel } from '../context/TravelContext';

const PLAYBOOKS = [
  {
    id: 'pb-flight',
    title: 'Flight Delayed / Cancelled Auto-Rebooker',
    icon: PlaneTakeoff,
    desc: 'Scans Star Alliance & partner inventory to hold the next available seat while filing EU261 / DGCA / airline disruption compensation.',
    actionOutput:
      'Emergency Agent placed a backup hold on JAL JL-791 & ANA NH-832, notified The Thousand Kyoto of late check-in, and locked airport lounge access.',
  },
  {
    id: 'pb-passport',
    title: 'Lost Passport & Emergency Certificate (EC) Protocol',
    icon: FileWarning,
    desc: 'Retrieves encrypted DigiLocker / Passport Vault PDF, generates local Koban police report translation, and books priority Indian Embassy slot.',
    actionOutput:
      'Encrypted passport copy #P9842110 unlocked from vault. Japanese police report template generated + Embassy of India Tokyo Consular Officer alerted.',
  },
  {
    id: 'pb-medical',
    title: '24/7 English-Speaking Medical & Cashless Claim',
    icon: HeartPulse,
    desc: 'Locates nearest international trauma desk accepting Indian global travel insurance and dispatches bilingual medical summary.',
    actionOutput:
      'St. Luke’s International Hospital (1.8 km away) notified. Cashless policy #TATA-GLB-88219 pre-authorized.',
  },
];

export default function EmergencyAssistancePage() {
  const { activeTrip, user } = useTravel();
  const [activePlaybookResult, setActivePlaybookResult] = useState(null);

  return (
    <div className="space-y-6">
      {/* High-Priority SOS Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-rose-950/90 via-navy-900 to-navy-950 border border-rose-500/40 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            24/7 Autonomous Emergency & Disruption Responder
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Emergency Travel Assistance Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Active Trip Telemetry: <strong className="text-white">{activeTrip.destination}</strong> ·
            Advisory Status: <strong className="text-emerald-400">{EMERGENCY_DATA.riskLevel}</strong>
          </p>
        </div>

        <a
          href="tel:119"
          className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shrink-0 transition"
        >
          <PhoneCall className="w-4 h-4" />
          Trigger Priority SOS Dispatch
        </a>
      </div>

      {/* Autonomous Crisis Playbooks */}
      <div className="space-y-3">
        <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          1-Click Autonomous Crisis Playbooks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLAYBOOKS.map((pb) => {
            const Icon = pb.icon;
            return (
              <div
                key={pb.id}
                className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-white">{pb.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pb.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePlaybookResult(pb)}
                  className="w-full py-2.5 rounded-xl bg-navy-900 hover:bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold transition"
                >
                  Execute Emergency Protocol
                </button>
              </div>
            );
          })}
        </div>

        {activePlaybookResult && (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold text-emerald-300">
                Executed: {activePlaybookResult.title}
              </div>
              <p className="text-slate-200 mt-1">{activePlaybookResult.actionOutput}</p>
            </div>
          </div>
        )}
      </div>

      {/* Embassy, Local Emergency Numbers & Hospitals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Indian Embassy Card */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-sky-400" />
            <h2 className="font-display font-bold text-lg text-white">
              Indian Embassy & Consular Assistance
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-sm text-white">{EMERGENCY_DATA.embassy.name}</div>
            <p className="text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              {EMERGENCY_DATA.embassy.address} ({EMERGENCY_DATA.embassy.distanceKm})
            </p>
            <p className="text-emerald-400 font-semibold">
              24/7 Emergency Line: {EMERGENCY_DATA.embassy.phone24x7}
            </p>
            <p className="text-slate-400">Consular Email: {EMERGENCY_DATA.embassy.email}</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              Traveller Registered:{' '}
              <strong className="text-white">{user?.name || 'Not Signed In'}</strong>
              {user?.passportCountry ? ` (${user.passportCountry})` : ''}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Local Emergency Hotlines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {EMERGENCY_DATA.localEmergencyNumbers.map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-xl bg-navy-900 border border-slate-800"
                >
                  <div className="text-[11px] text-slate-400">{item.label}</div>
                  <div className="font-display font-extrabold text-xl text-rose-400 mt-0.5">
                    {item.number}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verified International Hospitals */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <h2 className="font-display font-bold text-lg text-white">
              English-Speaking Hospitals & Cashless Desks
            </h2>
          </div>

          <div className="space-y-3">
            {EMERGENCY_DATA.hospitals.map((hosp) => (
              <div
                key={hosp.name}
                className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{hosp.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {hosp.distance}
                  </span>
                </div>
                <p className="text-slate-300">{hosp.specialty}</p>
                <div className="flex flex-wrap items-center justify-between pt-2 text-[11px] text-slate-400">
                  <span>Hotline: {hosp.phone}</span>
                  <span className="text-sky-400 font-semibold">
                    Insurance: {hosp.cashlessInsurance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
