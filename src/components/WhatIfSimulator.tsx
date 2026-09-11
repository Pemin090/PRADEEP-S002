import React, { useState } from 'react';
import {
  HelpCircle,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WhatIfScenario } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';

interface WhatIfSimulatorProps {
  scenarios: WhatIfScenario[];
  currentLang: Language;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  scenarios,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedId, setSelectedId] = useState<string>(scenarios[0]?.id || 'today');

  const selectedScenario = scenarios.find(s => s.id === selectedId) || scenarios[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.simulatorTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.simulatorSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((s) => {
          const isSelected = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 shadow-sm'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentLang === 'ta' ? s.timingTa : s.timingEn}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 mt-1">
                {currentLang === 'ta' ? s.titleTa : s.titleEn}
              </h4>

              <div className="mt-3 flex items-baseline justify-between border-t border-slate-200/60 pt-2">
                <span className="text-xs text-slate-500">{t.waterRequired}:</span>
                <span className="text-sm font-bold text-slate-900">
                  {s.waterAmountL.toLocaleString()} L
                </span>
              </div>

              {s.waterSavedVsBaseL > 0 && (
                <div className="mt-1 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                  <span>Saved:</span>
                  <span>+{s.waterSavedVsBaseL.toLocaleString()} L</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Analysis of Selected Scenario */}
      {selectedScenario && (
        <div className="rounded-xl bg-slate-900 text-white p-5 sm:p-6 border border-slate-800 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {currentLang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட சூழ்நிலை பகுப்பாய்வு' : 'Simulation Projected Outcome'}
              </span>
              <h4 className="text-xl font-bold mt-0.5">
                {currentLang === 'ta' ? selectedScenario.titleTa : selectedScenario.titleEn}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {currentLang === 'ta' ? selectedScenario.timingTa : selectedScenario.timingEn}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
            {/* Water Required */}
            <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700">
              <p className="text-xs text-slate-400">{t.waterRequired}</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                {selectedScenario.waterAmountL.toLocaleString()} <span className="text-xs font-normal text-slate-300">Litres</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {selectedScenario.waterSavedVsBaseL > 0
                  ? `Saves ${selectedScenario.waterSavedVsBaseL.toLocaleString()} L water`
                  : 'Full baseline dosage'}
              </p>
            </div>

            {/* Crop Stress Risk */}
            <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700">
              <p className="text-xs text-slate-400">{t.stressRisk}</p>
              <div className="mt-1 flex items-center gap-1.5">
                {selectedScenario.cropStressRisk === 'low' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                <span className={`text-base font-bold ${
                  selectedScenario.cropStressRisk === 'low' ? 'text-emerald-400' :
                  selectedScenario.cropStressRisk === 'moderate' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {selectedScenario.cropStressRisk === 'low' ? t.riskLow :
                   selectedScenario.cropStressRisk === 'moderate' ? t.riskModerate : t.riskHigh}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {currentLang === 'ta' ? 'பயிரின் இலை வாடல் வாய்ப்பு' : 'Impact on crop canopy & yield'}
              </p>
            </div>

            {/* Groundwater Impact */}
            <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700">
              <p className="text-xs text-slate-400">{t.groundwaterImpact}</p>
              <p className="text-base font-bold text-teal-300 mt-1 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                {selectedScenario.groundwaterImpact === 'protective' ? 'Conserves Aquifer' : 'Normal Extraction'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {currentLang === 'ta' ? 'நிலத்தடி நீர் மட்டத்தின் மீதான அழுத்தம்' : 'Stress placed on local groundwater'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/80 text-xs sm:text-sm text-slate-200">
            <span className="font-semibold text-emerald-400">Agronomic Prediction: </span>
            {currentLang === 'ta' ? selectedScenario.explanationTa : selectedScenario.explanationEn}
          </div>
        </div>
      )}

      {/* Simulator Guidance */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          {currentLang === 'ta'
            ? 'அறிவிப்பு: மேற்கண்ட சூழ்நிலைகள் செயற்கை நுண்ணறிவு மற்றும் வானிலை கணிப்பின் அடிப்படையிலான மாதிரி முடிவுகள் ஆகும்.'
            : 'Notice: What-If simulation relies on forward precipitation forecasts and root-zone water balance projections.'}
        </span>
      </div>
    </div>
  );
};
