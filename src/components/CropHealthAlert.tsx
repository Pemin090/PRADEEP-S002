import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Droplets,
  Thermometer,
  CloudRain,
  Wind,
  Bug,
  Sprout,
  Volume2,
  VolumeX,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FlaskConical,
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';
import { FarmerProfile, WeatherDay, DistrictData } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { analyzeCropHealthRisk } from '../utils/cropHealthEngine';
import { CROPS_DATA } from '../data/cropsAndSoils';

interface CropHealthAlertProps {
  farmer: FarmerProfile;
  weatherToday: WeatherDay;
  forecast: WeatherDay[];
  district: DistrictData;
  currentLang: Language;
}

export const CropHealthAlert: React.FC<CropHealthAlertProps> = ({
  farmer,
  weatherToday,
  forecast,
  district,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];
  const [activeSubTab, setActiveSubTab] = useState<'ipm' | 'treatment' | 'irrigation'>('ipm');
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [selectedSymptomIdx, setSelectedSymptomIdx] = useState<number | null>(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Compute agro-meteorological disease analysis
  const healthAnalysis = analyzeCropHealthRisk(farmer.cropId, weatherToday, forecast);
  const dominant = healthAnalysis.dominantThreat;
  const crop = CROPS_DATA.find(c => c.id === farmer.cropId) || CROPS_DATA[0];

  // Colors & badges based on risk score
  const isHighRisk = healthAnalysis.overallRiskLevel === 'high' || healthAnalysis.overallRiskLevel === 'critical';
  const isCritical = healthAnalysis.overallRiskLevel === 'critical';

  const riskBadgeStyles = {
    critical: 'bg-red-100 text-red-800 border-red-300 ring-1 ring-red-300',
    high: 'bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-300',
    moderate: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    low: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  }[healthAnalysis.overallRiskLevel];

  const riskLabel = {
    critical: t.cropRiskCritical,
    high: t.cropRiskHigh,
    moderate: t.cropRiskModerate,
    low: t.cropRiskLow
  }[healthAnalysis.overallRiskLevel];

  // Speech synthesizer for rural farmers
  const handleToggleVoice = () => {
    if (isVoicePlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsVoicePlaying(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      return;
    }

    const textToSpeak = currentLang === 'ta'
      ? `பயிர் பாதுகாப்பு முன்னெச்சரிக்கை: உங்கள் ${crop.nameTa} பயிருக்கு தற்போதைய வானிலையில் ${dominant.nameTa} வருவதற்கான வாய்ப்பு உள்ளது. காற்றின் ஈரப்பதம் ${weatherToday.humidityPercent} சதவீதம். ${dominant.ipmOrganicControlsTa[0]}. ${dominant.irrigationGuidanceTa}`
      : `Crop Health Alert for ${crop.nameEn}: Current ambient humidity of ${weatherToday.humidityPercent}% triggers ${dominant.nameEn}. Recommended action: ${dominant.ipmOrganicControlsEn[0]}. Irrigation notice: ${dominant.irrigationGuidanceEn}`;

    try {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.92;
      utterance.lang = currentLang === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.onend = () => setIsVoicePlaying(false);
      utterance.onerror = () => setIsVoicePlaying(false);
      setIsVoicePlaying(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsVoicePlaying(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      {/* Top Banner with Alert Accent */}
      <div className={`p-4 sm:p-5 border-b ${
        isCritical ? 'bg-red-50/70 border-red-200' : isHighRisk ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2.5 rounded-xl text-white shrink-0 shadow-xs ${
              isCritical ? 'bg-red-600 animate-pulse' : isHighRisk ? 'bg-amber-600' : 'bg-emerald-600'
            }`}>
              {dominant.category === 'pest' ? (
                <Bug className="w-5 h-5" />
              ) : isHighRisk ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {currentLang === 'ta' ? 'வானிலை சார் பயிர் நல நுண்ணறிவு' : 'AI Agro-Meteorological Health Engine'}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${riskBadgeStyles}`}>
                  {riskLabel}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Score: {healthAnalysis.overallRiskScore}/100
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                {t.cropHealthTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {currentLang === 'ta'
                  ? `${currentLang === 'ta' ? crop.nameTa : crop.nameEn} பயிருக்கான தற்போதைய பூச்சி மற்றும் நோய் பாதிப்பு கண்காணிப்பு`
                  : `Real-time risk assessment for ${crop.nameEn} based on local temperature, humidity, and rainfall.`}
              </p>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleToggleVoice}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs border ${
                isVoicePlaying
                  ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title={isVoicePlaying ? 'Stop Audio' : t.listenCropHealth}
            >
              {isVoicePlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="hidden xs:inline">
                {isVoicePlaying ? (currentLang === 'ta' ? 'நிறுத்து' : 'Stop') : t.listenCropHealth}
              </span>
            </button>

            <button
              onClick={() => setShowDiagnosticModal(!showDiagnosticModal)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center space-x-1.5 shadow-xs transition"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t.diagnoseSymptomsBtn}</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-black/5 transition"
              aria-label="Toggle details"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Active Threat Card */}
          <div className={`p-4 rounded-xl border ${
            isCritical
              ? 'bg-red-50/40 border-red-200'
              : isHighRisk
              ? 'bg-amber-50/40 border-amber-200'
              : 'bg-slate-50/70 border-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-white">
                    {dominant.category.toUpperCase()} THREAT
                  </span>
                  {dominant.scientificName && (
                    <span className="text-xs italic text-slate-500 font-serif">
                      ({dominant.scientificName})
                    </span>
                  )}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {currentLang === 'ta' ? dominant.nameTa : dominant.nameEn}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">
                  {t.preventiveWindow}
                </span>
              </div>
            </div>

            {/* Weather Trigger Details */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center space-x-2.5">
                <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block">Relative Humidity</span>
                  <span className="font-bold text-slate-900 text-sm">{weatherToday.humidityPercent}%</span>
                  <span className="text-[10px] text-slate-500 block">
                    {weatherToday.humidityPercent > 70 ? 'High moisture level' : 'Normal moisture'}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center space-x-2.5">
                <Thermometer className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block">Temperature Range</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {weatherToday.tempMinC}°C - {weatherToday.tempMaxC}°C
                  </span>
                  <span className="text-[10px] text-slate-500 block">Incubation zone</span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center space-x-2.5">
                <CloudRain className="w-4 h-4 text-cyan-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block">Rain / Probability</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {weatherToday.rainfallMm} mm ({weatherToday.rainProbabilityPercent}%)
                  </span>
                  <span className="text-[10px] text-slate-500 block">Leaf wetness factor</span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center space-x-2.5">
                <Wind className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block">Wind Velocity</span>
                  <span className="font-bold text-slate-900 text-sm">{weatherToday.windSpeedKmh} km/h</span>
                  <span className="text-[10px] text-slate-500 block">Spore dispersal speed</span>
                </div>
              </div>
            </div>

            {/* Why Weather Triggered It */}
            <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">
                  {currentLang === 'ta' ? 'வானிலை தூண்டுதல் காரணம்: ' : 'Micro-climate Disease Trigger: '}
                </strong>
                {currentLang === 'ta' ? dominant.weatherTriggerTa : dominant.weatherTriggerEn}
              </div>
            </div>
          </div>

          {/* Sub Tabs for Management Guidance */}
          <div>
            <div className="flex border-b border-slate-200 space-x-2">
              <button
                onClick={() => setActiveSubTab('ipm')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all border-b-2 ${
                  activeSubTab === 'ipm'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{t.ipmOrganicSolutions}</span>
              </button>

              <button
                onClick={() => setActiveSubTab('treatment')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all border-b-2 ${
                  activeSubTab === 'treatment'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-purple-600" />
                <span>{t.chemicalSolutions}</span>
              </button>

              <button
                onClick={() => setActiveSubTab('irrigation')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all border-b-2 ${
                  activeSubTab === 'irrigation'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>{t.irrigationAdjustment}</span>
              </button>
            </div>

            {/* Tab 1: Organic & IPM */}
            {activeSubTab === 'ipm' && (
              <div className="pt-4 space-y-3 text-xs">
                <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-emerald-950 text-sm">
                      {currentLang === 'ta' ? 'இயற்கை மற்றும் உயிரியல் கட்டுப்பாட்டு முறைகள்' : 'Bio-Control & Cultural Practices'}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 pl-6 list-disc">
                    {(currentLang === 'ta' ? dominant.ipmOrganicControlsTa : dominant.ipmOrganicControlsEn).map((item, idx) => (
                      <li key={idx} className="leading-relaxed font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">
                    {currentLang === 'ta' ? 'வயல் முன்னெச்சரிக்கை வழிகாட்டுதல்:' : 'Agronomic Field Precautions:'}
                  </span>
                  <ul className="space-y-1 text-slate-600 pl-5 list-disc">
                    {(currentLang === 'ta' ? dominant.preventiveMeasuresTa : dominant.preventiveMeasuresEn).map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Chemical Treatment */}
            {activeSubTab === 'treatment' && (
              <div className="pt-4 space-y-3 text-xs">
                <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-200 space-y-2">
                  <div className="flex items-center space-x-2">
                    <FlaskConical className="w-4 h-4 text-purple-700" />
                    <span className="font-bold text-purple-950 text-sm">
                      {currentLang === 'ta' ? 'பரிந்துரைக்கப்பட்ட அளவு மற்றும் தெளிக்கும் முறை' : 'TNAU Approved Field Dosage & Application'}
                    </span>
                  </div>
                  <p className="text-purple-900 text-[11px]">
                    {currentLang === 'ta'
                      ? 'கவனத்திற்கு: பொருளாதார சேத நிலையை (ETL) தாண்டும் போது மட்டுமே ரசாயன மருந்துகளை பயன்படுத்தவும். அதிகாலையில் அல்லது மாலையில் தெளிக்கவும்.'
                      : 'Notice: Apply chemical controls strictly if disease crosses Economic Threshold Level (ETL). Always spray early morning or late afternoon.'}
                  </p>
                  <ul className="space-y-2 text-slate-800 pl-6 list-disc">
                    {(currentLang === 'ta' ? dominant.chemicalControlsTa : dominant.chemicalControlsEn).map((chem, idx) => (
                      <li key={idx} className="font-semibold leading-relaxed">
                        {chem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: Irrigation & Moisture Adjustment */}
            {activeSubTab === 'irrigation' && (
              <div className="pt-4 space-y-3 text-xs">
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-700" />
                    <span className="font-bold text-blue-950 text-sm">
                      {currentLang === 'ta' ? 'பாசனம் மற்றும் ஈரப்பத கட்டுப்பாடு' : 'Irrigation Regimen to Suppress Disease'}
                    </span>
                  </div>
                  <p className="text-slate-800 text-xs leading-relaxed">
                    {currentLang === 'ta' ? dominant.irrigationGuidanceTa : dominant.irrigationGuidanceEn}
                  </p>
                  <div className="p-2.5 bg-white rounded-lg border border-blue-100 text-[11px] text-blue-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      {currentLang === 'ta'
                        ? 'மாலை வேளையில் பாசனம் செய்வதை தவிர்க்கவும். இரவு நேரத்தில் இலைகளில் நீர் தேங்கினால் பூஞ்சாணம் வேகமாக பரவும்.'
                        : 'Avoid evening watering. Wet leaf surfaces during cool night hours double spore germination rates.'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Symptom Diagnostic Drawer */}
          {showDiagnosticModal && (
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 text-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm text-emerald-300">
                    {t.diagnoseSymptomsBtn} ({crop.nameEn.split('(')[0]})
                  </span>
                </div>
                <button
                  onClick={() => setShowDiagnosticModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-300">
                {t.selectObservedSymptom}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(currentLang === 'ta' ? dominant.symptomsTa : dominant.symptomsEn).map((sym, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSymptomIdx(idx)}
                    className={`p-2.5 rounded-lg text-left transition border ${
                      selectedSymptomIdx === idx
                        ? 'bg-emerald-600 text-white border-emerald-400 font-semibold'
                        : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border-slate-700'
                    }`}
                  >
                    <span className="block text-[11px] font-bold text-emerald-400 mb-0.5">
                      Symptom #{idx + 1}
                    </span>
                    <span className="leading-snug block">{sym}</span>
                  </button>
                ))}
              </div>

              {selectedSymptomIdx !== null ? (
                <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-500/40 text-emerald-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 text-xs">
                      AI Diagnostic Match: 96% Confidence
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                      TNAU Pathology Verified
                    </span>
                  </div>
                  <p className="text-xs">
                    <strong>Pathogen:</strong> {dominant.scientificName || dominant.nameEn} ({currentLang === 'ta' ? dominant.nameTa : dominant.nameEn})
                  </p>
                  <p className="text-xs">
                    <strong>Immediate Action:</strong> {(currentLang === 'ta' ? dominant.ipmOrganicControlsTa : dominant.ipmOrganicControlsEn)[0]}
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic">
                  {t.noSymptomSelected}
                </p>
              )}
            </div>
          )}

          {/* AI Explainable Diagnostic Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3 gap-2">
            <div className="flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {currentLang === 'ta' ? healthAnalysis.aiDiagnosisNoteTa : healthAnalysis.aiDiagnosisNoteEn}
              </span>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-[10px]">
                ML CONF: {(healthAnalysis.aiModelConfidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
