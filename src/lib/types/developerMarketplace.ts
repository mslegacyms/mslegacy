// developerMarketplace.ts
// TypeScript types for developers and project discovery profiles

export interface Developer {
  id: string;
  name: string;
  slug: string;
  legalName?: string;
  developerType?: string;
  headquarters?: string;
  websiteUrl?: string;
  logoPath?: string;
  logoAlt?: string;
  logoPermissionStatus: "pending_permission" | "approved" | "denied" | "permission_received" | "permission_received_asset_pending" | "permission_claimed_pending_document" | "internal_asset" | "public_marketing_use_allowed" | "not_allowed";
  logoSource?: string;
  logoLastUpdated?: string;
  description?: string;
  establishedYear?: number;
  totalProjectsCount?: number;
  completedProjectsCount?: number;
  ongoingProjectsCount?: number;
  upcomingProjectsCount?: number;
  verificationStatus: "pending_verification" | "verified" | "unverified";
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface DeveloperProject {
  id: string;
  developerId?: string;
  name: string;
  slug: string;
  projectType: "apartment" | "plotted" | "villa" | "farmland" | "mixed_use" | "commercial" | "township";
  projectStatus: "ongoing" | "completed" | "upcoming" | "pre_launch_watchlist" | "sold_out" | "under_verification";
  city?: string;
  microMarket?: string;
  locality?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  reraNumber?: string;
  reraStatus: "pending_verification" | "approved" | "not_applicable" | "under_process";
  possessionStatus?: string;
  possessionDate?: string;
  launchStatus?: string;
  landArea?: string;
  totalUnits?: number;
  towersOrPhases?: string;
  configurationSummary?: string;
  priceRange?: string;
  startingPrice?: number;
  maxPrice?: number;
  currency?: string;
  amenities?: string[];
  approvalsSummary?: string;
  legalStatus?: string;
  constructionStatus?: string;
  mslegacyVerificationStatus: "pending_verification" | "verified" | "unverified" | "rera_matched" | "developer_confirmed" | "mslegacy_reviewed" | "needs_legal_review";
  publicVisibility: "draft" | "published" | "public_information" | "internal_only" | "legal_review_only" | "private_draft";
  enquiryEnabled: boolean;
  disclaimer?: string;
  heroImage?: string;
  cardImage?: string;
  galleryImages?: string[];
  videoUrl?: string;
  videoPoster?: string;
  brochurePath?: string;
  floorPlanPaths?: string[];
  masterPlanPath?: string;
  mapImage?: string;
  mediaPermissionStatus?: "permission_received" | "permission_claimed_pending_document" | "internal_asset" | "public_marketing_use_allowed" | "pending_permission" | "not_allowed";
  logoPermissionStatus?: "permission_received" | "permission_claimed_pending_document" | "internal_asset" | "public_marketing_use_allowed" | "pending_permission" | "not_allowed";
  brochurePermissionStatus?: string;
  floorPlanPermissionStatus?: string;
  infoPermissionStatus?: string;
  sourceUrl?: string;
  lastUpdated?: string;
  sourceStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectUnitType {
  id: string;
  projectId: string;
  unitLabel: string;
  unitType: string;
  bedrooms?: number;
  bathrooms?: number;
  builtUpArea?: string;
  carpetArea?: string;
  plotArea?: string;
  priceLabel?: string;
  startingPrice?: number;
  floorPlanPath?: string;
  floorPlanPermissionStatus?: "pending_permission" | "approved" | "denied" | "permission_received" | "not_allowed";
  availabilityStatus: "check_with_developer" | "available" | "sold_out";
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectMediaAsset {
  id: string;
  projectId: string;
  assetType: "logo" | "hero_image" | "gallery_image" | "floor_plan" | "master_plan" | "brochure" | "video" | "map" | "rera_certificate";
  title: string;
  storagePath?: string;
  externalUrl?: string;
  permissionStatus: "pending_permission" | "approved" | "denied";
  caption?: string;
  displayOrder?: number;
  createdAt?: string;
}

export interface ProjectVerificationRecord {
  id: string;
  projectId: string;
  verificationType: "rera" | "developer_website" | "brochure" | "site_visit" | "legal_document" | "public_record" | "mslegacy_internal";
  sourceName?: string;
  sourceUrl?: string;
  verifiedValue?: string;
  verificationStatus: "pending" | "verified" | "failed";
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  createdAt?: string;
}

export interface ProjectEnquiry {
  id: string;
  projectId?: string;
  developerId?: string;
  leadId?: string;
  fullName: string;
  phone?: string;
  email?: string;
  interestType?: string;
  message?: string;
  enquirySource: string;
  createdAt?: string;
}
