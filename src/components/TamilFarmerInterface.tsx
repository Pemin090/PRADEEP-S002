import React from 'react';
import {
  Droplets,
  CloudRain,
  Clock,
  Volume2,
  CheckCircle,
  AlertTriangle,
  Zap,
  PhoneCall,
  ShieldCheck,
  ShieldAlert,
  Sprout,
  Sun,
  Calendar,
  ThumbsUp,
  HeartHandshake
} from 'lucide-react';
import { IrrigationRecommendation, FarmerProfile, DistrictData, WeatherDay } from '../types';
import { CROPS_DATA } from '../data/cropsAndSoils';

interface TamilFarmerInterfaceProps {
  rec: IrrigationRecommendation;
  farmer: FarmerProfile;
  district: DistrictData;
  weatherToday: WeatherDay;
  onPlayVoice: () => void;
  isVoicePlaying: boolean;
  onSwitchToDetailedView?: () => void;
}

export const TamilFarmerInterface: React.FC<TamilFarmerInterfaceProps> = ({
  rec,
  farmer,
  district,
  weatherToday,
  onPlayVoice,
  isVoicePlaying,
  onSwitchToDetailedView
}) => {
  const crop = CROPS_DATA.find(c => c.id === farmer.cropId) || CROPS_DATA[0];
  const gwRisk = rec.groundwaterRisk;
  const isWait = rec.actionDirective === 'wait';

  return (
    <div className="space-y-6">
      {/* Friendly Top Welcome & Quick Voice Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
              <Sprout className="w-3.5 h-3.5" />
              <span>எளிய தமிழ் உழவர் வழிகாட்டி (வரைபடங்கள் அற்ற நேரடி முறை)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              வணக்கம், {farmer.farmerName}!
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-2xl">
              உங்கள் {crop.nameTa} பயிருக்கு (விஸ்தீரணம்: {farmer.farmSizeAcres} ஏக்கர், மாவட்டம்: {district.nameTa}) இன்றைய உடனடி பாசன முடிவுகள் கீழே கொடுக்கப்பட்டுள்ளன.
            </p>
          </div>

          {/* Big Voice Button */}
          <button
            onClick={onPlayVoice}
            className={`px-6 py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all transform active:scale-95 shrink-0 ${
              isVoicePlaying
                ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300 animate-pulse'
                : 'bg-white text-emerald-950 hover:bg-emerald-50 hover:scale-105'
            }`}
          >
            <Volume2 className="w-7 h-7 text-emerald-700" />
            <div className="text-left">
              <span className="block text-xs uppercase text-slate-600 font-bold">குரல் வழிகாட்டி</span>
              <span className="text-base font-black">
                {isVoicePlaying ? 'பேசுகிறது... (நிறுத்த தட்டவும்)' : 'தமிழில் கேட்க தட்டவும்'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 1. BIG ACTION CARD: இப்போது பாசனம் செய்ய வேண்டுமா? / காத்திருக்கவா? */}
      <div className={`rounded-3xl border-2 p-6 sm:p-8 shadow-md transition-all ${
        isWait
          ? 'bg-amber-50/90 border-amber-300 text-amber-950'
          : 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-2xl shrink-0 shadow-sm ${
              isWait ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {isWait ? <Clock className="w-10 h-10" /> : <Droplets className="w-10 h-10" />}
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                இன்றைய நேரடி பாசன முடிவு
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mt-1 leading-tight">
                {isWait ? 'இன்று பாசனம் செய்ய வேண்டாம் — காத்திருக்கவும்!' : 'இப்போது பாசனம் செய்யவும்!'}
              </h2>
              <p className="text-base sm:text-lg font-bold mt-2 text-slate-800">
                {rec.headlineTa}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {isWait
                  ? 'மண்ணில் போதுமான ஈரம் உள்ளது அல்லது மழை எதிர்பார்க்கப்படுவதால் நீர் பாய்ச்ச வேண்டாம்.'
                  : 'பயிர் வளர்ச்சிக்கு நீர் தேவைப்படுகிறது. காலையில் நீர் பாய்ச்சுவது சிறந்தது.'}
              </p>
            </div>
          </div>

          {/* Time to Run Motor */}
          <div className="bg-white rounded-2xl p-5 border border-black/10 shadow-sm text-center shrink-0 min-w-[220px]">
            <span className="text-xs font-bold text-slate-500 uppercase block">
              மோட்டார் ஓட வேண்டிய நேரம்
            </span>
            <div className="my-2">
              <span className={`text-4xl sm:text-5xl font-black ${isWait ? 'text-slate-400' : 'text-emerald-700'}`}>
                {isWait ? '0' : rec.pumpingTimeMinutes}
              </span>
              <span className="text-base font-bold text-slate-600 ml-1.5">நிமிடங்கள்</span>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
              {farmer.pumpHorsePower} HP மோட்டார் ({farmer.farmSizeAcres} ஏக்கர்)
            </span>
          </div>
        </div>
      </div>

      {/* 2. 3-GRID SIMPLE CARDS: மழை + நிலத்தடி நீர் + பயிர் நிலை */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Rain Prediction Integration Card */}
        <div className={`rounded-3xl p-6 border-2 shadow-sm ${
          rec.rainPrediction?.isSignificantRainExpected
            ? 'bg-sky-50 border-sky-300 text-sky-950'
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
              <CloudRain className="w-4 h-4" /> மழை முன்னறிவிப்பு
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              rec.rainPrediction?.isSignificantRainExpected
                ? 'bg-sky-500 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {rec.rainPrediction?.expectedRainfallMm || 0} மி.மீ
            </span>
          </div>
          <h3 className="text-lg font-black leading-snug">
            {rec.rainPrediction?.isSignificantRainExpected
              ? 'அடுத்த 24 மணி நேரத்தில் மழை வாய்ப்பு!'
              : 'இன்று வறண்ட வானிலை'}
          </h3>
          <p className="text-xs text-slate-700 mt-2 leading-relaxed">
            {rec.rainPrediction?.avoidIrrigationAlertTa || 'மழை பொழிவு வாய்ப்பு குறைவாக உள்ளது. இயல்பாக பாசனம் செய்யலாம்.'}
          </p>
          {rec.rainPrediction?.waterSavedLitres ? (
            <div className="mt-3 pt-3 border-t border-sky-200 text-xs font-bold text-sky-800">
              ✓ மழை காரணமாக ~{rec.rainPrediction.waterSavedLitres.toLocaleString()} லிட்டர் நிலத்தடி நீர் சேமிப்பு!
            </div>
          ) : null}
        </div>

        {/* Groundwater Risk Score Card */}
        <div className={`rounded-3xl p-6 border-2 shadow-sm ${
          gwRisk?.category === 'critical' ? 'bg-red-50 border-red-300 text-red-950' :
          gwRisk?.category === 'warning' ? 'bg-amber-50 border-amber-300 text-amber-950' :
          'bg-emerald-50 border-emerald-300 text-emerald-950'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              {gwRisk?.category === 'critical' ? <ShieldAlert className="w-4 h-4 text-red-600" /> : <ShieldCheck className="w-4 h-4 text-emerald-600" />}
              நிலத்தடி நீர் அபாய நிலை
            </span>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full text-white ${
              gwRisk?.category === 'critical' ? 'bg-red-600' :
              gwRisk?.category === 'warning' ? 'bg-amber-600' :
              'bg-emerald-600'
            }`}>
              {gwRisk?.labelTa}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${
              gwRisk?.category === 'critical' ? 'text-red-700' :
              gwRisk?.category === 'warning' ? 'text-amber-700' :
              'text-emerald-700'
            }`}>
              {gwRisk?.score}
            </span>
            <span className="text-xs text-slate-500 font-bold">/ 100 மதிப்பெண்</span>
          </div>

          {/* Simple traffic light visual */}
          <div className="flex items-center gap-2 mt-3 p-2 bg-white/80 rounded-xl border border-black/5">
            <span className={`w-3.5 h-3.5 rounded-full ${gwRisk?.category === 'safe' ? 'bg-emerald-500 ring-2 ring-emerald-300' : 'bg-slate-300'}`} />
            <span className={`w-3.5 h-3.5 rounded-full ${gwRisk?.category === 'warning' ? 'bg-amber-500 ring-2 ring-amber-300' : 'bg-slate-300'}`} />
            <span className={`w-3.5 h-3.5 rounded-full ${gwRisk?.category === 'critical' ? 'bg-red-500 ring-2 ring-red-300 animate-ping' : 'bg-slate-300'}`} />
            <span className="text-xs font-bold text-slate-700 ml-1">
              ஆழம்: {district.waterTableMbgl} மீ
            </span>
          </div>

          <p className="text-xs text-slate-700 mt-2 leading-tight font-medium">
            {gwRisk?.conservationRecommendationTa}
          </p>
        </div>

        {/* Crop Stage & Soil Moisture Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 text-slate-900 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <Sprout className="w-4 h-4" /> பயிர் நிலை
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {rec.cropAgeDays} நாட்கள்
            </span>
          </div>
          <h3 className="text-lg font-black leading-snug">
            {rec.cropGrowthStageTa}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            மண் வகை: <strong>{farmer.soilTypeId === 'red_loam' ? 'செம்மண்' : 'கரிசல் மண்'}</strong> (ஈரப்பதம்: {farmer.currentSoilMoisturePercent}%)
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>அடுத்த ஆய்வு நாள்:</span>
            <strong className="text-slate-800">{rec.nextCheckDate}</strong>
          </div>
        </div>
      </div>

      {/* 3. எளிமையான 3 உழவர் பணிகள் (3 Golden Steps for Today) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 mb-4">
          <ThumbsUp className="w-5 h-5 text-emerald-600" />
          இன்று உழவர் செய்ய வேண்டிய எளிய பணிகள்:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-slate-900 text-sm">பாசன நேரம்:</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {isWait
                ? 'இன்று மோட்டாரை இயக்க வேண்டாம். சுவிட்சை ஆஃப் செய்து வைக்கவும்.'
                : 'காலை 6:00 மணி முதல் 9:00 மணிக்குள் நீர் பாய்ச்சவும். நண்பகலில் பாய்ச்சினால் நீர் ஆவியாகிவிடும்.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-slate-900 text-sm">மழைநீர் சேகரிப்பு:</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              வயல் வரப்புகளை 15 செ.மீ உயர்த்தி வையுங்கள். மழை பெய்தால் அந்த நீர் வெளியேறாமல் வயலிலேயே தங்கி நிலத்தடி நீரை உயர்த்தும்.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-slate-900 text-sm">சொட்டுநீர் பராமரிப்பு:</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              டிரிப் குழாய்களில் அடைப்பு உள்ளதா என சரிபார்க்கவும். கசிவுகள் இருந்தால் உடனடியாக சீர்செய்து வீணாவதைத் தடுக்கவும்.
            </p>
          </div>
        </div>
      </div>

      {/* 4. AI முடிவுக்கான எளிய காரணங்கள் (Simple Tamil Reasons) */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
        <h3 className="text-base font-black text-slate-900 uppercase tracking-wider mb-3">
          ஏன் இந்த பரிந்துரை? (AI காரணங்கள்):
        </h3>
        <div className="space-y-2.5">
          {rec.reasonsTa.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. அவசர உதவி எண் & கூடுதல் வரைபட விருப்பம் (Helpline & Toggle) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-emerald-900 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-2xl">
            <PhoneCall className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <span className="text-xs text-emerald-200 font-bold block">விவசாயிகள் இலவச உதவி எண் (கிசான் கால் சென்டர்)</span>
            <span className="text-lg font-black tracking-wider">1800-180-1551</span>
            <span className="text-xs text-emerald-200 block">காலை 6 மணி முதல் இரவு 10 மணி வரை தமிழில் பேசலாம்</span>
          </div>
        </div>

        {onSwitchToDetailedView && (
          <button
            onClick={onSwitchToDetailedView}
            className="text-xs sm:text-sm font-bold bg-white text-emerald-950 hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            வரைபடங்கள் மற்றும் கூடுதல் புள்ளிவிவரங்களை காண்க →
          </button>
        )}
      </div>
    </div>
  );
};
