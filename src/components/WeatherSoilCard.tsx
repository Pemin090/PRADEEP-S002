import React from 'react';
import {
  CloudRain,
  Sun,
  CloudSun,
  Droplet,
  Wind,
  Thermometer,
  Layers,
  Radio
} from 'lucide-react';
import { WeatherDay, FarmerProfile } from '../types';
import { Language, TRANSLATIONS } from '../utils/tamilTranslations';
import { SOILS_DATA } from '../data/cropsAndSoils';

interface WeatherSoilCardProps {
  forecast: WeatherDay[];
  farmer: FarmerProfile;
  currentLang: Language;
}

export const WeatherSoilCard: React.FC<WeatherSoilCardProps> = ({
  forecast,
  farmer,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];
  const soil = SOILS_DATA.find(s => s.id === farmer.soilTypeId) || SOILS_DATA[0];
  const today = forecast[0];

  // Soil moisture estimation
  const soilMoisture = farmer.currentSoilMoisturePercent !== undefined ? farmer.currentSoilMoisturePercent : 58;

  let moistureStatusText = t.soilMoistureOptimal;
  let moistureColor = 'text-emerald-700 bg-emerald-100 border-emerald-300';
  let moistureBarColor = 'bg-emerald-500';

  if (soilMoisture < 35) {
    moistureStatusText = t.soilMoistureDeficit;
    moistureColor = 'text-amber-700 bg-amber-100 border-amber-300';
    moistureBarColor = 'bg-amber-500';
  } else if (soilMoisture > 80) {
    moistureStatusText = t.soilMoistureSaturated;
    moistureColor = 'text-blue-700 bg-blue-100 border-blue-300';
    moistureBarColor = 'bg-blue-500';
  }

  const getWeatherIcon = (condition: WeatherDay['condition']) => {
    switch (condition) {
      case 'heavy_rain':
      case 'rainy':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'partly_cloudy':
      case 'cloudy':
        return <CloudSun className="w-5 h-5 text-amber-500" />;
      default:
        return <Sun className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            {t.weatherSoilTitle}
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            IMD / Open-Meteo & NASA SMAP Feeds
          </span>
        </div>
      </div>

      {/* Soil Moisture Gauge & Soil Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Soil Moisture Progress */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.soilMoistureStatus}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${moistureColor}`}>
              {moistureStatusText}
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {soilMoisture}%
            </span>
            <span className="text-xs text-slate-500">
              {currentLang === 'ta' ? 'ஈரப்பதம் இருப்பு' : 'Root Zone Moisture'}
            </span>
          </div>

          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${moistureBarColor}`}
              style={{ width: `${Math.min(100, Math.max(5, soilMoisture))}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 mt-1">
            <span>0% (Wilting)</span>
            <span className="font-semibold text-slate-700">40-70% (Optimal)</span>
            <span>100% (Field Cap)</span>
          </div>
        </div>

        {/* Soil Characteristics */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                {currentLang === 'ta' ? 'மண் பண்புகள் (ICAR / TNAU)' : 'Soil Properties'}
              </span>
              <span className="text-xs font-bold text-slate-700">
                {currentLang === 'ta' ? soil.nameTa.split('(')[0] : soil.nameEn.split('(')[0]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="bg-white p-2 rounded border border-slate-200">
                <p className="text-slate-400">{currentLang === 'ta' ? 'நீர் தாங்கும் திறன்' : 'Water Capacity'}</p>
                <p className="font-bold text-slate-800 mt-0.5">{soil.availableWaterCapacityMmPerM} mm/m</p>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <p className="text-slate-400">{currentLang === 'ta' ? 'ஊடுருவல் வேகம்' : 'Infiltration'}</p>
                <p className="font-bold text-slate-800 mt-0.5">{soil.infiltrationRateMmPerHour} mm/hr</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>{currentLang === 'ta' ? 'வடிகால்:' : 'Drainage:'} <strong>{soil.drainageRate}</strong></span>
            <span>{t.evapoTranspiration}: <strong>{today.et0Mm} mm/day</strong></span>
          </div>
        </div>
      </div>

      {/* 7-Day Agronomic Forecast Carousel / Grid */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          {t.forecast7Days}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {forecast.map((day, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition-all ${
                idx === 0
                  ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60'
              }`}
            >
              <p className="text-xs font-bold text-slate-700">
                {day.dayName}
              </p>
              <p className="text-[10px] text-slate-400">
                {day.date.slice(5)}
              </p>

              <div className="my-2 flex justify-center">
                {getWeatherIcon(day.condition)}
              </div>

              <div className="text-xs font-extrabold text-slate-900">
                {Math.round(day.tempMaxC)}°
                <span className="text-[10px] font-normal text-slate-400 ml-1">
                  {Math.round(day.tempMinC)}°
                </span>
              </div>

              {/* Rain chance badge */}
              <div className="mt-1.5 flex items-center justify-center space-x-1 text-[10px]">
                <CloudRain className="w-3 h-3 text-blue-500" />
                <span className={`font-semibold ${day.rainProbabilityPercent > 50 ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                  {day.rainProbabilityPercent}%
                </span>
              </div>

              {day.rainfallMm > 0 && (
                <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
                  {day.rainfallMm} mm
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
