export interface ApartmentAuthorityProfile {
  id: string;
  authorityName: string;
  jurisdictionType: string;
  applicableAreas: string;
  approvalPath: string;
  officialPortalName: string;
  officialPortalUrl: string;
  sourceDocumentName: string;
  sourceDocumentUrl: string;
  lastCheckedDate: string;
  verificationStatus: "editable_assumption" | "verified_from_official_source" | "needs_update";
  
  // FAR & Limits
  baseFAR: number;
  premiumFAR: number;
  tdrFAR: number;
  maxPermissibleFAR: number;
  groundCoveragePercent: number;
  setbackFrontFt: number;
  setbackRearFt: number;
  setbackSideFt: number;
  maxHeightAssumptionFt: number;
  maxFloorsAssumption: number;
  fireNocHeightTriggerFt: number;
  basementAllowed: boolean;
  stiltAllowed: boolean;
  parkingFloorAllowed: boolean;

  // Open Space & Services
  openSpacePercent: number;
  drivewayCirculationPercent: number;
  landscapePercent: number;
  utilityServicePercent: number;
  transformerYardPercent: number;
  stpAreaPercent: number;
  solidWasteAreaPercent: number;
  rainwaterHarvestingRequired: boolean;
  fireDrivewayRequired: boolean;

  // Parking
  carParkingPerUnit: number;
  visitorParkingPercent: number;
  twoWheelerParkingPerUnit: number;
  evChargingProvisionPercent: number;
  parkingAreaPerCarSqft: number;
  parkingEfficiencyPercent: number;

  // Efficiency
  carpetToSaleableEfficiencyPercent: number;
  commonAreaLoadingPercent: number;
  saleableEfficiencyPercent: number;
  balconyUtilityLoadingPercent: number;
  clubhouseAmenityLoadingPercent: number;

  // Costs
  approvalFeeEstimate: number;
  planSanctionEstimate: number;
  bettermentChargeEstimate: number;
  premiumFARCostEstimate: number;
  conversionCostEstimate: number;
  fireNocEstimate: number;
  airportNocEstimate: number;
  environmentNocEstimate: number;
  reraRegistrationEstimate: number;
  architectFeePercent: number;
  structuralConsultantFee: number;
  mepConsultantFee: number;
  legalDueDiligenceCost: number;
  liaisonSubmissionCost: number;
  contingencyPercent: number;
}

