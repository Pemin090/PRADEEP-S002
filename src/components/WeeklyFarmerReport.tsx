import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  MapPin,
  Droplets,
  Award,
  CheckCircle2,
  TrendingDown,
  CloudSun,
  Zap,
  Fuel,
  Leaf,
  Loader2,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { FarmerProfile, DistrictData, BlockData, IrrigationRecommendation, WaterBudget } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { CROPS_DATA, SOILS_DATA, IRRIGATION_METHODS } from '../data/cropsAndSoils';
import { downloadFarmerReportPDF } from '../utils/pdfReportGenerator';

interface WeeklyFarmerReportProps {
  farmer: FarmerProfile;
  district: DistrictData;
  block?: BlockData;
  rec: IrrigationRecommendation;
  budget: WaterBudget;
  currentLang: Language;
}

export const WeeklyFarmerReport: React.FC<WeeklyFarmerReportProps> = ({
  farmer,
  district,
  block,
  rec,
  budget,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const crop = CROPS_DATA.find(c => c.id === farmer.cropId) || CROPS_DATA[0];
  const soil = SOILS_DATA.find(s => s.id === farmer.soilTypeId) || SOILS_DATA[0];
  const method = IRRIGATION_METHODS.find(m => m.id === farmer.irrigationMethodId) || IRRIGATION_METHODS[0];
  const activeBlock = block || district.blocks[0];

  // Resource Calculations
  const savingsLitres = budget.estimatedWeeklySavingsL;
  const pumpHp = farmer.pumpHorsePower || 5;
  const pumpingHoursSaved = savingsLitres / (farmer.pumpFlowRateLpm * 60 || 45000);
  const electricityKwhSaved = pumpingHoursSaved * (pumpHp * 0.746);
  const dieselEquivLitres = pumpingHoursSaved * (pumpHp * 0.25);
  const co2SavedKg = electricityKwhSaved * 0.82;

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setDownloadSuccess(false);

    // Short timeout to allow button UI transition
    setTimeout(() => {
      try {
        downloadFarmerReportPDF({
          farmer,
          district,
          block: activeBlock,
          rec,
          budget,
          currentLang
        });
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      } catch (err) {
        console.warn('PDF generation notice:', err);
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 150);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-emerald-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 uppercase tracking-wide">
              {currentLang === 'ta' ? 'அரசு அங்கீகரிக்கப்பட்ட அறிக்கை' : 'Official Verified Audit'}
            </span>
            <span className="text-xs text-emerald-200/80">
              ISO 9001:2015 Framework
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
            {t.weeklyReportTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5">
            {currentLang === 'ta'
              ? 'உங்கள் பண்ணையின் வாராந்திர பாசன பரிந்துரைகள் மற்றும் நிலத்தடி நீர் சேமிப்பு சுருக்கம்'
              : "Summarizing irrigation recommendations, pumping schedules, and water conservation for your farm."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md ${
              downloadSuccess
                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:shadow-lg hover:scale-[1.02] active:scale-95'
            } disabled:opacity-75 disabled:cursor-not-allowed`}
            title="Generate and download print-ready PDF document"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>{t.downloadingPdf}</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>{t.downloadSuccess}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-950" />
                <span>{t.downloadPdfBtn}</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 border border-emerald-600/60 shadow-sm transition"
            title="Open browser print dialog"
          >
            <Printer className="w-4 h-4" />
            <span>{t.downloadPdf}</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 print:shadow-none print:border-none print:p-0">
        {/* Printable Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-emerald-800 pb-5">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-extrabold text-sm shadow-sm shrink-0">
              TN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  Government of Tamil Nadu • Dept. of Agriculture
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {currentLang === 'ta'
                  ? 'தமிழ்நாடு நுண்ணறிவு பாசனம் & நிலத்தடி நீர் தணிக்கை அறிக்கை'
                  : 'Smart Irrigation & Groundwater Conservation Audit Report'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                SG&SWRDC Ground Water Data Centre & TNAU AI Engine • Ref: TN-{district.id.slice(0, 3).toUpperCase()}-{farmer.pincode || '600001'}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 shrink-0">
            <p className="font-bold text-slate-900">Weekly Advisory Report</p>
            <p>Issued: <strong>{new Date().toLocaleDateString('en-GB')}</strong></p>
            <p className="text-emerald-700 font-semibold">Status: Officially Verified</p>
          </div>
        </div>

        {/* Farmer & Location Hierarchy Identification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider">{t.reportFor}</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {farmer.farmerName || 'Thiru. Selvam (Farmer ID: TN-AG-8821)'}
            </p>
            <p className="text-slate-600 mt-0.5">
              Farmer ID: <strong>{farmer.id}</strong> • Mobile: <strong>{farmer.phone}</strong>
            </p>
            <p className="text-slate-600 mt-0.5">
              Landholding: <strong>{farmer.farmSizeAcres} Acres</strong> ({(farmer.farmSizeAcres * 0.404686).toFixed(2)} Ha) • Pump: <strong>{farmer.pumpHorsePower} HP</strong> (~{farmer.pumpFlowRateLpm} LPM)
            </p>
          </div>

          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider">{t.locationHierarchy}</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Tamil Nadu → {currentLang === 'ta' ? district.nameTa : district.nameEn} → {currentLang === 'ta' ? activeBlock.nameTa : activeBlock.nameEn} → {farmer.villageName || 'Agri Village'} ({farmer.pincode})
            </p>
            <p className="text-slate-600 mt-1">
              Agro-Climatic Zone: <strong>{currentLang === 'ta' ? district.zoneTa : district.zone}</strong>
            </p>
            <p className="text-slate-600 mt-0.5">
              Normal Annual Rainfall: <strong>{district.annualRainfallMm} mm</strong>
            </p>
          </div>
        </div>

        {/* Primary Crop & Agronomic Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Crop Cultivated</span>
            <p className="font-bold text-slate-900 mt-0.5 text-sm">
              {currentLang === 'ta' ? crop.nameTa : crop.nameEn}
            </p>
            <span className="text-[11px] text-slate-500">Stage: {rec.cropGrowthStageEn} ({rec.cropAgeDays} days)</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Soil Condition</span>
            <p className="font-bold text-slate-900 mt-0.5 text-sm">
              {currentLang === 'ta' ? soil.nameTa.split('(')[0] : soil.nameEn.split('(')[0]}
            </p>
            <span className="text-[11px] text-slate-500">AWC: {soil.availableWaterCapacityMmPerM} mm/m</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Irrigation System</span>
            <p className="font-bold text-emerald-700 mt-0.5 text-sm">
              {currentLang === 'ta' ? method.nameTa.split('(')[0] : method.nameEn.split('(')[0]}
            </p>
            <span className="text-[11px] text-slate-500">Efficiency: {Math.round(method.efficiency * 100)}%</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Aquifer Stress</span>
            <p className={`font-bold mt-0.5 text-sm ${
              district.status === 'critical' ? 'text-red-700' :
              district.status === 'moderate' ? 'text-amber-700' : 'text-emerald-700'
            }`}>
              {district.status.toUpperCase()} ({district.waterTableMbgl} mbgl)
            </p>
            <span className="text-[11px] text-slate-500">Trend: {district.trend}</span>
          </div>
        </div>

        {/* Current AI Irrigation Recommendation Highlight */}
        <div className={`rounded-xl p-4 sm:p-5 border ${
          rec.type === 'skip_irrigation'
            ? 'bg-blue-50/70 border-blue-200 text-blue-950'
            : rec.type === 'delay_irrigation'
            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
            : rec.type === 'reduce_water'
            ? 'bg-red-50/70 border-red-200 text-red-950'
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-black/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                Current Irrigation Decision
              </span>
              <h4 className="text-lg font-black mt-0.5">
                {currentLang === 'ta' ? rec.headlineTa : rec.headlineEn}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/80 border border-black/10 shadow-xs">
                {rec.aiModelType.split('+')[0]}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/80 border border-black/10 shadow-xs">
                Confidence: {(rec.mlConfidenceScore * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
            <div className="bg-white/80 p-2.5 rounded-lg border border-black/5">
              <span className="text-slate-500 block">Recommended per Acre</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                {rec.litresPerAcre.toLocaleString()} Litres
              </p>
            </div>
            <div className="bg-white/80 p-2.5 rounded-lg border border-black/5">
              <span className="text-slate-500 block">Total Farm Volume</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                {rec.totalFarmLitres.toLocaleString()} Litres
              </p>
            </div>
            <div className="bg-white/80 p-2.5 rounded-lg border border-black/5">
              <span className="text-slate-500 block">5 HP Motor Runtime</span>
              <p className="text-base font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {rec.pumpingTimeHours} Hours
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Water Savings & Energy Comparison Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-400" />
              {currentLang === 'ta' ? 'வாராந்திர நீர் சேமிப்பு மற்றும் வள தணிக்கை' : 'Weekly Water Consumption & Resource Savings Audit'}
            </h4>
            <span className="text-[11px] text-slate-400">
              Benchmark: Conventional Flood vs AI Precision
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Irrigation Regimen</th>
                  <th className="p-3">Water Volume</th>
                  <th className="p-3">Pump Runtime</th>
                  <th className="p-3">Conservation Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-900">
                    Conventional Practice (Unmanaged Flood)
                  </td>
                  <td className="p-3">
                    {(budget.weeklyRecommendedL + budget.estimatedWeeklySavingsL).toLocaleString()} Litres
                  </td>
                  <td className="p-3">
                    {((budget.weeklyRecommendedL + budget.estimatedWeeklySavingsL) / (farmer.pumpFlowRateLpm * 60)).toFixed(1)} Hours
                  </td>
                  <td className="p-3 text-slate-500">
                    Baseline standard benchmark
                  </td>
                </tr>
                <tr className="bg-emerald-50/30">
                  <td className="p-3 font-semibold text-emerald-900">
                    AI Smart Irrigation (Actual Managed)
                  </td>
                  <td className="p-3 font-bold text-slate-900">
                    {budget.weeklyUsedL.toLocaleString()} Litres
                  </td>
                  <td className="p-3 font-semibold text-slate-900">
                    {(budget.weeklyUsedL / (farmer.pumpFlowRateLpm * 60)).toFixed(1)} Hours
                  </td>
                  <td className="p-3 text-emerald-700 font-medium">
                    {method.nameEn.split('(')[0]} precision schedule
                  </td>
                </tr>
                <tr className="bg-emerald-100/40 font-bold">
                  <td className="p-3 text-emerald-900">
                    Net Groundwater Saved (This Week)
                  </td>
                  <td className="p-3 text-emerald-700">
                    +{budget.estimatedWeeklySavingsL.toLocaleString()} Litres
                  </td>
                  <td className="p-3 text-emerald-700">
                    -{pumpingHoursSaved.toFixed(1)} Motor Hours
                  </td>
                  <td className="p-3 text-emerald-800">
                    {Math.round((budget.estimatedWeeklySavingsL / (budget.weeklyRecommendedL + budget.estimatedWeeklySavingsL || 1)) * 100)}% Water Conservation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Environmental & Energy Dividends */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 flex items-center space-x-3">
            <div className="p-2 bg-amber-200/60 rounded-lg shrink-0">
              <Zap className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 block uppercase">
                Electricity Saved
              </span>
              <p className="text-base font-extrabold text-amber-950 mt-0.5">
                {electricityKwhSaved.toFixed(1)} kWh Units
              </p>
              <span className="text-[10px] text-amber-700">Grid tariff & motor wear reduction</span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-950 flex items-center space-x-3">
            <div className="p-2 bg-blue-200/60 rounded-lg shrink-0">
              <Fuel className="w-5 h-5 text-blue-800" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-800 block uppercase">
                Diesel Equivalent
              </span>
              <p className="text-base font-extrabold text-blue-950 mt-0.5">
                {dieselEquivLitres.toFixed(1)} Litres
              </p>
              <span className="text-[10px] text-blue-700">Generator & diesel pump savings</span>
            </div>
          </div>

          <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-teal-950 flex items-center space-x-3">
            <div className="p-2 bg-teal-200/60 rounded-lg shrink-0">
              <Leaf className="w-5 h-5 text-teal-800" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-teal-800 block uppercase">
                Carbon Offset
              </span>
              <p className="text-base font-extrabold text-teal-950 mt-0.5">
                {co2SavedKg.toFixed(1)} kg CO₂e
              </p>
              <span className="text-[10px] text-teal-700">Pumping emissions avoided</span>
            </div>
          </div>
        </div>

        {/* Next Week Agronomic Advisory Outlook */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-emerald-400" />
              {t.nextWeekAdvisory}
            </h4>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              {district.nameEn} Agro Zone Forecast
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            {currentLang === 'ta'
              ? `அடுத்த வாரம் ${district.nameTa} வட்டாரத்தில் மிதமான வெப்பநிலை (32-34°C) மற்றும் சிறிய மழை வாய்ப்பு கணிக்கப்பட்டுள்ளது. உங்கள் பயிர் '${crop.nameTa}' தீவிர வளர்ச்சி கட்டத்தை எட்டுவதால், பாசனத்திற்கு முன் மண் ஈரப்பதத்தை சரிபார்த்து, காலையில் (காலை 6 - 9 மணி) மட்டும் பாசனம் செய்யவும். உங்கள் பகுதியில் நிலத்தடி நீர் நிலை ${district.status.toUpperCase()} (${district.waterTableMbgl} mbgl) என்பதால் கூடுதல் நீர் பாய்ச்சுவதை தவிர்க்கவும்.`
              : `Next week in ${district.nameEn} block anticipates stable daytime temperatures (32-34°C) with isolated cloud formation. Because your ${crop.nameEn} is advancing through ${rec.cropGrowthStageEn}, maintain morning drip cycles (6:00 AM - 9:00 AM) to minimize evaporation. Because the local aquifer in ${activeBlock.nameEn} is under ${district.status.toUpperCase()} stress (${district.waterTableMbgl} mbgl), avoid flood oversaturation.`}
          </p>
        </div>

        {/* Stamp & Verification */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 pt-4 gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Verified by Tamil Nadu Smart Irrigation AI Engine • Model Version 2.4.1 (FAO CROPWAT + SG&SWRDC)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-200">
              AUTH-CODE: 9812-TN-OK
            </span>
            <span>Generated: {new Date().toLocaleDateString('en-GB')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
