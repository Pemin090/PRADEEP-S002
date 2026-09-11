import React from 'react';
import {
  Users,
  Shield,
  Droplets,
  AlertOctagon,
  Sprout,
  BarChart3,
  CheckCircle2,
  TreeDeciduous,
  Leaf
} from 'lucide-react';
import { DistrictData, BlockData, FarmerProfile } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { ALL_38_DISTRICTS } from '../data/tamilNaduData';

interface CommunityDashboardProps {
  district: DistrictData;
  block?: BlockData;
  farmer: FarmerProfile;
  currentLang: Language;
}

export const CommunityDashboard: React.FC<CommunityDashboardProps> = ({
  district,
  block,
  farmer,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];
  const activeBlock = block || district.blocks[0];

  // Aggregated Statewide numbers
  const totalStatewideFarmers = ALL_38_DISTRICTS.reduce((acc, d) =>
    acc + d.blocks.reduce((bAcc, b) => bAcc + b.participatingFarmers, 0), 0
  );

  const totalStatewideSavedLakh = Math.round(
    ALL_38_DISTRICTS.reduce((acc, d) =>
      acc + d.blocks.reduce((bAcc, b) => bAcc + b.communityWaterSavedLakhL, 0), 0
    )
  );

  return (
    <div className="space-y-6">
      {/* Block-Level Community Conservation Hero */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                {currentLang === 'ta' ? 'வட்டார சமூக நீர் பாதுகாப்பு' : 'Block Community Impact'}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {currentLang === 'ta' ? `${district.nameTa} - ${activeBlock.nameTa}` : `${district.nameEn} - ${activeBlock.nameEn}`} Block
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>{currentLang === 'ta' ? 'அநாமதேய தனிநபர் தரவு பாதுகாப்பு' : '100% Anonymized Farmer Data'}</span>
          </div>
        </div>

        {/* 3 Block Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500">{t.adoptionRate}</p>
            <p className="text-3xl font-extrabold text-emerald-700 mt-1">
              68%
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {activeBlock.participatingFarmers} {currentLang === 'ta' ? 'விவசாயிகள் பங்கேற்பு' : 'active farmers in block'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500">{t.totalBlockSaved}</p>
            <p className="text-3xl font-extrabold text-blue-700 mt-1">
              {activeBlock.communityWaterSavedLakhL} <span className="text-sm font-normal text-slate-600">Lakh Litres</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {currentLang === 'ta' ? 'நிலத்தடி நீர் உறிஞ்சல் குறைப்பு' : 'Direct aquifer extraction reduced'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500">{t.aquiferRecharge}</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              +0.28 <span className="text-sm font-normal text-slate-600">mbgl</span>
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {currentLang === 'ta' ? 'மழைநீர் சேகரிப்புடன் வளர்ச்சி' : 'Net positive recharge trend'}
            </p>
          </div>
        </div>

        {/* Persistent Water Stress Crop Advisory (Section 17) */}
        {district.status === 'critical' && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start space-x-3 text-amber-950">
            <AlertOctagon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                {currentLang === 'ta'
                  ? '⚠️ நீண்டகால நீர் பற்றாக்குறை வேளாண் ஆலோசனை (TNAU வழிகாட்டுதல்)'
                  : '⚠️ Persistent Regional Water Stress Agronomic Advisory'}
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed">
                {currentLang === 'ta'
                  ? `உங்கள் வட்டாரம் (${activeBlock.nameTa}) பல ஆண்டுகளாக நிலத்தடி நீர் பற்றாக்குறையை எதிர்கொள்கிறது. கரும்பு அல்லது வெள்ளப் பாசன நெல்லுக்கு பதிலாக, சொட்டு நீர் பாசனத்தில் உளுந்து, தினை, மக்காச்சோளம் அல்லது வேர்க்கடலை போன்ற குறைந்த நீர் தேவைப்படும் மாற்றுப் பயிர்களைப் பற்றி வட்டார வேளாண்மை அலுவலரிடம் ஆலோசனை பெற பரிந்துரைக்கப்படுகிறது.`
                  : `Your block (${activeBlock.nameEn}) has experienced multi-year groundwater stress. You are gently encouraged to discuss high-efficiency crop diversification (millets, pulses, drip-fertigated maize or oilseeds) with your local Block Agricultural Extension Officer to safeguard future farm income.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Statewide Administrative & Analytics Overview (Section 15) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <BarChart3 className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">
            {currentLang === 'ta' ? 'தமிழ்நாடு முழுமைக்குமான நிர்வாகப் புள்ளிவிவரங்கள்' : 'Tamil Nadu Statewide Administrative Overview'}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Enrolled TN Farmers</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalStatewideFarmers.toLocaleString()}
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold">Across all 38 districts</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Total Water Saved</span>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">
              {totalStatewideSavedLakh.toLocaleString()} <span className="text-xs font-normal text-slate-600">Lakh L</span>
            </p>
            <span className="text-[11px] text-slate-500">Since inception</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Critical Districts</span>
            <p className="text-2xl font-extrabold text-red-600 mt-1">
              9 / 38
            </p>
            <span className="text-[11px] text-slate-500">Strict quota active</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Safe Aquifer Zone</span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              12 / 38
            </p>
            <span className="text-[11px] text-slate-500">Delta & River basins</span>
          </div>
        </div>

        {/* Crop Distribution in Tamil Nadu */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-600" />
            {currentLang === 'ta' ? 'தமிழக பயிர் பரப்பளவு பங்கீடு' : 'Major Agricultural Crop Distribution in Tamil Nadu'}
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400">Paddy (நெல்)</span>
              <p className="font-bold text-slate-900 mt-0.5">38% (Delta & Coastal)</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400">Millets & Pulses</span>
              <p className="font-bold text-slate-900 mt-0.5">22% (Southern & North)</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400">Cotton & Oilseeds</span>
              <p className="font-bold text-slate-900 mt-0.5">18% (Western & South)</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-400">Sugarcane & Banana</span>
              <p className="font-bold text-slate-900 mt-0.5">14% (River belts)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
