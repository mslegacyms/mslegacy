export interface LayoutAuthorityProfile {
  id: string;
  authorityName: string;
  sourceName: string;
  sourceUrl: string;
  lastVerifiedDate: string;
  verificationStatus: "editable_assumption" | "verified_from_official_source" | "needs_update";
  
  // Percentages
  roadAllocationPercent: number;
  parkOpenSpacePercent: number;
  civicAmenityPercent: number;
  utilityAreaPercent: number;
  drainageBufferPercent: number;
  reservedLandPercent: number;
  targetSaleableEfficiencyPercent: number;

  // Costs
  approvalFeePerAcre: number;
  bettermentChargePerSqft: number;
  landConversionCostPerAcre: number;
  surveyCostPerAcre: number;
  planningConsultantFeePercent: number;
  architectFeePercent: number;
  legalDueDiligenceCost: number;
  liaisonAndSubmissionCost: number;
  reraRegistrationCostEstimate: number;
  contingencyPercent: number;
}

export const layoutAuthorityProfiles: Record<string, LayoutAuthorityProfile> = {
  bda_bbmp: {
    id: "bda_bbmp",
    authorityName: "BDA / GBA-BBMP Urban Planning",
    sourceName: "BDA Master Plan revised bye-laws",
    sourceUrl: "https://bdabangalore.org",
    lastVerifiedDate: "2026-06-28",
    verificationStatus: "editable_assumption",
    
    roadAllocationPercent: 25,
    parkOpenSpacePercent: 10,
    civicAmenityPercent: 5,
    utilityAreaPercent: 3,
    drainageBufferPercent: 5,
    reservedLandPercent: 2,
    targetSaleableEfficiencyPercent: 50,

    approvalFeePerAcre: 250000,
    bettermentChargePerSqft: 200,
    landConversionCostPerAcre: 150000,
    surveyCostPerAcre: 25000,
    planningConsultantFeePercent: 2,
    architectFeePercent: 1.5,
    legalDueDiligenceCost: 50000,
    liaisonAndSubmissionCost: 350000,
    reraRegistrationCostEstimate: 75000,
    contingencyPercent: 5
  },
  bmrda: {
    id: "bmrda",
    authorityName: "BMRDA Residential Layout",
    sourceName: "BMRDA layout directives",
    sourceUrl: "https://bmrda.karnataka.gov.in",
    lastVerifiedDate: "2026-06-28",
    verificationStatus: "editable_assumption",

    roadAllocationPercent: 25, // roads + CA balancing inside reserved
    parkOpenSpacePercent: 15, // minimum 15% parks/playgrounds
    civicAmenityPercent: 5,
    utilityAreaPercent: 3,
    drainageBufferPercent: 2,
    reservedLandPercent: 0,
    targetSaleableEfficiencyPercent: 50,

    approvalFeePerAcre: 180000,
    bettermentChargePerSqft: 150,
    landConversionCostPerAcre: 120000,
    surveyCostPerAcre: 20000,
    planningConsultantFeePercent: 2,
    architectFeePercent: 1.5,
    legalDueDiligenceCost: 45000,
    liaisonAndSubmissionCost: 250000,
    reraRegistrationCostEstimate: 60000,
    contingencyPercent: 5
  },
  gram_panchayat: {
    id: "gram_panchayat",
    authorityName: "Gram Panchayat / e-Swathu limits",
    sourceName: "RDPR Panchayat guidelines",
    sourceUrl: "https://eswathu.karnataka.gov.in",
    lastVerifiedDate: "2026-06-28",
    verificationStatus: "editable_assumption",

    roadAllocationPercent: 20,
    parkOpenSpacePercent: 10,
    civicAmenityPercent: 5,
    utilityAreaPercent: 3,
    drainageBufferPercent: 5,
    reservedLandPercent: 5,
    targetSaleableEfficiencyPercent: 52,

    approvalFeePerAcre: 80000,
    bettermentChargePerSqft: 50,
    landConversionCostPerAcre: 100000,
    surveyCostPerAcre: 15000,
    planningConsultantFeePercent: 1.5,
    architectFeePercent: 1,
    legalDueDiligenceCost: 35000,
    liaisonAndSubmissionCost: 150000,
    reraRegistrationCostEstimate: 50000,
    contingencyPercent: 5
  },
  dtcp: {
    id: "dtcp",
    authorityName: "DTCP / District Planning Authority",
    sourceName: "DTCP Layout specifications",
    sourceUrl: "https://dtcp.karnataka.gov.in",
    lastVerifiedDate: "2026-06-28",
    verificationStatus: "editable_assumption",

    roadAllocationPercent: 22,
    parkOpenSpacePercent: 10,
    civicAmenityPercent: 5,
    utilityAreaPercent: 3,
    drainageBufferPercent: 5,
    reservedLandPercent: 5,
    targetSaleableEfficiencyPercent: 50,

    approvalFeePerAcre: 120000,
    bettermentChargePerSqft: 80,
    landConversionCostPerAcre: 100000,
    surveyCostPerAcre: 18000,
    planningConsultantFeePercent: 2,
    architectFeePercent: 1.5,
    legalDueDiligenceCost: 40000,
    liaisonAndSubmissionCost: 200000,
    reraRegistrationCostEstimate: 55000,
    contingencyPercent: 5
  }
};
