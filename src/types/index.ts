export type GroundwaterStressLevel = 'normal' | 'moderate' | 'critical';

export interface DistrictData {
  id: string;
  nameEn: string;
  nameTa: string;
  zone: string;
  zoneTa: string;
  status: GroundwaterStressLevel;
  waterTableMbgl: number; // metres below ground level
  extractionRate: number; // percentage e.g. 88%
  trend: 'declining' | 'stable' | 'improving';
  annualRainfallMm: number;
  blocks: BlockData[];
  majorCropsEn: string[];
  majorCropsTa: string[];
  soilTypes: string[];
  lat: number;
  lng: number;
}

export interface BlockData {
  id: string;
  nameEn: string;
  nameTa: string;
  status: GroundwaterStressLevel;
  waterTableMbgl: number;
  villages: string[];
  participatingFarmers: number;
  communityWaterSavedLakhL: number;
}

export interface CropInfo {
  id: string;
  nameEn: string;
  nameTa: string;
  totalDurationDays: number;
  stages: {
    nameEn: string;
    nameTa: string;
    startDay: number;
    endDay: number;
    kc: number; // Crop coefficient
    waterSensitivity: 'high' | 'medium' | 'low';
  }[];
  waterRequirementMmPerSeason: number;
  suitableSoils: string[];
  criticalStagesEn: string[];
  criticalStagesTa: string[];
}

export interface SoilInfo {
  id: string;
  nameEn: string;
  nameTa: string;
  availableWaterCapacityMmPerM: number; // mm of water per metre of root zone
  infiltrationRateMmPerHour: number;
  drainageRate: 'rapid' | 'moderate' | 'slow';
}

export interface IrrigationMethod {
  id: string;
  nameEn: string;
  nameTa: string;
  efficiency: number; // 0.0 to 1.0 (e.g. Drip = 0.90, Sprinkler = 0.75, Flood = 0.50)
  waterSavingPotentialPercent: number;
}

export interface FarmerProfile {
  id: string;
  farmerName: string;
  phone: string;
  districtId: string;
  blockId: string;
  villageName: string;
  pincode: string;
  farmSizeAcres: number;
  cropId: string;
  sowingDate: string; // YYYY-MM-DD
  soilTypeId: string;
  irrigationMethodId: string;
  pumpHorsePower: number;
  pumpFlowRateLpm: number; // Litres per minute
  currentSoilMoisturePercent?: number;
  lastIrrigatedDaysAgo: number;
}

export interface WeatherDay {
  date: string;
  dayName: string;
  tempMaxC: number;
  tempMinC: number;
  humidityPercent: number;
  rainfallMm: number;
  rainProbabilityPercent: number;
  windSpeedKmh: number;
  condition: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'heavy_rain';
  et0Mm: number; // Reference evapotranspiration
}

export type RecommendationType = 'irrigate_today' | 'skip_irrigation' | 'delay_irrigation' | 'reduce_water';

export type GroundwaterRiskCategory = 'safe' | 'warning' | 'critical';

export interface GroundwaterRiskAssessment {
  score: number; // 0 to 100
  category: GroundwaterRiskCategory;
  labelEn: 'Safe' | 'Warning' | 'Critical';
  labelTa: 'பாதுகாப்பானது' | 'எச்சரிக்கை' | 'ஆபத்தான நிலை';
  waterTableMbgl: number;
  extractionRatePercent: number;
  trend: 'declining' | 'stable' | 'improving';
  statusDescriptionEn: string;
  statusDescriptionTa: string;
  safePumpingLimitHours: number;
  conservationRecommendationEn: string;
  conservationRecommendationTa: string;
}

export type ActionDirective = 'irrigate_now' | 'wait' | 'timed_irrigate';

export type WaterStressLevel = 'low' | 'moderate' | 'high';

export interface AIWaterStressScore {
  score: number; // e.g. 72 out of 100
  level: WaterStressLevel; // 'low' | 'moderate' | 'high'
  labelEn: string; // e.g. "High Stress", "Moderate Stress", "Low Stress"
  labelTa: string; // e.g. "அதிக நீர் அழுத்தம்", "மிதமான அழுத்தம்", "குறைந்த அழுத்தம்"
  badgeColor: string;
  reasonsEn: string[];
  reasonsTa: string[];
  metrics: {
    soilMoisturePercent: number;
    rainfallProbNext48h: number;
    cropStageNameEn: string;
    cropStageNameTa: string;
    cropSensitivity: 'high' | 'medium' | 'low';
    groundwaterRiskScore: number;
    groundwaterCategory: GroundwaterRiskCategory;
    et0MmPerDay: number;
  };
}

export interface ConfidenceCheckItem {
  id: string;
  nameEn: string;
  nameTa: string;
  status: 'verified' | 'estimated' | 'unavailable';
  detailEn: string;
  detailTa: string;
  weightPercent: number;
}

