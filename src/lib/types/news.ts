export type NewsVerificationStatus =
  | "official_source"
  | "verified_summary"
  | "public_news_summary"
  | "pending_verification"
  | "advisory_note";

export type NewsJurisdiction =
  | "Karnataka"
  | "Bengaluru"
  | "BDA"
  | "BMRDA"
  | "GBA_BBMP"
  | "Gram_Panchayat"
  | "DTCP"
  | "RERA"
  | "Other";

export type AffectedAudience =
  | "Buyers"
  | "NRIs"
  | "Landowners"
  | "Developers"
  | "Channel Partners"
  | "Investors";

export interface RelatedLink {
  label: string;
  url: string;
}

export interface NewsUpdateItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  officialSource: boolean;
  publishedDate: string;
  lastCheckedDate: string;
  verificationStatus: NewsVerificationStatus;
  jurisdiction: NewsJurisdiction;
  affectedAudience: AffectedAudience[];
  summary: string;
  msLegacyAdvisoryNote: string;
  actionRequired: string;
  relatedLinks: RelatedLink[];
  relatedCalculators: RelatedLink[];
  relatedGovernmentLinks: RelatedLink[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
