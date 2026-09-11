import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Droplets,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
  Award,
  AlertCircle,
  HelpCircle,
  Clock,
  Waves,
  Volume2,
  VolumeX
} from 'lucide-react';
import { DistrictData, FarmerProfile, WeatherDay, BlockData } from './types';
import { ALL_38_DISTRICTS, getDistrictById } from './data/tamilNaduData';
import { CROPS_DATA, SOILS_DATA, IRRIGATION_METHODS } from './data/cropsAndSoils';
import {
  generateDistrictWeather,
  calculateIrrigationRecommendation,
  generateWhatIfScenarios,
  generateWaterBudget
} from './utils/aiIrrigationEngine';
import { Language, TRANSLATIONS } from './utils/tamilTranslations';
import { speakAdvisory } from './utils/voiceSynthesis';

// Components
import { Navbar } from './components/Navbar';
import { DailyRecommendationCard } from './components/DailyRecommendationCard';
import { GroundwaterAlertBadge } from './components/GroundwaterAlertBadge';
import { WeatherSoilCard } from './components/WeatherSoilCard';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { WaterBudgetCard } from './components/WaterBudgetCard';
import { TamilNaduMap } from './components/TamilNaduMap';
import { CommunityDashboard } from './components/CommunityDashboard';
import { WeeklyFarmerReport } from './components/WeeklyFarmerReport';
import { FarmerProfileForm } from './components/FarmerProfileForm';
import { WaterSavingsTracker } from './components/WaterSavingsTracker';
import { CropHealthAlert } from './components/CropHealthAlert';
import { TamilFarmerInterface } from './components/TamilFarmerInterface';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('daily');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState<boolean>(false);
  const [currentScenario, setCurrentScenario] = useState<'normal' | 'rainy' | 'drought'>('normal');

  // Active Selected District (Supports all 38 districts of Tamil Nadu)
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(() => ALL_38_DISTRICTS[0]);

  // Farmer Profile State
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>({
    id: 'TN-FARM-9021',
    farmerName: 'K. Rangarajan',
    phone: '+91 94432 18920',
    districtId: 'coimbatore',
    blockId: 'pollachi_north',
    villageName: 'Anaimalai Village',
    pincode: '642104',
    farmSizeAcres: 2.5,
    cropId: 'coconut',
    sowingDate: '2025-06-15',
    soilTypeId: 'red_loam',
    irrigationMethodId: 'drip',
    pumpHorsePower: 5,
    pumpFlowRateLpm: 750,
    currentSoilMoisturePercent: 42,
    lastIrrigatedDaysAgo: 3
  });

  const [spokenAdvisoryText, setSpokenAdvisoryText] = useState<string>('');
  const stopVoiceRef = useRef<(() => void) | null>(null);

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
      }
    };
  }, []);

  // Active Block
  const activeBlock = useMemo<BlockData | undefined>(() => {
    return selectedDistrict.blocks.find(b => b.id === farmerProfile.blockId) || selectedDistrict.blocks[0];
  }, [selectedDistrict, farmerProfile.blockId]);

  // Dynamic Weather Forecast for Selected District
  const weatherForecast = useMemo<WeatherDay[]>(() => {
    return generateDistrictWeather(selectedDistrict, currentScenario);
  }, [selectedDistrict, currentScenario]);

  // AI Irrigation Recommendation
  const recommendation = useMemo(() => {
    return calculateIrrigationRecommendation(farmerProfile, selectedDistrict, weatherForecast);
  }, [farmerProfile, selectedDistrict, weatherForecast]);

  // What-If Scenarios
  const whatIfScenarios = useMemo(() => {
    return generateWhatIfScenarios(recommendation, farmerProfile, weatherForecast);
  }, [recommendation, farmerProfile, weatherForecast]);

  // Personalized Water Budget
  const waterBudget = useMemo(() => {
    return generateWaterBudget(recommendation, farmerProfile);
  }, [recommendation, farmerProfile]);

  // Audio Voice Synthesis
  const handlePlayVoice = () => {
    if (isVoicePlaying) {
      if (stopVoiceRef.current) stopVoiceRef.current();
      setIsVoicePlaying(false);
      return;
    }

    const crop = CROPS_DATA.find(c => c.id === farmerProfile.cropId) || CROPS_DATA[0];

    let spokenText = '';
    if (currentLang === 'ta') {
      spokenText = `வணக்கம் உழவரே. உங்கள் ${selectedDistrict.nameTa} பகுதியில் உள்ள பண்ணைக்கான இன்றைய AI பாசன வழிகாட்டல்: ${recommendation.headlineTa}. ஏக்கருக்கு தேவையான நீர்: ${recommendation.litresPerAcre} லிட்டர். மொத்த பண்ணைக்கு: ${recommendation.totalFarmLitres} லிட்டர். ஐந்து குதிரைத்திறன் மோட்டார் இயக்க வேண்டிய நேரம்: ${recommendation.pumpingTimeHours} மணி நேரம். நிலத்தடி நீர் நிலை: ${selectedDistrict.status === 'critical' ? 'கடுமையான வறட்சி' : selectedDistrict.status === 'moderate' ? 'மிதமான அழுத்தம்' : 'இயல்பு நிலை'}. நன்றி.`;
    } else {
      spokenText = `Hello Farmer. Today's AI smart irrigation recommendation for your ${crop.nameEn} in ${selectedDistrict.nameEn} district is: ${recommendation.headlineEn}. Recommended volume is ${recommendation.litresPerAcre} Litres per acre, totaling ${recommendation.totalFarmLitres} Litres for your farm. Recommended pump run time is ${recommendation.pumpingTimeHours} hours. Local groundwater condition in your block is ${selectedDistrict.status} stress.`;
    }

    setSpokenAdvisoryText(spokenText);
    const cancelFn = speakAdvisory(
      spokenText,
      currentLang,
      () => setIsVoicePlaying(true),
      () => setIsVoicePlaying(false),
      () => setIsVoicePlaying(false)
    );
    stopVoiceRef.current = cancelFn;
  };

  // Quick Preset Scenarios for College Demo (35-mark project evaluation)
  const handleApplyPreset = (presetKey: 'delta' | 'western' | 'nilgiris_rain' | 'salem_drought') => {
    if (presetKey === 'delta') {
      const dist = getDistrictById('thanjavur');
      setSelectedDistrict(dist);
      setFarmerProfile(prev => ({
        ...prev,
        districtId: 'thanjavur',
        blockId: 'kumbakonam',
        villageName: 'Thiruvidaimarudur',
        pincode: '612104',
        farmSizeAcres: 3.0,
        cropId: 'paddy',
        soilTypeId: 'alluvial',
        irrigationMethodId: 'drip',
        currentSoilMoisturePercent: 62,
        lastIrrigatedDaysAgo: 1
      }));
      setCurrentScenario('normal');
    } else if (presetKey === 'western') {
      const dist = getDistrictById('coimbatore');
      setSelectedDistrict(dist);
      setFarmerProfile(prev => ({
        ...prev,
        districtId: 'coimbatore',
        blockId: 'pollachi_north',
        villageName: 'Anaimalai',
        pincode: '642104',
        farmSizeAcres: 4.0,
        cropId: 'coconut',
        soilTypeId: 'red_loam',
        irrigationMethodId: 'drip',
        currentSoilMoisturePercent: 38,
        lastIrrigatedDaysAgo: 4
      }));
      setCurrentScenario('normal');
    } else if (presetKey === 'nilgiris_rain') {
      const dist = getDistrictById('nilgiris');
      setSelectedDistrict(dist);
      setFarmerProfile(prev => ({
        ...prev,
        districtId: 'nilgiris',
        blockId: 'udhagamandalam',
        villageName: 'Nanjanad',
        pincode: '643004',
        farmSizeAcres: 2.0,
        cropId: 'tomato',
        soilTypeId: 'laterite',
        irrigationMethodId: 'sprinkler',
        currentSoilMoisturePercent: 78,
        lastIrrigatedDaysAgo: 1
      }));
      setCurrentScenario('rainy');
    } else if (presetKey === 'salem_drought') {
      const dist = getDistrictById('salem');
      setSelectedDistrict(dist);
      setFarmerProfile(prev => ({
        ...prev,
        districtId: 'salem',
        blockId: 'attur',
        villageName: 'Thalaivasal',
        pincode: '636112',
        farmSizeAcres: 2.5,
        cropId: 'turmeric',
        soilTypeId: 'red_loam',
        irrigationMethodId: 'drip',
        currentSoilMoisturePercent: 28,
        lastIrrigatedDaysAgo: 5
      }));
      setCurrentScenario('drought');
    }

    setIsSettingsOpen(false);
  };

  const handleDistrictSelectFromMap = (dist: DistrictData) => {
    setSelectedDistrict(dist);
    const firstBlock = dist.blocks[0];
    setFarmerProfile(prev => ({
      ...prev,
      districtId: dist.id,
      blockId: firstBlock?.id || '',
      villageName: firstBlock?.villages[0] || 'Agri Village'
    }));
    setActiveTab('daily');
  };

  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans">
      {/* Top App Header & Tabs */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={() => setCurrentLang(l => (l === 'en' ? 'ta' : 'en'))}
        selectedDistrict={selectedDistrict}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onPlayVoice={handlePlayVoice}
        isVoicePlaying={isVoicePlaying}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onQuickScenarioChange={setCurrentScenario}
        currentScenario={currentScenario}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 space-y-6">
        {/* District Groundwater Stress Banner (Always visible differentiator) */}
        <GroundwaterAlertBadge
          district={selectedDistrict}
          block={activeBlock}
          currentLang={currentLang}
          onExploreMap={() => setActiveTab('map')}
        />

        {/* Tab 1: Today's Daily Advisory */}
        {activeTab === 'daily' && (
          <div className="space-y-6">
            {/* Quick Switch Banner to Simple Tamil Mode */}
            <div className="bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl p-3 sm:p-4 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌾</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    {currentLang === 'ta'
                      ? 'எளிய தமிழ் உழவர் பயன்முறை (வரைபடங்கள் அற்ற நேரடி முறை)'
                      : 'Tamil Farmer Mode — Simple Direct Recommendations (No Complicated Graphs)'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    {currentLang === 'ta'
                      ? 'சிக்கலான வரைபடங்கள் இன்றி எளிய நேரடி பாசன முடிவு, மழை முன்னறிவிப்பு மற்றும் மோட்டார் நேரத்தை காண்க.'
                      : 'Clear direct action (irrigate now / wait / minutes), groundwater risk score, and rain forecast in farmer-friendly Tamil.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (currentLang !== 'ta') setCurrentLang('ta');
                  setActiveTab('tamil_farmer');
                }}
                className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-sm whitespace-nowrap"
              >
                {currentLang === 'ta' ? 'எளிய முறைக்கு மாறுக →' : 'Switch to Farmer Mode →'}
              </button>
            </div>

            {/* Primary Recommendation Card */}
            <DailyRecommendationCard
              rec={recommendation}
              farmer={farmerProfile}
              district={selectedDistrict}
              currentLang={currentLang}
              onPlayVoice={handlePlayVoice}
              isVoicePlaying={isVoicePlaying}
            />

            {/* AI Crop Health Alert: Weather-Driven Disease & Pest Early Warning */}
            <CropHealthAlert
              farmer={farmerProfile}
              weatherToday={weatherForecast[0]}
              forecast={weatherForecast}
              district={selectedDistrict}
              currentLang={currentLang}
            />

            {/* Weather & Soil Moisture */}
            <WeatherSoilCard
              forecast={weatherForecast}
              farmer={farmerProfile}
              currentLang={currentLang}
            />

            {/* Quick Water Budget Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WaterBudgetCard
                budget={waterBudget}
                currentLang={currentLang}
              />
              <WaterSavingsTracker
                budget={waterBudget}
                farmer={farmerProfile}
                currentLang={currentLang}
              />
            </div>
          </div>
        )}

        {/* Tab 1B: Pure Tamil Farmer-Friendly Interface (No Complicated Graphs) */}
        {activeTab === 'tamil_farmer' && (
          <TamilFarmerInterface
            rec={recommendation}
            farmer={farmerProfile}
            district={selectedDistrict}
            weatherToday={weatherForecast[0]}
            onPlayVoice={handlePlayVoice}
            isVoicePlaying={isVoicePlaying}
            onSwitchToDetailedView={() => setActiveTab('daily')}
          />
        )}

        {/* Tab 2: Tamil Nadu Groundwater Map (All 38 Districts) */}
        {activeTab === 'map' && (
          <TamilNaduMap
            currentLang={currentLang}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={handleDistrictSelectFromMap}
          />
        )}

        {/* Tab 3: What-If Decision Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <WhatIfSimulator
              scenarios={whatIfScenarios}
              currentLang={currentLang}
            />
            {/* Contextual Weather and Soil */}
            <WeatherSoilCard
              forecast={weatherForecast}
              farmer={farmerProfile}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* Tab 4: Water Budget & Historical Savings */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <WaterBudgetCard
              budget={waterBudget}
              currentLang={currentLang}
            />
            <WaterSavingsTracker
              budget={waterBudget}
              farmer={farmerProfile}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* Tab 5: District & Block Community Analytics */}
        {activeTab === 'community' && (
          <CommunityDashboard
            district={selectedDistrict}
            block={activeBlock}
            farmer={farmerProfile}
            currentLang={currentLang}
          />
        )}

        {/* Tab 6: Official Printable Weekly Farmer Report */}
        {activeTab === 'report' && (
          <WeeklyFarmerReport
            farmer={farmerProfile}
            district={selectedDistrict}
            block={activeBlock}
            rec={recommendation}
            budget={waterBudget}
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Settings / Farmer Profile Modal */}
      {isSettingsOpen && (
        <FarmerProfileForm
          farmer={farmerProfile}
          selectedDistrict={selectedDistrict}
          onSaveProfile={(updatedFarmer, updatedDistrict) => {
            setFarmerProfile(updatedFarmer);
            setSelectedDistrict(updatedDistrict);
            setIsSettingsOpen(false);
          }}
          onClose={() => setIsSettingsOpen(false)}
          currentLang={currentLang}
          onApplyPreset={handleApplyPreset}
        />
      )}

      {/* Floating Live Voice Advisory / Telemetry Readout */}
      {isVoicePlaying && (
        <div className="fixed bottom-5 right-5 left-5 sm:left-auto sm:w-[420px] z-50 bg-slate-950/95 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/40 backdrop-blur-md transition-all">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                {currentLang === 'ta' ? 'நேரலை குரல் வழிகாட்டல்' : 'Live Audio Bulletin'}
              </span>
            </div>
            <button
              onClick={() => {
                if (stopVoiceRef.current) stopVoiceRef.current();
                setIsVoicePlaying(false);
              }}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Stop audio playback"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed font-sans">
            {spokenAdvisoryText}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse rounded-full"></span>
              <span className="inline-block w-1.5 h-4 bg-emerald-400 animate-pulse delay-75 rounded-full"></span>
              <span className="inline-block w-1.5 h-2 bg-emerald-400 animate-pulse delay-150 rounded-full"></span>
              <span className="ml-1 text-slate-300">
                {currentLang === 'ta' ? 'ஒலிபெருக்கி இயங்குகிறது' : 'Broadcasting recommendation'}
              </span>
            </div>
            <button
              onClick={() => {
                if (stopVoiceRef.current) stopVoiceRef.current();
                setIsVoicePlaying(false);
              }}
              className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg font-medium text-[11px] transition-colors"
            >
              {currentLang === 'ta' ? 'நிறுத்து' : 'Stop'}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              TN
            </div>
            <span>
              {currentLang === 'ta'
                ? 'தமிழ்நாடு ஸ்மார்ட் நீர்ப்பாசனம் மற்றும் நிலத்தடி நீர் AI மேலாண்மை அமைப்பு'
                : 'Tamil Nadu Smart Irrigation & Groundwater AI Decision Support System'}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span>38 Districts Supported</span>
            <span>•</span>
            <span>FAO CROPWAT & TNAU Grounded</span>
            <span>•</span>
            <span>SG&SWRDC Aquifer Status</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
