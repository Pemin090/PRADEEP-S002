import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Store,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Filter,
  Search,
  ArrowUpRight,
  Calculator,
  IndianRupee,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { TN_MANDI_PRICES, MandiPriceItem } from '../data/mandiMarketData';
import { Language } from '../utils/tamilTranslations';
import { FarmerProfile, DistrictData } from '../types';

interface MandiMarketRatesProps {
  currentLang: Language;
  farmer: FarmerProfile;
  district: DistrictData;
}

export const MandiMarketRates: React.FC<MandiMarketRatesProps> = ({
  currentLang,
  farmer,
  district
}) => {
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMandi, setSelectedMandi] = useState<MandiPriceItem>(() => {
    const match = TN_MANDI_PRICES.find(m => m.cropId === farmer.cropId);
    return match || TN_MANDI_PRICES[0];
  });

  // Calculate profit projection
  const [harvestWeightBags, setHarvestWeightBags] = useState<number>(30); // 30 bags of 50kg = 15 Quintals

  const quintalsTotal = (harvestWeightBags * 50) / 100;
  const estimatedRevenue = Math.round(quintalsTotal * selectedMandi.modalPricePerQuintal);
  const mspBenchmarkTotal = Math.round(quintalsTotal * selectedMandi.govMspPerQuintal);
  const deltaVsMsp = estimatedRevenue - mspBenchmarkTotal;

  // Filter prices
  const filteredPrices = useMemo(() => {
    return TN_MANDI_PRICES.filter((item) => {
      const matchCrop = selectedCropFilter === 'all' || item.cropId === selectedCropFilter;
      const matchSearch =
        item.mandiNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.districtNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cropNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cropNameTa.includes(searchQuery);
      return matchCrop && matchSearch;
    });
  }, [selectedCropFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 rounded-2xl p-4 sm:p-6 text-white border border-amber-700/50 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
              <Store className="w-3.5 h-3.5" />
              <span>{currentLang === 'ta' ? 'தமிழ்நாடு வேளாண் விளைபொருள் நேரடி சந்தை நிலவரம்' : 'Live Tamil Nadu APMC & Uzhavar Sandhai Market Rates'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {currentLang === 'ta' ? '🌾 உழவர் சந்தை & ஒழுங்குமுறை மண்டிகள் நேரடி விலை' : '🌾 Mandi Price Tracker & Crop Sale Advisor'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/90 mt-1 max-w-2xl">
              {currentLang === 'ta'
                ? 'இடைத்தரகர்கள் இன்றி தமிழகத்தின் முக்கிய சந்தைகள், அரசு கொள்முதல் மையங்கள் மற்றும் உழவர் சந்தை விலைகளை நிகழ்நேரத்தில் அறிந்து சரியான விலையில் விற்று அதிக லாபம் பெறுங்கள்.'
                : 'Empowering smallholders with transparent modal mandi rates, MSP benchmarks, daily arrivals, and AI dispatch timing to prevent distress farmgate sales.'}
            </p>
          </div>

          <div className="bg-amber-950/70 border border-amber-600/40 p-3 rounded-xl text-right">
            <span className="text-[11px] text-amber-300 block font-medium">
              {currentLang === 'ta' ? 'அரசு ஆதார விலை (MSP) ஒப்பீடு:' : 'Govt Support Benchmark:'}
            </span>
            <span className="text-xs font-bold text-white">
              {currentLang === 'ta' ? '100% வெளிப்படையானது' : 'Verified APMC / AGMARK'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'ta' ? 'மண்டி பெயர், மாவட்டம் அல்லது பயிரை தேடுக...' : 'Search by mandi, district, or crop name...'}
            className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            {currentLang === 'ta' ? 'பயிர்:' : 'Crop:'}
          </span>
          {['all', 'paddy', 'turmeric', 'coconut', 'banana', 'groundnut', 'cotton', 'vegetables'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCropFilter(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCropFilter === c
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c === 'all'
                ? (currentLang === 'ta' ? 'அனைத்தும்' : 'All')
                : c === 'vegetables'
                ? (currentLang === 'ta' ? 'காய்கறி' : 'Vegetables')
                : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Mandi List, Right Calculator & Action Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mandi Cards List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>
              {currentLang === 'ta' ? `${filteredPrices.length} சந்தை விவரங்கள் கிடைக்கின்றன` : `Showing ${filteredPrices.length} live markets`}
            </span>
            <span className="text-slate-400">
              {currentLang === 'ta' ? 'விலை விபரம்: ₹ / குவிண்டால்' : 'Prices: ₹ / Quintal (100 kg)'}
            </span>
          </div>

          <div className="space-y-3">
            {filteredPrices.map((item) => {
              const isSelected = selectedMandi.id === item.id;
              const isRising = item.priceTrend === 'rising';
              const isFalling = item.priceTrend === 'falling';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMandi(item)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/60 border-amber-500 ring-2 ring-amber-400/30 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm sm:text-base text-slate-900">
                          {currentLang === 'ta' ? item.cropNameTa : item.cropNameEn}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">
                          {currentLang === 'ta' ? item.varietyTa : item.varietyEn}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{currentLang === 'ta' ? item.mandiNameTa : item.mandiNameEn}</span>
                      </div>
                    </div>

                    {/* Price and trend */}
                    <div className="text-left sm:text-right">
                      <div className="text-base sm:text-xl font-black text-slate-900">
                        ₹{item.modalPricePerQuintal.toLocaleString()}
                        <span className="text-xs text-slate-500 font-normal"> / Qtl</span>
                      </div>
                      <div className="flex items-center gap-1 sm:justify-end text-xs font-semibold">
                        {isRising && (
                          <span className="text-emerald-700 flex items-center gap-0.5">
                            <TrendingUp className="w-3.5 h-3.5" /> +₹{item.dailyChangePerQuintal}
                          </span>
                        )}
                        {isFalling && (
                          <span className="text-red-600 flex items-center gap-0.5">
                            <TrendingDown className="w-3.5 h-3.5" /> -₹{Math.abs(item.dailyChangePerQuintal)}
                          </span>
                        )}
                        {!isRising && !isFalling && (
                          <span className="text-slate-500 flex items-center gap-0.5">
                            <Minus className="w-3.5 h-3.5" /> {currentLang === 'ta' ? 'மாற்றமில்லை' : 'Stable'}
                          </span>
                        )}
                        <span className="text-slate-400 text-[11px]"> (₹{item.pricePerKg}/kg)</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges / footer of the card */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                    <span className="text-[11px] text-slate-500">
                      {currentLang === 'ta' ? 'வரத்து:' : 'Arrivals:'} <strong>{item.arrivalsTonnes} Tonnes</strong>
                    </span>

                    <span className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                      item.urgency === 'sell_now'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.urgency === 'hold_stock'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.urgency === 'sell_now'
                        ? (currentLang === 'ta' ? 'விற்க உகந்தது' : 'Good Time to Sell')
                        : item.urgency === 'hold_stock'
                        ? (currentLang === 'ta' ? 'சேமித்து வைக்கலாம்' : 'Hold Stock for Higher Price')
                        : (currentLang === 'ta' ? 'நியாயமான விலை' : 'Fair Market Price')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Farm Sale Calculator & Directives (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Calculator className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {currentLang === 'ta' ? 'விளைச்சல் வருவாய் கணக்கீடு (Calculator)' : 'Farm Produce Revenue Estimator'}
              </h3>
            </div>

            {/* Selected item highlight */}
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
              <span className="text-[11px] text-amber-800 font-bold block uppercase tracking-wide">
                {currentLang === 'ta' ? 'தேர்வு செய்யப்பட்ட சந்தை & பயிர்:' : 'Selected Commodity:'}
              </span>
              <div className="font-black text-sm text-slate-900 mt-0.5">
                {currentLang === 'ta' ? selectedMandi.cropNameTa : selectedMandi.cropNameEn}
              </div>
              <div className="text-xs text-slate-600">
                {currentLang === 'ta' ? selectedMandi.mandiNameTa : selectedMandi.mandiNameEn}
              </div>
            </div>

            {/* Input harvest bags */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>{currentLang === 'ta' ? 'அறுவடை மூட்டைகள் எண்ணிக்கை (50 கிலோ மூட்டை):' : 'Harvest Bags (50 kg standard bag):'}</span>
                <span className="text-amber-700 font-black">{harvestWeightBags} மூட்டை ({quintalsTotal} Qtl)</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={harvestWeightBags}
                onChange={(e) => setHarvestWeightBags(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>{currentLang === 'ta' ? 'சந்தை விலை (ஒரு குவிண்டால்):' : 'Modal Mandi Rate (Per Qtl):'}</span>
                <span className="font-bold text-slate-900">₹{selectedMandi.modalPricePerQuintal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>{currentLang === 'ta' ? 'அரசு ஆதார விலை (MSP):' : 'Govt Support Price (MSP):'}</span>
                <span className="font-bold text-slate-700">₹{selectedMandi.govMspPerQuintal.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="font-bold text-slate-900">{currentLang === 'ta' ? 'எதிர்பார்க்கப்படும் மொத்த வருவாய்:' : 'Estimated Farm Revenue:'}</span>
                <span className="text-base sm:text-lg font-black text-emerald-700">₹{estimatedRevenue.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span>{currentLang === 'ta' ? 'ஆதார விலையை விட நிகர வித்தியாசம்:' : 'Variance vs Govt MSP:'}</span>
                <span className={`font-bold ${deltaVsMsp >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {deltaVsMsp >= 0 ? `+₹${deltaVsMsp.toLocaleString()} மேலானது` : `-₹${Math.abs(deltaVsMsp).toLocaleString()} குறைவு`}
                </span>
              </div>
            </div>

            {/* AI Action Advice */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{currentLang === 'ta' ? 'விற்பனை ஆலோசனை (Action Advice)' : 'Market Action Directive'}</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                {currentLang === 'ta' ? selectedMandi.actionAdviceTa : selectedMandi.actionAdviceEn}
              </p>
            </div>

            {/* Kisan Call Center info */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Store className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold block">
                  {currentLang === 'ta' ? 'அருகிலுள்ள உழவர் சந்தை வழிகாட்டல்:' : 'Direct Uzhavar Sandhai Help:'}
                </span>
                <span className="text-[11px] text-amber-800">
                  {currentLang === 'ta'
                    ? 'விவசாய அட்டை (Farmer ID) உள்ளவர்கள் கட்டணமின்றி உழவர் சந்தையில் கடை வைக்கலாம். உதவி எண்: 1800-180-1551.'
                    : 'Farmers with Uzhavar ID cards can register for zero-commission stalls. Call Kisan Helpline: 1800-180-1551.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
