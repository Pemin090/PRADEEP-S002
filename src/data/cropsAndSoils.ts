import { CropInfo, SoilInfo, IrrigationMethod } from '../types';

export const CROPS_DATA: CropInfo[] = [
  {
    id: 'paddy',
    nameEn: 'Paddy (Rice / நெல்)',
    nameTa: 'நெல் (Paddy)',
    totalDurationDays: 120,
    waterRequirementMmPerSeason: 1250,
    suitableSoils: ['alluvial', 'clay_loam', 'black_cotton'],
    criticalStagesEn: ['Tillering', 'Panicle Initiation', 'Flowering', 'Milk stage'],
    criticalStagesTa: ['தூர்கட்டும் பருவம்', 'கதிர் உருவாகும் பருவம்', 'பூக்கும் பருவம்', 'பால் பிடிக்கும் பருவம்'],
    stages: [
      { nameEn: 'Nursery & Initial Vegetative', nameTa: 'நாற்றங்கால் & ஆரம்ப வளர்ச்சி', startDay: 1, endDay: 30, kc: 1.05, waterSensitivity: 'medium' },
      { nameEn: 'Tillering & Stem Elongation', nameTa: 'தூர்கட்டுதல் & தண்டு நீளுதல்', startDay: 31, endDay: 60, kc: 1.15, waterSensitivity: 'high' },
      { nameEn: 'Panicle & Flowering (Peak)', nameTa: 'கதிர் உருவாக்கம் & பூத்தல் (உச்ச தேவை)', startDay: 61, endDay: 90, kc: 1.25, waterSensitivity: 'high' },
      { nameEn: 'Grain Filling & Maturity', nameTa: 'பால் பருவம் & முதிர்ச்சி', startDay: 91, endDay: 120, kc: 0.90, waterSensitivity: 'low' }
    ]
  },
  {
    id: 'sugarcane',
    nameEn: 'Sugarcane (கரும்பு)',
    nameTa: 'கரும்பு (Sugarcane)',
    totalDurationDays: 360,
    waterRequirementMmPerSeason: 1800,
    suitableSoils: ['clay_loam', 'alluvial', 'red_loam'],
    criticalStagesEn: ['Formative Stage', 'Grand Growth', 'Tillering'],
    criticalStagesTa: ['முளைப்பு மற்றும் வேரூன்றுதல்', 'தீவிர வளர்ச்சி பருவம்', 'தூர்கட்டுதல்'],
    stages: [
      { nameEn: 'Germination & Establishment', nameTa: 'முளைப்பு நிலை', startDay: 1, endDay: 60, kc: 0.50, waterSensitivity: 'medium' },
      { nameEn: 'Formative & Tillering', nameTa: 'தூர்கட்டும் பருவம்', startDay: 61, endDay: 150, kc: 0.85, waterSensitivity: 'high' },
      { nameEn: 'Grand Growth (Cane Elongation)', nameTa: 'தீவிர கரும்பு வளர்ச்சி', startDay: 151, endDay: 270, kc: 1.25, waterSensitivity: 'high' },
      { nameEn: 'Ripening & Sugar Synthesis', nameTa: 'முதிர்ச்சி மற்றும் சர்க்கரை சேர்க்கை', startDay: 271, endDay: 360, kc: 0.70, waterSensitivity: 'low' }
    ]
  },
  {
    id: 'cotton',
    nameEn: 'Cotton (பருத்தி)',
    nameTa: 'பருத்தி (Cotton)',
    totalDurationDays: 150,
    waterRequirementMmPerSeason: 700,
    suitableSoils: ['black_cotton', 'red_loam'],
    criticalStagesEn: ['Squaring', 'Flowering & Boll Formation'],
    criticalStagesTa: ['அரும்பு கட்டுதல்', 'பூத்தல் மற்றும் காய் உருவாக்கம்'],
    stages: [
      { nameEn: 'Seedling & Early Vegetative', nameTa: 'நாற்றுப் பருவம்', startDay: 1, endDay: 35, kc: 0.45, waterSensitivity: 'low' },
      { nameEn: 'Square Formation & Branching', nameTa: 'அரும்பு & கிளைத்தல் நிலை', startDay: 36, endDay: 70, kc: 0.75, waterSensitivity: 'medium' },
      { nameEn: 'Flowering & Boll Development', nameTa: 'பூத்தல் & காய் முதிர்ச்சி', startDay: 71, endDay: 115, kc: 1.15, waterSensitivity: 'high' },
      { nameEn: 'Boll Bursting & Harvest', nameTa: 'காய் வெடித்தல் & அறுவடை', startDay: 116, endDay: 150, kc: 0.65, waterSensitivity: 'low' }
    ]
  },
  {
    id: 'groundnut',
    nameEn: 'Groundnut (வேர்க்கடலை / மணிலா)',
    nameTa: 'வேர்க்கடலை (Groundnut)',
    totalDurationDays: 105,
    waterRequirementMmPerSeason: 500,
    suitableSoils: ['red_sandy_loam', 'red_loam'],
    criticalStagesEn: ['Pegging (ஊடுருவல்)', 'Pod Development'],
    criticalStagesTa: ['விழுது இறங்குதல் (Pegging)', 'காய் திரளுதல்'],
    stages: [
      { nameEn: 'Emergence & Early Growth', nameTa: 'முளைப்பு நிலை', startDay: 1, endDay: 25, kc: 0.40, waterSensitivity: 'low' },
      { nameEn: 'Flowering & Peg Penetration', nameTa: 'பூத்தல் & விழுது இறங்குதல்', startDay: 26, endDay: 55, kc: 0.85, waterSensitivity: 'high' },
      { nameEn: 'Pod Addition & Pod Filling', nameTa: 'காய் பருவம் (Pod Filling)', startDay: 56, endDay: 85, kc: 1.05, waterSensitivity: 'high' },
      { nameEn: 'Maturation & Harvest', nameTa: 'முதிர்ச்சி மற்றும் அறுவடை', startDay: 86, endDay: 105, kc: 0.60, waterSensitivity: 'low' }
    ]
  },
  {
    id: 'banana',
    nameEn: 'Banana (வாழை)',
    nameTa: 'வாழை (Banana)',
    totalDurationDays: 330,
    waterRequirementMmPerSeason: 1650,
    suitableSoils: ['alluvial', 'clay_loam', 'red_loam'],
    criticalStagesEn: ['Shooting / Inflorescence', 'Bunch Development'],
    criticalStagesTa: ['தார் ஈனுதல்', 'காய் பருத்தல் மற்றும் வளர்ச்சி'],
    stages: [
      { nameEn: 'Shooting & Sucker Establishment', nameTa: 'கன்று வேரூன்றுதல்', startDay: 1, endDay: 90, kc: 0.65, waterSensitivity: 'medium' },
      { nameEn: 'Active Leaf & Pseudostem Growth', nameTa: 'இலை மற்றும் தண்டு வளர்ச்சி', startDay: 91, endDay: 200, kc: 1.00, waterSensitivity: 'high' },
      { nameEn: 'Shooting & Bunch Emergence', nameTa: 'பூங்கொத்து & தார் வெளிவருதல்', startDay: 201, endDay: 270, kc: 1.20, waterSensitivity: 'high' },
      { nameEn: 'Bunch Maturation & Harvest', nameTa: 'பழம் முதிர்ச்சி நிலை', startDay: 271, endDay: 330, kc: 0.95, waterSensitivity: 'medium' }
    ]
  },
  {
    id: 'maize',
    nameEn: 'Maize / Corn (மக்காச்சோளம்)',
    nameTa: 'மக்காச்சோளம் (Maize)',
    totalDurationDays: 100,
    waterRequirementMmPerSeason: 550,
    suitableSoils: ['red_loam', 'black_cotton', 'alluvial'],
    criticalStagesEn: ['Tasseling', 'Silking', 'Grain Milk Stage'],
    criticalStagesTa: ['ஆண் பூ வெளிவருதல்', 'சில்க் / பெண் பூ நிலை', 'பால் பிடிக்கும் நிலை'],
    stages: [
      { nameEn: 'Initial Vegetative', nameTa: 'ஆரம்ப வளர்ச்சி', startDay: 1, endDay: 20, kc: 0.40, waterSensitivity: 'low' },
      { nameEn: 'Knee-high to Tasseling', nameTa: 'முழங்கால் உயரம் முதல் பூ வரை', startDay: 21, endDay: 50, kc: 0.85, waterSensitivity: 'medium' },
      { nameEn: 'Silking & Grain Filling', nameTa: 'கதிர் முதிர்தல் & தானிய உருவாக்கம்', startDay: 51, endDay: 80, kc: 1.20, waterSensitivity: 'high' },
      { nameEn: 'Dough Stage & Maturity', nameTa: 'முதிர்வு நிலை', startDay: 81, endDay: 100, kc: 0.65, waterSensitivity: 'low' }
    ]
  },
  {
    id: 'coconut',
    nameEn: 'Coconut (தென்னை)',
    nameTa: 'தென்னை (Coconut)',
    totalDurationDays: 365,
    waterRequirementMmPerSeason: 1400,
    suitableSoils: ['red_loam', 'coastal_sandy', 'alluvial'],
    criticalStagesEn: ['Button Shedding Period', 'Summer Drought Stress'],
    criticalStagesTa: ['குரும்பை உதிர்தல் பருவம்', 'கோடை வறட்சி காலம்'],
    stages: [
      { nameEn: 'Perennial Maintenance & Flowering', nameTa: 'வருடாந்திர பாசனம் & பாளை வெளிவருதல்', startDay: 1, endDay: 365, kc: 0.95, waterSensitivity: 'high' }
    ]
  },
  {
    id: 'tomato',
    nameEn: 'Tomato (தக்காளி)',
    nameTa: 'தக்காளி (Tomato)',
    totalDurationDays: 110,
    waterRequirementMmPerSeason: 480,
    suitableSoils: ['red_loam', 'sandy_clay_loam'],
    criticalStagesEn: ['Flowering', 'Fruit Setting'],
    criticalStagesTa: ['பூக்கும் பருவம்', 'பிஞ்சு பிடிக்கும் பருவம்'],
    stages: [
      { nameEn: 'Transplanting & Vegetative', nameTa: 'நாற்று நடுதல் & வளர்ச்சி', startDay: 1, endDay: 30, kc: 0.50, waterSensitivity: 'medium' },
      { nameEn: 'Flowering & Early Fruit Set', nameTa: 'பூத்தல் & பிஞ்சு உருவாக்கம்', startDay: 31, endDay: 65, kc: 1.05, waterSensitivity: 'high' },
      { nameEn: 'Fruit Development & Ripening', nameTa: 'காய் பருத்தல் & பழுத்தல்', startDay: 66, endDay: 95, kc: 1.15, waterSensitivity: 'high' },
      { nameEn: 'Final Harvest', nameTa: 'கடைசி அறுவடை', startDay: 96, endDay: 110, kc: 0.80, waterSensitivity: 'low' }
    ]
  },
  {
    id: 'ragi',
    nameEn: 'Finger Millet / Ragi (கேழ்வரகு)',
    nameTa: 'கேழ்வரகு / ராகி (Finger Millet)',
    totalDurationDays: 100,
    waterRequirementMmPerSeason: 350,
    suitableSoils: ['red_sandy_loam', 'red_gravelly'],
    criticalStagesEn: ['Tillering', 'Flowering / Earhead Emergence'],
    criticalStagesTa: ['தூர்கட்டுதல்', 'கதிர் வெளிவருதல்'],
    stages: [
      { nameEn: 'Seedling Establishment', nameTa: 'நாற்று நிலை', startDay: 1, endDay: 20, kc: 0.35, waterSensitivity: 'low' },
      { nameEn: 'Tillering & Vegetative', nameTa: 'தூர்கட்டுதல்', startDay: 21, endDay: 45, kc: 0.70, waterSensitivity: 'medium' },
      { nameEn: 'Flowering & Grain Filling', nameTa: 'பூத்தல் & தானிய உருவாக்கம்', startDay: 46, endDay: 75, kc: 1.00, waterSensitivity: 'high' },
      { nameEn: 'Grain Hardening & Harvest', nameTa: 'முதிர்வு & அறுவடை', startDay: 76, endDay: 100, kc: 0.55, waterSensitivity: 'low' }
    ]
  },
  {
    id: 'turmeric',
    nameEn: 'Turmeric (மஞ்சள்)',
    nameTa: 'மஞ்சள் (Turmeric)',
    totalDurationDays: 270,
    waterRequirementMmPerSeason: 1100,
    suitableSoils: ['clay_loam', 'red_loam'],
    criticalStagesEn: ['Rhizome Initiation', 'Rhizome Bulking'],
    criticalStagesTa: ['கிழங்கு தொடக்கம்', 'கிழங்கு பெருக்கம்'],
    stages: [
      { nameEn: 'Sprouting & Emergence', nameTa: 'முளைத்தல் பருவம்', startDay: 1, endDay: 45, kc: 0.50, waterSensitivity: 'medium' },
      { nameEn: 'Tillering & Foliage Growth', nameTa: 'இலை மற்றும் தண்டு வளர்ச்சி', startDay: 46, endDay: 120, kc: 0.90, waterSensitivity: 'high' },
      { nameEn: 'Rhizome Development (Peak Bulking)', nameTa: 'கிழங்கு பருத்தல் (உச்ச பாசனம்)', startDay: 121, endDay: 210, kc: 1.20, waterSensitivity: 'high' },
      { nameEn: 'Maturity & Leaf Senescence', nameTa: 'இலை காய்ந்து முதிர்ச்சி பெறுதல்', startDay: 211, endDay: 270, kc: 0.65, waterSensitivity: 'low' }
    ]
  }
];

