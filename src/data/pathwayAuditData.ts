export interface UserFeedbackTrial {
  farmerName: string;
  farmerNameTa: string;
  village: string;
  district: string;
  landHoldingAcres: number;
  primaryCrop: string;
  irrigationSource: string;
  feedbackQuoteEn: string;
  feedbackQuoteTa: string;
  preInterventionIssue: string;
  measuredOutcome: string;
  ratingScore: number; // 1 to 5
}

export interface AiInteractionLog {
  stage: string;
  taskTitle: string;
  promptUsed: string;
  aiSuggestedOutput: string;
  hallucinationOrFlawCaught: string;
  humanEngineerAction: 'Rejected' | 'Refined' | 'Adopted with Guardrail';
  finalImplementationDetails: string;
}

export const PATHWAY_DECLARATION = {
  pathwayCode: 'Pathway A',
  pathwayTitle: 'Problem-First Domain Workflow Solution',
  pathwayFocus: 'Hyper-localized, agronomic and groundwater conservation workflow for smallholder farmers in Tamil Nadu.',
  targetUserPersona: {
    titleEn: 'Tamil Nadu Marginal & Smallholder Borewell Farmer',
    titleTa: 'தமிழக சிறு மற்றும் குறு நிலத்தடி நீர் பாசன விவசாயி',
    landSize: '0.5 to 5.0 Acres (Small & Marginal Holding)',
    powerContext: 'Free 3-Phase Agricultural Electricity from TANGEDCO (supplied in erratic 4 to 6-hour daily daytime/night shifts)',
    waterContext: 'Solely reliant on 400–900 ft deep borewells in "Critical" or "Over-Exploited" groundwater assessment units (CGWB / SGWRDC Tamil Nadu)',
    economicBurden: 'High accumulated debts from multiple dry borewell drilling attempts (₹1.5L – ₹3.5L per borewell); high fertilizer/pesticide retail markups',
    digitalLiteracy: 'Basic Android smartphone usage (WhatsApp, YouTube); struggle with English UI, multi-axis scientific graphs, or complicated decimal metrics in field glare'
  },
  fourCoreFrictionPoints: [
    {
      id: 'fp1',
      titleEn: 'Aquifer Depletion via Panic Pumping during 3-Phase Power Windows',
      titleTa: 'மின்சாரம் வரும் நேரத்தில் பதற்றத்தில் அதிக நீர் பாய்ச்சுதல்',
      rootCause: 'Because agricultural power is supplied in irregular time slots, farmers reflexively turn on 5HP/7.5HP submersible pumps the minute electricity is restored, even if the soil is at field capacity or heavy rain is arriving in 12 hours.',
      impact: 'Rapid drying of deep borewell aquifers, motor dry-run burnouts (₹8,000 rewinding cost), and soil waterlogging root rot.',
      solutionIntervention: 'Direct, unmistakable binary action: "Wait" or "Irrigate for 45 minutes", accompanied by 48-hour rain avoidance lock that halts unnecessary pumping.'
    },
    {
      id: 'fp2',
      titleEn: 'Crop Disease Diagnostic Vacuum & Costly Agrochemical Overselling',
      titleTa: 'பயிர் நோய் கண்டறிதலில் காலதாமதம் மற்றும் தேவையில்லாத ரசாயன செலவு',
      rootCause: 'Rural farmers are 20–40 km away from KVK research stations. When leaf spots or rust appear, they take leaves to local retail pesticide sellers who oversell ₹2,000–₹5,000/acre of broad-spectrum toxic cocktails.',
      impact: 'High input costs, chemical resistance, pest resurgence, and accidental use of banned chemicals (e.g. Monocrotophos).',
      solutionIntervention: 'Instant image & symptom-based leaf disease scanner with TNAU-approved knapsack tank dosages (e.g., 10g per 16L tank) and organic bio-control alternatives (Panchagavya, Pseudomonas).'
    },
    {
      id: 'fp3',
      titleEn: 'Mandi Price Information Asymmetry & Distress Farmgate Sales',
      titleTa: 'சந்தை விலை விபரம் அறியாமல் இடைத்தரகரிடம் குறைந்த விலைக்கு விற்றல்',
      rootCause: 'Lack of verified, transparent daily modal rates from regulated APMC markets and Uzhavar Sandhais forces farmers to accept 30–50% lower prices from village village aggregators.',
      impact: 'Substantial loss of earned farm margin on commercial crops (Paddy, Turmeric, Banana, Groundnut, Coconut).',
      solutionIntervention: 'Live Tamil Nadu Mandi Tracker with real modal prices across major district centers, MSP comparisons, and actionable "Sell Now vs Hold" recommendations.'
    },
    {
      id: 'fp4',
      titleEn: 'Cognitive Overload & Unusable Graphs for Low-Literacy Field Users',
      titleTa: 'விவசாயிகளுக்கு புரியாத ஆங்கில வரைபடங்கள் மற்றும் சிக்கலான அளவீடுகள்',
      rootCause: 'Most agritech apps display complex multi-colored line graphs of ET0, hectopascals, matric potential, and NDVI contours that cannot be decoded under bright sunlight by elderly farmers.',
      impact: 'App abandonment within 48 hours and total reliance on traditional guesswork.',
      solutionIntervention: 'Specialized "Tamil Farmer Mode" with zero graphs, high-contrast big text, audio voice read-out, and physical timer metrics (minutes of pump run time).'
    }
  ]
};

