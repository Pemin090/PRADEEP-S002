export interface PestDiseaseDetail {
  id: string;
  cropId: string;
  cropNameEn: string;
  cropNameTa: string;
  diseaseNameEn: string;
  diseaseNameTa: string;
  pathogenType: 'Fungus' | 'Bacterium' | 'Insect Pest' | 'Virus' | 'Physiological';
  pathogenTypeTa: string;
  severityLevel: 'low' | 'moderate' | 'severe';
  idealWeatherTriggerEn: string;
  idealWeatherTriggerTa: string;
  visualCharacteristicsEn: string;
  visualCharacteristicsTa: string;
  leafSvgPattern: 'spindle_lesions' | 'yellow_mosaic' | 'water_soaked_spots' | 'sheath_blotches' | 'curling_wilting';
  primarySymptomsEn: string[];
  primarySymptomsTa: string[];
  tnauChemicalTreatmentEn: {
    chemicalName: string;
    dosagePerLitre: string;
    dosagePerKnapsackTank: string; // standard 10L or 16L tank
    applicationTiming: string;
  };
  tnauChemicalTreatmentTa: {
    chemicalName: string;
    dosagePerLitre: string;
    dosagePerKnapsackTank: string;
    applicationTiming: string;
  };
  organicIpmMeasuresEn: string[];
  organicIpmMeasuresTa: string[];
  irrigationConnectionEn: string;
  irrigationConnectionTa: string;
  avoidPesticideWarningEn?: string;
  avoidPesticideWarningTa?: string;
}

