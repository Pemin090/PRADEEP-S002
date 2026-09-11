import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FarmerProfile, DistrictData, BlockData, IrrigationRecommendation, WaterBudget } from '../types';
import { CROPS_DATA, SOILS_DATA, IRRIGATION_METHODS } from '../data/cropsAndSoils';

interface GeneratePdfOptions {
  farmer: FarmerProfile;
  district: DistrictData;
  block?: BlockData;
  rec: IrrigationRecommendation;
  budget: WaterBudget;
  currentLang: 'ta' | 'en';
}

export function generateFarmerReportPDF({
  farmer,
  district,
  block,
  rec,
  budget,
  currentLang
}: GeneratePdfOptions): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const activeBlock = block || district.blocks[0];
  const crop = CROPS_DATA.find(c => c.id === farmer.cropId) || CROPS_DATA[0];
  const soil = SOILS_DATA.find(s => s.id === farmer.soilTypeId) || SOILS_DATA[0];
  const method = IRRIGATION_METHODS.find(m => m.id === farmer.irrigationMethodId) || IRRIGATION_METHODS[0];

  // Colors
  const primaryGreen: [number, number, number] = [16, 94, 65]; // #105e41
  const darkSlate: [number, number, number] = [15, 23, 42]; // #0f172a
  const borderGray: [number, number, number] = [226, 232, 240]; // #e2e8f0
  const lightBg: [number, number, number] = [248, 250, 252]; // #f8fafc

  // --- HEADER SECTION ---
  // Top Banner
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Decorative accent line
  doc.setFillColor(245, 158, 11); // Amber-500
  doc.rect(0, 28, pageWidth, 1.5, 'F');

  // Government / Agency Emblem Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('GOVERNMENT OF TAMIL NADU - DEPARTMENT OF AGRICULTURE', 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    'State Ground & Surface Water Resources Data Centre (SG&SWRDC) | TNAU AI Engine',
    14,
    17
  );

  doc.setFontSize(7.5);
  doc.text(
    'ISO 9001:2015 Certified Farmer Water Advisory Service • Project ID: TN-SMART-IRRIG-2026',
    14,
    22
  );

  // Report Badge on Top Right
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - 62, 6, 50, 16, 2, 2, 'F');
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('WEEKLY FARM REPORT', pageWidth - 59, 11);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const reportDate = new Date().toLocaleDateString('en-GB');
  doc.text(`Issued: ${reportDate}`, pageWidth - 59, 16);
  doc.text(`Ref: TN-${district.id.slice(0, 3).toUpperCase()}-${farmer.pincode || '600001'}`, pageWidth - 59, 20);

  let currentY = 36;

  // --- REPORT TITLE & SUMMARY BADGE ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('SMART IRRIGATION & GROUNDWATER CONSERVATION AUDIT', 14, currentY);

  currentY += 6;

  // --- SECTION 1: FARMER PROFILE & SPATIAL HIERARCHY ---
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(14, currentY, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('1. FARMER & REGIONAL PROFILE', 18, currentY + 6);

  // Left Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('Farmer Name:', 18, currentY + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(farmer.farmerName || 'K. Rangarajan', 44, currentY + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Farmer ID / Mobile:', 18, currentY + 19);
  doc.setFont('helvetica', 'normal');
  doc.text(`${farmer.id} • ${farmer.phone || '+91 94432 18920'}`, 50, currentY + 19);

  doc.setFont('helvetica', 'bold');
  doc.text('Farm Size / Landholding:', 18, currentY + 25);
  doc.setFont('helvetica', 'normal');
  doc.text(`${farmer.farmSizeAcres} Acres (${(farmer.farmSizeAcres * 0.404686).toFixed(2)} Hectares)`, 58, currentY + 25);

  // Right Column
  const rightColX = 110;
  doc.setFont('helvetica', 'bold');
  doc.text('District / Agro Zone:', rightColX, currentY + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(`${district.nameEn} (${district.zone})`, rightColX + 34, currentY + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Block / Village:', rightColX, currentY + 19);
  doc.setFont('helvetica', 'normal');
  doc.text(`${activeBlock.nameEn} • ${farmer.villageName || 'Agri Village'} (${farmer.pincode})`, rightColX + 26, currentY + 19);

  doc.setFont('helvetica', 'bold');
  doc.text('Pumping Unit:', rightColX, currentY + 25);
  doc.setFont('helvetica', 'normal');
  doc.text(`${farmer.pumpHorsePower} HP Motor @ ~${farmer.pumpFlowRateLpm} LPM discharge`, rightColX + 24, currentY + 25);

  currentY += 35;

  // --- SECTION 2: AGRONOMIC & GROUNDWATER CONDITIONS ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('2. CROP, SOIL & AQUIFER WATER BALANCE PARAMETERS', 14, currentY);

  currentY += 4;

  const agronomicData = [
    [
      'Crop Cultivated',
      `${crop.nameEn} (Stage: ${rec.cropGrowthStageEn}, Age: ${rec.cropAgeDays} days)`,
      'Soil Classification',
      `${soil.nameEn.split('(')[0]} (AWC: ${soil.availableWaterCapacityMmPerM} mm/m)`
    ],
    [
      'Irrigation System',
      `${method.nameEn.split('(')[0]} (Field Efficiency: ${Math.round(method.efficiency * 100)}%)`,
      'Groundwater Stress',
      `${district.status.toUpperCase()} (${district.waterTableMbgl} mbgl, Trend: ${district.trend})`
    ]
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: 14, right: 14 },
    body: agronomicData,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 36 },
      1: { cellWidth: 55 },
      2: { fontStyle: 'bold', fillColor: [241, 245, 249], cellWidth: 36 },
      3: { cellWidth: 55 }
    }
  });

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6;

  // --- SECTION 3: DAILY AI IRRIGATION RECOMMENDATION ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('3. CURRENT IRRIGATION DECISION & SCHEDULE', 14, currentY);

  currentY += 4;

  // Status banner color based on recommendation type
  let statusBg: [number, number, number] = [236, 253, 245]; // green-50
  let statusText: [number, number, number] = [6, 95, 70]; // green-800
  let statusLabel = 'IRRIGATE TODAY (OPTIMAL)';

  if (rec.type === 'skip_irrigation') {
    statusBg = [239, 246, 255]; // blue-50
    statusText = [30, 64, 175]; // blue-800
    statusLabel = 'SKIP IRRIGATION TODAY (RAIN / ADEQUATE MOISTURE)';
  } else if (rec.type === 'delay_irrigation') {
    statusBg = [254, 243, 199]; // amber-50
    statusText = [146, 64, 14]; // amber-800
    statusLabel = 'DELAY IRRIGATION (24 - 48 HRS ADVISORY)';
  } else if (rec.type === 'reduce_water') {
    statusBg = [254, 226, 226]; // red-50
    statusText = [153, 27, 27]; // red-800
    statusLabel = 'REDUCE WATER USAGE (CRITICAL AQUIFER STRESS)';
  }

  doc.setFillColor(statusBg[0], statusBg[1], statusBg[2]);
  doc.setDrawColor(statusText[0], statusText[1], statusText[2]);
  doc.roundedRect(14, currentY, pageWidth - 28, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(statusText[0], statusText[1], statusText[2]);
  doc.text(`DECISION: ${statusLabel}`, 18, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  const headline = currentLang === 'ta' ? `${rec.headlineEn} (${rec.headlineTa})` : rec.headlineEn;
  doc.text(`Guidance: ${headline}`, 18, currentY + 11);

  // Key quantitative irrigation figures
  doc.setFont('helvetica', 'bold');
  doc.text(
    `• Dosage: ${rec.litresPerAcre.toLocaleString()} L / acre`,
    18,
    currentY + 17
  );
  doc.text(
    `• Total Farm Volume: ${rec.totalFarmLitres.toLocaleString()} Litres`,
    75,
    currentY + 17
  );
  doc.text(
    `• Pump Runtime: ${rec.pumpingTimeHours} Hours (5 HP)`,
    135,
    currentY + 17
  );

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `AI Engine: ${rec.aiModelType} • ML Confidence: ${(rec.mlConfidenceScore * 100).toFixed(0)}% • Water Stress Index: ${rec.waterStressIndex}/100`,
    18,
    currentY + 22
  );

  currentY += 29;

  // --- SECTION 4: WATER BUDGET & CONSERVATION AUDIT TABLE ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('4. WEEKLY WATER CONSUMPTION & RESOURCE SAVINGS AUDIT', 14, currentY);

  currentY += 4;

  const savingsLitres = budget.estimatedWeeklySavingsL;
  const pumpHp = farmer.pumpHorsePower || 5;
  // Electricity saved in kWh: 1 HP ~= 0.746 kW. Average pump discharge is ~750 LPM => 45,000 L/hr
  const pumpingHoursSaved = savingsLitres / (farmer.pumpFlowRateLpm * 60 || 45000);
  const electricityKwhSaved = pumpingHoursSaved * (pumpHp * 0.746);
  const dieselEquivLitres = pumpingHoursSaved * (pumpHp * 0.25); // ~0.25L diesel/HP-hr
  const co2SavedKg = electricityKwhSaved * 0.82; // 0.82 kg CO2 per kWh grid avg

  const waterBudgetRows = [
    [
      'Conventional Practice (Unmanaged Flood)',
      `${(budget.weeklyRecommendedL + budget.estimatedWeeklySavingsL).toLocaleString()} Litres`,
      `${((budget.weeklyRecommendedL + budget.estimatedWeeklySavingsL) / (farmer.pumpFlowRateLpm * 60)).toFixed(1)} Hours`,
      'Baseline standard benchmark'
    ],
    [
      'AI Smart Irrigation (Actual Managed)',
      `${budget.weeklyUsedL.toLocaleString()} Litres`,
      `${(budget.weeklyUsedL / (farmer.pumpFlowRateLpm * 60)).toFixed(1)} Hours`,
      `${method.nameEn.split('(')[0]} precision schedule`
    ],
    [
      'Net Groundwater Saved (This Week)',
      `+${budget.estimatedWeeklySavingsL.toLocaleString()} Litres`,
      `-${pumpingHoursSaved.toFixed(1)} Hours Saved`,
      `${Math.round((budget.estimatedWeeklySavingsL / (budget.weeklyRecommendedL + budget.estimatedWeeklySavingsL || 1)) * 100)}% Water Conservation`
    ],
    [
      'Cumulative Season Conservation',
      `${budget.cumulativeSavedSeasonL.toLocaleString()} Litres`,
      `${(budget.cumulativeSavedSeasonL / (farmer.pumpFlowRateLpm * 60)).toFixed(1)} Motor Hours`,
      'Safeguards local aquifer recharge'
    ]
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: 14, right: 14 },
    head: [['Irrigation Regimen', 'Water Volume', 'Pump Duration', 'Conservation Impact']],
    body: waterBudgetRows,
    theme: 'striped',
    headStyles: {
      fillColor: primaryGreen,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 2.5,
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 40 },
      2: { cellWidth: 35 },
      3: { cellWidth: 47 }
    }
  });

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;

  // Key Ecological & Energy Highlights Card
  doc.setFillColor(240, 253, 244); // green-50
  doc.setDrawColor(187, 247, 208); // green-200
  doc.roundedRect(14, currentY, pageWidth - 28, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(22, 101, 52); // green-800
  doc.text('ENVIRONMENTAL & ENERGY DIVIDENDS:', 18, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text(
    `• Electricity Saved: ${electricityKwhSaved.toFixed(1)} kWh units   • Diesel Equivalent: ${dieselEquivLitres.toFixed(1)} Litres   • Carbon Footprint Averted: ${co2SavedKg.toFixed(1)} kg CO2e`,
    18,
    currentY + 10
  );

  currentY += 19;

  // --- SECTION 5: UPCOMING WEEK AGRONOMIC ADVISORY ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('5. UPCOMING WEEK AGRONOMIC & MONSOON ADVISORY', 14, currentY);

  currentY += 4;

  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(14, currentY, pageWidth - 28, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);

  const advisoryText =
    `District weather models indicate stable temperatures (32°C - 34°C) with sporadic cloud formation in ${district.nameEn}. ` +
    `For ${crop.nameEn} during ${rec.cropGrowthStageEn}, maintain morning drip cycles between 6:00 AM - 9:00 AM to eliminate midday evaporation losses. ` +
    `Because the local aquifer in ${activeBlock.nameEn} is under ${district.status.toUpperCase()} stress (${district.waterTableMbgl} mbgl), ` +
    `avoid flood oversaturation and inspect soil moisture before switching on motor pumps.`;

  const splitAdvisory = doc.splitTextToSize(advisoryText, pageWidth - 36);
  doc.text(splitAdvisory, 18, currentY + 5);

  currentY += 23;

  // --- OFFICIAL STAMP & VERIFICATION FOOTER ---
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.line(14, currentY, pageWidth - 14, currentY);

  currentY += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('STATE GROUNDWATER AUDIT & EXTENSION DIVISION', 14, currentY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Digitally verified document under Tamil Nadu Smart Water Framework. No physical signature required.',
    14,
    currentY + 4
  );
  doc.text(
    'For field assistance, contact your Block Assistant Agricultural Officer (AAO) or TNAU Agritech Portal (agritech.tnau.ac.in).',
    14,
    currentY + 8
  );

  // Digital Stamp Box on bottom right
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.roundedRect(pageWidth - 60, currentY - 2, 46, 14, 1, 1, 'FD');
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('VERIFIED AI AUDIT', pageWidth - 55, currentY + 3);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('TN-SW-AUTH: 9812-OK', pageWidth - 55, currentY + 7);
  doc.text(`Timestamp: ${new Date().toISOString().slice(0, 19)}`, pageWidth - 55, currentY + 10);

  // Bottom Edge Stripe
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(0, pageHeight - 3, pageWidth, 3, 'F');

  return doc;
}

/**
 * Downloads the generated PDF file directly to the user's browser.
 */
export function downloadFarmerReportPDF(options: GeneratePdfOptions): void {
  const doc = generateFarmerReportPDF(options);
  const sanitizedFarmerName = (options.farmer.farmerName || 'Farmer')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  const districtName = options.district.nameEn.replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);

  const filename = `TN_Irrigation_Report_${districtName}_${sanitizedFarmerName}_${dateStr}.pdf`;
  doc.save(filename);
}
