import React from 'react';
import {
  Droplet,
  PiggyBank,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { WaterBudget } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';

interface WaterBudgetCardProps {
  budget: WaterBudget;
  currentLang: Language;
}

export const WaterBudgetCard: React.FC<WaterBudgetCardProps> = ({
  budget,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];

  const percentUsed = Math.min(100, Math.round((budget.weeklyUsedL / (budget.weeklyRecommendedL || 1)) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.waterBudgetTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {currentLang === 'ta' ? 'பயிரின் தேவைக்கேற்ப நீர் மேலாண்மை' : 'Personalized dynamic water allocation'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>{currentLang === 'ta' ? 'நீர் சிக்கன சான்றிதழ்' : 'Water Conservation Certified'}</span>
        </div>
      </div>

      {/* Progress Bar & Big Numbers */}
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {currentLang === 'ta' ? 'வாராந்திர ஒதுக்கீடு பயன்பாடு' : 'Weekly Budget Consumption'}
          </span>
          <span className="text-sm font-bold text-slate-800">
            {percentUsed}% {currentLang === 'ta' ? 'பயன்படுத்தப்பட்டது' : 'consumed'}
          </span>
        </div>

        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              percentUsed > 90 ? 'bg-red-500' : percentUsed > 70 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-400">
          <span>0 L</span>
          <span className="font-semibold text-slate-700">
            {budget.weeklyRecommendedL.toLocaleString()} L ({currentLang === 'ta' ? 'பரிந்துரைக்கப்பட்ட உச்ச வரம்பு' : 'Budget Ceiling'})
          </span>
        </div>
      </div>

      {/* Numerical Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500">{t.recommendedBudget}</p>
          <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
            {budget.weeklyRecommendedL.toLocaleString()} <span className="text-xs font-normal text-slate-500">L</span>
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500">{t.usedBudget}</p>
          <p className="text-lg sm:text-xl font-bold text-slate-800 mt-1">
            {budget.weeklyUsedL.toLocaleString()} <span className="text-xs font-normal text-slate-500">L</span>
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500">{t.remainingBudget}</p>
          <p className="text-lg sm:text-xl font-bold text-blue-700 mt-1">
            {budget.weeklyRemainingL.toLocaleString()} <span className="text-xs font-normal text-slate-500">L</span>
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <p className="text-xs text-emerald-800 font-medium">{t.savingsEstimate}</p>
          <p className="text-lg sm:text-xl font-extrabold text-emerald-700 mt-1">
            +{budget.estimatedWeeklySavingsL.toLocaleString()} <span className="text-xs font-normal text-emerald-600">L</span>
          </p>
        </div>
      </div>

      {/* Cumulative Season Impact */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <TrendingUp className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <p className="text-xs text-emerald-200 font-medium">
              {t.seasonSavingsTitle}
            </p>
            <p className="text-2xl font-extrabold tracking-tight text-white mt-0.5">
              {budget.cumulativeSavedSeasonL.toLocaleString()}{' '}
              <span className="text-sm font-normal text-emerald-200">
                {currentLang === 'ta' ? 'லிட்டர் நிலத்தடி நீர் சேமிப்பு' : 'Litres Groundwater Preserved'}
              </span>
            </p>
          </div>
        </div>

        <div className="text-xs text-emerald-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
          🌱 {currentLang === 'ta' ? '32% மின் கட்டண சேமிப்பு' : '~32% Pump Power Cost Saved'}
        </div>
      </div>

      {/* 6-Day Historical Usage Chart */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          {currentLang === 'ta' ? 'கடந்த நாட்களின் பாசன பதிவு' : 'Daily Irrigation Log (Litres)'}
        </h4>

        <div className="space-y-2">
          {budget.dailyUsageHistory.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
              <span className="font-semibold text-slate-600 w-20">{item.date}</span>
              <div className="flex-1 mx-3 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (item.usedL / (budget.weeklyRecommendedL * 0.25 || 1)) * 100)}%` }}
                />
              </div>
              <span className="font-bold text-slate-800 w-16 text-right">
                {item.usedL > 0 ? `${item.usedL} L` : '0 L (Skipped)'}
              </span>
              <span className="text-emerald-700 font-semibold w-20 text-right">
                {item.savedL > 0 ? `+${item.savedL} L saved` : '-'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
