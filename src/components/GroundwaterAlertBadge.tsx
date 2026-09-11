import React from 'react';
import { AlertTriangle, ShieldCheck, Waves, ArrowDownRight, ArrowUpRight, Minus, Info, Gauge } from 'lucide-react';
import { DistrictData, BlockData } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { calculateGroundwaterRisk } from '../utils/aiIrrigationEngine';

interface GroundwaterAlertBadgeProps {
  district: DistrictData;
  block?: BlockData;
  currentLang: Language;
  onExploreMap?: () => void;
}

export const GroundwaterAlertBadge: React.FC<GroundwaterAlertBadgeProps> = ({
  district,
  block,
  currentLang,
  onExploreMap
}) => {
  const t = TRANSLATIONS[currentLang];
  const status = block?.status || district.status;
  const waterTable = block?.waterTableMbgl || district.waterTableMbgl;
  const blockName = block ? (currentLang === 'ta' ? block.nameTa : block.nameEn) : null;
  const districtName = currentLang === 'ta' ? district.nameTa : district.nameEn;

  // Calculate standardized Groundwater Risk Score (0-100) & Category
  const gwRisk = calculateGroundwaterRisk(district);

  let bgClass = 'bg-emerald-50/90 border-emerald-300 text-emerald-950';
  let badgeClass = 'bg-emerald-600 text-white';
  let icon = <ShieldCheck className="w-5 h-5 text-emerald-600" />;

  if (gwRisk.category === 'critical' || status === 'critical') {
    bgClass = 'bg-red-50/95 border-red-300 text-red-950';
    badgeClass = 'bg-red-600 text-white animate-pulse';
    icon = <AlertTriangle className="w-5 h-5 text-red-600" />;
  } else if (gwRisk.category === 'warning' || status === 'moderate') {
    bgClass = 'bg-amber-50/95 border-amber-300 text-amber-950';
    badgeClass = 'bg-amber-600 text-white';
    icon = <AlertTriangle className="w-5 h-5 text-amber-600" />;
  }

  const trendIcon = district.trend === 'declining' ? (
    <span className="flex items-center text-red-600 font-semibold gap-0.5">
      <ArrowDownRight className="w-4 h-4" /> {t.trendDeclining}
    </span>
  ) : district.trend === 'improving' ? (
    <span className="flex items-center text-emerald-600 font-semibold gap-0.5">
      <ArrowUpRight className="w-4 h-4" /> {t.trendImproving}
    </span>
  ) : (
    <span className="flex items-center text-slate-600 font-semibold gap-0.5">
      <Minus className="w-4 h-4" /> {t.trendStable}
    </span>
  );

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition-all ${bgClass}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-white shadow-sm border border-black/5 shrink-0">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-slate-600" />
                {currentLang === 'ta' ? 'நிலத்தடி நீர் அபாயக் குறியீடு' : 'Groundwater Risk Score'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide ${badgeClass}`}>
                {currentLang === 'ta'
                  ? `${gwRisk.labelTa} (${gwRisk.score}/100)`
                  : `${gwRisk.labelEn.toUpperCase()} (${gwRisk.score}/100)`}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {blockName ? `${districtName} → ${blockName}` : districtName}
            </h3>
          </div>
        </div>

        {onExploreMap && (
          <button
            onClick={onExploreMap}
            className="self-start sm:self-auto text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-white/70 hover:bg-white px-3 py-1.5 rounded-lg border border-black/10 transition"
          >
            <Waves className="w-3.5 h-3.5 text-emerald-600" />
            {currentLang === 'ta' ? '38 மாவட்ட நிலத்தடி நீர் வரைபடம்' : 'All 38 Districts Aquifer Map'}
          </button>
        )}
      </div>

      {/* Numerical Indicators & Visual 3-Stage Risk Gauge */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
        {/* Risk Score */}
        <div className="bg-white/90 rounded-xl p-3 border border-black/5 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">{currentLang === 'ta' ? 'அபாய மதிப்பெண்' : 'Risk Score'}</p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className={`text-2xl font-black ${
              gwRisk.category === 'critical' ? 'text-red-700' :
              gwRisk.category === 'warning' ? 'text-amber-700' :
              'text-emerald-700'
            }`}>
              {gwRisk.score}
            </span>
            <span className="text-xs text-slate-500 font-bold">/ 100</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
            <div className={`h-full ${gwRisk.category === 'safe' ? 'bg-emerald-500' : 'bg-emerald-400'} w-[40%]`} />
            <div className={`h-full ${gwRisk.category === 'warning' ? 'bg-amber-500' : 'bg-amber-300'} w-[30%]`} />
            <div className={`h-full ${gwRisk.category === 'critical' ? 'bg-red-600' : 'bg-red-300'} w-[30%]`} />
          </div>
        </div>

        {/* Water Table Depth */}
        <div className="bg-white/90 rounded-xl p-3 border border-black/5 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">{t.waterTableDepth}</p>
          <p className="text-xl font-black text-slate-900 mt-0.5">
            {waterTable} <span className="text-xs font-medium text-slate-600">mbgl</span>
          </p>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {waterTable > 18 ? (currentLang === 'ta' ? 'அதிக ஆழம்' : 'Deep aquifer') : (currentLang === 'ta' ? 'மிதமான ஆழம்' : 'Accessible depth')}
          </span>
        </div>

        {/* Extraction Rate */}
        <div className="bg-white/90 rounded-xl p-3 border border-black/5 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">{t.extractionRate}</p>
          <p className="text-xl font-black text-slate-900 mt-0.5">
            {district.extractionRate}%
          </p>
          <span className={`text-[10px] font-bold block mt-0.5 ${
            district.extractionRate > 100 ? 'text-red-600' : district.extractionRate > 75 ? 'text-amber-600' : 'text-emerald-600'
          }`}>
            {district.extractionRate > 100
              ? (currentLang === 'ta' ? 'அதிகப்படியான உறிஞ்சல்' : 'Over-exploited')
              : (currentLang === 'ta' ? 'பாதுகாப்பான விகிதம்' : 'Sustainable')}
          </span>
        </div>

        {/* 5-Yr Trend */}
        <div className="bg-white/90 rounded-xl p-3 border border-black/5 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">{currentLang === 'ta' ? '5 ஆண்டு போக்கு' : '5-Yr Trend'}</p>
          <div className="text-sm font-semibold mt-1">
            {trendIcon}
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {currentLang === 'ta' ? 'CGWB தமிழ்நாடு தரவு' : 'CGWB TN ground data'}
          </span>
        </div>
      </div>

      {/* Advisory Note */}
      <div className="flex items-start space-x-2 text-xs text-slate-800 bg-white/80 p-3 rounded-xl border border-black/5">
        <Info className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
        <p className="leading-relaxed font-medium">
          {currentLang === 'ta' ? gwRisk.statusDescriptionTa : gwRisk.statusDescriptionEn}{' '}
          <strong className="text-slate-900">
            {currentLang === 'ta' ? gwRisk.conservationRecommendationTa : gwRisk.conservationRecommendationEn}
          </strong>
        </p>
      </div>
    </div>
  );
};
