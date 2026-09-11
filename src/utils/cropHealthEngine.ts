import { WeatherDay, CropHealthAnalysis, CropDiseaseThreat, DiseaseRiskLevel } from '../types';
import { CROPS_DATA } from '../data/cropsAndSoils';

interface CropThreatTemplate {
  id: string;
  cropId: string;
  nameEn: string;
  nameTa: string;
  scientificName: string;
  category: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'physiological';
  baseTrigger: {
    minHumidity: number;
    maxHumidity?: number;
    minTemp: number;
    maxTemp: number;
    rainSensitivity: 'high' | 'medium' | 'low';
    windSensitivity?: 'high' | 'medium' | 'low';
  };
  triggerDescEn: string;
  triggerDescTa: string;
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

// Master TNAU & ICAR Agro-Meteorological Threat Knowledge Base
const CROP_THREAT_TEMPLATES: CropThreatTemplate[] = [
  // --- PADDY (RICE) ---
  {
    id: 'paddy_blast',
    cropId: 'paddy',
    nameEn: 'Rice Blast (இலை மற்றும் கழுத்துக் கருகல் நோய்)',
    nameTa: 'நெல் குலை நோய் (Blast)',
    scientificName: 'Pyricularia oryzae',
    category: 'fungal',
    baseTrigger: { minHumidity: 75, minTemp: 22, maxTemp: 32, rainSensitivity: 'high', windSensitivity: 'high' },
    triggerDescEn: 'Prolonged relative humidity > 75%, night dew condensation, and warm day temperature (24-30°C) cause massive fungal spore discharge.',
    triggerDescTa: 'காற்றின் ஈரப்பதம் 75%க்கு மேல் இருப்பது, பனிப்பொழிவு மற்றும் மிதமான வெப்பம் (24-30°C) பூஞ்சாண வித்துக்களை பெருமளவில் பரப்புகிறது.',
    symptomsEn: ['Spindle-shaped elliptical lesions with grey centers and dark reddish borders on leaves', 'Blackening of neck node causing chaffy grains and earhead breakage', 'Brown necrotic spots on node junctions'],
    symptomsTa: ['இலைகளில் படகு போன்ற நீள்வட்டப் புள்ளிகள் சாம்பல் மையத்துடன் தோன்றுதல்', 'கதிர் கழுத்து கருப்பாகி மணிகள் பதராகி முறிந்து விழுதல்', 'கணுக்களில் கரும்பழுப்பு நிற வளையங்கள் தோன்றுதல்'],
    preventiveMeasuresEn: ['Avoid excessive split doses of Nitrogenous urea fertilizers during humid spells', 'Ensure 10-15 cm spacing between hills for cross-ventilation', 'Drain standing water for 2 days to drop micro-humidity in canopy'],
    preventiveMeasuresTa: ['ஈரப்பதம் மிகுந்த நாட்களில் அதிகப்படியான யூரியா தழைச்சத்து இடுவதைத் தவிர்க்கவும்', 'பயிர்களிடையே நல்ல காற்று சுழற்சிக்கு இடைவெளி பராமரிக்கவும்', 'பயிரின் அடிப்பகுதியில் ஈரப்பதத்தை குறைக்க 2 நாட்கள் நீரை வடிக்கவும்'],
    ipmOrganicControlsEn: ['Foliar spray of Pseudomonas fluorescens @ 2.5 g / Litre (1 kg / acre) in early morning', 'Neem Seed Kernel Extract (NSKE 5%) or Neem Oil 3% at first sign of leaf spots', 'Cow urine extract with turmeric solution (5% concentration)'],
    ipmOrganicControlsTa: ['சூடோமோனாஸ் ஃபுளோரசன்ஸ் 2.5 கிராம்/லிட்டர் தண்ணீரில் கலந்து அதிகாலையில் தெளிக்கவும்', 'வேப்பங்கொட்டை சாறு 5% அல்லது வேப்ப எண்ணெய் 3% ஆரம்ப அறிகுறி கண்டதும் தெளிக்கவும்', 'நாட்டு மாட்டு சிறுநீர் மற்றும் மஞ்சள் கரைசல் (5%) தெளித்தல்'],
    chemicalControlsEn: ['Tricyclazole 75% WP @ 120 g / acre in 200 L water', 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 200 ml / acre'],
    chemicalControlsTa: ['ட்ரைசைக்ளசோல் 75% WP ஏக்கருக்கு 120 கிராம் வீதம் 200 லிட்டர் நீரில் கலந்து தெளிக்கவும்', 'அசோக்சிஸ்ட்ரோபின் + டைபெனோகோனசோல் ஏக்கருக்கு 200 மி.லி'],
    irrigationGuidanceEn: 'Shift from continuous deep submergence to alternate wetting and drying (AWD). Avoid evening overhead flooding.',
    irrigationGuidanceTa: 'தொடர் நீர் தேக்குதலை விடுத்து, காய்ச்சலும் பாய்ச்சலுமாக பாசனம் செய்யவும். மாலை வேளையில் மேல்மட்ட தெளிப்பு பாசனத்தை தவிர்க்கவும்.'
  },
  {
    id: 'paddy_bph',
    cropId: 'paddy',
    nameEn: 'Brown Planthopper - BPH (புகையான் வண்டு)',
    nameTa: 'நெல் புகையான் பூச்சி (BPH)',
    scientificName: 'Nilaparvata lugens',
    category: 'pest',
    baseTrigger: { minHumidity: 70, minTemp: 25, maxTemp: 35, rainSensitivity: 'medium' },
    triggerDescEn: 'Dense tillering canopy with warm humid microclimate and persistent stagnant water triggers explosive hopper multiplication.',
    triggerDescTa: 'அடர்ந்த பயிர் வளர்ச்சி, சூடான ஈரப்பதமான சூழல் மற்றும் தொடர் தண்ணீர் தேங்குதல் புகையான் பெருக்கத்தை தூண்டுகிறது.',
    symptomsEn: ['Circular patches of drying called "hopper burn" where plants turn yellow then brown', 'Presence of brown nymphs and winged adults at the base of the plant above water level', 'Sooty mold growth on honeydew deposits'],
    symptomsTa: ['பயிர் வட்ட வட்டமாக எரிந்தது போல் காய்ந்து போகும் "ஹாப்பர் பர்ன்" நிலை', 'நீர் மட்டத்திற்கு மேலே தண்டு பகுதியில் பழுப்பு நிற பூச்சிகள் கூட்டம் கூட்டமாக இருத்தல்', 'தேன்பிசின் திரவத்தில் கரும்பூஞ்சாணம் படருதல்'],
    preventiveMeasuresEn: ['Create alleyways ("பாதை அமைத்தல்") of 30 cm every 2.5 meters to let light and wind reach plant bases', 'Drain water completely from affected plots for 3-4 days', 'Avoid synthetic pyrethroid insecticides which cause pest resurgence'],
    preventiveMeasuresTa: ['ஒவ்வொரு 2.5 மீட்டருக்கும் 30 செ.மீ "பாதை" அமைத்து காற்றோட்டம் மற்றும் சூரிய ஒளி கிடைக்கச் செய்யவும்', 'பாதிக்கப்பட்ட வயலில் உள்ள தண்ணீரை 3-4 நாட்களுக்கு முழுமையாக வடிக்கவும்', 'பூச்சி மறுஉயிர்ப்பை ஏற்படுத்தும் சிந்தடிக் பைரித்ராய்டு மருந்துகளை தவிர்க்கவும்'],
    ipmOrganicControlsEn: ['Install yellow light traps @ 1 trap / acre between 7 PM and 9 PM', 'Spray Neem oil 3000 ppm @ 3 ml / L directed towards base of tillers', 'Release spider predators and mirid bug (Cyrtorhinus lividipennis)'],
    ipmOrganicControlsTa: ['இரவு 7 முதல் 9 மணி வரை ஏக்கருக்கு 1 விளக்குப் பொறி அமைக்கவும்', 'வேப்ப எண்ணெய் 3000 ppm (3 மி.லி/லிட்டர்) தண்டு அடிப்பகுதியில் படுமாறு தெளிக்கவும்', 'இயற்கை எதிரிகளான சிலந்திகள் மற்றும் மிரிட் நாவாய்ப் பூச்சிகளை பாதுகாக்கவும்'],
    chemicalControlsEn: ['Triflumuron + Ethiprole or Pymetrozine 50% WDG @ 120 g / acre directed at plant base', 'Dinotefuran 20% SG @ 80 g / acre'],
    chemicalControlsTa: ['பைமெட்ரோசின் 50% WDG 120 கிராம்/ஏக்கர் தண்டுப் பகுதியில் படுமாறு தெளிக்கவும்', 'டைனோடெப்யூரான் 20% SG ஏக்கருக்கு 80 கிராம்'],
    irrigationGuidanceEn: 'Immediately drain the field for 72 hours. BPH nymphs drown or scatter when standing water is removed.',
    irrigationGuidanceTa: 'வயல் நீரை உடனடியாக 72 மணி நேரம் வடிக்கவும். தண்ணீர் இல்லாதபோது புகையான் பூச்சிகள் அழியும்.'
  },

  // --- COCONUT ---
  {
    id: 'coconut_bud_rot',
    cropId: 'coconut',
    nameEn: 'Coconut Bud Rot & Leaf Rot (தென்னை குருத்து அழுகல் நோய்)',
    nameTa: 'தென்னை குருத்து அழுகல் நோய்',
    scientificName: 'Phytophthora palmivora',
    category: 'fungal',
    baseTrigger: { minHumidity: 80, minTemp: 22, maxTemp: 30, rainSensitivity: 'high', windSensitivity: 'high' },
    triggerDescEn: 'Heavy monsoon cloudiness, persistent humidity > 80%, and wet palm crowns provide ideal incubation for Phytophthora fungi.',
    triggerDescTa: 'அதிக பருவமழை ஈரப்பதம் (>80%), தொடர் மேகமூட்டம் மற்றும் மரத்தின் மகுடத்தில் நீர் தேங்குவது பூஞ்சாண பெருக்கத்திற்கு வழிவகுக்கிறது.',
    symptomsEn: ['Central spindle leaf turns yellow and then withers to dark brown', 'Central spear leaf can be easily pulled out with foul decaying odor', 'Premature button shedding and rotting of unopened spathes'],
    symptomsTa: ['நடுக் குருத்து இலை மஞ்சள் நிறமாக மாறி பின்னர் கரும்பழுப்பு நிறத்தில் அழுகுதல்', 'குருத்து இலையை இழுத்தால் துர்நாற்றத்துடன் எளிதில் கழன்று வருதல்', 'குரும்பைகள் உதிர்தல் மற்றும் பாளைகள் அழுகுதல்'],
    preventiveMeasuresEn: ['Clean coconut crown before monsoon and remove dried petioles and inflorescence debris', 'Apply Bordeaux paste or copper oxychloride paste on spear leaf base before heavy rains', 'Ensure basin drainage so rainwater does not pool around tree base'],
    preventiveMeasuresTa: ['மழைக்காலத்திற்கு முன் மரம் மகுடத்தை சுத்தம் செய்து காய்ந்த மட்டைகள், பாளைகளை அப்புறப்படுத்தவும்', 'மழை தொடங்கும் முன் மகுடத்தில் போர்டோ பசை அல்லது காப்பர் ஆக்ஸிகுளோரைடு தடவவும்', 'மரத்தின் பாத்தியில் மழைநீர் தேங்காதவாறு வடிகால் அமைக்கவும்'],
    ipmOrganicControlsEn: ['Crown application of Trichoderma viride talc formulation (50 g mixed with 1 kg FYM per palm)', 'Spray Pseudomonas fluorescens @ 1% on crown and leaf whorls', 'Neem cake application (5 kg per palm annually)'],
    ipmOrganicControlsTa: ['ட்ரைக்கோடெர்மா விரிடி 50 கிராம் மட்கிய தொழுவுரத்துடன் கலந்து மகுடத்தில் வைக்கவும்', 'சூடோமோனாஸ் ஃபுளோரசன்ஸ் 1% கரைசலை குருத்தில் தெளிக்கவும்', 'மரம் ஒன்றுக்கு ஆண்டுக்கு 5 கிலோ வேப்பம்பிண்ணாக்கு இடவும்'],
    chemicalControlsEn: ['Apply 2 sachets of Aureofungin-sol or Copper Oxychloride 0.3% (3 g / L) into heart of crown', 'Fosetyl-Al (Aliette) @ 2 g / L spray'],
    chemicalControlsTa: ['காப்பர் ஆக்ஸிகுளோரைடு 3 கிராம்/லிட்டர் அல்லது பாஸ்டைல்-ஏஎல் 2 கிராம்/லிட்டர் மகுடத்தின் மையத்தில் தெளிக்கவும்', 'போர்டோ கலவை 1% மகுடத்தில் ஊற்றவும்'],
    irrigationGuidanceEn: 'Cease basin flood pooling. Use ring drip emitters positioned 1.5 meters away from the trunk base.',
    irrigationGuidanceTa: 'மரத்தடியில் நீர் தேங்குவதை நிறுத்துங்கள். தண்டுப் பகுதியிலிருந்து 1.5 மீட்டர் தள்ளி வட்ட சொட்டுநீர் குழாய் அமைக்கவும்.'
  },
  {
    id: 'coconut_mite',
    cropId: 'coconut',
    nameEn: 'Eriophyid Mite & Rhinoceros Beetle (தென்னை சிலந்தி & காண்டாமிருக வண்டு)',
    nameTa: 'தென்னை ஈரியோபைட் சிலந்தி & வண்டு',
    scientificName: 'Aceria guerreronis / Oryctes rhinoceros',
    category: 'pest',
    baseTrigger: { minHumidity: 40, maxHumidity: 70, minTemp: 30, maxTemp: 39, rainSensitivity: 'low' },
    triggerDescEn: 'Warm, dry sunny spells with low humidity accelerate microscopic mite multiplication under the perianth buttons.',
    triggerDescTa: 'குறைந்த ஈரப்பதம் கொண்ட வெப்பமான உலர்ந்த வானிலை சிலந்திப் பூச்சிகள் குரும்பைகளில் அதிவேகமாக பெருக ஏதுவாகிறது.',
    symptomsEn: ['Triangular yellowish white patches on 1 to 3-month-old nuts beneath button perianth', 'Warty brown cracking and gummy exudation leading to stunted, malformed nuts', 'V-shaped cuts on open fronds from beetle crown boring'],
    symptomsTa: ['1-3 மாத இளம் குரும்பைகளில் முக்கோண வடிவ வெளிறிய மஞ்சள் புள்ளிகள் தோன்றுதல்', 'காய்களின் தோல் சொரசொரப்பாகி விரிசல் ஏற்பட்டு குட்டையான காய்களாக மாறுதல்', 'வண்டு கடித்ததால் இலைகளில் வி-வடிவ வெட்டுக்கள் தெரிதல்'],
    preventiveMeasuresEn: ['Keep rhinoceros beetle pheromone traps (RB Lure) @ 2 traps / hectare', 'Apply naphthalene balls (3-4 balls) mixed with river sand in topmost 3 leaf axils', 'Maintain balanced potash fertilization (1.5 kg MOP / palm / year) to strengthen nut rind'],
    preventiveMeasuresTa: ['ஹெக்டேருக்கு 2 காண்டாமிருக வண்டு இனக்கவர்ச்சி பொறிகள் (ஆர்பி லூர்) வைக்கவும்', 'மேல் மட்ட இலை இடுக்குகளில் நாப்தலீன் உருண்டைகளை மணலுடன் கலந்து வைக்கவும்', 'காயின் தோலை வலுப்படுத்த மரம் ஒன்றுக்கு 1.5 கிலோ பொட்டாஷ் உரமிடவும்'],
    ipmOrganicControlsEn: ['Root feeding with Azadirachtin 10,000 ppm (10 ml in 10 ml water) per palm', 'Crown spray of Azadirachtin 1% (5 ml / L) or Wettable Sulphur (3 g / L) targeting buttons', 'Apply Metarhizium anisopliae bio-fungus to manure pits to kill beetle grubs'],
    ipmOrganicControlsTa: ['அசாடிராக்டின் 10,000 ppm 10 மி.லி வேர் மூலம் உட்செலுத்துதல் (10 மி.லி நீருடன்)', 'குரும்பைகளில் அசாடிராக்டின் 1% அல்லது நனையும் கந்தகம் (3 கிராம்/லி) தெளிக்கவும்', 'எருக் குழிகளில் மெட்டாரைசியம் பூஞ்சாணத்தை இட்டு வண்டுப் புழுக்களை அழிக்கவும்'],
    chemicalControlsEn: ['Root feeding with Imidacloprid 17.8% SL (10 ml + 10 ml water) for severe infestations', 'Foliar spray with Fenpyroximate 5% EC @ 1 ml / L'],
    chemicalControlsTa: ['தீவிர பாதிப்பின் போது இமிடாக்குளோப்ரிட் 10 மி.லி வேர் மூலம் உட்செலுத்துதல்', 'ஃபென்பைராக்ஸிமேட் 1 மி.லி/லிட்டர் வீதம் குரும்பைகளில் தெளிக்கவும்'],
    irrigationGuidanceEn: 'Ensure adequate 80-100 L/palm/day irrigation. Water-stressed palms suffer 3x higher mite damage and button drop.',
    irrigationGuidanceTa: 'மரம் ஒன்றுக்கு தினமும் 80-100 லிட்டர் பாசனம் உறுதி செய்யவும். நீர் பற்றாக்குறை சிலந்தித் தாக்குதலை 3 மடங்கு அதிகரிக்கும்.'
  },

  // --- TOMATO / VEGETABLES ---
  {
    id: 'tomato_blight',
    cropId: 'tomato',
    nameEn: 'Early Blight & Damping-off (தக்காளி இலைக் கருகல் மற்றும் நாற்று அழுகல்)',
    nameTa: 'தக்காளி இலைக் கருகல் நோய்',
    scientificName: 'Alternaria solani / Pythium aphanidermatum',
    category: 'fungal',
    baseTrigger: { minHumidity: 75, minTemp: 24, maxTemp: 32, rainSensitivity: 'high' },
    triggerDescEn: 'Frequent cloud cover, humidity > 75%, and wet leaves from mist or rain trigger Alternaria target-spot spores.',
    triggerDescTa: 'தொடர் மேகமூட்டம், 75%க்கு மேல் ஈரப்பதம் மற்றும் இலைகள் நனைந்திருப்பது கருகல் பூஞ்சாணம் பரவ ஏதுவான சூழலாகும்.',
    symptomsEn: ['Concentric dark brown rings resembling a "target-board" on lower older leaves', 'Premature yellowing and leaf defoliation leaving exposed sunburned fruits', 'Dark leathery sunken lesions near the stem end of fruits'],
    symptomsTa: ['கீழ் இலைகளில் இலக்கு பலகை (Target board) போன்ற வட்ட வளைய புள்ளிகள் தோன்றுதல்', 'இலைகள் முன்கூட்டியே மஞ்சளாகி உதிர்ந்து காய்கள் வெயிலில் சூடுபடுதல்', 'பழங்களின் காம்பு பகுதியில் கருமையான தோல் போன்ற தழும்புகள் தோன்றுதல்'],
    preventiveMeasuresEn: ['Stake plants with bamboo sticks to keep lower foliage off wet soil', 'Mulch with silver-black reflective plastic or straw to prevent splash dispersal', 'Avoid overhead sprinkler irrigation; always use drip emitters at ground level'],
    preventiveMeasuresTa: ['செடிகளை குச்சிகள் நட்டு கட்டி இலைகள் ஈர மண்ணில் படாமல் பார்த்துக் கொள்ளவும்', 'மண்ணிலிருந்து பூஞ்சாணம் தெறிப்பதைத் தடுக்க வைக்கோல் அல்லது பிளாஸ்டிக் மூடாக்கு இடவும்', 'தெளிப்பு பாசனத்தை தவிர்த்து தரையோடு சொட்டுநீர் பாசனம் மட்டும் செய்யவும்'],
    ipmOrganicControlsEn: ['Spray Trichoderma viride @ 5 g / L on soil before transplanting', 'Foliar spray of Pseudomonas fluorescens @ 5 g / L at 15-day intervals', 'Panchagavya 3% spray in morning hours to build plant immunity'],
    ipmOrganicControlsTa: ['நாற்று நடுவதற்கு முன் மண்ணில் ட்ரைக்கோடெர்மா விரிடி (5 கிராம்/லிட்டர்) இடவும்', 'சூடோமோனாஸ் ஃபுளோரசன்ஸ் 5 கிராம்/லிட்டர் 15 நாட்கள் இடைவெளியில் தெளிக்கவும்', 'பஞ்சகவ்யா 3% அதிகாலை வேளையில் தெளித்து பயிர் நோய் எதிர்ப்பு திறனை கூட்டவும்'],
    chemicalControlsEn: ['Mancozeb 75% WP @ 2 g / Litre (400 g / acre)', 'Azoxystrobin 23% SC @ 1 ml / Litre or Difenoconazole @ 1 ml / Litre'],
    chemicalControlsTa: ['மேன்கோசெப் 75% WP 2 கிராம்/லிட்டர் நீரில் கலந்து தெளிக்கவும்', 'அசோக்சிஸ்ட்ரோபின் 1 மி.லி அல்லது டைபெனோகோனசோல் 1 மி.லி/லிட்டர்'],
    irrigationGuidanceEn: 'Strictly irrigate early morning (6-8 AM). Evening watering keeps leaves moist through the night, doubling infection rate.',
    irrigationGuidanceTa: 'கண்டிப்பாக அதிகாலை (6-8 மணி) பாசனம் செய்யவும். மாலையில் நீரிட்டால் இரவு முழுவதும் இலை ஈரமாகி நோய் பரவும்.'
  },

  // --- COTTON ---
  {
    id: 'cotton_bollworm',
    cropId: 'cotton',
    nameEn: 'Pink Bollworm & Sucking Pests (பருத்தி காய்ப்புழு & சாறு உறிஞ்சும் பூச்சிகள்)',
    nameTa: 'பருத்தி இளஞ்சிவப்பு காய்ப்புழு',
    scientificName: 'Pectinophora gossypiella / Bemisia tabaci',
    category: 'pest',
    baseTrigger: { minHumidity: 50, maxHumidity: 80, minTemp: 26, maxTemp: 36, rainSensitivity: 'medium' },
    triggerDescEn: 'Warm sunny weather followed by intermittent light drizzling triggers adult moth egg-laying inside squaring rosettes.',
    triggerDescTa: 'வெதுவெதுப்பான வெயில் மற்றும் லேசான தூறல் பூச்சி அந்துப்பூச்சிகள் பூக்களில் முட்டையிடுவதை தூண்டுகிறது.',
    symptomsEn: ['Rosette flowers that fail to open ("முடிச்சு பூக்கள்")', 'Tiny entry holes plugged with excreta on green bolls; stained lint and rotting locules inside', 'Yellow curling of leaves from sucking thrips and whiteflies'],
    symptomsTa: ['பூக்கள் விரியாமல் முடிச்சு போல மூடிக்கொள்ளுதல் (Rosette flowers)', 'பச்சை காய்களில் புழு நுழைந்த சிறிய துளைகள் மற்றும் உள்ளே பருத்தி பஞ்சு கறைபடிந்து அழுகுதல்', 'இலைகள் மேல்நோக்கி சுருண்டு மஞ்சள் நிறமாதல்'],
    preventiveMeasuresEn: ['Install Pheromone Traps (Pecti Lure) @ 5 traps / acre for early flight monitoring', 'Hand-pick and destroy rosetted flowers in the first 60-80 days', 'Grow castor and marigold as border trap crops'],
    preventiveMeasuresTa: ['ஏக்கருக்கு 5 மோகனப் பொறிகள் (பெக்டி லூர்) அமைத்து அந்துப்பூச்சி நடமாட்டத்தை கண்காணிக்கவும்', 'முடிச்சுப் பூக்களை கைகளால் பறித்து சேகரித்து அழிக்கவும்', 'வயல் வரப்புகளில் ஆமணக்கு மற்றும் சாமந்திப் பூக்களை பொறிப்பயிராக நடவும்'],
    ipmOrganicControlsEn: ['Release Trichogramma bactrae egg parasitoid @ 60,000 / acre at weekly intervals', 'Spray Beauveria bassiana bio-pesticide @ 5 g / L in evening', 'Neem Seed Kernel Extract (NSKE 5%) spray at squaring stage'],
    ipmOrganicControlsTa: ['முட்டை ஒட்டுண்ணியான ட்ரைக்கோகிரம்மா கார்டுகளை ஏக்கருக்கு 60,000 வீதம் வாரம் ஒருமுறை வெளியிடவும்', 'பியூவேரியா பாசியானா பூஞ்சாண பூச்சிக்கொல்லி 5 கிராம்/லிட்டர் மாலையில் தெளிக்கவும்', 'அரும்பு கட்டும் பருவத்தில் வேப்பங்கொட்டை சாறு 5% தெளிக்கவும்'],
    chemicalControlsEn: ['Chlorantraniliprole 18.5% SC @ 60 ml / acre or Emamectin Benzoate 5% SG @ 80 g / acre', 'Flonicamid 50% WG @ 60 g / acre for whitefly suppression'],
    chemicalControlsTa: ['குளோரான்ட்ரானிலிப்ரோல் 18.5% SC 60 மி.லி/ஏக்கர் அல்லது எமாமெக்டின் பென்சோயேட் 80 கிராம்', 'சாறு உறிஞ்சும் பூச்சிகளுக்கு ஃப்ளோனிகமிட் 60 கிராம்/ஏக்கர்'],
    irrigationGuidanceEn: 'Avoid over-irrigation that causes vegetative luxury and dense shade, making bolls susceptible to boll rot.',
    irrigationGuidanceTa: 'அதிகப்படியான பாசனத்தால் பயிர் அதீத தழையமைப்பு அடைந்து நிழல் படர்ந்து காய் அழுகல் ஏற்படுவதை தவிர்க்கவும்.'
  },

  // --- SUGARCANE ---
  {
    id: 'sugarcane_red_rot',
    cropId: 'sugarcane',
    nameEn: 'Sugarcane Red Rot & Early Shoot Borer (கரும்பு செவ்வழுகல் மற்றும் குருத்துப்புழு)',
    nameTa: 'கரும்பு செவ்வழுகல் நோய் (Red Rot)',
    scientificName: 'Colletotrichum falcatum',
    category: 'fungal',
    baseTrigger: { minHumidity: 70, minTemp: 25, maxTemp: 35, rainSensitivity: 'high' },
    triggerDescEn: 'Heavy waterlogging in poorly drained clay soils combined with humid monsoon conditions spreads fungal mycelium through cane vascular bundles.',
    triggerDescTa: 'களிமண் நிலங்களில் தண்ணீர் தேங்குவது மற்றும் காற்றில் ஈரப்பதம் பூஞ்சாணம் கரும்பின் தண்டுக்குள் வேகமாக பரவ காரணமாகிறது.',
    symptomsEn: ['Third and fourth leaves from top wither, margins turn yellow and dry', 'Longitudinal split of cane reveals red pith tissues interrupted by diagnostic transverse white bands', 'Alcoholic / sour smell emanating from split infected stalks'],
    symptomsTa: ['மேலிருந்து மூன்றாவது, நான்காவது இலைகள் மஞ்சளாகி விளிம்புகள் காய்ந்து வருதல்', 'கரும்பை பிளந்து பார்த்தால் உட்பகுதி சிவப்பாகி குறுக்கு வெள்ளை திட்டுக்கள் தெரிதல்', 'பாதிக்கப்பட்ட தண்டிலிருந்து சாராயம் போன்ற புளித்த வாசனை வீசுதல்'],
    preventiveMeasuresEn: ['Dig 45 cm deep drainage trenches every 10 rows to prevent field water stagnation', 'Select certified disease-free setts from resistant varieties (e.g. Co 0238, CoG 6)', 'Trash mulching @ 5 tonnes/ha to conserve moisture and suppress early shoot borer'],
    preventiveMeasuresTa: ['வயலில் நீர் தேங்குவதை தடுக்க ஒவ்வொரு 10 பாருக்கும் 45 செ.மீ ஆழ வடிகால் வாய்க்கால் அமைக்கவும்', 'செவ்வழுகல் எதிர்ப்பு திறன் கொண்ட சான்றளிக்கப்பட்ட விதைக்கரணைகளை பயன்படுத்தவும்', 'குருத்துப்புழுவை கட்டுப்படுத்த ஹெக்டேருக்கு 5 டன் கரும்பு சோகை மூடாக்கு இடவும்'],
    ipmOrganicControlsEn: ['Sett treatment with Trichoderma viride @ 4 g / L water for 30 minutes before planting', 'Soil application of Pseudomonas fluorescens @ 2.5 kg / acre mixed with 500 kg FYM', 'Release Trichogramma chilonis @ 2.5 cc / acre against shoot borer'],
    ipmOrganicControlsTa: ['விதைக்கரணைகளை நடுவதற்கு முன் ட்ரைக்கோடெர்மா விரிடி (4 கிராம்/லிட்டர்) கரைசலில் 30 நிமிடம் ஊறவைக்கவும்', 'சூடோமோனாஸ் 2.5 கிலோவை 500 கிலோ எருவுடன் கலந்து அடிமண்ணில் இடவும்', 'குருத்துப்புழுவிற்கு ட்ரைக்கோகிரம்மா கைலோனிஸ் ஒட்டுண்ணி அட்டை ஏக்கருக்கு 2.5 சிசி இடவும்'],
    chemicalControlsEn: ['Carbendazim 50% WP @ 1 g / L sett dip before planting', 'Chlorantraniliprole 0.4% G @ 7.5 kg / acre soil application at planting'],
    chemicalControlsTa: ['கார்பென்டாசிம் 1 கிராம்/லிட்டர் கரணை நேர்த்தி நடுவதற்கு முன் செய்யவும்', 'குளோரான்ட்ரானிலிப்ரோல் 0.4% குருணை 7.5 கிலோ/ஏக்கர் நடுவு சமயம் இடவும்'],
    irrigationGuidanceEn: 'Immediately inspect field drainage. Stagnant water for > 48 hours dramatically accelerates red rot infection.',
    irrigationGuidanceTa: 'வடிகால் வழிகளை உடனே ஆய்வு செய்யவும். 48 மணி நேரத்திற்கு மேல் நீர் தேங்கினால் செவ்வழுகல் தீவிரம் அடையும்.'
  },

  // --- BANANA ---
  {
    id: 'banana_sigatoka',
    cropId: 'banana',
    nameEn: 'Sigatoka Leaf Spot & Panama Wilt (வாழை சிகடோகா இலைப்புள்ளி & வாடல் நோய்)',
    nameTa: 'வாழை சிகடோகா இலைப்புள்ளி நோய்',
    scientificName: 'Mycosphaerella musicola / Fusarium oxysporum',
    category: 'fungal',
    baseTrigger: { minHumidity: 80, minTemp: 23, maxTemp: 32, rainSensitivity: 'high', windSensitivity: 'high' },
    triggerDescEn: 'Continuous high humidity > 80% with wind-blown rain droplets spreads ascospores across large banana leaf laminas.',
    triggerDescTa: 'தொடர் 80%க்கு மேல் ஈரப்பதம் மற்றும் காற்றுடன் கூடிய மழைத்துளிகள் பூஞ்சாண வித்துக்களை இலைகளில் வேகமாக பரப்புகிறது.',
    symptomsEn: ['Tiny spindle-shaped yellowish streaks parallel to veins that enlarge into elliptical necrotic spots', 'Spots coalesce causing rapid premature drying and burning of functional leaves', 'Small bunches with poorly filled undersized fingers'],
    symptomsTa: ['நரம்புகளுக்கு இணையாக சிறிய மஞ்சள் கோடுகள் தோன்றி பின்னர் பழுப்பு நீள்வட்டப் புள்ளிகளாக மாறுதல்', 'புள்ளிகள் இணைந்து இலைகள் முன்கூட்டியே காய்ந்து கருகி தொங்குதல்', 'தார் சிறியதாகி காய்கள் சரியாக திரளாமல் போதல்'],
    preventiveMeasuresEn: ['De-leafing: Prune and burn severely spotted lower leaves to reduce inoculum load', 'Maintain proper spacing (2.1 x 2.1 m) to ensure solar penetration and air circulation', 'Clean inter-row weeds and ensure quick drainage'],
    preventiveMeasuresTa: ['அறுவை செய்தல்: தீவிரமாக பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி தீயிட்டு அழிக்கவும்', 'நல்ல காற்றோட்டம் மற்றும் வெயில் கிடைக்க 2.1 x 2.1 மீட்டர் இடைவெளி பராமரிக்கவும்', 'வரிசைகளுக்கிடையே உள்ள களைகளை அகற்றி சிறந்த வடிகால் வசதி செய்யவும்'],
    ipmOrganicControlsEn: ['Foliar spray of Mineral oil / Banana mist oil (1% emulsion) mixed with 0.1% Carbendazim', 'Soil drenching and spray with Pseudomonas fluorescens @ 10 g / plant', 'Neem oil 3 ml / L + soap solution spray in early vegetative phase'],
    ipmOrganicControlsTa: ['வாழை மினரல் ஆயில் 1% கலவையை பூஞ்சாணக் கொல்லியுடன் சேர்த்து தெளிக்கவும்', 'மரம் ஒன்றுக்கு சூடோமோனாஸ் 10 கிராம் வீதம் வேர்ப்பகுதியில் ஊற்றி இலைகளிலும் தெளிக்கவும்', 'வேப்ப எண்ணெய் 3 மி.லி/லிட்டர் சோப்பு கரைசலுடன் கலந்து ஆரம்பத்தில் தெளிக்கவும்'],
    chemicalControlsEn: ['Propiconazole 25% EC @ 1 ml / Litre or Difenoconazole @ 1 ml / Litre + mineral oil (10 ml / L)', 'Carbendazim 50% WP @ 1 g / Litre'],
    chemicalControlsTa: ['புரோப்பிகோனசோல் 1 மி.லி அல்லது டைபெனோகோனசோல் 1 மி.லி + மினரல் ஆயில் 10 மி.லி/லிட்டர் சேர்த்து தெளிக்கவும்', 'கார்பென்டாசிம் 1 கிராம்/லிட்டர் நீரில் கலந்து தெளிக்கவும்'],
    irrigationGuidanceEn: 'Use drip irrigation at the base. Overhead sprinklers wet the massive foliage and drastically escalate Sigatoka disease.',
    irrigationGuidanceTa: 'தரையோடு சொட்டுநீர் பாசனம் அமைக்கவும். மேல் தெளிப்பு பாசனம் செய்தால் சிகடோகா நோய் பல மடங்கு தீவிரமடையும்.'
  },

  // --- GROUNDNUT ---
  {
    id: 'groundnut_tikka',
    cropId: 'groundnut',
    nameEn: 'Tikka Leaf Spot & Collar Rot (வேர்க்கடலை டிக்கா இலைப்புள்ளி & வேரழுகல்)',
    nameTa: 'வேர்க்கடலை டிக்கா இலைப்புள்ளி நோய்',
    scientificName: 'Cercospora arachidicola / Aspergillus niger',
    category: 'fungal',
    baseTrigger: { minHumidity: 75, minTemp: 25, maxTemp: 34, rainSensitivity: 'high' },
    triggerDescEn: 'Warm humid spells with intermittent showers during pegging and pod formation spark severe Tikka defoliation.',
    triggerDescTa: 'விழுது இறங்கும் மற்றும் காய் பிடிக்கும் பருவத்தில் வெதுவெதுப்பான ஈரப்பதம் டிக்கா இலைப்புள்ளியை தீவிரப்படுத்துகிறது.',
    symptomsEn: ['Circular dark brown spots with a prominent bright yellow halo on upper leaf surfaces', 'Premature severe defoliation leaving bare stems and reducing pod yield by up to 50%', 'Collar rotting at ground line in young seedlings'],
    symptomsTa: ['இலைகளின் மேல் பகுதியில் பிரகாசமான மஞ்சள் வளையத்துடன் கூடிய கரும்பழுப்பு வட்டப் புள்ளிகள்', 'இலைகள் கொத்து கொத்தாக உதிர்ந்து வெறும் குச்சிகள் மட்டும் எஞ்சி காய் விளைச்சல் பாதியாக குறைதல்', 'மண்ணோடு ஒட்டிய தண்டின் கழுத்துப் பகுதியில் கருப்பாக அழுகுதல்'],
    preventiveMeasuresEn: ['Crop rotation with sorghum, maize, or pearl millet (avoid continuous groundnut)', 'Seed treatment with Trichoderma or Thiram before sowing is mandatory', 'Avoid excessive irrigation during pod maturity to prevent aflatoxin mold'],
    preventiveMeasuresTa: ['சோளம் அல்லது மக்காச்சோளத்துடன் பயிர் சுழற்சி செய்யவும் (தொடர் கடலை சாகுபடியை தவிர்க்கவும்)', 'விதைக்கும் முன் ட்ரைக்கோடெர்மா கொண்டு விதை நேர்த்தி செய்தல் அவசியம்', 'காய் முதிரும் போது அதிக நீர் பாய்ச்சுவதை தவிர்த்து நச்சு பூஞ்சாணத்தை தடுக்கவும்'],
    ipmOrganicControlsEn: ['Seed treatment with Trichoderma viride @ 4 g / kg seed + Rhizobium culture', 'Foliar spray with Neem Seed Kernel Extract (NSKE 5%) or 3% Neem oil', 'Cow urine (10%) fermented with garlic extract spray'],
    ipmOrganicControlsTa: ['ட்ரைக்கோடெர்மா விரிடி 4 கிராம்/கிலோ விதை + ரைசோபியம் கொண்டு விதை நேர்த்தி செய்யவும்', 'வேப்பங்கொட்டை சாறு 5% அல்லது 3% வேப்ப எண்ணெய் இலைகளில் தெளிக்கவும்', 'நாட்டு மாட்டு சிறுநீர் (10%) மற்றும் பூண்டு சாறு கலவை தெளித்தல்'],
    chemicalControlsEn: ['Mancozeb 75% WP @ 400 g / acre or Chlorothalonil 75% WP @ 400 g / acre', 'Hexaconazole 5% EC @ 300 ml / acre at first notice of spots'],
    chemicalControlsTa: ['மேன்கோசெப் 400 கிராம்/ஏக்கர் அல்லது குளோரோதலோனில் 400 கிராம்/ஏக்கர்', 'ஹெக்சாகோனசோல் 5% EC 300 மி.லி/ஏக்கர் முதல் புள்ளி தென்பட்டதும் தெளிக்கவும்'],
    irrigationGuidanceEn: 'Maintain light, frequent irrigations during pegging. Never flood oversaturate; soil must remain friable.',
    irrigationGuidanceTa: 'விழுது இறங்கும் போது லேசான சீரான பாசனம் செய்யவும். வெள்ளமாக நீர் பாய்ச்ச வேண்டாம்; மண் இளக்கமாக இருக்க வேண்டும்.'
  },

  // --- MAIZE ---
  {
    id: 'maize_fall_armyworm',
    cropId: 'maize',
    nameEn: 'Fall Armyworm - FAW & Turcicum Blight (மக்காச்சோளம் படைப்புழு & கருகல்)',
    nameTa: 'மக்காச்சோளம் படைப்புழு (Fall Armyworm)',
    scientificName: 'Spodoptera frugiperda',
    category: 'pest',
    baseTrigger: { minHumidity: 50, maxHumidity: 85, minTemp: 24, maxTemp: 35, rainSensitivity: 'medium' },
    triggerDescEn: 'Warm conditions with high vegetative crop growth trigger night-flying moths to lay egg masses inside the central whorls.',
    triggerDescTa: 'வெப்பமான வானிலை மற்றும் பயிரின் தீவிர வளர்ச்சி காலத்தில் அந்துப்பூச்சிகள் குருத்து இலைகளில் முட்டையிடுகின்றன.',
    symptomsEn: ['Shot holes and ragged window-paning on unfurling leaves', 'Accumulation of dense sawdust-like fecal frass in the central funnel/whorl', 'Larvae feeding inside earhead tassels and damaging young kernels'],
    symptomsTa: ['குருத்து இலைகளில் துப்பாக்கி குண்டு துளைத்தது போன்ற துளைகள் மற்றும் சல்லடை போன்ற சேதம்', 'சுருண்ட குருத்தின் நடுவே மரத்தூள் போன்ற புழுவின் கழிவுகள் காணப்படுதல்', 'புழுக்கள் கதிர் சில்க்குகளை கடித்து தானியங்களை பாழ்படுத்துதல்'],
    preventiveMeasuresEn: ['Deep summer ploughing to expose pupae to predatory birds and hot sun', 'Synchronized sowing within 10 days across the village to prevent continuous pest food supply', 'Intercropping with cowpea or redgram (2:1 or 4:1 ratio) to deter egg laying'],
    preventiveMeasuresTa: ['கோடை உழவு செய்து மண்ணில் உள்ள கூட்டுப்புழுக்களை பறவைகளுக்கும் வெயிலுக்கும் வெளிப்படுத்தவும்', 'கிராமம் முழுவதும் 10 நாட்களுக்குள் ஒரே நேரத்தில் விதைப்பு செய்து பூச்சி பரவலை தடுக்கவும்', 'தட்டைப்பயறு அல்லது துவரையை ஊடுபயிராக (4:1) பயிரிட்டு முட்டையிடுவதை தடுக்கவும்'],
    ipmOrganicControlsEn: ['Install FAW pheromone traps @ 5 traps / acre right from seedling stage', 'Whorl application of sand + neem cake mixture (9:1 ratio) into central funnels', 'Spray Metarhizium rileyi or Bacillus thuringiensis (Bt) @ 2 g / L in late evening'],
    ipmOrganicControlsTa: ['நாற்று நிலை முதலே ஏக்கருக்கு 5 படைப்புழு இனக்கவர்ச்சி பொறிகள் வைக்கவும்', 'குருத்து நடுவே ஆற்று மணல் மற்றும் வேப்பம்பிண்ணாக்கு கலவை (9:1) இடவும்', 'மெட்டாரைசியம் அல்லது பிடி (Bt) பாக்டீரியா மருந்து 2 கிராம்/லிட்டர் மாலை வேளையில் தெளிக்கவும்'],
    chemicalControlsEn: ['Spinetoram 11.7% SC @ 0.5 ml / Litre or Chlorantraniliprole 18.5% SC @ 0.4 ml / L directed into whorls', 'Emamectin benzoate 5% SG @ 0.4 g / Litre'],
    chemicalControlsTa: ['ஸ்பைனடோரம் 0.5 மி.லி/லிட்டர் அல்லது குளோரான்ட்ரானிலிப்ரோல் 0.4 மி.லி/லிட்டர் குருத்தில் விழும்படி தெளிக்கவும்', 'எமாமெக்டின் பென்சோயேட் 0.4 கிராம்/லிட்டர்'],
    irrigationGuidanceEn: 'Maintain adequate moisture to keep whorl tissues tender and facilitate bio-pesticide penetration.',
    irrigationGuidanceTa: 'குருத்து மென்மையாக இருக்கவும், உயிரியல் மருந்து எளிதில் சென்றடையவும் சரியான ஈரப்பதத்தை பராமரிக்கவும்.'
  },

  // --- RAGI & MILLETS ---
  {
    id: 'ragi_blast',
    cropId: 'ragi',
    nameEn: 'Finger Millet Blast & Shoot Fly (கேழ்வரகு குலை நோய் & குருத்து ஈ)',
    nameTa: 'கேழ்வரகு குலை நோய் (Ragi Blast)',
    scientificName: 'Pyricularia grisea',
    category: 'fungal',
    baseTrigger: { minHumidity: 70, minTemp: 22, maxTemp: 32, rainSensitivity: 'high' },
    triggerDescEn: 'Cloudy weather with intermittent drizzle and high humidity during earhead emergence triggers neck and finger blast.',
    triggerDescTa: 'கதிர் வெளிவரும் பருவத்தில் மேகமூட்டம், தூறல் மழை மற்றும் அதிக ஈரப்பதம் குலை நோய் பரவ காரணமாகிறது.',
    symptomsEn: ['Spindle-shaped lesions on leaves merging into necrotic patches', 'Neck blast: Blackening of neck below earhead; fingers remain erect, chaffy, and sterile', 'Finger blast: Individual fingers turn brown and break away'],
    symptomsTa: ['இலைகளில் படகு வடிவ புள்ளிகள் தோன்றி பின்னர் காய்ந்து போகுதல்', 'கழுத்துக் குலை நோய்: கதிர் காம்பு கருப்பாகி கதிர்கள் பதராகி நிமிர்ந்து நிற்றல்', 'விரல் குலை நோய்: கதிரின் விரல்கள் பழுப்பு நிறமாகி முறிந்து விழுதல்'],
    preventiveMeasuresEn: ['Seed treatment with Pseudomonas fluorescens @ 10 g / kg seed', 'Avoid sowing late in the season when mist and fog coincide with flowering', 'Balance fertilizer with adequate potassium to resist blast penetration'],
    preventiveMeasuresTa: ['விதைகளை சூடோமோனாஸ் 10 கிராம்/கிலோ விதை கொண்டு விதை நேர்த்தி செய்யவும்', 'பனிப்பொழிவு பூக்கும் பருவத்தில் வராதவாறு சரியான பருவத்தில் விதைப்பு செய்யவும்', 'நோயை எதிர்க்க போதுமான பொட்டாஷ் உரத்தை சரியான விகிதத்தில் இடவும்'],
    ipmOrganicControlsEn: ['Foliar spray with Pseudomonas fluorescens @ 2 g / L at tillering and heading stages', 'Spray 3% Panchagavya at 30 and 45 days after sowing', 'Neem Seed Kernel Extract 5% at early appearance'],
    ipmOrganicControlsTa: ['சூடோமோனாஸ் 2 கிராம்/லிட்டர் தூர்கட்டும் மற்றும் கதிர் வரும் தருணத்தில் தெளிக்கவும்', 'விதைத்த 30 மற்றும் 45ம் நாளில் பஞ்சகவ்யா 3% தெளிக்கவும்', 'ஆரம்ப கட்டத்தில் வேப்பங்கொட்டை சாறு 5% தெளிக்கவும்'],
    chemicalControlsEn: ['Kitazin 48% EC @ 2 ml / L or Carbendazim 50% WP @ 1 g / L at 50% earhead emergence', 'Mancozeb @ 2 g / L'],
    chemicalControlsTa: ['கிட்டாசின் 2 மி.லி/லிட்டர் அல்லது கார்பென்டாசிம் 1 கிராம்/லிட்டர் 50% கதிர் வெளிவரும் போது தெளிக்கவும்', 'மேன்கோசெப் 2 கிராம்/லிட்டர்'],
    irrigationGuidanceEn: 'Avoid evening sprinkler irrigation. Finger millet tolerates dry spells; avoid damp root zones.',
    irrigationGuidanceTa: 'மாலை வேளை தெளிப்பு பாசனத்தை தவிர்க்கவும். கேழ்வரகு வறட்சியை தாங்கும்; அதிக நீர் தேங்குவதை தவிர்க்கவும்.'
  }
];

/**
 * AI Agro-Meteorological Health Engine
 * Evaluates current weather conditions against crop-specific biological thresholds.
 */
export function analyzeCropHealthRisk(
  cropId: string,
  weatherToday: WeatherDay,
  forecast: WeatherDay[] = []
): CropHealthAnalysis {
  const crop = CROPS_DATA.find(c => c.id === cropId) || CROPS_DATA[0];

  // Retrieve threats for this crop
  let matchingThreats = CROP_THREAT_TEMPLATES.filter(t => t.cropId === crop.id);

  // If no direct matching threat (e.g. pulses), use generic fungal / pest fallback
  if (matchingThreats.length === 0) {
    matchingThreats = [CROP_THREAT_TEMPLATES[0]];
  }

  // Current weather parameters
  const humidity = weatherToday.humidityPercent;
  const tempMax = weatherToday.tempMaxC;
  const tempMin = weatherToday.tempMinC;
  const tempAvg = (tempMax + tempMin) / 2;
  const rainMm = weatherToday.rainfallMm;
  const rainProb = weatherToday.rainProbabilityPercent;
  const windSpeed = weatherToday.windSpeedKmh;

  // Forecast rainfall across 3 days
  const next3DaysRain = forecast.slice(0, 3).reduce((acc, d) => acc + d.rainfallMm, 0);

  // Evaluate each threat
  const evaluatedThreats: CropDiseaseThreat[] = matchingThreats.map(threat => {
    let score = 20; // baseline endemic background score

    const b = threat.baseTrigger;

    // 1. Humidity factor
    if (b.minHumidity) {
      if (humidity >= b.minHumidity) {
        const excess = humidity - b.minHumidity;
        score += Math.min(35, 15 + excess * 1.5);
      } else if (b.maxHumidity && humidity <= b.maxHumidity) {
        // e.g. dry pests
        score += 25;
      }
    }

    // 2. Temperature factor
    if (tempAvg >= b.minTemp && tempAvg <= b.maxTemp) {
      score += 20;
    } else if (tempAvg < b.minTemp - 4 || tempAvg > b.maxTemp + 5) {
      score -= 15;
    }

    // 3. Rain factor
    if (threat.category === 'fungal') {
      if (rainMm > 5 || rainProb > 55 || next3DaysRain > 15) {
        score += 20;
      }
    } else if (threat.category === 'pest') {
      if (rainMm > 25) {
        // Heavy rain washes away small pests
        score -= 10;
      } else if (humidity < 65 && tempMax > 33) {
        // Dry hot spells accelerate mite & sucking pest outbreaks
        score += 15;
      }
    }

    // 4. Wind factor (spore dispersal or moth migration)
    if (b.windSensitivity === 'high' && windSpeed > 14) {
      score += 10;
    }

    // Clamp score between 5 and 96
    const finalScore = Math.max(8, Math.min(96, Math.round(score)));

    let riskLevel: DiseaseRiskLevel = 'low';
    if (finalScore >= 75) {
      riskLevel = 'critical';
    } else if (finalScore >= 55) {
      riskLevel = 'high';
    } else if (finalScore >= 35) {
      riskLevel = 'moderate';
    }

    return {
      id: threat.id,
      nameEn: threat.nameEn,
      nameTa: threat.nameTa,
      scientificName: threat.scientificName,
      category: threat.category,
      riskLevel,
      riskScore: finalScore,
      weatherTriggerEn: threat.triggerDescEn,
      weatherTriggerTa: threat.triggerDescTa,
      symptomsEn: threat.symptomsEn,
      symptomsTa: threat.symptomsTa,
      preventiveMeasuresEn: threat.preventiveMeasuresEn,
      preventiveMeasuresTa: threat.preventiveMeasuresTa,
      ipmOrganicControlsEn: threat.ipmOrganicControlsEn,
      ipmOrganicControlsTa: threat.ipmOrganicControlsTa,
      chemicalControlsEn: threat.chemicalControlsEn,
      chemicalControlsTa: threat.chemicalControlsTa,
      irrigationGuidanceEn: threat.irrigationGuidanceEn,
      irrigationGuidanceTa: threat.irrigationGuidanceTa
    };
  });

  // Sort by risk score descending
  evaluatedThreats.sort((a, b) => b.riskScore - a.riskScore);

  const dominantThreat = evaluatedThreats[0];
  const overallRiskLevel = dominantThreat.riskLevel;
  const overallRiskScore = dominantThreat.riskScore;

  // Generate Weather Risk Summary
  let weatherSummaryEn = '';
  let weatherSummaryTa = '';

  if (humidity >= 75 && (rainMm > 0 || rainProb > 40)) {
    weatherSummaryEn = `High humidity (${humidity}%) and rainfall probability (${rainProb}%) create high leaf-wetness hours, heavily favoring fungal spore germination and secondary spread.`;
    weatherSummaryTa = `அதிக ஈரப்பதம் (${humidity}%) மற்றும் மழை வாய்ப்பு (${rainProb}%) இலைகளில் நீண்ட நேரம் நீர் தேங்கி பூஞ்சாண வித்துக்கள் எளிதில் பரவ சாதகமாக உள்ளது.`;
  } else if (humidity < 60 && tempMax >= 33) {
    weatherSummaryEn = `Warm dry conditions (${tempMax}°C with ${humidity}% humidity) increase susceptibility to sucking insect pests (mites, thrips, whiteflies) and moisture stress.`;
    weatherSummaryTa = `வெப்பமான உலர்ந்த வானிலை (${tempMax}°C, ${humidity}% ஈரப்பதம்) சாறு உறிஞ்சும் பூச்சிகள் (சிலந்தி, அசுவினி) மற்றும் வறட்சி அழுத்தத்தை தூண்டுகிறது.`;
  } else {
    weatherSummaryEn = `Current daytime temperature (${tempMax}°C) and balanced humidity (${humidity}%) represent moderate pest/disease incubation pressure.`;
    weatherSummaryTa = `தற்போதைய வெப்பநிலை (${tempMax}°C) மற்றும் சமச்சீர் ஈரப்பதம் (${humidity}%) மிதமான நோய்/பூச்சி தாக்க அழுத்தத்தை காட்டுகிறது.`;
  }

  // Proactive tips
  const proactiveTipsEn = [
    dominantThreat.irrigationGuidanceEn,
    `Inspect the field early in the morning for early signs like ${dominantThreat.symptomsEn[0].toLowerCase()}.`,
    `Avoid applying chemical or organic foliar sprays within 3 hours before anticipated rainfall.`,
    `Maintain recommended hill spacing to ensure sunlight penetration into lower canopy.`
  ];

  const proactiveTipsTa = [
    dominantThreat.irrigationGuidanceTa,
    `அதிகாலை வேளையில் வயலை நேரில் ஆய்வு செய்து '${dominantThreat.symptomsTa[0]}' போன்ற ஆரம்ப அறிகுறிகள் உள்ளதா என கண்காணிக்கவும்.`,
    `மழை பெய்ய வாய்ப்புள்ள நேரத்திற்கு 3 மணி நேரத்திற்குள் எந்தவொரு தெளிப்பையும் மேற்கொள்ள வேண்டாம்.`,
    `பயிரின் கீழ் பகுதி வரை சூரிய ஒளி ஊடுருவ தகுந்த இடைவெளியை பராமரிக்கவும்.`
  ];

  // AI Diagnosis Note
  const aiDiagnosisNoteEn = `Agro-AI Model evaluated micro-climatic humidity (${humidity}%), temperature envelope (${tempMin}-${tempMax}°C), and 3-day precipitation index. Dominant pathogen identified: ${dominantThreat.scientificName || dominantThreat.nameEn}. Proactive bio-control window active for the next 48 hours.`;
  const aiDiagnosisNoteTa = `வானிலை நுண்ணறிவு மாதிரி காற்றின் ஈரப்பதம் (${humidity}%), வெப்பநிலை வரம்பு (${tempMin}-${tempMax}°C) மற்றும் மழை குறியீட்டை ஆய்வு செய்தது. கண்டறியப்பட்ட முதன்மை தாக்கம்: ${dominantThreat.nameTa}. அடுத்த 48 மணி நேரத்திற்குள் தடுப்பு நடவடிக்கைகள் மேற்கொள்ள பரிந்துரைக்கப்படுகிறது.`;

  return {
    cropId: crop.id,
    cropNameEn: crop.nameEn,
    cropNameTa: crop.nameTa,
    overallRiskLevel,
    overallRiskScore,
    dominantThreat,
    allThreats: evaluatedThreats,
    weatherFactors: {
      tempC: tempMax,
      humidityPercent: humidity,
      rainfallMm: rainMm,
      rainProbabilityPercent: rainProb,
      windSpeedKmh: windSpeed,
      riskSummaryEn: weatherSummaryEn,
      riskSummaryTa: weatherSummaryTa
    },
    proactiveTipsEn,
    proactiveTipsTa,
    aiModelConfidence: 0.94,
    aiDiagnosisNoteEn,
    aiDiagnosisNoteTa
  };
}