export interface AIConfidenceBreakdown {
  score: number; // e.g. 87%
  level: 'high' | 'moderate' | 'fair';
  labelEn: string;
  labelTa: string;
  checklist: ConfidenceCheckItem[];
  transparencyNoteEn: string;
  transparencyNoteTa: string;
  hasSoilSensorConnected: boolean;
}

export interface GroundwaterSafeModeData {
  isActive: boolean;
  isAutoEngaged: boolean;
  groundwaterStatus: GroundwaterStressLevel;
  groundwaterStatusLabelEn: string;
  groundwaterStatusLabelTa: string;
  recommendationTitleEn: string;
  recommendationTitleTa: string;
  expectedSavingsLitres: number;
  expectedPowerSavedKwh: number;
  reasonEn: string;
  reasonTa: string;
  cropSafetyGuaranteed: boolean;
  waterReductionPercent: number;
}

export interface IrrigationRecommendation {
  type: RecommendationType;
  headlineEn: string;
  headlineTa: string;
  badgeColor: string;
  litresPerAcre: number;
  totalFarmLitres: number;
  pumpingTimeHours: number;
  pumpingTimeMinutes: number;
  actionDirective: ActionDirective;
  actionLabelEn: string;
  actionLabelTa: string;
  irrigateForMinutesTextEn: string;
  irrigateForMinutesTextTa: string;
  formattedDurationEn: string;
  formattedDurationTa: string;
  isRainAvoidanceActive: boolean;
  rainPrediction: {
    isSignificantRainExpected: boolean;
    expectedRainfallMm: number;
    rainProbabilityPercent: number;
    timeframeEn: string;
    timeframeTa: string;
    avoidIrrigationAlertEn: string;
    avoidIrrigationAlertTa: string;
    waterSavedLitres: number;
    electricitySavedUnitsKwh: number;
  };
  groundwaterRisk: GroundwaterRiskAssessment;
  aiWaterStress: AIWaterStressScore;
  aiConfidence: AIConfidenceBreakdown;
  groundwaterSafeMode: GroundwaterSafeModeData;
  recommendedDate: string;
  nextCheckDate: string;
  cropGrowthStageEn: string;
  cropGrowthStageTa: string;
  cropAgeDays: number;
  reasonsEn: string[];
  reasonsTa: string[];
  aiModelType: string;
  mlConfidenceScore: number;
  waterStressIndex: number; // 0 to 100
  groundwaterPenaltyApplied: boolean;
  savingsVsFloodLitres: number;
  isSimulatedData: boolean;
}

export interface WaterBudget {
  weeklyRecommendedL: number;
  weeklyUsedL: number;
  weeklyRemainingL: number;
  estimatedWeeklySavingsL: number;
  cumulativeSavedSeasonL: number;
  dailyUsageHistory: {
    date: string;
    usedL: number;
    recommendedL: number;
    savedL: number;
  }[];
}

export interface WhatIfScenario {
  id: string;
  titleEn: string;
  titleTa: string;
  timingEn: string;
  timingTa: string;
  waterAmountL: number;
  waterSavedVsBaseL: number;
  cropStressRisk: 'low' | 'moderate' | 'high';
  groundwaterImpact: 'protective' | 'neutral' | 'adverse';
  explanationEn: string;
  explanationTa: string;
}

export type DiseaseRiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface CropDiseaseThreat {
  id: string;
  nameEn: string;
  nameTa: string;
  scientificName?: string;
  category: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'physiological';
  riskLevel: DiseaseRiskLevel;
  riskScore: number; // 0 to 100
  weatherTriggerEn: string;
  weatherTriggerTa: string;
  symptomsEn: string[];
  symptomsTa: string[];
  preventiveMeasuresEn: string[];
  preventiveMeasuresTa: string[];
  ipmOrganicControlsEn: string[];
  ipmOrganicControlsTa: string[];
  chemicalControlsEn: string[];
  chemicalControlsTa: string[];
  irrigationGuidanceEn: string;
  irrigationGuidanceTa: string;
}

export interface CropHealthAnalysis {
  cropId: string;
  cropNameEn: string;
  cropNameTa: string;
  overallRiskLevel: DiseaseRiskLevel;
  overallRiskScore: number; // 0 to 100
  dominantThreat: CropDiseaseThreat;
  allThreats: CropDiseaseThreat[];
  weatherFactors: {
    tempC: number;
    humidityPercent: number;
    rainfallMm: number;
    rainProbabilityPercent: number;
    windSpeedKmh: number;
    riskSummaryEn: string;
    riskSummaryTa: string;
  };
  proactiveTipsEn: string[];
  proactiveTipsTa: string[];
  aiModelConfidence: number; // e.g. 0.92
  aiDiagnosisNoteEn: string;
  aiDiagnosisNoteTa: string;
}

