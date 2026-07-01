import { LegalDocumentDraft } from "../types/legalDocuments";
import { msLegacyCompanyProfile } from "../company/msLegacyCompanyProfile";

// Standard mock draft templates
export const initialMockDrafts: LegalDocumentDraft[] = [
  {
    id: "draft-001",
    documentType: "agreement-to-sell",
    documentTitle: "Agreement to Sell — Kanakapura Managed Farmland",
    draftNumber: "MSL-LD-2026-001",
    createdBy: "Rajesh Kumar (Sales)",
    createdById: "sales-user-id",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending_legal_review",
    companyDetails: msLegacyCompanyProfile,
    partyOne: {
      name: "MS Legacy Developers Private Limited",
      fatherHusbandOrRep: "Muzzamil Ahmad (Managing Director)",
      address: msLegacyCompanyProfile.registeredOfficeAddress,
      pan: msLegacyCompanyProfile.pan || "AAFCM2345K",
      phone: msLegacyCompanyProfile.phone,
      email: msLegacyCompanyProfile.email,
      entityType: "company",
      signatoryName: "Muzzamil Ahmad",
      signatoryDesignation: "Managing Director"
    },
    partyTwo: {
      name: "Suresh Gowda",
      fatherHusbandOrRep: "Late Chikka Gowda",
      age: 52,
      address: "No. 18, 5th Main, Banashankari 3rd Stage, Bangalore - 560085",
      pan: "APQPG1254L",
      phone: "+91 99887 76655",
      email: "suresh.gowda@gmail.com",
      entityType: "individual"
    },
    propertyDetails: {
      propertyType: "farmland",
      surveyNumber: "Survey No. 204/1A",
      siteNumber: "Plot No. 15",
      khataNumber: "E-Khata No. 204-15",
      pidNumber: "PID-KAN-20415",
      villageOrLocality: "Kanakapura Managed Farmland, Harohalli Hobli",
      hobliOrTaluk: "Kanakapura Taluk",
      district: "Ramanagara District",
      boundariesEast: "Plot No. 16",
      boundariesWest: "Common 30ft Mud Road",
      boundariesNorth: "Plot No. 14",
      boundariesSouth: "Private agricultural land",
      extentArea: "10,000 sq.ft (Approx 9.1 Gunta)",
      scheduleDescription: "All that piece and parcel of agricultural land forming part of Survey No 204/1A, marked as Plot No. 15 measuring 10,000 sq.ft, bounded as per layout sketch."
    },
    commercialTerms: {
      considerationAmount: 3500000,
      advanceTokenAmount: 500000,
      paymentMode: "bank_transfer",
      taxesResponsibility: "Lessor / Seller clears all agricultural cess; Buyer pays 1% TDS",
      registrationExpenseResponsibility: "Buyer",
      possessionDate: "2026-08-15",
      penaltyClause: "If Buyer defaults, 10% of advance amount is forfeited. If Seller defaults, advance refunded with 12% interest.",
      refundTerminationClause: "Refundable in full if clear marketable title search report fails advocate verification."
    },
    paymentSchedule: [
      { id: "ms-1", milestoneName: "Booking Advance", percentageAmount: 14.28, paymentAmount: 500000, status: "paid" },
      { id: "ms-2", milestoneName: "Title Deed Verification Clearance", percentageAmount: 28.57, paymentAmount: 1000000, status: "pending" },
      { id: "ms-3", milestoneName: "Registration & Physical Handover", percentageAmount: 57.15, paymentAmount: 2000000, status: "pending" }
    ],
    witnessOne: {
      name: "Anand Gowda",
      fatherHusbandName: "Suresh Gowda",
      address: "Banashankari, Bangalore"
    },
    witnessTwo: {
      name: "Naveen Kumar",
      fatherHusbandName: "Raju Lal",
      address: "Kanakapura Town"
    },
    disputeResolution: "Disputes shall be settled under the Arbitration and Conciliation Act, 1996 in Bangalore.",
    jurisdiction: "Bangalore, Karnataka",
    legalDisclaimer: msLegacyCompanyProfile.standardDisclaimer,
    advocateNotes: "Checking parent partition deed from 1998. Need family tree certificate of landowners before registration.",
    approvalHistory: [
      { id: "h-1", action: "create", actorName: "Rajesh Kumar (Sales)", actorRole: "Sales Representative", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), notes: "Initial draft generated for client review." },
      { id: "h-2", action: "request_review", actorName: "Rajesh Kumar (Sales)", actorRole: "Sales Representative", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), notes: "Sent to Legal desk for title deed reference check." }
    ]
  },
  {
    id: "draft-002",
    documentType: "sale-deed",
    documentTitle: "Absolute Sale Deed — Whitefield Villa Plots",
    draftNumber: "MSL-LD-2026-002",
    createdBy: "Muzzamil Ahmad (Founder)",
    createdById: "admin-user-id",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "approved_for_print",
    companyDetails: msLegacyCompanyProfile,
    partyOne: {
      name: "MS Legacy Developers Private Limited",
      fatherHusbandOrRep: "Muzzamil Ahmad (Managing Director)",
      address: msLegacyCompanyProfile.registeredOfficeAddress,
      pan: msLegacyCompanyProfile.pan || "AAFCM2345K",
      phone: msLegacyCompanyProfile.phone,
      email: msLegacyCompanyProfile.email,
      entityType: "company",
      signatoryName: "Muzzamil Ahmad",
      signatoryDesignation: "Managing Director"
    },
    partyTwo: {
      name: "Ananya Sharma",
      fatherHusbandOrRep: "Dr. Vikram Sharma",
      age: 38,
      address: "Apt 904, Prestige Shantiniketan, Whitefield, Bangalore - 560066",
      pan: "BDKPS8472M",
      phone: "+91 98450 11223",
      email: "ananya.sharma@yahoo.com",
      entityType: "individual"
    },
    propertyDetails: {
      propertyType: "plot",
      surveyNumber: "Survey No. 42/3",
      siteNumber: "Site No. 8",
      khataNumber: "A-Khata BBMP No. 104-W8",
      pidNumber: "PID-WFD-04208",
      villageOrLocality: "Whitefield Villa Plots Layout, Whitefield Hobli",
      hobliOrTaluk: "Bangalore East Taluk",
      district: "Bangalore Urban District",
      boundariesEast: "Site No. 9",
      boundariesWest: "40 Feet Asphalted Road",
      boundariesNorth: "Site No. 7",
      boundariesSouth: "Common park boundary",
      extentArea: "2,400 sq.ft (40x60 ft)",
      scheduleDescription: "Site No. 8 measuring East to West 40 feet, North to South 60 feet, in all measuring 2,400 sq.ft, carved out of residential converted land in Survey No. 42/3."
    },
    commercialTerms: {
      considerationAmount: 18000000,
      advanceTokenAmount: 2000000,
      paymentMode: "bank_transfer",
      taxesResponsibility: "Buyer pays 1% TDS. Seller pays capital gains taxes.",
      registrationExpenseResponsibility: "Buyer",
      possessionDate: "2026-07-02",
      penaltyClause: "Forfeiture of token amount if buyer defaults. Double the token amount refundable if seller backs out.",
      refundTerminationClause: "None once registered."
    },
    paymentSchedule: [
      { id: "ms-4", milestoneName: "Initial booking deposit", percentageAmount: 11.11, paymentAmount: 2000000, status: "paid" },
      { id: "ms-5", milestoneName: "Bank Loan disbursement & Final registration", percentageAmount: 88.89, paymentAmount: 16000000, status: "paid" }
    ],
    witnessOne: {
      name: "Ramesh Sharma",
      fatherHusbandName: "Dr. Vikram Sharma",
      address: "Whitefield, Bangalore"
    },
    witnessTwo: {
      name: "Sanjay Sen",
      fatherHusbandName: "K. Sen",
      address: "Marathahalli, Bangalore"
    },
    disputeResolution: "Subject to mutual negotiation, failing which courts of Bangalore shall have exclusive jurisdiction.",
    jurisdiction: "Bangalore, Karnataka",
    legalDisclaimer: msLegacyCompanyProfile.standardDisclaimer,
    advocateNotes: "Title verification reports from Advocate H.S. Rao cleared. BBMP A-Khata transfer receipt copy received.",
    approvalHistory: [
      { id: "h-3", action: "create", actorName: "Muzzamil Ahmad (Founder)", actorRole: "Founder", timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { id: "h-4", action: "approve", actorName: "Advocate H.S. Rao", actorRole: "Legal & Title Officer", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), notes: "Title verified and cleared. Approved for printing and execution." }
    ]
  }
];

// LocalStorage helpers
const STORAGE_KEY = "mslegacy_legal_drafts";

export function getStoredDrafts(): LegalDocumentDraft[] {
  if (typeof window === "undefined") return initialMockDrafts;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockDrafts));
    return initialMockDrafts;
  }
  
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse stored legal drafts:", err);
    return initialMockDrafts;
  }
}

export function saveStoredDrafts(drafts: LegalDocumentDraft[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function getStoredDraftById(id: string): LegalDocumentDraft | null {
  const drafts = getStoredDrafts();
  return drafts.find(d => d.id === id) || null;
}

export function upsertStoredDraft(draft: LegalDocumentDraft): void {
  const drafts = getStoredDrafts();
  const index = drafts.findIndex(d => d.id === draft.id);
  
  if (index >= 0) {
    drafts[index] = { ...draft, updatedAt: new Date().toISOString() };
  } else {
    drafts.push({ ...draft, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  
  saveStoredDrafts(drafts);
}

export function deleteStoredDraft(id: string): void {
  const drafts = getStoredDrafts();
  const filtered = drafts.filter(d => d.id !== id);
  saveStoredDrafts(filtered);
}