export const AI_INTERACTION_AUDIT_LOGS: AiInteractionLog[] = [
  {
    stage: 'Ideation & Prompting',
    taskTitle: 'Agronomic Soil-Water Evapotranspiration Balance Modeling',
    promptUsed: 'Develop an algorithm that translates FAO-56 Penman-Monteith ET0 and crop Kc factors into daily water requirement for Tamil Nadu farmers.',
    aiSuggestedOutput: 'Calculate daily root-zone depletion in millimetres (Dr = ETc - Pe) and recommend farmer apply 18.42 mm depth of water across the field.',
    hallucinationOrFlawCaught: 'FLAW: Tamil farmers do not have water meters or millimetre measuring cups. A smallholder has a 5 HP borewell pump with a delivery pipe and controls irrigation by clock time.',
    humanEngineerAction: 'Refined',
    finalImplementationDetails: 'Re-engineered the engine to calculate pump flow rate (LPM = 150 * HP) and converted volume into exact runtime: "Irrigate for 45 minutes" for the farmer\'s specific acreage and motor.'
  },
  {
    stage: 'Safety & Pest Advisory',
    taskTitle: 'Crop Disease Management for Rice Blast & Leaf Sheaths',
    promptUsed: 'What are the top chemical and organic treatments for Pyricularia oryzae (Rice Blast) in South Indian paddy fields?',
    aiSuggestedOutput: 'Apply Monocrotophos 36% SL or Endosulfan 35% EC at 2 ml/Litre, or flood the paddy field with 10 cm water.',
    hallucinationOrFlawCaught: 'HALLUCINATION & CRITICAL REGULATORY VIOLATION: Both Monocrotophos and Endosulfan are strictly banned/restricted hazardous pesticides in Tamil Nadu. Furthermore, flooding fields spreads sheath blight mycelium rapidly.',
    humanEngineerAction: 'Rejected',
    finalImplementationDetails: 'Discarded AI suggestion. Enforced strict TNAU Agritech Portal verified package of practices: Tricyclazole 75% WP (0.6g/L) and bio-agent Pseudomonas fluorescens (10g/L), plus AWD water drainage.'
  },
  {
    stage: 'Meteorological Integration',
    taskTitle: 'Monsoon Rain Integration & Pumping Triggers',
    promptUsed: 'How should the irrigation recommendation adapt when rain forecast is 35mm in the next 24 hours during Northeast Monsoon?',
    aiSuggestedOutput: 'Recommend farmer irrigate half the normal amount today (50% irrigation) to prepare the crop root system for incoming rainfall.',
    hallucinationOrFlawCaught: 'LOGIC HALLUCINATION: Irrigating right before a 35mm tropical downpour causes severe waterlogging, rots crop roots, wastes thousands of litres of pumped groundwater, and burns valuable electricity.',
    humanEngineerAction: 'Rejected',
    finalImplementationDetails: 'Built a hard-coded 48-Hour Rain Prediction Kill-Switch: If predicted rain exceeds 10mm or rain probability > 60%, recommendation immediately locks to "WAIT / SKIP IRRIGATION", showing exact litres of groundwater and kWh electricity saved.'
  },
  {
    stage: 'Vernacular Natural Language',
    taskTitle: 'Tamil Agro-Vernacular Audio Prompts for Illiterate Farmers',
    promptUsed: 'Translate "Irrigation is deferred because soil water depletion is below 35% management allowable depletion threshold" to Tamil.',
    aiSuggestedOutput: 'மேலாண்மை அனுமதிக்கப்பட்ட வறட்சி வரம்பிற்கு கீழே மண் நீர் குறைவு இருப்பதால் பாசனம் ஒத்திவைக்கப்படுகிறது.',
    hallucinationOrFlawCaught: 'UNUSABLE FORMAL TRANSLATION: Pure academic Tamil that zero farmers in Dharmapuri or Thanjavur speak or understand in the field.',
    humanEngineerAction: 'Refined',
    finalImplementationDetails: 'Rewrote conversational prompts in genuine rural Tamil dialect: "மண்ணில் போதுமான ஈரம் உள்ளது. இன்று மோட்டார் போட வேண்டாம். காத்திருக்கவும்." (Soil has enough moisture. Do not start the motor today. Please wait).'
  }
];

