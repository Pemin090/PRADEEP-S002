export interface MandiPriceItem {
  id: string;
  cropId: string;
  cropNameEn: string;
  cropNameTa: string;
  varietyEn: string;
  varietyTa: string;
  mandiNameEn: string;
  mandiNameTa: string;
  districtId: string;
  districtNameEn: string;
  districtNameTa: string;
  modalPricePerQuintal: number; // ₹ per 100 kg
  minPricePerQuintal: number;
  maxPricePerQuintal: number;
  pricePerKg: number;
  govMspPerQuintal: number; // Minimum Support Price
  priceTrend: 'rising' | 'falling' | 'stable';
  dailyChangePerQuintal: number; // e.g. +120 or -80
  arrivalsTonnes: number;
  updatedDate: string;
  marketType: 'uzhavar_sandhai' | 'regulated_market' | 'wholesale_mandi';
  marketTypeLabelEn: string;
  marketTypeLabelTa: string;
  actionAdviceEn: string;
  actionAdviceTa: string;
  urgency: 'sell_now' | 'hold_stock' | 'fair_price';
}

export const TN_MANDI_PRICES: MandiPriceItem[] = [
  {
    id: 'mandi-paddy-thanjavur',
    cropId: 'paddy',
    cropNameEn: 'Paddy (Grade A / Fine)',
    cropNameTa: 'நெல் (கிரேடு A / BPT-5204)',
    varietyEn: 'BPT-5204 / Samba Mahsuri',
    varietyTa: 'பிபிடி 5204 / சம்பா',
    mandiNameEn: 'Thanjavur Regulated Market',
    mandiNameTa: 'தஞ்சாவூர் ஒழுங்குமுறை விற்பனைக்கூடம்',
    districtId: 'thanjavur',
    districtNameEn: 'Thanjavur',
    districtNameTa: 'தஞ்சாவூர்',
    modalPricePerQuintal: 2480,
    minPricePerQuintal: 2350,
    maxPricePerQuintal: 2560,
    pricePerKg: 24.8,
    govMspPerQuintal: 2320,
    priceTrend: 'rising',
    dailyChangePerQuintal: 60,
    arrivalsTonnes: 184,
    updatedDate: 'Today (Live)',
    marketType: 'regulated_market',
    marketTypeLabelEn: 'Regulated Market (APMC)',
    marketTypeLabelTa: 'ஒழுங்குமுறை விற்பனைக்கூடம்',
    actionAdviceEn: 'Prices above MSP by ₹160/Qtl. Good time to sell dry grain (moisture < 14%).',
    actionAdviceTa: 'அரசு ஆதார விலையை விட குவிண்டாலுக்கு ₹160 அதிகம். ஈரம் 14% குறைவாக உள்ள நெல்லை விற்க உகந்த நேரம்.',
    urgency: 'sell_now'
  },
  {
    id: 'mandi-turmeric-erode',
    cropId: 'turmeric',
    cropNameEn: 'Turmeric (Finger Variety)',
    cropNameTa: 'மஞ்சள் (விரலி ரகம்)',
    varietyEn: 'Erode Local Finger',
    varietyTa: 'ஈரோடு விரலி மஞ்சள்',
    mandiNameEn: 'Erode Agricultural Producers Coop Market',
    mandiNameTa: 'ஈரோடு கூட்டுறவு விற்பனை சங்கம் (செம்மாம்பாளையம்)',
    districtId: 'erode',
    districtNameEn: 'Erode',
    districtNameTa: 'ஈரோடு',
    modalPricePerQuintal: 14200,
    minPricePerQuintal: 12800,
    maxPricePerQuintal: 15450,
    pricePerKg: 142.0,
    govMspPerQuintal: 8500,
    priceTrend: 'rising',
    dailyChangePerQuintal: 350,
    arrivalsTonnes: 320,
    updatedDate: 'Today (Live)',
    marketType: 'wholesale_mandi',
    marketTypeLabelEn: 'Specialized Commodity Exchange',
    marketTypeLabelTa: 'மஞ்சள் பிரத்யேக சந்தை',
    actionAdviceEn: 'Strong export demand. High-curcumin fingers commanding premium rates. Sell in lots.',
    actionAdviceTa: 'ஏற்றுமதி தேவை அதிகம். விரலி மஞ்சளுக்கு நல்ல விலை கிடைக்கிறது. படிப்படியாக விற்கலாம்.',
    urgency: 'sell_now'
  },
  {
    id: 'mandi-coconut-pollachi',
    cropId: 'coconut',
    cropNameEn: 'Coconut (Medium Grade)',
    cropNameTa: 'தேங்காய் (நடுத்தர ரகம்)',
    varietyEn: 'West Coast Tall / Pollachi Green',
    varietyTa: 'பொள்ளாச்சி நாட்டு காய்',
    mandiNameEn: 'Pollachi Regulated Market',
    mandiNameTa: 'பொள்ளாச்சி ஒழுங்குமுறை சந்தை',
    districtId: 'coimbatore',
    districtNameEn: 'Coimbatore',
    districtNameTa: 'கோயம்புத்தூர்',
    modalPricePerQuintal: 3100, // Roughly ₹12-14 per nut
    minPricePerQuintal: 2800,
    maxPricePerQuintal: 3350,
    pricePerKg: 31.0,
    govMspPerQuintal: 2900,
    priceTrend: 'stable',
    dailyChangePerQuintal: 10,
    arrivalsTonnes: 210,
    updatedDate: 'Today (Live)',
    marketType: 'regulated_market',
    marketTypeLabelEn: 'Regulated Market',
    marketTypeLabelTa: 'ஒழுங்குமுறை சந்தை',
    actionAdviceEn: 'Direct farmgate copra procurement active. Rate at ₹13.50 per standard nut.',
    actionAdviceTa: 'தேங்காய் விலை சீராக உள்ளது (ஒரு காய் ₹13.50 வரை). கொப்பரை கொள்முதலும் தொடங்கப்பட்டுள்ளது.',
    urgency: 'fair_price'
  },
  {
    id: 'mandi-banana-oddanchatram',
    cropId: 'banana',
    cropNameEn: 'Banana (Poovan / Robusta)',
    cropNameTa: 'வாழை (பூவன் / ரோபஸ்டா)',
    varietyEn: 'Poovan Yellow',
    varietyTa: 'பூவன் ரகம்',
    mandiNameEn: 'Oddanchatram Daily Vegetable Market',
    mandiNameTa: 'ஒட்டன்சத்திரம் தினசரி சந்தை',
    districtId: 'dindigul',
    districtNameEn: 'Dindigul',
    districtNameTa: 'திண்டுக்கல்',
    modalPricePerQuintal: 2950,
    minPricePerQuintal: 2600,
    maxPricePerQuintal: 3200,
    pricePerKg: 29.5,
    govMspPerQuintal: 2100,
    priceTrend: 'rising',
    dailyChangePerQuintal: 120,
    arrivalsTonnes: 95,
    updatedDate: 'Today (Live)',
    marketType: 'wholesale_mandi',
    marketTypeLabelEn: 'Wholesale Mandi',
    marketTypeLabelTa: 'மொத்த விற்பனை சந்தை',
    actionAdviceEn: 'Festival season pull increasing. Immediate dispatch advised for mature bunches.',
    actionAdviceTa: 'விசேஷ தினங்களை முன்னிட்டு விலை உயர்வு. முற்றிய தார்களை உடனடியாக சந்தைக்கு கொண்டு செல்லவும்.',
    urgency: 'sell_now'
  },
  {
    id: 'mandi-groundnut-dharmapuri',
    cropId: 'groundnut',
    cropNameEn: 'Groundnut Pod (TMV-7 / JL-24)',
    cropNameTa: 'வேர்க்கடலை / மணிலா (TMV-7)',
    varietyEn: 'TMV-7 Pod with Shell',
    varietyTa: 'நாட்டு காய் (ஓட்டுடன்)',
    mandiNameEn: 'Dharmapuri Regulated Market',
    mandiNameTa: 'தருமபுரி ஒழுங்குமுறை விற்பனைக்கூடம்',
    districtId: 'dharmapuri',
    districtNameEn: 'Dharmapuri',
    districtNameTa: 'தருமபுரி',
    modalPricePerQuintal: 6920,
    minPricePerQuintal: 6400,
    maxPricePerQuintal: 7250,
    pricePerKg: 69.2,
    govMspPerQuintal: 6783,
    priceTrend: 'stable',
    dailyChangePerQuintal: -30,
    arrivalsTonnes: 72,
    updatedDate: 'Today (Live)',
    marketType: 'regulated_market',
    marketTypeLabelEn: 'Regulated Market',
    marketTypeLabelTa: 'ஒழுங்குமுறை சந்தை',
    actionAdviceEn: 'Prices hovering near MSP. Oil mills actively buying well-dried pods with oil content > 48%.',
    actionAdviceTa: 'ஆதார விலையை ஒட்டி விலை உள்ளது. நன்கு உலர்த்திய கடலைக்கு எண்ணெய் ஆலைகள் நல்ல விலை தருகின்றன.',
    urgency: 'fair_price'
  },
  {
    id: 'mandi-cotton-tirupur',
    cropId: 'cotton',
    cropNameEn: 'Cotton (Medium Staple / MCU-5)',
    cropNameTa: 'பருத்தி (MCU-5)',
    varietyEn: 'MCU-5 White Lint',
    varietyTa: 'நீள் இழை பருத்தி',
    mandiNameEn: 'Tirupur Cotton Market Committee',
    mandiNameTa: 'திருப்பூர் பருத்தி விற்பனைக்குழு',
    districtId: 'tirupur',
    districtNameEn: 'Tirupur',
    districtNameTa: 'திருப்பூர்',
    modalPricePerQuintal: 7450,
    minPricePerQuintal: 7100,
    maxPricePerQuintal: 7800,
    pricePerKg: 74.5,
    govMspPerQuintal: 7121,
    priceTrend: 'falling',
    dailyChangePerQuintal: -110,
    arrivalsTonnes: 140,
    updatedDate: 'Today (Live)',
    marketType: 'regulated_market',
    marketTypeLabelEn: 'Cotton Regulated Market',
    marketTypeLabelTa: 'பருத்தி ஒழுங்குமுறை சந்தை',
    actionAdviceEn: 'Mill inventory high. If holding clean pest-free bolls, hold 5–7 days for rebound.',
    actionAdviceTa: 'ஆலைகளில் கையிருப்பு அதிகம். சுத்தமான பருத்தியை 5-7 நாட்கள் சேமித்து வைத்து விற்கலாம்.',
    urgency: 'hold_stock'
  },
  {
    id: 'mandi-tomato-uzhavar',
    cropId: 'vegetables',
    cropNameEn: 'Country Tomato (நாட்டு தக்காளி)',
    cropNameTa: 'நாட்டு தக்காளி',
    varietyEn: 'Local Hybrid Shivam',
    varietyTa: 'சிவம் / நாட்டு தக்காளி',
    mandiNameEn: 'Madurai Mattuthavani Uzhavar Sandhai',
    mandiNameTa: 'மதுரை மாட்டுத்தாவணி உழவர் சந்தை',
    districtId: 'madurai',
    districtNameEn: 'Madurai',
    districtNameTa: 'மதுரை',
    modalPricePerQuintal: 3200, // ₹32/kg
    minPricePerQuintal: 2800,
    maxPricePerQuintal: 3600,
    pricePerKg: 32.0,
    govMspPerQuintal: 1800,
    priceTrend: 'rising',
    dailyChangePerQuintal: 250,
    arrivalsTonnes: 45,
    updatedDate: 'Today (Live)',
    marketType: 'uzhavar_sandhai',
    marketTypeLabelEn: 'Direct Farmer Market (Uzhavar Sandhai)',
    marketTypeLabelTa: 'நேரடி உழவர் சந்தை (இடைத்தரகர் இல்லை)',
    actionAdviceEn: 'Zero middleman commission at Uzhavar Sandhai gives farmers 100% consumer price.',
    actionAdviceTa: 'உழவர் சந்தையில் இடைத்தரகர்கள் இன்றி நுகர்வோருக்கு நேரடியாக விற்கலாம். 100% லாபம்.',
    urgency: 'sell_now'
  },
  {
    id: 'mandi-sugarcane-villupuram',
    cropId: 'sugarcane',
    cropNameEn: 'Sugarcane (Crushing Cane)',
    cropNameTa: 'கரும்பு (ஆலை அரவை)',
    varietyEn: 'Co 86032 / Si 024',
    varietyTa: 'Co 86032 ரகம்',
    mandiNameEn: 'Villupuram Cooperative Sugar Mill Rate',
    mandiNameTa: 'விழுப்புரம் கூட்டுறவு சர்க்கரை ஆலை',
    districtId: 'villupuram',
    districtNameEn: 'Villupuram',
    districtNameTa: 'விழுப்புரம்',
    modalPricePerQuintal: 340, // ₹3,400 per Tonne
    minPricePerQuintal: 315,
    maxPricePerQuintal: 355,
    pricePerKg: 3.4,
    govMspPerQuintal: 315,
    priceTrend: 'stable',
    dailyChangePerQuintal: 0,
    arrivalsTonnes: 1250,
    updatedDate: 'Today (Live)',
    marketType: 'regulated_market',
    marketTypeLabelEn: 'FRP (Fair & Remunerative Price)',
    marketTypeLabelTa: 'மத்திய அரசு நியாய விலை (FRP)',
    actionAdviceEn: 'Mill cutting order (வெட்டு உத்தரவு) schedule strictly enforced with 9.5% recovery rate.',
    actionAdviceTa: 'ஆலை வெட்டு உத்தரவு படி அறுவடை செய்க. 9.5% சர்க்கரை பிழிதிறன் அடிப்படையில் பணம் பட்டுவாடா.',
    urgency: 'fair_price'
  }
];