export const apartmentAuthorityProfiles: Record<string, ApartmentAuthorityProfile> = {
  bda_bbmp: {
    id: "bda_bbmp",
    authorityName: "BDA / GBA-BBMP Urban Apartment",
    jurisdictionType: "BBMP Wards & BDA Metropolitan Area",
    applicableAreas: "Bangalore corporate center, urban residential zones",
    approvalPath: "BBMP Town Planning Desk / BDA Planning Committee",
    officialPortalName: "BBMP Portal",
    officialPortalUrl: "https://bbmp.gov.in",
    sourceDocumentName: "BDA revised master plan building bylaws",
    sourceDocumentUrl: "https://bdabangalore.org",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "editable_assumption",
    
    baseFAR: 1.75,
    premiumFAR: 0.5,
    tdrFAR: 0.5,
    maxPermissibleFAR: 2.75,
    groundCoveragePercent: 45,
    setbackFrontFt: 15,
    setbackRearFt: 12,
    setbackSideFt: 12,
    maxHeightAssumptionFt: 120,
    maxFloorsAssumption: 12,
    fireNocHeightTriggerFt: 50,
    basementAllowed: true,
    stiltAllowed: true,
    parkingFloorAllowed: true,

    openSpacePercent: 25,
    drivewayCirculationPercent: 15,
    landscapePercent: 10,
    utilityServicePercent: 3,
    transformerYardPercent: 0.5,
    stpAreaPercent: 0.5,
    solidWasteAreaPercent: 0.5,
    rainwaterHarvestingRequired: true,
    fireDrivewayRequired: true,

    carParkingPerUnit: 1,
    visitorParkingPercent: 10,
    twoWheelerParkingPerUnit: 1,
    evChargingProvisionPercent: 20,
    parkingAreaPerCarSqft: 350,
    parkingEfficiencyPercent: 75,

    carpetToSaleableEfficiencyPercent: 70,
    commonAreaLoadingPercent: 25,
    saleableEfficiencyPercent: 75,
    balconyUtilityLoadingPercent: 5,
    clubhouseAmenityLoadingPercent: 5,

    approvalFeeEstimate: 500000,
    planSanctionEstimate: 800000,
    bettermentChargeEstimate: 350,
    premiumFARCostEstimate: 2000,
    conversionCostEstimate: 200000,
    fireNocEstimate: 100000,
    airportNocEstimate: 50000,
    environmentNocEstimate: 150000,
    reraRegistrationEstimate: 80000,
    architectFeePercent: 2.5,
    structuralConsultantFee: 150000,
    mepConsultantFee: 120000,
    legalDueDiligenceCost: 60000,
    liaisonSubmissionCost: 500000,
    contingencyPercent: 5
  },
  bmrda: {
    id: "bmrda",
    authorityName: "BMRDA Outskirts Apartment / Group Housing",
    jurisdictionType: "Bangalore rural outlines",
    applicableAreas: "Anekal, Nelamangala, Hoskote, Devanahalli outskirts",
    approvalPath: "Concerned Local Planning Authority / BMRDA Chairman Desk",
    officialPortalName: "BMRDA",
    officialPortalUrl: "https://bmrda.karnataka.gov.in",
    sourceDocumentName: "BMRDA Layout & Building Regulations 2024",
    sourceDocumentUrl: "https://bmrda.karnataka.gov.in",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "editable_assumption",

    baseFAR: 1.5,
    premiumFAR: 0.4,
    tdrFAR: 0.4,
    maxPermissibleFAR: 2.3,
    groundCoveragePercent: 40,
    setbackFrontFt: 18,
    setbackRearFt: 15,
    setbackSideFt: 15,
    maxHeightAssumptionFt: 80,
    maxFloorsAssumption: 8,
    fireNocHeightTriggerFt: 50,
    basementAllowed: true,
    stiltAllowed: true,
    parkingFloorAllowed: true,

    openSpacePercent: 30,
    drivewayCirculationPercent: 18,
    landscapePercent: 12,
    utilityServicePercent: 4,
    transformerYardPercent: 0.5,
    stpAreaPercent: 0.5,
    solidWasteAreaPercent: 0.5,
    rainwaterHarvestingRequired: true,
    fireDrivewayRequired: true,

    carParkingPerUnit: 1,
    visitorParkingPercent: 10,
    twoWheelerParkingPerUnit: 1,
    evChargingProvisionPercent: 15,
    parkingAreaPerCarSqft: 350,
    parkingEfficiencyPercent: 75,

    carpetToSaleableEfficiencyPercent: 68,
    commonAreaLoadingPercent: 27,
    saleableEfficiencyPercent: 73,
    balconyUtilityLoadingPercent: 5,
    clubhouseAmenityLoadingPercent: 5,

    approvalFeeEstimate: 350000,
    planSanctionEstimate: 600000,
    bettermentChargeEstimate: 200,
    premiumFARCostEstimate: 1500,
    conversionCostEstimate: 120000,
    fireNocEstimate: 80000,
    airportNocEstimate: 40000,
    environmentNocEstimate: 120000,
    reraRegistrationEstimate: 60000,
    architectFeePercent: 2,
    structuralConsultantFee: 120000,
    mepConsultantFee: 100000,
    legalDueDiligenceCost: 45000,
    liaisonSubmissionCost: 350000,
    contingencyPercent: 5
  },
  gram_panchayat: {
    id: "gram_panchayat",
    authorityName: "Gram Panchayat / e-Swathu Apartment",
    jurisdictionType: "Village outlines outside planning districts",
    applicableAreas: "Gramthana boundaries and outer rural village zones",
    approvalPath: "Taluk Panchayat Secretary & Panchayat Development Officer",
    officialPortalName: "e-Swathu Portal",
    officialPortalUrl: "https://eswathu.karnataka.gov.in",
    sourceDocumentName: "RDPR Building Directives",
    sourceDocumentUrl: "https://eswathu.karnataka.gov.in",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "editable_assumption",

    baseFAR: 1.25,
    premiumFAR: 0.0,
    tdrFAR: 0.0,
    maxPermissibleFAR: 1.25,
    groundCoveragePercent: 50,
    setbackFrontFt: 12,
    setbackRearFt: 10,
    setbackSideFt: 10,
    maxHeightAssumptionFt: 45,
    maxFloorsAssumption: 4,
    fireNocHeightTriggerFt: 50,
    basementAllowed: false,
    stiltAllowed: true,
    parkingFloorAllowed: false,

    openSpacePercent: 20,
    drivewayCirculationPercent: 12,
    landscapePercent: 8,
    utilityServicePercent: 2,
    transformerYardPercent: 0.5,
    stpAreaPercent: 0.5,
    solidWasteAreaPercent: 0.5,
    rainwaterHarvestingRequired: true,
    fireDrivewayRequired: false,

    carParkingPerUnit: 0.8,
    visitorParkingPercent: 5,
    twoWheelerParkingPerUnit: 1.2,
    evChargingProvisionPercent: 10,
    parkingAreaPerCarSqft: 350,
    parkingEfficiencyPercent: 75,

    carpetToSaleableEfficiencyPercent: 75,
    commonAreaLoadingPercent: 20,
    saleableEfficiencyPercent: 80,
    balconyUtilityLoadingPercent: 4,
    clubhouseAmenityLoadingPercent: 3,

    approvalFeeEstimate: 100000,
    planSanctionEstimate: 200000,
    bettermentChargeEstimate: 80,
    premiumFARCostEstimate: 0,
    conversionCostEstimate: 100000,
    fireNocEstimate: 0,
    airportNocEstimate: 0,
    environmentNocEstimate: 0,
    reraRegistrationEstimate: 50000,
    architectFeePercent: 1.5,
    structuralConsultantFee: 80000,
    mepConsultantFee: 60000,
    legalDueDiligenceCost: 35000,
    liaisonSubmissionCost: 150000,
    contingencyPercent: 5
  },
  dtcp: {
    id: "dtcp",
    authorityName: "DTCP / District Planning Apartment",
    jurisdictionType: "District outlines planning limits",
    applicableAreas: "Regional municipal outlines outside metropolitan regions",
    approvalPath: "DC planning board and local DTCP office",
    officialPortalName: "DTCP Karnataka",
    officialPortalUrl: "https://dtcp.karnataka.gov.in",
    sourceDocumentName: "KTCP Act Bylaws",
    sourceDocumentUrl: "https://dtcp.karnataka.gov.in",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "editable_assumption",

    baseFAR: 1.5,
    premiumFAR: 0.2,
    tdrFAR: 0.2,
    maxPermissibleFAR: 1.9,
    groundCoveragePercent: 45,
    setbackFrontFt: 15,
    setbackRearFt: 12,
    setbackSideFt: 12,
    maxHeightAssumptionFt: 60,
    maxFloorsAssumption: 6,
    fireNocHeightTriggerFt: 50,
    basementAllowed: true,
    stiltAllowed: true,
    parkingFloorAllowed: true,

    openSpacePercent: 25,
    drivewayCirculationPercent: 15,
    landscapePercent: 10,
    utilityServicePercent: 3,
    transformerYardPercent: 0.5,
    stpAreaPercent: 0.5,
    solidWasteAreaPercent: 0.5,
    rainwaterHarvestingRequired: true,
    fireDrivewayRequired: true,

    carParkingPerUnit: 1,
    visitorParkingPercent: 10,
    twoWheelerParkingPerUnit: 1,
    evChargingProvisionPercent: 10,
    parkingAreaPerCarSqft: 350,
    parkingEfficiencyPercent: 75,

    carpetToSaleableEfficiencyPercent: 70,
    commonAreaLoadingPercent: 25,
    saleableEfficiencyPercent: 75,
    balconyUtilityLoadingPercent: 5,
    clubhouseAmenityLoadingPercent: 5,

    approvalFeeEstimate: 200000,
    planSanctionEstimate: 400000,
    bettermentChargeEstimate: 100,
    premiumFARCostEstimate: 1000,
    conversionCostEstimate: 100000,
    fireNocEstimate: 50000,
    airportNocEstimate: 20000,
    environmentNocEstimate: 80000,
    reraRegistrationEstimate: 55000,
    architectFeePercent: 2,
    structuralConsultantFee: 100000,
    mepConsultantFee: 80000,
    legalDueDiligenceCost: 40000,
    liaisonSubmissionCost: 200000,
    contingencyPercent: 5
  }
};
export default apartmentAuthorityProfiles;
export type { ApartmentAuthorityProfile as ProfileType };