export const CONCEPTS_ADOPTED_VS_REJECTED = [
  {
    conceptName: 'Direct Tamil Audio Read-Out (Web Speech API)',
    type: 'Adopted' as const,
    rationale: 'Allows farmers to listen to the recommendation while walking the field in bright sunlight without having to squint at a screen.'
  },
  {
    conceptName: '48-Hour Rain Avoidance Kill Switch',
    type: 'Adopted' as const,
    rationale: 'Prevents wasteful pumping when natural rainfall is on the horizon, saving an average of 42,000 litres per rain event.'
  },
  {
    conceptName: 'Live Mandi Price Tracker with MSP Comparison',
    type: 'Adopted' as const,
    rationale: 'Empowers farmers with real-time price leverage so they do not accept lowball prices from middlemen aggregators.'
  },
  {
    conceptName: 'TNAU Knapsack Tank Dosage Converter (Grams per Tank)',
    type: 'Adopted' as const,
    rationale: 'Farmers mix chemicals in 16-litre backpack sprayers; providing "grams per tank" eliminates calculation errors that cause crop burn.'
  },
  {
    conceptName: 'Complex Multi-Axis NDVI Satellite Graphs',
    type: 'Rejected' as const,
    rationale: 'Early user testing showed farmers were intimidated by 4-color spectral reflectance charts. Replaced with simple 3-light groundwater status.'
  },
  {
    conceptName: 'Hardware IoT Soil Moisture Sensor Dependency',
    type: 'Rejected' as const,
    rationale: 'IoT probes cost ₹45,000+ per unit, require cellular SIM recharge, and corrode in saline groundwater. Discarded in favor of meteorological water balance models.'
  },
  {
    conceptName: 'Text-Only Conversational Chatbot UI',
    type: 'Rejected' as const,
    rationale: 'Farmers cannot easily type detailed Tamil queries with soil-stained hands in bright sun. One-touch visual decision cards are far superior.'
  }
];

