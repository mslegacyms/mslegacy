/**
 * Mock properties and investment opportunities data for MS Legacy website.
 * Mapped to the structure defined in PROPERTY_LISTING_DATA_TEMPLATE.md.
 */

export interface PropertyListing {
  id: string;
  visibility: "public" | "private";
  crm_owner: string;
  title: string;
  price: number;
  areaSqft: number;
  dimensions: string;
  location: string;
  category: "residential_plot" | "bda_site" | "villa" | "apartment" | "commercial_plot" | "office_space" | "farm_land";
  ownershipStatus: "clear_title" | "under_verification" | "disputed";
  legalStatus: "verified" | "under_review";
  reraStatus: "approved" | "applied" | "exempt" | "not_applicable";
  reraNumber?: string;
  khataCategory: "A-Khata" | "B-Khata" | "e-Khata";
  encumbranceStatus: string;
  roadAccess: string;
  waterSource: string;
  electricity: string;
  sewage: string;
  developmentModel: string;
  exitHorizonMonths?: number;
  wealthScore: {
    overall: number;
    location: number;
    legal: number;
    infrastructure: number;
    connectivity: number;
    summary: string;
  };
  riskNotes: string;
}

export const mockProperties: PropertyListing[] = [
  {
    id: "prop-001",
    visibility: "public",
    crm_owner: "superadmin-uuid",
    title: "Premium BDA-Approved Plots, Devanahalli Corridor",
    price: 7500000,
    areaSqft: 2400,
    dimensions: "40 x 60 ft",
    location: "Devanahalli Growth Corridor, North Bangalore",
    category: "bda_site",
    ownershipStatus: "clear_title",
    legalStatus: "verified",
    reraStatus: "approved",
    reraNumber: "PRM/KA/RERA/1250/303/PR/2026/00456",
    khataCategory: "A-Khata",
    encumbranceStatus: "Clear (No liens for 30 years verified)",
    roadAccess: "40ft asphalt approach road",
    waterSource: "Municipal connection + community borewell",
    electricity: "BESCOM grid connected",
    sewage: "Underground drainage and STP layout connected",
    developmentModel: "Turnkey residential layout",
    exitHorizonMonths: 36,
    wealthScore: {
      overall: 9.2,
      location: 9.5,
      legal: 9.8,
      infrastructure: 8.5,
      connectivity: 8.8,
      summary: "Located in a high-appreciation corridor adjacent to Airport expansion. Title chain trace shows zero encumbrances for 30 years. Road access and electrical grids are fully operational."
    },
    riskNotes: "Adjacent development layouts are active. Road widenings are proposed in the master plan but do not encroach on layout boundaries."
  },
  {
    id: "prop-002",
    visibility: "public",
    crm_owner: "sales-manager-uuid",
    title: "Bespoke Luxury Villa Plots, Whitefield East",
    price: 18500000,
    areaSqft: 4000,
    dimensions: "50 x 80 ft",
    location: "Hope Farm Junction Adjacent, Whitefield, East Bangalore",
    category: "villa",
    ownershipStatus: "clear_title",
    legalStatus: "verified",
    reraStatus: "approved",
    reraNumber: "PRM/KA/RERA/1250/303/PR/2026/00892",
    khataCategory: "A-Khata",
    encumbranceStatus: "Clear (No outstanding bank loans or disputes)",
    roadAccess: "60ft main gate approach with internal 30ft paved roads",
    waterSource: "BWSSB Kaveri water connection + rainwater harvesting grid",
    electricity: "Underground cabling BESCOM grid",
    sewage: "Integrated STP and greywater recycling layouts",
    developmentModel: "Custom premium villa construction PMC",
    exitHorizonMonths: 24,
    wealthScore: {
      overall: 9.4,
      location: 9.7,
      legal: 9.6,
      infrastructure: 9.2,
      connectivity: 9.5,
      summary: "Whitefield metro connectivity is 1.2km away. Core HNI residential area. Full builder verification complete with layout permissions."
    },
    riskNotes: "High-density residential zone; minor local road traffic during peak hours. Structural clearances are fully secure."
  },
  {
    id: "prop-003",
    visibility: "public",
    crm_owner: "sales-manager-uuid",
    title: "Managed Farm Communities, Kanakapura South",
    price: 4500000,
    areaSqft: 10890,
    dimensions: "Quarter Acre (10.89 Guntas)",
    location: "Kanakapura Road Expansion, South Bangalore Rural",
    category: "farm_land",
    ownershipStatus: "clear_title",
    legalStatus: "verified",
    reraStatus: "exempt",
    khataCategory: "e-Khata",
    encumbranceStatus: "Clear (Parent agriculture deeds trace 50 years)",
    roadAccess: "State Highway approach + 24ft internal mud roads",
    waterSource: "Natural aquifers + drip irrigation system connected",
    electricity: "Solar hybrid grid + BESCOM farm lines",
    sewage: "Ecological septic tanks + organic composting pits",
    developmentModel: "Managed agro-forestry and farmhouse retreat",
    exitHorizonMonths: 60,
    wealthScore: {
      overall: 8.8,
      location: 8.7,
      legal: 9.2,
      infrastructure: 8.0,
      connectivity: 8.2,
      summary: "Eco-tourism corridor showing steady agricultural plot demand. Perfect green buffer acquisition with security services."
    },
    riskNotes: "Agricultural conversion regulations apply for residential builds greater than 10% footprint. Forest department buffers are verified clear."
  },
  {
    id: "prop-004",
    visibility: "public",
    crm_owner: "superadmin-uuid",
    title: "Grade-A Commercial Plots, Outer Ring Road (ORR)",
    price: 45000000,
    areaSqft: 5400,
    dimensions: "60 x 90 ft",
    location: "Marathahalli-Sarjapur stretch, Outer Ring Road, East Bangalore",
    category: "commercial_plot",
    ownershipStatus: "clear_title",
    legalStatus: "verified",
    reraStatus: "not_applicable",
    khataCategory: "A-Khata",
    encumbranceStatus: "Clear (Institutional title insurance verified)",
    roadAccess: "80ft service road access directly off ORR",
    waterSource: "BWSSB dual line (potable + recycled sewage)",
    electricity: "High-voltage industrial BESCOM substation connection",
    sewage: "Main trunk line connection operational",
    developmentModel: "Commercial retail/office turnkey construction",
    exitHorizonMonths: 48,
    wealthScore: {
      overall: 9.5,
      location: 9.9,
      legal: 9.5,
      infrastructure: 9.6,
      connectivity: 9.8,
      summary: "Unmatched location score with massive premium office demand. Direct proximity to global tech parks and upcoming metro."
    },
    riskNotes: "Premium asset; subject to high local municipal taxes. Height restrictions apply based on aviation clearance codes due to proximity to old airport."
  }
];