export const SOILS_DATA: SoilInfo[] = [
  {
    id: 'red_loam',
    nameEn: 'Red Sandy Loam (செம்மண் வண்டல்)',
    nameTa: 'செம்மண் வண்டல் (Red Sandy Loam)',
    availableWaterCapacityMmPerM: 110,
    infiltrationRateMmPerHour: 22,
    drainageRate: 'moderate'
  },
  {
    id: 'black_cotton',
    nameEn: 'Black Cotton Soil / Clayey (கரிசல் மண்)',
    nameTa: 'கரிசல் மண் (Black Cotton Soil)',
    availableWaterCapacityMmPerM: 175,
    infiltrationRateMmPerHour: 8,
    drainageRate: 'slow'
  },
  {
    id: 'alluvial',
    nameEn: 'Cauvery River Alluvial Soil (வண்டல் மண்)',
    nameTa: 'காவிரி ஆற்று வண்டல் மண் (Alluvial Soil)',
    availableWaterCapacityMmPerM: 145,
    infiltrationRateMmPerHour: 15,
    drainageRate: 'moderate'
  },
  {
    id: 'laterite',
    nameEn: 'Laterite / Gravelly Soil (சரளை மண்)',
    nameTa: 'சரளை / செம்பொறை மண் (Laterite Soil)',
    availableWaterCapacityMmPerM: 90,
    infiltrationRateMmPerHour: 35,
    drainageRate: 'rapid'
  },
  {
    id: 'clay_loam',
    nameEn: 'Clay Loam Soil (களிமண் வண்டல்)',
    nameTa: 'களிமண் வண்டல் (Clay Loam)',
    availableWaterCapacityMmPerM: 155,
    infiltrationRateMmPerHour: 11,
    drainageRate: 'slow'
  },
  {
    id: 'coastal_sandy',
    nameEn: 'Coastal Sandy Soil (கடலோர மணல் மண்)',
    nameTa: 'கடலோர மணல் மண் (Coastal Sandy Soil)',
    availableWaterCapacityMmPerM: 70,
    infiltrationRateMmPerHour: 45,
    drainageRate: 'rapid'
  }
];