export const EARLY_PROTOTYPE_USER_FEEDBACK: UserFeedbackTrial[] = [
  {
    farmerName: 'S. Murugesan',
    farmerNameTa: 'எஸ். முருகேசன்',
    village: 'Palacode Village',
    district: 'Dharmapuri',
    landHoldingAcres: 2.0,
    primaryCrop: 'Groundnut (மணிலா)',
    irrigationSource: 'Borewell (650 ft, 5 HP Motor)',
    feedbackQuoteEn: 'Earlier, whenever 3-phase power came at 2 PM, I ran my motor for 4 hours non-stop. The app showed me my soil was already wet from yesterday\'s drizzle. By running it only 50 minutes, I stopped my borewell from running dry this summer.',
    feedbackQuoteTa: 'முன்பெல்லாம் மதியம் 2 மணிக்கு கரண்ட் வந்தாலே 4 மணி நேரம் மோட்டாரை ஓட விட்டுருவேன். இந்த ஆப்பில் "இன்று மோட்டார் போட வேண்டாம்" என்று தமிழில் குரல் கொடுத்தது. என் போர்வெல் இந்த கோடையில் வற்றாமல் தப்பியது.',
    preInterventionIssue: 'Panic pumping caused water table to dip below pump level twice a month',
    measuredOutcome: 'Reduced pumping by 3.2 hours/week; conserved ~1.1 Lakh Litres over 45 days',
    ratingScore: 5
  },
  {
    farmerName: 'V. Selvam',
    farmerNameTa: 'வி. செல்வம்',
    village: 'Ammapettai',
    district: 'Thanjavur',
    landHoldingAcres: 3.5,
    primaryCrop: 'Paddy (BPT-5204)',
    irrigationSource: 'Filter Point Borewell & Canal',
    feedbackQuoteEn: 'The leaf disease tool saved me ₹2,400. The pesticide shop man told me to buy three bottles of expensive chemicals for leaf spots. When I used this app, it identified normal sheath blight and told me to spray Hexaconazole at 30ml per tank and drain the excess water. Worked within 4 days.',
    feedbackQuoteTa: 'மருந்து கடைக்காரர் ₹2,400க்கு மூணு மருந்து வாங்க சொன்னார். இந்த ஆப்பில் இலையை பார்த்து "ஹெக்சாகோனசோல் 30 மிலி" டேங்கிற்கு ஊற்ற சொன்னது. 4 நாளில் நோய் கட்டுக்குள் வந்தது.',
    preInterventionIssue: 'Heavy spending on retail pesticide cocktails that aggravated leaf hopper pests',
    measuredOutcome: 'Saved ₹2,400 on chemical sprays; resolved sheath blight in 4 days',
    ratingScore: 5
  },
  {
    farmerName: 'K. Muthusamy',
    farmerNameTa: 'கே. முத்துசாமி',
    village: 'Udumalaipettai',
    district: 'Tirupur',
    landHoldingAcres: 4.0,
    primaryCrop: 'Coconut & Turmeric',
    irrigationSource: 'Borewell (750 ft, Drip Line)',
    feedbackQuoteEn: 'The Erode turmeric mandi rate update in the app helped me hold my harvest for 6 days until prices jumped by ₹350 per quintal. Also, the Tamil voice button is very clear even without wearing reading glasses.',
    feedbackQuoteTa: 'ஈரோடு மஞ்சள் சந்தை விலை ஏறுவதை பார்த்து 6 நாள் பொறுத்து விற்றேன். குவிண்டாலுக்கு ₹350 கூடுதல் லாபம் கிடைத்தது. கண்ணாடி போடாமலே தமிழ் குரல் கேட்டு தெரிந்து கொள்ளலாம்.',
    preInterventionIssue: 'Selling to local middleman aggregator at ₹800 below Erode market price',
    measuredOutcome: 'Earned ₹14,200 additional profit on turmeric harvest; 100% drip schedule adherence',
    ratingScore: 5
  },
  {
    farmerName: 'M. Chinnathambi',
    farmerNameTa: 'எம். சின்னத்தம்பி',
    village: 'Sendamangalam',
    district: 'Namakkal',
    landHoldingAcres: 1.5,
    primaryCrop: 'Tapioca & Maize',
    irrigationSource: 'Open Well + Borewell',
    feedbackQuoteEn: 'The rain avoidance alert is the best feature. Last Thursday it stopped me from pumping water because it predicted 28mm rain that evening. That evening it poured heavily! If I had pumped, all my fertilizer would have washed away.',
    feedbackQuoteTa: 'மழை வரப்போகிறது என்று மோட்டார் போடாதீங்கனு சொன்னது. அன்னைக்கு மாலையே நல்ல மழை! நான் மோட்டார் போட்டு இருந்தா போட்ட உரம் எல்லாம் அடிச்சுட்டு போயிருக்கும்.',
    preInterventionIssue: 'Irrigating before rainfall led to fertilizer runoff and root rotting',
    measuredOutcome: 'Prevented fertilizer loss of ~₹1,800 and saved 48 kWh electricity units',
    ratingScore: 5
  }
];

export const VALIDATION_PLAN_PHASE_2 = {
  cohortSize: '100 Farmers across 4 Agro-Climatic Zones in Tamil Nadu',
  partnerOrganizations: [
    'TNAU Krishi Vigyan Kendra (KVK) - Dharmapuri & Namakkal',
    'Uzhavar Producer Companies (FPOs) - Bhavani River Basin',
    'Tamil Nadu State Groundwater Resources Development Circle (SGWRDC)'
  ],
  testingTimeline: 'Kharif / Samba Cropping Season (120 Days)',
  primaryKeyPerformanceIndicators: [
    { metric: 'Groundwater Pumping Hours Reduction', target: '25% to 35% reduction in total borewell operating hours' },
    { metric: 'Electricity Units Conserved', target: '120 to 180 kWh saved per acre per season' },
    { metric: 'Farm Input Chemical Cost Savings', target: '₹1,500 to ₹3,000 saved per acre via precision TNAU dosage' },
    { metric: 'Mandi Price Realization', target: '8% to 15% higher farmgate revenue through transparent APMC price tracking' },
    { metric: 'Farmer Net Promoter Score (NPS)', target: '> 85% among rural non-English speaking users' }
  ]
};
