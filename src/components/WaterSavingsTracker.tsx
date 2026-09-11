import React from 'react';
import {
  TrendingDown,
  Droplet,
  Award,
  Calendar,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { WaterBudget, FarmerProfile } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';

interface WaterSavingsTrackerProps {
  budget: WaterBudget;
  farmer: FarmerProfile;
  currentLang: Language;
}

export const WaterSavingsTracker: React.FC<WaterSavingsTrackerProps> = ({
  budget,
  farmer,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];

  const dailySaved = 240;
  const weeklySaved = budget.estimatedWeeklySavingsL;
  const monthlySaved = Math.round(weeklySaved * 4.2);
  const seasonalSaved = budget.cumulativeSavedSeasonL;

  // Power savings: 1000 Litres pumped roughly uses 0.25 kWh on a 5HP pump
  const powerSavedKwh = Math.round(seasonalSaved * 0.00025);
  const costSavedInr = Math.round(powerSavedKwh * 6.5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {currentLang === 'ta' ? 'நீர் சேமிப்பு கண்காணிப்பாளர்' : 'Farm Water Saving Tracker'}
            </h3>
            <p className="text-xs text-slate-500">
              {currentLang === 'ta'
                ? 'வழக்கமான வாய்க்கால் பாய்ச்சல் முறையுடன் ஒப்பீடு'
                : 'Measured against traditional unguided flood irrigation benchmarks'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold self-start sm:self-auto">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>{currentLang === 'ta' ? 'தமிழ்நாடு நீர் பாதுகாவலர்' : 'Certified TN Water Guardian'}</span>
        </div>
      </div>

      {/* 4 Savings Intervals (Prompt Section 13) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {currentLang === 'ta' ? 'இன்றைய சேமிப்பு' : 'Today'}
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {dailySaved.toLocaleString()} <span className="text-xs font-normal text-slate-500">L</span>
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">~18 mins pump off</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {currentLang === 'ta' ? 'இந்த வாரம்' : 'This Week'}
          </span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">
            {weeklySaved.toLocaleString()} <span className="text-xs font-normal text-slate-500">L</span>
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">32% water saved</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {currentLang === 'ta' ? 'இந்த மாதம்' : 'This Month'}
          </span>
          <p className="text-2xl font-extrabold text-blue-700 mt-1">
            {monthlySaved.toLocaleString()} <span className="text-xs font-normal text-slate-500">L</span>
          </p>
          <span className="text-[11px] text-blue-600 font-medium">~{Math.round(monthlySaved / 4047)} mm depth</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center">
          <span className="text-xs text-emerald-900 font-bold uppercase tracking-wider">
            {currentLang === 'ta' ? 'இந்த பருவம்' : 'This Season'}
          </span>
          <p className="text-2xl font-extrabold text-emerald-800 mt-1">
            {seasonalSaved.toLocaleString()} <span className="text-xs font-normal text-emerald-700">L</span>
          </p>
          <span className="text-[11px] text-emerald-800 font-bold">Total Aquifer Protection</span>
        </div>
      </div>

      {/* Energy & Financial Equivalents */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">
              {currentLang === 'ta' ? 'மின்சார மற்றும் செலவு சேமிப்பு சமநிலை' : 'Electricity & Operating Cost Equivalents'}
            </p>
            <p className="text-base sm:text-lg font-bold text-white mt-0.5">
              ~{powerSavedKwh} kWh Electricity Saved • ~₹{costSavedInr} Pump Wear & Tear Saved
            </p>
          </div>
        </div>

        <div className="text-xs text-emerald-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
          🌱 {currentLang === 'ta' ? 'கரிம உமிழ்வு குறைப்பு: ~140 kg CO₂' : 'Carbon Offset: ~140 kg CO₂'}
        </div>
      </div>
    </div>
  );
};