export const IRRIGATION_METHODS: IrrigationMethod[] = [
  {
    id: 'drip',
    nameEn: 'Drip / Micro-Irrigation (சொட்டு நீர் பாசனம்)',
    nameTa: 'சொட்டு நீர் பாசனம் (Drip Irrigation)',
    efficiency: 0.90,
    waterSavingPotentialPercent: 45
  },
  {
    id: 'sprinkler',
    nameEn: 'Micro-Sprinkler / Rain Gun (தெளிப்பு நீர் பாசனம்)',
    nameTa: 'தெளிப்பு நீர் பாசனம் (Micro Sprinkler)',
    efficiency: 0.75,
    waterSavingPotentialPercent: 30
  },
  {
    id: 'furrow',
    nameEn: 'Alternate Furrow / Ridge (மாற்று பாத்தி பாசனம்)',
    nameTa: 'மாற்று பாத்தி பாசனம் (Alternate Furrow)',
    efficiency: 0.65,
    waterSavingPotentialPercent: 20
  },
  {
    id: 'flood',
    nameEn: 'Surface Flood / Basin (வாய்க்கால் பாய்ச்சல்)',
    nameTa: 'வாய்க்கால் பாய்ச்சல் (Flood / Basin)',
    efficiency: 0.48,
    waterSavingPotentialPercent: 0
  }
];
