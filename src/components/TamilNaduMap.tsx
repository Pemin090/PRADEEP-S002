import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Waves,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Droplets,
  Layers,
  Filter,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { ALL_38_DISTRICTS } from '../data/tamilNaduData';
import { DistrictData, GroundwaterStressLevel } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';

interface TamilNaduMapProps {
  currentLang: Language;
  selectedDistrict: DistrictData;
  onSelectDistrict: (district: DistrictData) => void;
}

export const TamilNaduMap: React.FC<TamilNaduMapProps> = ({
  currentLang,
  selectedDistrict,
  onSelectDistrict
}) => {
  const t = TRANSLATIONS[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStress, setFilterStress] = useState<string>('all');
  const [inspectedDistrict, setInspectedDistrict] = useState<DistrictData>(selectedDistrict);

  // Filter districts
  const filteredDistricts = ALL_38_DISTRICTS.filter(d => {
    const matchesSearch =
      d.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameTa.includes(searchQuery) ||
      d.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.blocks.some(b => b.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || b.nameTa.includes(searchQuery));

    if (!matchesSearch) return false;
    if (filterStress === 'all') return true;
    return d.status === filterStress;
  });

  const getStatusBadge = (status: GroundwaterStressLevel) => {
    switch (status) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            {currentLang === 'ta' ? 'கடுமை' : 'Critical (Over-Draft)'}
          </span>
        );
      case 'moderate':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {currentLang === 'ta' ? 'மித அழுத்தம்' : 'Moderate Stress'}
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            {currentLang === 'ta' ? 'பாதுகாப்பானது' : 'Normal / Safe'}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {t.mapTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.mapSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Statewide Summary Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-medium">Total Districts</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-0.5">38</p>
          <p className="text-[11px] text-slate-400">All Covered</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center cursor-pointer hover:bg-emerald-100/60" onClick={() => setFilterStress('normal')}>
          <p className="text-xs text-emerald-800 font-medium">🟢 Normal / Safe</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-0.5">12</p>
          <p className="text-[11px] text-emerald-600">Delta & South Coastal</p>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center cursor-pointer hover:bg-amber-100/60" onClick={() => setFilterStress('moderate')}>
          <p className="text-xs text-amber-800 font-medium">🟡 Moderate Stress</p>
          <p className="text-2xl font-extrabold text-amber-700 mt-0.5">17</p>
          <p className="text-[11px] text-amber-600">Central & Foothills</p>
        </div>

        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-center cursor-pointer hover:bg-red-100/60" onClick={() => setFilterStress('critical')}>
          <p className="text-xs text-red-800 font-medium">🔴 Critical Stress</p>
          <p className="text-2xl font-extrabold text-red-700 mt-0.5">9</p>
          <p className="text-[11px] text-red-600">Western & Northern</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchDistrict}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterStress('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStress === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setFilterStress('critical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStress === 'critical'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
            }`}
          >
            🔴 Critical (9)
          </button>
          <button
            onClick={() => setFilterStress('moderate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStress === 'moderate'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            🟡 Moderate (17)
          </button>
          <button
            onClick={() => setFilterStress('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStress === 'normal'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            🟢 Normal (12)
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map Explorer & District Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* District Tiles Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {filteredDistricts.length} of 38 Tamil Nadu Districts</span>
            <span>Click to inspect block aquifer data</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredDistricts.map((d) => {
              const isSelected = inspectedDistrict.id === d.id;
              const isCurrent = selectedDistrict.id === d.id;

              return (
                <div
                  key={d.id}
                  onClick={() => setInspectedDistrict(d)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/30 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-bold text-sm text-slate-900">
                        {currentLang === 'ta' ? d.nameTa : d.nameEn}
                      </h4>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded text-[10px] font-bold">
                          Current
                        </span>
                      )}
                    </div>
                    {getStatusBadge(d.status)}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 truncate">
                    {currentLang === 'ta' ? d.zoneTa : d.zone}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Water Table: <strong className="text-slate-800">{d.waterTableMbgl} mbgl</strong>
                    </span>
                    <span className="text-slate-500">
                      Extraction: <strong className="text-slate-800">{d.extractionRate}%</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* District Detail Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-start justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {currentLang === 'ta' ? 'தேர்ந்தெடுத்த மாவட்ட ஆய்வு' : 'District Aquifer Inspection'}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5 flex items-center gap-2">
                {currentLang === 'ta' ? inspectedDistrict.nameTa : inspectedDistrict.nameEn}
                <span className="text-xs font-normal text-slate-500">({inspectedDistrict.nameEn})</span>
              </h3>
              <p className="text-xs text-emerald-700 font-medium">
                {currentLang === 'ta' ? inspectedDistrict.zoneTa : inspectedDistrict.zone}
              </p>
            </div>
            {getStatusBadge(inspectedDistrict.status)}
          </div>

          {/* Key Groundwater Specs */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400">Avg Water Table:</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                {inspectedDistrict.waterTableMbgl} mbgl
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400">Stage of Extraction:</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                {inspectedDistrict.extractionRate}%
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400">5-Year Aquifer Trend:</span>
              <p className="text-base font-bold text-slate-900 mt-0.5 capitalize">
                {inspectedDistrict.trend === 'declining' ? 'Declining ↓' : inspectedDistrict.trend === 'improving' ? 'Improving ↑' : 'Stable ➔'}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400">Annual Rainfall:</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                {inspectedDistrict.annualRainfallMm} mm
              </p>
            </div>
          </div>

          {/* Blocks & Villages List */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{currentLang === 'ta' ? 'வட்டாரங்கள் & கிராமங்கள் (Blocks & Villages)' : 'Blocks in this District'}</span>
              <span className="text-slate-400">{inspectedDistrict.blocks.length} blocks</span>
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {inspectedDistrict.blocks.map(b => (
                <div key={b.id} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{currentLang === 'ta' ? b.nameTa : b.nameEn}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      b.status === 'critical' ? 'bg-red-100 text-red-800' :
                      b.status === 'moderate' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {b.status} ({b.waterTableMbgl} mbgl)
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1">
                    <span className="font-medium text-slate-600">Sample Villages: </span>
                    {b.villages.join(', ')}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-100">
                    <span>{b.participatingFarmers} farmers using AI</span>
                    <span>{b.communityWaterSavedLakhL} Lakh L water saved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Major Crops in this District */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-400 font-medium">Major Crops Grown: </span>
            <span className="font-semibold text-slate-800">
              {(currentLang === 'ta' ? inspectedDistrict.majorCropsTa : inspectedDistrict.majorCropsEn).join(' • ')}
            </span>
          </div>

          {/* Action Button: Set as my active district */}
          <button
            onClick={() => {
              onSelectDistrict(inspectedDistrict);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {currentLang === 'ta'
                ? `என் பண்ணை மாவட்டமாக அமை (${inspectedDistrict.nameTa})`
                : `Set as My Farm Location (${inspectedDistrict.nameEn})`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
