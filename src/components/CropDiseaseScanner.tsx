import React, { useState } from 'react';
import {
  Camera,
  Upload,
  AlertTriangle,
  CheckCircle,
  FlaskConical,
  Sprout,
  Droplets,
  Volume2,
  VolumeX,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { TN_PEST_DISEASE_CATALOG, PestDiseaseDetail } from '../data/pestDiseaseData';
import { Language } from '../utils/tamilTranslations';
import { FarmerProfile } from '../types';

interface CropDiseaseScannerProps {
  currentLang: Language;
  farmer: FarmerProfile;
}

export const CropDiseaseScanner: React.FC<CropDiseaseScannerProps> = ({
  currentLang,
  farmer
}) => {
  const [selectedDisease, setSelectedDisease] = useState<PestDiseaseDetail>(() => {
    // Default to the disease matching the farmer's crop, or paddy blast
    const match = TN_PEST_DISEASE_CATALOG.find(d => d.cropId === farmer.cropId);
    return match || TN_PEST_DISEASE_CATALOG[0];
  });

  const [tankCapacityLitre, setTankCapacityLitre] = useState<number>(16); // Standard knapsack sprayer
  const [isVoicePlaying, setIsVoicePlaying] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Handle mock image upload for leaf diagnosis
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImagePreview(event.target?.result as string);
        runScanSimulation();
      };
      reader.readAsDataURL(file);
    }
  };

  const runScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 900);
  };

  // Voice synthesis
  const handleToggleVoice = () => {
    if (isVoicePlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsVoicePlaying(false);
      return;
    }

    if (!('speechSynthesis' in window)) return;

    const speechText = currentLang === 'ta'
      ? `பயிர் நோய் கண்டறிதல்: ${selectedDisease.diseaseNameTa}. பரிந்துரைக்கப்பட்ட மருந்து: ${selectedDisease.tnauChemicalTreatmentTa.chemicalName}. ${tankCapacityLitre} லிட்டர் டேங்கிற்கு மருந்தின் அளவு: ${selectedDisease.tnauChemicalTreatmentTa.dosagePerKnapsackTank}. இயற்கை வழிமுறை: ${selectedDisease.organicIpmMeasuresTa[0]}. நீர் பாசன வழிகாட்டல்: ${selectedDisease.irrigationConnectionTa}`
      : `Disease Diagnosis: ${selectedDisease.diseaseNameEn}. Recommended Treatment: ${selectedDisease.tnauChemicalTreatmentEn.chemicalName}. Dosage for ${tankCapacityLitre} Litre tank: ${selectedDisease.tnauChemicalTreatmentEn.dosagePerKnapsackTank}. Organic Control: ${selectedDisease.organicIpmMeasuresEn[0]}. Irrigation: ${selectedDisease.irrigationConnectionEn}`;

    try {
      const utterance = new SpeechSynthesisUtterance(speechText);
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

  // Severity style
  const severityBadge = {
    severe: 'bg-red-100 text-red-800 border-red-300 ring-1 ring-red-200',
    moderate: 'bg-amber-100 text-amber-800 border-amber-300',
    low: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  }[selectedDisease.severityLevel];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-2xl p-4 sm:p-6 text-white border border-emerald-700/50 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLang === 'ta' ? 'TNAU வழிகாட்டுதல் பெற்ற AI பயிர் நோய் கண்டறிதல்' : 'TNAU Agritech Certified AI Leaf Diagnostic Scanner'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {currentLang === 'ta' ? '🌿 பயிர் பூச்சி & நோய் கண்டறியும் மையம்' : '🌿 Crop Pest & Disease Diagnostic Hub'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
              {currentLang === 'ta'
                ? 'இலை அறிகுறி அல்லது புகைப்படத்தை பதிவேற்றி உடனே நோயைக் கண்டறியவும். தமிழ்நாடு வேளாண்மை பல்கலைக்கழகம் (TNAU) பரிந்துரைக்கும் மருந்து அளவையும் இயற்கை தீர்வுகளையும் பெறவும்.'
                : 'Diagnose leaf spots, blights, and wilts instantly. Get certified TNAU knapsack tank spray dosages, organic bio-control alternatives, and water management directives.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleVoice}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
                isVoicePlaying
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {isVoicePlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isVoicePlaying ? (currentLang === 'ta' ? 'குரலை நிறுத்து' : 'Stop Audio') : (currentLang === 'ta' ? 'குரல் வழியே கேள்' : 'Listen Diagnosis')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Scanner / Samples, Right Detailed Treatment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image / Sample selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>{currentLang === 'ta' ? 'இலை புகைப்படத்தை பதிவேற்றவும் / தேர்ந்தெடுக்கவும்' : 'Upload Leaf Photo or Select Known Symptom'}</span>
            </h3>

            {/* Upload Zone */}
            <label className="block border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer bg-emerald-50/50 hover:bg-emerald-50 transition group">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-900">
                  {currentLang === 'ta' ? 'கேமரா மூலம் படம் எடுக்க / பதிவேற்ற அழுத்தவும்' : 'Click to take photo or upload leaf image'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {currentLang === 'ta' ? 'JPG, PNG கோப்புகள் (வயல்வெளியில் எடுத்த இலை)' : 'JPG, PNG files supported'}
                </span>
              </div>
            </label>

            {/* Preview or Scanning State */}
            {isScanning && (
              <div className="mt-3 p-3 bg-emerald-50 rounded-xl flex items-center gap-3 border border-emerald-200 text-emerald-800 text-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                <span>{currentLang === 'ta' ? 'AI இலை புள்ளிகளை பகுப்பாய்வு செய்கிறது...' : 'Analyzing leaf lesion morphology & spectral patterns...'}</span>
              </div>
            )}

            {uploadedImagePreview && !isScanning && (
              <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={uploadedImagePreview}
                  alt="Uploaded leaf"
                  className="w-full h-36 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-emerald-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>{currentLang === 'ta' ? 'பகுப்பாய்வு முடிந்தது (94% பொருத்தம்)' : 'Matched with 94% confidence'}</span>
                </div>
              </div>
            )}

            {/* Quick Catalog Picker */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {currentLang === 'ta' ? 'தமிழ்நாடு முக்கிய பயிர் நோய்கள் பட்டியல்:' : 'Common Tamil Nadu Crop Diseases Catalog:'}
              </label>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {TN_PEST_DISEASE_CATALOG.map((disease) => {
                  const isSelected = selectedDisease.id === disease.id;
                  return (
                    <button
                      key={disease.id}
                      onClick={() => {
                        setSelectedDisease(disease);
                        setUploadedImagePreview(null);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/30 font-bold'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-900">
                          {currentLang === 'ta' ? disease.diseaseNameTa : disease.diseaseNameEn}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {currentLang === 'ta' ? disease.cropNameTa : disease.cropNameEn} • {currentLang === 'ta' ? disease.pathogenTypeTa : disease.pathogenType}
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        disease.severityLevel === 'severe'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {disease.severityLevel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Result & TNAU Treatment (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-5">
            {/* Disease Heading */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${severityBadge}`}>
                    {selectedDisease.severityLevel.toUpperCase()} {currentLang === 'ta' ? 'தீவிரம்' : 'SEVERITY'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    {currentLang === 'ta' ? selectedDisease.cropNameTa : selectedDisease.cropNameEn}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {currentLang === 'ta' ? selectedDisease.diseaseNameTa : selectedDisease.diseaseNameEn}
                </h3>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  {currentLang === 'ta' ? `காரணி: ${selectedDisease.pathogenTypeTa}` : `Pathogen: ${selectedDisease.pathogenType}`}
                </p>
              </div>

              {/* Tank size selector */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-right">
                <span className="text-[11px] text-slate-500 block">
                  {currentLang === 'ta' ? 'ஸ்பிரேயர் டேங்க் அளவு:' : 'Sprayer Tank Capacity:'}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  {[10, 16, 20].map((litres) => (
                    <button
                      key={litres}
                      onClick={() => setTankCapacityLitre(litres)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        tankCapacityLitre === litres
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {litres}L
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Weather Trigger & Visual Symptoms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  {currentLang === 'ta' ? 'வானிலை தூண்டுதல் காரணி:' : 'Weather Trigger Conditions:'}
                </span>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {currentLang === 'ta' ? selectedDisease.idealWeatherTriggerTa : selectedDisease.idealWeatherTriggerEn}
                </p>
              </div>

              <div className="bg-blue-50/70 rounded-xl p-3 border border-blue-200">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  {currentLang === 'ta' ? 'இலையின் பார்வை அடையாளம்:' : 'Visual Identification:'}
                </span>
                <p className="text-xs text-blue-950 leading-relaxed">
                  {currentLang === 'ta' ? selectedDisease.visualCharacteristicsTa : selectedDisease.visualCharacteristicsEn}
                </p>
              </div>
            </div>

            {/* Symptoms Bullet points */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                {currentLang === 'ta' ? 'முக்கிய நோய் அறிகுறிகள்:' : 'Primary Identifiable Symptoms:'}
              </h4>
              <ul className="space-y-1.5">
                {(currentLang === 'ta' ? selectedDisease.primarySymptomsTa : selectedDisease.primarySymptomsEn).map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TNAU Certified Treatment */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                    {currentLang === 'ta' ? 'TNAU பரிந்துரைத்த ரசாயன சிகிச்சை & மருந்தளவு' : 'TNAU Approved Chemical Treatment & Dosage'}
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  {currentLang === 'ta' ? 'அங்கீகரிக்கப்பட்டது' : 'Verified'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/80 p-3 rounded-lg border border-emerald-100">
                <div>
                  <span className="text-[11px] text-slate-500 block">
                    {currentLang === 'ta' ? 'மருந்தின் பெயர்:' : 'Recommended Formulation:'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    {currentLang === 'ta' ? selectedDisease.tnauChemicalTreatmentTa.chemicalName : selectedDisease.tnauChemicalTreatmentEn.chemicalName}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block">
                    {currentLang === 'ta' ? `டேங்கிற்கு அளவு (${tankCapacityLitre}L):` : `Dosage for ${tankCapacityLitre}L Tank:`}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                    {currentLang === 'ta' ? selectedDisease.tnauChemicalTreatmentTa.dosagePerKnapsackTank : selectedDisease.tnauChemicalTreatmentEn.dosagePerKnapsackTank}
                  </span>
                </div>
              </div>

              <p className="text-xs text-emerald-900 leading-relaxed">
                <strong>{currentLang === 'ta' ? 'தெளிக்கும் முறை: ' : 'Application: '}</strong>
                {currentLang === 'ta' ? selectedDisease.tnauChemicalTreatmentTa.applicationTiming : selectedDisease.tnauChemicalTreatmentEn.applicationTiming}
              </p>

              {selectedDisease.avoidPesticideWarningTa && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs font-medium">
                  {currentLang === 'ta' ? selectedDisease.avoidPesticideWarningTa : selectedDisease.avoidPesticideWarningEn}
                </div>
              )}
            </div>

            {/* Organic / Bio-control alternatives */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{currentLang === 'ta' ? 'இயற்கை / உயிர் பூச்சிக்கட்டுப்பாடு முறைகள் (Organic IPM):' : 'Organic & Biological Control Alternatives (IPM):'}</span>
              </div>
              <ul className="space-y-1.5">
                {(currentLang === 'ta' ? selectedDisease.organicIpmMeasuresTa : selectedDisease.organicIpmMeasuresEn).map((org, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{org}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Irrigation & Water Management Connection */}
            <div className="bg-cyan-50/70 rounded-xl p-3 border border-cyan-200 flex items-start gap-2.5">
              <Droplets className="w-4 h-4 text-cyan-700 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-bold text-cyan-950 block">
                  {currentLang === 'ta' ? 'நீர்ப்பாசன நெறிமுறை & நோய் கட்டுப்பாடு:' : 'Irrigation Directive Connection:'}
                </span>
                <p className="text-xs text-cyan-900 mt-0.5">
                  {currentLang === 'ta' ? selectedDisease.irrigationConnectionTa : selectedDisease.irrigationConnectionEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
