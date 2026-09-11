import React, { useState } from 'react';
import {
  X,
  Save,
  MapPin,
  Sparkles,
  Search,
  Check,
  Droplet
} from 'lucide-react';
import { FarmerProfile, DistrictData } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { ALL_38_DISTRICTS } from '../data/tamilNaduData';
import { CROPS_DATA, SOILS_DATA, IRRIGATION_METHODS } from '../data/cropsAndSoils';

interface FarmerProfileFormProps {
  farmer: FarmerProfile;
  selectedDistrict: DistrictData;
  onSaveProfile: (updatedFarmer: FarmerProfile, updatedDistrict: DistrictData) => void;
  onClose: () => void;
  currentLang: Language;
  onApplyPreset: (presetKey: 'delta' | 'western' | 'nilgiris_rain' | 'salem_drought') => void;
}

export const FarmerProfileForm: React.FC<FarmerProfileFormProps> = ({
  farmer,
  selectedDistrict,
  onSaveProfile,
  onClose,
  currentLang,
  onApplyPreset
}) => {
  const t = TRANSLATIONS[currentLang];

  const [formData, setFormData] = useState<FarmerProfile>({ ...farmer });
  const [districtId, setDistrictId] = useState<string>(selectedDistrict.id);
  const [blockId, setBlockId] = useState<string>(farmer.blockId || selectedDistrict.blocks[0]?.id || '');
  const [pincodeSearch, setPincodeSearch] = useState<string>(farmer.pincode || '');

  const currentDist = ALL_38_DISTRICTS.find(d => d.id === districtId) || selectedDistrict;
  const availableBlocks = currentDist.blocks;

  const handleDistrictChange = (newDistId: string) => {
    setDistrictId(newDistId);
    const newDist = ALL_38_DISTRICTS.find(d => d.id === newDistId) || ALL_38_DISTRICTS[0];
    const firstBlock = newDist.blocks[0]?.id || '';
    setBlockId(firstBlock);
    setFormData(prev => ({
      ...prev,
      districtId: newDistId,
      blockId: firstBlock,
      villageName: newDist.blocks[0]?.villages[0] || 'Agri Village'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(
      {
        ...formData,
        districtId,
        blockId,
        pincode: pincodeSearch
      },
      currentDist
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.farmerSetupTitle}
              </h3>
              <p className="text-xs text-slate-500">
                Tamil Nadu State → District → Block → Village
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 One-Click College Project Demonstration Presets */}
        <div className="my-4 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {t.demoPresets}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <button
              type="button"
              onClick={() => onApplyPreset('delta')}
              className="text-left text-xs p-2 rounded-lg bg-white border border-emerald-300/80 hover:bg-emerald-100 text-emerald-950 font-medium transition"
            >
              🌊 {t.presetDelta}
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('western')}
              className="text-left text-xs p-2 rounded-lg bg-white border border-emerald-300/80 hover:bg-emerald-100 text-emerald-950 font-medium transition"
            >
              🥥 {t.presetWestern}
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('nilgiris_rain')}
              className="text-left text-xs p-2 rounded-lg bg-white border border-emerald-300/80 hover:bg-emerald-100 text-emerald-950 font-medium transition"
            >
              🌧️ {t.presetRainAlert}
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('salem_drought')}
              className="text-left text-xs p-2 rounded-lg bg-white border border-emerald-300/80 hover:bg-emerald-100 text-emerald-950 font-medium transition"
            >
              ☀️ {t.presetDrySummer}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Farmer Name & Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.farmerName}</label>
              <input
                type="text"
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                placeholder="e.g. M. Murugan (TN-FARM-2026)"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.pincodeLabel}</label>
              <input
                type="text"
                value={pincodeSearch}
                onChange={(e) => setPincodeSearch(e.target.value)}
                placeholder="e.g. 641001, 613001"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Location Hierarchy: District & Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.districtLabel}</label>
              <select
                value={districtId}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {ALL_38_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {currentLang === 'ta' ? d.nameTa : d.nameEn} ({d.status})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.blockLabel}</label>
              <select
                value={blockId}
                onChange={(e) => {
                  setBlockId(e.target.value);
                  setFormData({ ...formData, blockId: e.target.value });
                }}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {availableBlocks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {currentLang === 'ta' ? b.nameTa : b.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Village & Farm Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.villageLabel}</label>
              <input
                type="text"
                value={formData.villageName}
                onChange={(e) => setFormData({ ...formData, villageName: e.target.value })}
                placeholder="e.g. Achipatti, Alandurai"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.farmSizeLabel}</label>
              <input
                type="number"
                step="0.25"
                min="0.25"
                max="100"
                value={formData.farmSizeAcres}
                onChange={(e) => setFormData({ ...formData, farmSizeAcres: parseFloat(e.target.value) || 1 })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Crop & Sowing Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.cropLabel}</label>
              <select
                value={formData.cropId}
                onChange={(e) => setFormData({ ...formData, cropId: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {CROPS_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {currentLang === 'ta' ? c.nameTa : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.sowingDateLabel}</label>
              <input
                type="date"
                value={formData.sowingDate}
                onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                required
              />
            </div>
          </div>

          {/* Soil Type & Irrigation Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.soilTypeLabel}</label>
              <select
                value={formData.soilTypeId}
                onChange={(e) => setFormData({ ...formData, soilTypeId: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {SOILS_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {currentLang === 'ta' ? s.nameTa : s.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.irrigationMethodLabel}</label>
              <select
                value={formData.irrigationMethodId}
                onChange={(e) => setFormData({ ...formData, irrigationMethodId: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {IRRIGATION_METHODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {currentLang === 'ta' ? m.nameTa : m.nameEn} ({Math.round(m.efficiency * 100)}% Eff.)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pump Motor HP & Days Since Last Irrigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.pumpHpLabel}</label>
              <select
                value={formData.pumpHorsePower}
                onChange={(e) => setFormData({ ...formData, pumpHorsePower: parseFloat(e.target.value) || 5 })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                <option value="3">3 HP (450 LPM)</option>
                <option value="5">5 HP (750 LPM)</option>
                <option value="7.5">7.5 HP (1100 LPM)</option>
                <option value="10">10 HP (1500 LPM)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.daysSinceIrrigation}</label>
              <input
                type="number"
                min="0"
                max="30"
                value={formData.lastIrrigatedDaysAgo}
                onChange={(e) => setFormData({ ...formData, lastIrrigatedDaysAgo: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.optionalSoilMoisture}</label>
              <input
                type="number"
                min="10"
                max="95"
                value={formData.currentSoilMoisturePercent || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  currentSoilMoisturePercent: e.target.value ? parseInt(e.target.value) : undefined
                })}
                placeholder="Auto-estimate"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center space-x-2 shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveProfileBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
