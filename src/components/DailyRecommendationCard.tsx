import React from 'react';
import {
  Droplets,
  Calendar,
  Clock,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Clock3,
  HelpCircle,
  Sparkles,
  CloudRain,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Zap,
  Check
} from 'lucide-react';
import { IrrigationRecommendation, FarmerProfile, DistrictData } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { CROPS_DATA } from '../data/cropsAndSoils';

interface DailyRecommendationCardProps {
  rec: IrrigationRecommendation;
  farmer: FarmerProfile;
  district: DistrictData;
  currentLang: Language;
  onPlayVoice: () => void;
  isVoicePlaying: boolean;
}

export const DailyRecommendationCard: React.FC<DailyRecommendationCardProps> = ({
  rec,
  farmer,
  district,
  currentLang,
  onPlayVoice,
  isVoicePlaying
}) => {
  const t = TRANSLATIONS[currentLang];
  const crop = CROPS_DATA.find(c => c.id === farmer.cropId) || CROPS_DATA[0];

  // Visual header styling based on recommendation type
  let headerColor = 'from-emerald-700 via-emerald-600 to-teal-700';
  let badgeIcon = <Droplets className="w-8 h-8 text-white" />;
  let actionAdvice = currentLang === 'ta'
    ? 'இன்று காலையில் பரிந்துரைக்கப்பட்ட நீரை பாய்ச்சவும்.'
    : 'Irrigate today morning (6:00 AM - 9:00 AM) to minimize evaporation.';

  if (rec.type === 'skip_irrigation') {
    headerColor = 'from-blue-700 via-sky-600 to-indigo-700';
    badgeIcon = <CheckCircle2 className="w-8 h-8 text-white" />;
    actionAdvice = currentLang === 'ta'
      ? 'இன்று பாசனம் தேவையில்லை. மண்ணில் போதுமான ஈரப்பதம் அல்லது மழை உள்ளது.'
      : 'No irrigation needed today. Moisture is sufficient or rain is arriving.';
  } else if (rec.type === 'delay_irrigation') {
    headerColor = 'from-amber-600 via-yellow-600 to-orange-600';
    badgeIcon = <Clock3 className="w-8 h-8 text-white" />;
    actionAdvice = currentLang === 'ta'
      ? 'பாசனத்தை தள்ளிப்போடுங்கள். மழை எதிர்பார்ப்பதால் நீரை சேமிக்கவும்.'
      : 'Hold irrigation. Rain is forecast in your block.';
  } else if (rec.type === 'reduce_water') {
    headerColor = 'from-orange-700 via-red-600 to-amber-700';
    badgeIcon = <AlertCircle className="w-8 h-8 text-white" />;
    actionAdvice = currentLang === 'ta'
      ? 'சிக்கன பாசனம்: நிலத்தடி நீர் பற்றாக்குறை காரணமாக அளவோடு நீர் பாய்ச்சவும்.'
      : 'Controlled deficit irrigation active to protect critical aquifer.';
  }

  // Groundwater Risk Score styling
  const gwRisk = rec.groundwaterRisk;
  const isGwSafe = gwRisk?.category === 'safe';
  const isGwWarning = gwRisk?.category === 'warning';
  const isGwCritical = gwRisk?.category === 'critical';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden transition-all">
      {/* 1. HERO DECISION BANNER (Irrigate now / wait / irrigate for X minutes) */}
      <div className={`bg-gradient-to-r ${headerColor} p-5 sm:p-7 text-white relative`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner shrink-0">
              {badgeIcon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/25 backdrop-blur-sm tracking-wide uppercase">
                  {t.recommendationTitle}
                </span>
                <span className="text-xs bg-black/25 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {rec.aiModelType.split('+')[0]}
                </span>
              </div>

              {/* Direct Action Headline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 leading-tight">
                {currentLang === 'ta' ? rec.headlineTa : rec.headlineEn}
              </h2>

              {/* Action Directive Pills: "Irrigate now" vs "Wait" vs "Irrigate for X minutes" */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {rec.actionDirective === 'wait' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-amber-400 text-slate-950 shadow-md uppercase tracking-wide">
                    <Clock3 className="w-4 h-4" />
                    {currentLang === 'ta' ? 'காத்திருக்கவும் (WAIT)' : 'WAIT — DO NOT IRRIGATE'}
                  </span>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-emerald-400 text-slate-950 shadow-md uppercase tracking-wide">
                      <Zap className="w-4 h-4" />
                      {currentLang === 'ta' ? 'இப்போது பாசனம் செய்க (IRRIGATE NOW)' : 'IRRIGATE NOW'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-white/30 text-white backdrop-blur-sm border border-white/40">
                      <Clock className="w-3.5 h-3.5" />
                      {currentLang === 'ta' ? rec.irrigateForMinutesTextTa : rec.irrigateForMinutesTextEn}
                    </span>
                  </>
                )}

                {/* Groundwater Risk Pill */}
                {gwRisk && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    isGwCritical ? 'bg-red-500/90 text-white border border-red-300' :
                    isGwWarning ? 'bg-amber-500/90 text-slate-950 border border-amber-300' :
                    'bg-emerald-500/80 text-white border border-emerald-300'
                  }`}>
                    {isGwCritical ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    {currentLang === 'ta'
                      ? `நிலத்தடி நீர்: ${gwRisk.labelTa} (${gwRisk.score}/100)`
                      : `GW Risk: ${gwRisk.labelEn} (${gwRisk.score}/100)`}
                  </span>
                )}
              </div>

              <p className="text-sm text-white/90 mt-2 font-medium">
                {actionAdvice}
              </p>
            </div>
          </div>

          {/* Large Voice Speaker Button */}
          <button
            onClick={onPlayVoice}
            className={`self-start sm:self-center px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-lg shrink-0 ${
              isVoicePlaying
                ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 animate-pulse'
                : 'bg-white text-emerald-950 hover:bg-emerald-50 hover:scale-[1.02]'
            }`}
            title="Speak recommendation aloud in Tamil / English"
          >
            <Volume2 className="w-5 h-5 text-emerald-700" />
            <span>
              {isVoicePlaying ? t.audioPlaying : (currentLang === 'ta' ? t.listenAdvisoryTamil : t.listenAdvisoryEnglish)}
            </span>
          </button>
        </div>
      </div>

      {/* 2. RAIN PREDICTION INTEGRATION ALERT BANNER */}
      {rec.rainPrediction && (
        <div className={`px-5 py-3.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          rec.rainPrediction.isSignificantRainExpected
            ? 'bg-sky-50 border-sky-200 text-sky-950'
            : 'bg-slate-50/70 border-slate-200/70 text-slate-800'
        }`}>
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
              rec.rainPrediction.isSignificantRainExpected
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-slate-200 text-slate-600'
            }`}>
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  {currentLang === 'ta' ? 'மழை முன்னறிவிப்பு & பாசன தவிர்ப்பு' : 'Rain Prediction Integration'}
                </span>
                <span className={`px-2 py-0.2 rounded-full text-xs font-semibold ${
                  rec.rainPrediction.isSignificantRainExpected
                    ? 'bg-sky-200 text-sky-900 border border-sky-300'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {rec.rainPrediction.expectedRainfallMm} mm ({rec.rainPrediction.rainProbabilityPercent}% {currentLang === 'ta' ? 'வாய்ப்பு' : 'chance'})
                </span>
                <span className="text-xs text-slate-500">
                  {currentLang === 'ta' ? rec.rainPrediction.timeframeTa : rec.rainPrediction.timeframeEn}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold mt-1 leading-snug">
                {currentLang === 'ta'
                  ? rec.rainPrediction.avoidIrrigationAlertTa
                  : rec.rainPrediction.avoidIrrigationAlertEn}
              </p>
            </div>
          </div>

          {rec.rainPrediction.isSignificantRainExpected && rec.rainPrediction.waterSavedLitres > 0 && (
            <div className="shrink-0 bg-white p-2.5 rounded-xl border border-sky-200 shadow-sm text-center">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">
                {currentLang === 'ta' ? 'மழைவழி நீர் சேமிப்பு' : 'Water Saved By Rain'}
              </span>
              <span className="text-base font-extrabold text-sky-700">
                ~{rec.rainPrediction.waterSavedLitres.toLocaleString()} L
              </span>
              <span className="text-[10px] text-emerald-600 block font-medium">
                {rec.rainPrediction.electricitySavedUnitsKwh} kWh {currentLang === 'ta' ? 'மின்சாரம் சேமிப்பு' : 'power saved'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3. GROUNDWATER RISK SCORE & ACTIONABLE METRICS */}
      <div className="p-5 sm:p-7 bg-slate-50/50 border-b border-slate-200/80">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Groundwater Risk Score Card */}
          {gwRisk && (
            <div className={`rounded-xl p-4 border shadow-sm ${
              isGwCritical ? 'bg-red-50/60 border-red-200' :
              isGwWarning ? 'bg-amber-50/60 border-amber-200' :
              'bg-emerald-50/60 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {currentLang === 'ta' ? 'நிலத்தடி நீர் அபாயக் குறியீடு' : 'Groundwater Risk Score'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  isGwCritical ? 'bg-red-600 text-white' :
                  isGwWarning ? 'bg-amber-600 text-white' :
                  'bg-emerald-600 text-white'
                }`}>
                  {currentLang === 'ta' ? gwRisk.labelTa : gwRisk.labelEn}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-3xl font-extrabold tracking-tight ${
                  isGwCritical ? 'text-red-700' :
                  isGwWarning ? 'text-amber-700' :
                  'text-emerald-700'
                }`}>
                  {gwRisk.score}
                </span>
                <span className="text-sm font-semibold text-slate-500">/ 100</span>
              </div>
              {/* Visual 3-tier Gauge Bar */}
              <div className="mt-2.5 h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500 w-[40%]" title="Safe (0-39)" />
                <div className="h-full bg-amber-400 w-[30%]" title="Warning (40-69)" />
                <div className="h-full bg-red-500 w-[30%]" title="Critical (70-100)" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
                <span>{currentLang === 'ta' ? 'பாதுகாப்பானது' : 'Safe'}</span>
                <span>{currentLang === 'ta' ? 'எச்சரிக்கை' : 'Warning'}</span>
                <span>{currentLang === 'ta' ? 'ஆபத்தானது' : 'Critical'}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 font-medium leading-tight">
                {currentLang === 'ta' ? gwRisk.conservationRecommendationTa : gwRisk.conservationRecommendationEn}
              </p>
            </div>
          )}

          {/* Action Directive: Irrigate for X minutes / Run Time */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {currentLang === 'ta' ? 'மோட்டார் இயங்கும் நேரம்' : 'Pump Run Time'}
              </span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {rec.actionDirective === 'wait' ? 0 : rec.pumpingTimeMinutes}
              </span>
              <span className="text-sm font-semibold text-slate-600">
                {currentLang === 'ta' ? 'நிமிடங்கள் (Minutes)' : 'Minutes'}
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              {currentLang === 'ta'
                ? (rec.actionDirective === 'wait'
                    ? 'இன்று மோட்டாரை இயக்க வேண்டாம்'
                    : `${rec.irrigateForMinutesTextTa} (${farmer.pumpHorsePower} HP மோட்டார்)`)
                : (rec.actionDirective === 'wait'
                    ? 'Do not run motor today'
                    : `${rec.irrigateForMinutesTextEn} (${farmer.pumpHorsePower} HP pump)`)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {currentLang === 'ta'
                ? `பரிந்துரைக்கப்பட்ட கால அளவு: ${rec.formattedDurationTa}`
                : `Total duration: ${rec.formattedDurationEn}`}
            </p>
          </div>

          {/* Total Farm Need & Savings */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.totalFarmVolume}
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {farmer.farmSizeAcres} {currentLang === 'ta' ? 'ஏக்கர்' : 'Acres'}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-emerald-700 tracking-tight">
                {rec.totalFarmLitres.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-600">Litres</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {rec.litresPerAcre.toLocaleString()} L / {currentLang === 'ta' ? 'ஏக்கர்' : 'acre'} ({crop.nameTa})
            </p>
            {rec.savingsVsFloodLitres > 0 && (
              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                {currentLang === 'ta'
                  ? `✓ வாய்க்கால் பாசனத்தை விட ~${rec.savingsVsFloodLitres.toLocaleString()} லிட்டர் சேமிப்பு`
                  : `✓ Saves ~${rec.savingsVsFloodLitres.toLocaleString()} L vs flood`}
              </p>
            )}
          </div>
        </div>

        {/* Growth Stage & Next Check Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">
              {currentLang === 'ta' ? 'பயிர் வளர்ச்சி நிலை:' : 'Crop Stage:'}
            </span>
            <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              {currentLang === 'ta' ? rec.cropGrowthStageTa : rec.cropGrowthStageEn} ({rec.cropAgeDays} {currentLang === 'ta' ? 'நாட்கள்' : 'days'})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 font-medium">{t.nextCheck}:</span>
            <span className="font-bold text-slate-800">
              {rec.nextCheckDate}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{t.confidenceScore}: <strong>{rec.mlConfidenceScore}%</strong></span>
          </div>
        </div>
      </div>

      {/* 4. Explainable AI (XAI) Reasons List */}
      <div className="p-5 sm:p-7">
        <div className="flex items-center space-x-2 mb-3">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            {t.reasonsTitle}
          </h3>
        </div>

        <ul className="space-y-2.5">
          {(currentLang === 'ta' ? rec.reasonsTa : rec.reasonsEn).map((reason, idx) => (
            <li
              key={idx}
              className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-slate-800"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {idx + 1}
              </div>
              <span className="leading-relaxed font-medium">{reason}</span>
            </li>
          ))}
        </ul>

        {/* Agronomic Disclaimer */}
        <p className="text-[11px] text-slate-500 mt-4 italic">
          {currentLang === 'ta'
            ? 'குறிப்பு: இந்த AI வழிகாட்டல் தமிழக வேளாண் பல்கலைக்கழகம் (TNAU) மற்றும் FAO CROPWAT நெறிமுறைகளின் அடிப்படையில் கணக்கிடப்பட்டுள்ளது. பருவநிலை மாற்றங்களை கவனித்து செயல்படவும்.'
            : 'Note: AI estimates are grounded in Tamil Nadu Agricultural University (TNAU) & FAO CROPWAT guidelines. Check field conditions during extreme shifts.'}
        </p>
      </div>
    </div>
  );
};
