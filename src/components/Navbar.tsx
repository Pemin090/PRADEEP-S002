import React from 'react';
import {
  Droplets,
  Languages,
  Volume2,
  MapPin,
  Sparkles,
  Sliders
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { DistrictData } from '../types';

interface NavbarProps {
  currentLang: Language;
  onToggleLang: () => void;
  selectedDistrict: DistrictData;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  onPlayVoice: () => void;
  isVoicePlaying: boolean;
  onOpenSettings: () => void;
  onQuickScenarioChange: (scenario: 'normal' | 'rainy' | 'drought') => void;
  currentScenario: 'normal' | 'rainy' | 'drought';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  selectedDistrict,
  activeTab,
  onChangeTab,
  onPlayVoice,
  isVoicePlaying,
  onOpenSettings,
  onQuickScenarioChange,
  currentScenario
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="bg-slate-900 text-white border-b border-emerald-800/40 sticky top-0 z-40 shadow-lg">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onChangeTab('daily')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-bold">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                {currentLang === 'ta' ? 'தமிழக உழவர் நீர் AI' : 'TN Agri-Jal AI'}
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  {currentLang === 'ta' ? '38 மாவட்டங்கள்' : 'All 38 Districts'}
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-300 hidden sm:block">
              {currentLang === 'ta' ? t.tagline : 'Smart Irrigation & Groundwater Advisory System'}
            </p>
          </div>
        </div>

        {/* Location badge & Action tools */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Quick Scenario Tester for College Demo */}
          <div className="hidden lg:flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700 text-xs">
            <span className="px-2 text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Demo:
            </span>
            <button
              onClick={() => onQuickScenarioChange('normal')}
              className={`px-2 py-1 rounded transition-colors ${
                currentScenario === 'normal' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
              title="Standard climate simulation"
            >
              Regular
            </button>
            <button
              onClick={() => onQuickScenarioChange('rainy')}
              className={`px-2 py-1 rounded transition-colors ${
                currentScenario === 'rainy' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
              title="Simulate Monsoon rain surge"
            >
              Rain Alert
            </button>
            <button
              onClick={() => onQuickScenarioChange('drought')}
              className={`px-2 py-1 rounded transition-colors ${
                currentScenario === 'drought' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
              title="Simulate summer peak drought"
            >
              Drought
            </button>
          </div>

          {/* Current District Chip */}
          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-xs sm:text-sm text-emerald-200 hover:bg-emerald-900/60 transition"
            title="Click to change location or farm details"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">
              {currentLang === 'ta' ? selectedDistrict.nameTa : selectedDistrict.nameEn}
            </span>
            <span className={`w-2 h-2 rounded-full ${
              selectedDistrict.status === 'normal' ? 'bg-emerald-400' :
              selectedDistrict.status === 'moderate' ? 'bg-amber-400' : 'bg-red-400 animate-pulse'
            }`} />
          </button>

          {/* Audio Voice Playback */}
          <button
            onClick={onPlayVoice}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              isVoicePlaying
                ? 'bg-amber-500 text-slate-900 shadow-md animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title={currentLang === 'ta' ? 'பரிந்துரையை தமிழில் கேட்க' : 'Listen to advisory in voice'}
          >
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">
              {isVoicePlaying ? (currentLang === 'ta' ? 'ஒலிக்கிறது...' : 'Playing...') : (currentLang === 'ta' ? 'குரல்' : 'Voice')}
            </span>
          </button>

          {/* Bilingual Switcher: English / தமிழ் */}
          <button
            onClick={onToggleLang}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition"
            title="Switch Language / மொழியை மாற்ற"
          >
            <Languages className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Farm Setup Settings */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Settings & Farm Configuration"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="border-t border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex space-x-1 sm:space-x-2 py-1.5">
          <button
            onClick={() => onChangeTab('daily')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'daily'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            💧 {t.navDaily}
          </button>

          <button
            onClick={() => {
              if (currentLang !== 'ta') onToggleLang();
              onChangeTab('tamil_farmer');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              activeTab === 'tamil_farmer'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm font-black'
                : 'bg-emerald-950/70 text-emerald-300 border-emerald-600/40 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            🌾 {t.navTamilFarmer}
          </button>

          <button
            onClick={() => onChangeTab('map')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'map'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            🗺️ {t.navMap}
          </button>

          <button
            onClick={() => onChangeTab('simulator')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'simulator'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            🔮 {t.navSimulator}
          </button>

          <button
            onClick={() => onChangeTab('budget')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'budget'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            📊 {t.navWaterBudget}
          </button>

          <button
            onClick={() => onChangeTab('community')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'community'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            🏛️ {t.navCommunity}
          </button>

          <button
            onClick={() => onChangeTab('report')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'report'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            📄 {t.navWeeklyReport}
          </button>
        </div>
      </nav>
    </header>
  );
};
