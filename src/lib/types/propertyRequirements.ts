export interface PropertyRequirement {
  id: string;
  requirementCode: string;
  title: string;
  slug: string;
  sourceType: 'client_submitted' | 'company_posted' | 'developer_requirement' | 'agent_requirement' | 'nri_requirement' | 'investor_requirement';
  requirementType: 'buy' | 'rent' | 'lease' | 'land_acquisition' | 'jv_development' | 'construction' | 'property_management';
  propertyCategory: 'apartment' | 'plotted_development' | 'villa' | 'farmland' | 'commercial' | 'land' | 'mixed_use' | 'warehouse' | 'rental';
  buyerProfile: 'end_user' | 'nri' | 'hni' | 'investor' | 'developer' | 'company' | 'channel_partner';
  preferredCity: string;
  preferredLocations: string[];
  microMarket?: string;
  budgetMin: number;
  budgetMax: number;
  budgetCurrency: string;
  landSizeMin?: number;
  landSizeMax?: number;
  landSizeUnit?: string;
  builtupAreaMin?: number;
  builtupAreaMax?: number;
  bedrooms?: string;
  possessionTimeline?: string;
  purchaseTimeline?: string;
  roadWidthRequirement?: string;
  approvalRequirement?: string;
  reraRequired: boolean;
  loanRequired: boolean;
  legalDueDiligenceRequired: boolean;
  siteVisitRequired: boolean;
  nriSupportRequired: boolean;
  requirementSummary: string;
  mustHaveFeatures: string[];
  niceToHaveFeatures: string[];
  restrictions?: string;
  publicVisibility: 'private' | 'public_sanitized' | 'internal_only' | 'archived';
  verificationStatus: 'new' | 'under_review' | 'qualified' | 'approved_public' | 'matched' | 'shared_with_partners' | 'converted' | 'closed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdBy?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactCity?: string;
  consentToContact: boolean;
  consentToShareSanitized: boolean;
  internalNotes?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequirementMatch {
  id: string;
  requirementId: string;
  matchedProjectId?: string;
  matchedDeveloperId?: string;
  matchedPropertyTitle?: string;
  matchType: 'project' | 'developer' | 'agent_property' | 'land_parcel' | 'manual_suggestion';
  matchScore?: number;
  matchReason?: string;
  matchStatus: 'suggested' | 'shortlisted' | 'sent_to_client' | 'client_interested' | 'rejected' | 'converted';
  createdBy?: string;
  createdAt: string;
}

export interface RequirementResponse {
  id: string;
  requirementId: string;
  responderType: 'developer' | 'agent' | 'channel_partner' | 'landowner' | 'internal_team';
  responderName: string;
  responderCompany?: string;
  responderPhone: string;
  responderEmail: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyCategory: 'apartment' | 'plotted_development' | 'villa' | 'farmland' | 'commercial' | 'land' | 'mixed_use' | 'warehouse' | 'rental';
  offeredPrice: number;
  propertyDetails?: string;
  documentLinks: string[];
  mediaLinks: string[];
  responseStatus: 'new' | 'under_review' | 'shortlisted' | 'rejected' | 'sent_to_client' | 'converted';
  internalNotes?: string;
  createdAt: string;
}

export interface RequirementActivityLog {
  id: string;
  requirementId: string;
  action: string;
  actorId?: string;
  notes?: string;
  createdAt: string;
}
