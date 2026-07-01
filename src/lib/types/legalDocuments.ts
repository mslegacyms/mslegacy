export type DocumentStatus =
  | "draft"
  | "pending_legal_review"
  | "legal_reviewed"
  | "approved_for_print"
  | "rejected"
  | "archived";

export type EntityType = "individual" | "company" | "partnership" | "LLP" | "trust";

export interface AgreementParty {
  name: string;
  fatherHusbandOrRep: string;
  age?: number;
  address: string;
  pan: string;
  aadhaar?: string;
  phone: string;
  email: string;
  entityType: EntityType;
  signatoryName?: string;
  signatoryDesignation?: string;
}

export type PropertyType =
  | "apartment"
  | "plot"
  | "villa"
  | "farmland"
  | "commercial"
  | "layout"
  | "other";

export interface PropertyDetails {
  propertyType: PropertyType;
  surveyNumber: string;
  siteNumber?: string;
  flatNumber?: string;
  khataNumber?: string;
  pidNumber?: string;
  villageOrLocality: string;
  hobliOrTaluk?: string;
  district?: string;
  boundariesEast: string;
  boundariesWest: string;
  boundariesNorth: string;
  boundariesSouth: string;
  extentArea: string; // e.g. "1200 sq.ft."
  builtUpArea?: string;
  undividedShare?: string; // UDS for apartments
  titleDocumentReference?: string;
  ecReference?: string;
  reraNumber?: string;
  scheduleDescription: string;
}

export interface PaymentScheduleItem {
  id: string;
  milestoneName: string;
  percentageAmount?: number;
  paymentAmount: number;
  dueDate?: string;
  status: "pending" | "paid" | "overdue";
}

export interface CommercialTerms {
  considerationAmount: number; // Sale price / contract value / rent
  advanceTokenAmount?: number;
  paymentMode: "bank_transfer" | "cheque" | "dd" | "cash" | "mixed";
  taxesResponsibility: string; // e.g., "Buyer", "Seller", "Developer"
  registrationExpenseResponsibility: string;
  possessionDate?: string;
  penaltyClause?: string;
  refundTerminationClause?: string;
  
  // Construction specific
  scopeOfWork?: string;
  costPerSqFt?: number;
  materialsSpecification?: string;
  timelineMonths?: number;
  defectLiabilityPeriod?: string;
  delayClause?: string;
  architectApprovalRequired?: boolean;
  changeOrderTerms?: string;
  
  // Rental specific
  monthlyRent?: number;
  securityDeposit?: number;
  lockInPeriodMonths?: number;
  noticePeriodDays?: number;
  leaseTermMonths?: number;
  maintenanceCharges?: number;
  utilitiesResponsibility?: string;
  permittedUse?: string;
  renewalTerms?: string;
  
  // Referral/Broker/CP specific
  leadOwner?: string;
  referralParty?: string;
  commissionPercentage?: number;
  commissionAmount?: number;
  triggerEvent?: string; // e.g. "Upon Booking", "Upon Agreement"
  paymentTimelineDays?: number;
  exclusivityAndNonCircumvention?: string;
  confidentialityTerms?: string;

  // Power of Attorney specific
  powersGranted?: string[];
  revocationTerms?: string;
  validityExpiry?: string;
  registrationRequirementNote?: string;
}

export interface WitnessDetails {
  name: string;
  fatherHusbandName: string;
  address: string;
  phone?: string;
}

export interface ApprovalHistoryItem {
  id: string;
  action: "create" | "update" | "request_review" | "approve" | "reject" | "archive";
  actorName: string;
  actorRole: string;
  timestamp: string;
  notes?: string;
}

export interface CompanyProfile {
  companyLegalName: string;
  brandName: string;
  registeredOfficeAddress: string;
  branchOfficeAddress?: string;
  cin?: string;
  gstin?: string;
  pan?: string;
  representedBy: string;
  designation: string;
  email: string;
  phone: string;
  website: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
  };
  standardDisclaimer: string;
  standardJurisdictionClause: string;
  authorizedSignatoryBlock: string;
}

export interface LegalDocumentTemplate {
  templateId: string;
  templateName: string;
  category: string;
  version: string;
  jurisdiction: string;
  legalReviewStatus: "reviewed" | "pending_legal_review";
  requiredFields: string[];
  optionalFields: string[];
  clauses: { title: string; body: string }[];
  renderDocument: (data: Partial<LegalDocumentDraft>) => string;
}

export interface LegalDocumentDraft {
  id: string;
  documentType: string; // maps to templateId
  documentTitle: string;
  draftNumber: string; // e.g., MSL-LD-2026-001
  createdBy: string; // actor name
  createdById: string; // actor user id
  createdAt: string;
  updatedAt: string;
  status: DocumentStatus;
  
  // Parties
  partyOne: AgreementParty; // Often auto-filled with MS Legacy details if MS Legacy is partyOne
  partyTwo: AgreementParty; // Client / Second Party
  
  // Master Profiles used at time of creation
  companyDetails: CompanyProfile;
  
  // Property and Commercial Details
  propertyDetails?: PropertyDetails;
  commercialTerms?: CommercialTerms;
  paymentSchedule?: PaymentScheduleItem[];
  
  // Clauses & Terms
  possessionTerms?: string;
  registrationTerms?: string;
  disputeResolution?: string;
  jurisdiction?: string;
  
  // Witness
  witnessOne?: WitnessDetails;
  witnessTwo?: WitnessDetails;
  
  // Additional Content
  specialClauses?: string;
  legalDisclaimer: string;
  
  // Review Status details
  advocateNotes?: string;
  approvalHistory: ApprovalHistoryItem[];
}