export const TN_PEST_DISEASE_CATALOG: PestDiseaseDetail[] = [
  {
    id: 'paddy_blast',
    cropId: 'paddy',
    cropNameEn: 'Paddy (Rice)',
    cropNameTa: 'நெல்',
    diseaseNameEn: 'Rice Blast (Pyricularia oryzae)',
    diseaseNameTa: 'நெல் குலை நோய் (பிளாஸ்ட்)',
    pathogenType: 'Fungus',
    pathogenTypeTa: 'பூஞ்சான் (Fungus)',
    severityLevel: 'severe',
    idealWeatherTriggerEn: 'Night temperature 20–24°C, high humidity (>90%), and prolonged morning dew/fog.',
    idealWeatherTriggerTa: 'இரவு வெப்பநிலை 20-24°C, பனிப்பொழிவு மற்றும் 90%க்கும் அதிகமான காற்றின் ஈரப்பதம்.',
    visualCharacteristicsEn: 'Eye-shaped or spindle-like lesions on leaves with brown margins and grey-white centres.',
    visualCharacteristicsTa: 'இலைகளில் கண் அல்லது கதிர் வடிவிலான பழுப்பு நிற விளிம்பு மற்றும் சாம்பல் நிற மைய புள்ளிகள்.',
    leafSvgPattern: 'spindle_lesions',
    primarySymptomsEn: [
      'Spindle-shaped brown spots on leaves coalesce into large dry patches',
      'Neck rot causing empty/chaffy white panicles (வெண்கதிர்)',
      'Nodes turning black and snapping easily in wind'
    ],
    primarySymptomsTa: [
      'இலைகளில் கண் போன்ற பழுப்பு நிற புள்ளிகள் ஒன்றிணைந்து காய்ந்து போதல்',
      'கழுத்து அழுகல் ஏற்பட்டு கதிர்கள் பால் பிடிக்காமல் வெண்கதிராக மாறுதல்',
      'தண்டு கணுக்கள் கறுத்து எளிதில் முறிந்து விழுதல்'
    ],
    tnauChemicalTreatmentEn: {
      chemicalName: 'Tricyclazole 75% WP (Baan / Beam)',
      dosagePerLitre: '0.6 g / litre of water',
      dosagePerKnapsackTank: '10 grams per 16-litre power sprayer tank',
      applicationTiming: 'Spray at early leaf spot appearance or during panicle emergence in cool morning hours.'
    },
    tnauChemicalTreatmentTa: {
      chemicalName: 'டிரைசைக்ளசோல் 75% WP (Tricyclazole)',
      dosagePerLitre: '0.6 கிராம் / 1 லிட்டர் நீர்',
      dosagePerKnapsackTank: '10 கிராம் / 16 லிட்டர் பவர் ஸ்பிரேயர் டேங்க்',
      applicationTiming: 'காலை வேளையில் பனி விலகிய பின் கதிர் வெளிவரும் தருணத்தில் தெளிக்கவும்.'
    },
    organicIpmMeasuresEn: [
      'Foliar spray of Pseudomonas fluorescens @ 10 g/L or 1 kg/acre with 0.1% surfactant',
      'Neem Seed Kernel Extract (NSKE) 5% foliar spray',
      'Avoid excessive application of Urea/Nitrogen fertilizers during cloudy weather'
    ],
    organicIpmMeasuresTa: [
      'சூடோமோனாஸ் புளோரசன்ஸ் 10 கிராம் / லிட்டர் அல்லது 1 கிலோ/ஏக்கர் தெளிக்கவும்',
      'வேப்பங்கொட்டை கரைசல் 5% தெளித்து பூஞ்சான் பரவலை தடுக்கவும்',
      'மேகமூட்டமான நாட்களில் தழைச்சத்து (யுரியா) இடுவதை தவிர்க்கவும்'
    ],
    irrigationConnectionEn: 'Avoid prolonged stagnant water flooding; practice Alternate Wetting and Drying (AWD) to lower microclimate humidity in the canopy.',
    irrigationConnectionTa: 'வயலில் தொடர்ந்து தண்ணீர் தேங்க விடாமல் உலரவிட்டு பாய்ச்சும் முறையை (AWD) கடைப்பிடிக்கவும்.',
    avoidPesticideWarningEn: 'WARNING: Do NOT spray banned organophosphates (Monocrotophos) which aggravate hopper resurgence.',
    avoidPesticideWarningTa: 'எச்சரிக்கை: தடைசெய்யப்பட்ட மோனோகுரோட்டோபாஸ் மருந்துகளை அடிக்க வேண்டாம்.'
  },
  {
    id: 'paddy_sheath_blight',
    cropId: 'paddy',
    cropNameEn: 'Paddy (Rice)',
    cropNameTa: 'நெல்',
    diseaseNameEn: 'Sheath Blight (Rhizoctonia solani)',
    diseaseNameTa: 'நெல் இலை உறை அழுகல் நோய்',
    pathogenType: 'Fungus',
    pathogenTypeTa: 'பூஞ்சான்',
    severityLevel: 'moderate',
    idealWeatherTriggerEn: 'Warm and humid weather (28–32°C), high plant density, and heavy nitrogen application.',
    idealWeatherTriggerTa: 'அதிக வெப்பம் மற்றும் ஈரப்பதம் (28-32°C), அதிக தழைச்சத்து மற்றும் பயிர் அடர்த்தி.',
    visualCharacteristicsEn: 'Irregular snake-skin or greenish-grey lesions on leaf sheaths near water line.',
    visualCharacteristicsTa: 'நீர் மட்டத்திற்கு அருகில் உள்ள இலை உறைகளில் பாம்பு தோல் போன்ற புள்ளிகள்.',
    leafSvgPattern: 'sheath_blotches',
    primarySymptomsEn: [
      'Serpentine oval lesions with dark borders starting on lower leaf sheaths',
      'Lesions spread upward into upper leaves causing lodging of the crop',
      'Presence of small brown mustard-seed-like sclerotia resting bodies'
    ],
    primarySymptomsTa: [
      'கீழ் இலை உறைகளில் முட்டை வடிவ பாம்பு தோல் போன்ற தழும்புகள்',
      'புள்ளிகள் மேல்நோக்கி பரவி பயிர் சாய்ந்து விடுதல்',
      'கடுகு போன்ற பழுப்பு நிற பூஞ்சை வித்துக்கள் காணப்படுதல்'
    ],
    tnauChemicalTreatmentEn: {
      chemicalName: 'Hexaconazole 5% EC (Contaf) or Validamycin 3% L',
      dosagePerLitre: '2.0 ml / litre of water',
      dosagePerKnapsackTank: '30 ml per 16-litre spray tank directed at stem base',
      applicationTiming: 'Direct spray strictly towards bottom tillers and stem sheath at first sign.'
    },
    tnauChemicalTreatmentTa: {
      chemicalName: 'ஹெக்சாகோனசோல் 5% EC (Hexaconazole)',
      dosagePerLitre: '2.0 மி.லி / 1 லிட்டர் நீர்',
      dosagePerKnapsackTank: '30 மி.லி / 16 லிட்டர் டேங்க் (தூர் பகுதியில் படுமாறு)',
      applicationTiming: 'மருந்தை தூரின் அடிப்பகுதி மற்றும் தண்டு மீது படுமாறு நன்கு நனைய தெளிக்கவும்.'
    },
    organicIpmMeasuresEn: [
      'Soil application of Trichoderma viride mixed in farmyard manure (2 kg/acre)',
      'Foliar spray of fermented butter milk + asafoetida (பெருங்காயம்) solution',
      'Keep field bunds weed-free to eliminate wild grass hosts'
    ],
    organicIpmMeasuresTa: [
      'டிரைக்கோடெர்மா விரிடி 2 கிலோவை மக்கிய தொழுவுரத்துடன் கலந்து நிலத்தில் இடவும்',
      'புளித்த மோர் மற்றும் பெருங்காயக் கரைசல் தெளிக்கலாம்',
      'வரப்புகளில் உள்ள களைகளை அகற்றி சுத்தமாக வைத்திருக்கவும்'
    ],
    irrigationConnectionEn: 'Drain excess standing water immediately; stagnant warm water accelerates fungal mycelium swimming.',
    irrigationConnectionTa: 'வயலில் தேங்கியிருக்கும் உபரி தண்ணீரை உடனடியாக வடிக்கவும்.'
  },
  {
    id: 'turmeric_leaf_spot',
    cropId: 'turmeric',
    cropNameEn: 'Turmeric',
    cropNameTa: 'மஞ்சள்',
    diseaseNameEn: 'Turmeric Leaf Blotch & Spot (Colletotrichum / Taphrina)',
    diseaseNameTa: 'மஞ்சள் இலைப்புள்ளி & இலைக்கருகல் நோய்',
    pathogenType: 'Fungus',
    pathogenTypeTa: 'பூஞ்சான்',
    severityLevel: 'moderate',
    idealWeatherTriggerEn: 'Intermittent rainfall, wet foliage for >8 hours, and 85–95% atmospheric humidity.',
    idealWeatherTriggerTa: 'விட்டுவிட்டு பெய்யும் மழை மற்றும் இலைகளில் தொடர்ந்து நீர் தேங்குதல்.',
    visualCharacteristicsEn: 'Small yellow-brown circular spots that turn into necrotic dark brown patches with yellow halo.',
    visualCharacteristicsTa: 'இலைகளில் மஞ்சள் நிற வளையத்துடன் கூடிய கரும்பழுப்பு புள்ளிகள்.',
    leafSvgPattern: 'spindle_lesions',
    primarySymptomsEn: [
      'Upper leaf surface shows multiple concentric dark rings',
      'Severe drying of leaves causing premature rhizome maturity and size reduction',
      'Curcumin content reduction by up to 25% if untreated'
    ],
    primarySymptomsTa: [
      'இலையின் மேற்பரப்பில் அடர் பழுப்பு நிற வளைய புள்ளிகள் தோன்றுதல்',
      'இலைகள் காய்ந்து மஞ்சள் கிழங்கின் வளர்ச்சி குறைதல்',
      'குர்குமின் சத்து குறைந்து சந்தை விலை பாதிக்கப்படுதல்'
    ],
    tnauChemicalTreatmentEn: {
      chemicalName: 'Mancozeb 75% WP or Azoxystrobin 23% SC',
      dosagePerLitre: '2.5 g / litre (Mancozeb) or 1.0 ml / litre (Azoxystrobin)',
      dosagePerKnapsackTank: '35 grams per 16-litre spray tank',
      applicationTiming: 'Spray at 15-day intervals during monsoon rainy spells.'
    },
    tnauChemicalTreatmentTa: {
      chemicalName: 'மேன்கோசெப் 75% WP (Mancozeb) அல்லது அசாசிஸ்ட்ரோபின்',
      dosagePerLitre: '2.5 கிராம் / 1 லிட்டர் நீர்',
      dosagePerKnapsackTank: '35 கிராம் / 16 லிட்டர் டேங்க்',
      applicationTiming: 'மழைக்காலத்தில் 15 நாட்கள் இடைவெளியில் இருமுறை தெளிக்கவும்.'
    },
    organicIpmMeasuresEn: [
      'Spray 3% Panchagavya (300 ml per 10 L water)',
      'Seed rhizome treatment with Pseudomonas fluorescens (10 g/kg) prior to planting'
    ],
    organicIpmMeasuresTa: [
      '3% பஞ்சகாவ்யா கரைசல் (10 லிட்டர் நீருக்கு 300 மி.லி) தெளிக்கவும்',
      'விதைக் கிழங்குகளை சூடோமோனாஸ் கரைசலில் நனைத்து நடவு செய்தல்'
    ],
    irrigationConnectionEn: 'Avoid overhead sprinkler irrigation on turmeric; switch to drip to keep foliage completely dry.',
    irrigationConnectionTa: 'மஞ்சளுக்கு தெளிப்பு நீர் பாசனம் தவிர்த்து, சொட்டுநீர் பாசனம் அமைத்து இலைகளை உலர வைக்கவும்.'
  },
  {
    id: 'banana_panama_wilt',
    cropId: 'banana',
    cropNameEn: 'Banana',
    cropNameTa: 'வாழை',
    diseaseNameEn: 'Panama Wilt / Fusarium Wilt (Fusarium oxysporum f. sp. cubense)',
    diseaseNameTa: 'வாழை பனாமா வாடல் நோய்',
    pathogenType: 'Fungus',
    pathogenTypeTa: 'மண் பூஞ்சான் (Soil Fungus)',
    severityLevel: 'severe',
    idealWeatherTriggerEn: 'Poorly drained clay soils, root nematode injuries, and warm soil temperatures.',
    idealWeatherTriggerTa: 'வடிகால் வசதியற்ற களிமண் நிலம் மற்றும் வேர்ப்புழு தாக்குதல்.',
    visualCharacteristicsEn: 'Yellowing of lower leaves beginning at leaf margin, buckling at junction with pseudostem.',
    visualCharacteristicsTa: 'கீழ் இலைகளின் விளிம்பில் மஞ்சள் நிறம் தோன்றி தண்டுடன் இணையும் இடத்தில் ஒடிந்து தொங்குதல்.',
    leafSvgPattern: 'curling_wilting',
    primarySymptomsEn: [
      'Progressive yellowing from older outer leaves inward to heart leaf',
      'Dead leaves hang downward like an umbrella around the pseudostem',
      'Longitudinal splitting of pseudostem base and internal reddish-brown vascular discolouration'
    ],
    primarySymptomsTa: [
      'கீழ் இலைகள் மஞ்சள் நிறமாகி குடை போல தண்டில் தொங்குதல்',
      'வாழை மரத்தின் அடிமரம் நெடுக்காக வெடித்தல்',
      'தண்டை வெட்டிப் பார்த்தால் உட்பகுதியில் சிவப்பு/பழுப்பு நிற வரிகள்'
    ],
    tnauChemicalTreatmentEn: {
      chemicalName: 'Carbendazim 50% WP (Bavistin) or Propiconazole 25% EC',
      dosagePerLitre: '2.0 g / litre of water',
      dosagePerKnapsackTank: 'Drench 2 to 3 litres of solution per plant basin directly into root zone',
      applicationTiming: 'Soil drenching at planting and at 2nd, 4th, and 6th month after planting.'
    },
    tnauChemicalTreatmentTa: {
      chemicalName: 'கார்பெண்டாசிம் 50% WP (Carbendazim)',
      dosagePerLitre: '2.0 கிராம் / 1 லிட்டர் நீர்',
      dosagePerKnapsackTank: 'ஒரு மரத்தின் வேர் பகுதியில் 2-3 லிட்டர் கரைசலை ஊற்றவும்',
      applicationTiming: 'நட்ட 2, 4, 6 ஆம் மாதங்களில் வேர்ப்பகுதியில் ஊற்ற வேண்டும்.'
    },
    organicIpmMeasuresEn: [
      'Apply 50 g of Trichoderma viride + 50 g Pseudomonas fluorescens mixed in neem cake per pit',
      'Grow sunnhemp / daincha green manure in interspaces and incorporate into soil'
    ],
    organicIpmMeasuresTa: [
      'ஒரு குழிக்கு 50 கிராம் டிரைக்கோடெர்மா விரிடி + வேப்பம்பிண்ணாக்கு இடவும்',
      'இடைவெளிகளில் சணப்பை அல்லது தக்கைப்பூண்டு பயிரிட்டு மடக்கி உழவும்'
    ],
    irrigationConnectionEn: 'Excessive waterlogging spreads spores from tree to tree; ensure trench drainage between banana rows.',
    irrigationConnectionTa: 'வாழை வரிசைகளுக்கு இடையே வடிகால் வாய்க்கால் அமைத்து நீர் தேங்குவதை தடுக்கவும்.'
  },
  {
    id: 'sugarcane_red_rot',
    cropId: 'sugarcane',
    cropNameEn: 'Sugarcane',
    cropNameTa: 'கரும்பு',
    diseaseNameEn: 'Red Rot of Sugarcane (Colletotrichum falcatum)',
    diseaseNameTa: 'கரும்பு செவ்வழுகல் நோய்',
    pathogenType: 'Fungus',
    pathogenTypeTa: 'பூஞ்சான்',
    severityLevel: 'severe',
    idealWeatherTriggerEn: 'Waterlogged soil during monsoon, infected sett planting, and cane borer punctures.',
    idealWeatherTriggerTa: 'மழைக்காலத்தில் நிலத்தில் நீர் தேங்குதல் மற்றும் குருத்துப்புழு துளைகள்.',
    visualCharacteristicsEn: 'Third and fourth leaves from top show yellowing, drying, and longitudinal splitting with alcohol smell.',
    visualCharacteristicsTa: 'மேல் இலைகள் மஞ்சள் நிறமாகி வாடுதல், கரும்பைத் திறந்தால் சாராய வாசனை அடித்தல்.',
    leafSvgPattern: 'spindle_lesions',
    primarySymptomsEn: [
      'Midrib of leaf shows red blood-like streaks that become dark and straw-coloured',
      'Internal pith shows dull red patches alternating with white transverse bands',
      'Cane stalk becomes hollow, shrivelled, and breaks easily'
    ],
    primarySymptomsTa: [
      'இலையின் நரம்புகளில் சிவப்பு நிற கோடுகள் தோன்றுதல்',
      'கரும்பை பிளந்து பார்த்தால் வெள்ளை வரிகளுடன் கூடிய சிவப்பு நிற திசுக்கள்',
      'கரும்பு உள்கூடு வெற்றிடமாகி சாராய வாசனை அடித்தல்'
    ],
    tnauChemicalTreatmentEn: {
      chemicalName: 'Carbendazim 50% WP Sett Treatment',
      dosagePerLitre: '1.0 g / litre of water',
      dosagePerKnapsackTank: 'Dip setts in solution for 15 minutes prior to planting in furrows',
      applicationTiming: 'Strictly pre-planting sett treatment; chemical sprays ineffective on mature standing canes.'
    },
    tnauChemicalTreatmentTa: {
      chemicalName: 'கார்பெண்டாசிம் 50% WP (கரணை நேர்த்தி)',
      dosagePerLitre: '1.0 கிராம் / 1 லிட்டர் நீர்',
      dosagePerKnapsackTank: 'கரும்பு கரணைகளை 15 நிமிடங்கள் கரைசலில் நனைத்து நடவு செய்க',
      applicationTiming: 'நடவுக்கு முந்தைய கரணை நேர்த்தி மட்டுமே முழு பலன் தரும்.'
    },
    organicIpmMeasuresEn: [
      'Select certified disease-free setts from nursery nurseries (TNAU Co 86032)',
      'Hot water treatment of setts at 52°C for 30 minutes',
      'Uproot and burn diseased clumps immediately to prevent soil contamination'
    ],
    organicIpmMeasuresTa: [
      'நோயற்ற தரமான கரணைகளை தேர்வு செய்து நடவு செய்க',
      'கரணைகளை 52°C வெந்நீரில் 30 நிமிடங்கள் நேர்த்தி செய்தல்',
      'பாதிக்கப்பட்ட கரும்புகளை வேரோடு பிடுங்கி தீயிட்டு அழிக்கவும்'
    ],
    irrigationConnectionEn: 'Irrigation water from infected plots must never flow into healthy fields.',
    irrigationConnectionTa: 'நோய் தாக்கிய பாத்தியில் இருந்து பாயும் நீர் மற்ற பாத்திகளுக்கு செல்லக்கூடாது.'
  },
  {
    id: 'groundnut_tikka_leaf_spot',
    cropId: 'groundnut',
    cropNameEn: 'Groundnut',
    cropNameTa: 'வேர்க்கடலை / மணிலா',
    diseaseNameEn: 'Tikka Leaf Spot (Cercospora personata)',
    diseaseNameTa: 'வேர்க்கடலை டிக்கா இலைப்புள்ளி நோய்',
    pathogenType: 'Fungus',
    pathogenTypeTa: 'பூஞ்சான்',
    severityLevel: 'moderate',
    idealWeatherTriggerEn: 'Relative humidity >80% for 3–4 days, temperatures 25–28°C, and frequent showers.',
    idealWeatherTriggerTa: '80%க்கும் அதிகமான காற்றின் ஈரப்பதம் மற்றும் 25-28°C வெப்பநிலை.',
    visualCharacteristicsEn: 'Circular dark brown or black spots with distinct bright yellow rings on upper leaf surface.',
    visualCharacteristicsTa: 'இலையின் மேற்பகுதியில் மஞ்சள் வளையத்துடன் கூடிய வட்டவடிவ கரும்புள்ளிகள்.',
    leafSvgPattern: 'spindle_lesions',
    primarySymptomsEn: [
      'Early leaf spots (circular reddish brown with halo) and late spots (almost black)',
      'Premature leaf defoliation leaving bare stems, halting pod filling',
      'Yield loss up to 30–50% if untreated before pegging stage'
    ],
    primarySymptomsTa: [
      'இலைகளில் மஞ்சள் நிற வட்டத்துடன் கூடிய கரும்பழுப்பு புள்ளிகள்',
      'இலைகள் அனைத்தும் உதிர்ந்து வெறும் தண்டு மட்டும் நிற்றல்',
      'காய் பிடிக்கும் திறன் குறைந்து 50% வரை மகசூல் இழப்பு'
    ],
    tnauChemicalTreatmentEn: {
      chemicalName: 'Chlorothalonil 75% WP or Carbendazim + Mancozeb (Saaf)',
      dosagePerLitre: '2.0 g / litre of water',
      dosagePerKnapsackTank: '25 grams per 16-litre spray tank',
      applicationTiming: 'First spray at 35–40 days after sowing; repeat after 15 days.'
    },
    tnauChemicalTreatmentTa: {
      chemicalName: 'சாஃப் (கார்பெண்டாசிம் + மேன்கோசெப்)',
      dosagePerLitre: '2.0 கிராம் / 1 லிட்டர் நீர்',
      dosagePerKnapsackTank: '25 கிராம் / 16 லிட்டர் டேங்க்',
      applicationTiming: 'விதைத்த 35-40 நாட்களில் முதல் தெளிப்பும், 15 நாட்கள் கழித்து இரண்டாம் தெளிப்பும் செய்க.'
    },
    organicIpmMeasuresEn: [
      'Neem Seed Kernel Extract 5% foliar spray at initial symptom sighting',
      'Seed treatment with Trichoderma viride @ 4 g/kg seed before sowing'
    ],
    organicIpmMeasuresTa: [
      'வேப்பங்கொட்டை கரைசல் 5% தெளிக்கவும்',
      'டிரைக்கோடெர்மா விரிடி 4 கிராம் / கிலோ விதைக்கு கலந்து விதை நேர்த்தி செய்க'
    ],
    irrigationConnectionEn: 'Avoid late evening surface flood irrigation; night leaf wetness encourages Cercospora spore germination.',
    irrigationConnectionTa: 'மாலை நேரங்களில் பாசனம் செய்வதை தவிர்க்கவும். இரவு நேர ஈரப்பதம் நோயை பரப்பும்.'
  }
];
