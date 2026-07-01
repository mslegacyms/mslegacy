import { NewsUpdateItem } from "../types/news";

export const mockNewsUpdates: NewsUpdateItem[] = [
  {
    id: "news_1",
    title: "Karnataka RERA Verification Checklist Guide",
    slug: "karnataka-rera-verification-guide",
    excerpt: "Learn how to query the official Karnataka RERA portal to verify promoter history, project extension certificates, and approved site layouts.",
    category: "RERA Updates",
    tags: ["RERA", "Due Diligence", "Approvals"],
    sourceName: "RERA Karnataka Portal",
    sourceUrl: "https://rera.karnataka.gov.in",
    officialSource: true,
    publishedDate: "2026-06-15",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "official_source",
    jurisdiction: "RERA",
    affectedAudience: ["Buyers", "NRIs", "Developers", "Investors"],
    summary: "RERA project verification is the single most critical step in buying an under-construction apartment or gated layout plot. This guide provides a step-by-step checklist to search the Karnataka RERA registry, check project status, trace extension approvals, and inspect registered floor plans.",
    msLegacyAdvisoryNote: "Do not rely on developer sales brochures. Always cross-check the registration number on the RERA portal to confirm that construction phase timelines match, and that all common areas are duly registered without discrepancies.",
    actionRequired: "Go to the RERA Karnataka site, search the registration number, download the approved layout sketch, and verify that it matches what is physically visible at the site.",
    relatedLinks: [
      { label: "Karnataka RERA Portal", url: "https://rera.karnataka.gov.in" }
    ],
    relatedCalculators: [
      { label: "Project Shortlist Scorecard", url: "/calculators/project-shortlist-score" }
    ],
    relatedGovernmentLinks: [
      { label: "RERA Project Search", url: "/government-links" }
    ],
    isFeatured: true,
    isPublished: true,
    createdAt: "2026-06-15T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_2",
    title: "How to Search Encumbrance Certificates (EC) on Kaveri",
    slug: "how-to-check-ec-kaveri",
    excerpt: "A comprehensive walkthrough on using the Kaveri Online Services portal to download 30-year property transaction history trails in Karnataka.",
    category: "Land Records & Registration",
    tags: ["Kaveri Portal", "Encumbrance Certificate", "Title Deed"],
    sourceName: "Kaveri Online Services",
    sourceUrl: "https://kaverionline.karnataka.gov.in",
    officialSource: true,
    publishedDate: "2026-06-20",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "official_source",
    jurisdiction: "Karnataka",
    affectedAudience: ["Buyers", "NRIs", "Landowners", "Investors"],
    summary: "An Encumbrance Certificate (EC) shows registered transactions, mortgages, partition deeds, or legal liabilities tied to a property. By searching Kaveri using property survey numbers and boundaries, buyers can identify transaction trails and trace ownership integrity.",
    msLegacyAdvisoryNote: "Kaveri online logs may have syncing delays for very recent sub-registrar records. A physical search at the local Sub-Registrar Office (SRO) is highly recommended to supplement online EC searches.",
    actionRequired: "Create an account on the Kaveri portal, query using specific schedule details, download Form 15, and check if any active bank mortgages or unresolved sale agreements exist.",
    relatedLinks: [
      { label: "Kaveri Services Portal", url: "https://kaverionline.karnataka.gov.in" }
    ],
    relatedCalculators: [
      { label: "Stamp Duty & Registration Calculator", url: "/calculators/stamp-duty-registration" }
    ],
    relatedGovernmentLinks: [
      { label: "Department of Stamps and Registration", url: "/government-links" }
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-20T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_3",
    title: "Understanding BDA vs BMRDA vs Gram Panchayat Approvals",
    slug: "understanding-bda-bmrda-panchayat-approvals",
    excerpt: "Demystifying layout approval jurisdictions on Bengaluru fringes and explaining RERA requirements for rural holdings.",
    category: "Planning & Approval News",
    tags: ["BDA", "BMRDA", "Gram Panchayat", "Layout Approvals"],
    sourceName: "Planning Authorities Regulations",
    sourceUrl: "https://bdabangalore.org",
    officialSource: false,
    publishedDate: "2026-06-10",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "verified_summary",
    jurisdiction: "Bengaluru",
    affectedAudience: ["Buyers", "NRIs", "Landowners", "Developers"],
    summary: "Bengaluru's peripheral growth corridors cross BDA, BMRDA, and Gram Panchayat (GP) limits. GP layouts must obtain e-Swathu Form 9/11 to be legally registered, while larger projects require formal BDA or local BMRDA layout plans to conform to zoning laws.",
    msLegacyAdvisoryNote: "Always check the road width assumptions. BDA requires at least 30 feet cross roads and 40-60 feet main roads, while GP sites may fail modern width and civic amenity space compliance reviews.",
    actionRequired: "Verify the masterplan classification of the land parcel and match boundaries using official local authority registers.",
    relatedLinks: [
      { label: "BDA Website", url: "https://bdabangalore.org" }
    ],
    relatedCalculators: [
      { label: "Layout Development Planner", url: "/calculators/layout-development" },
      { label: "Apartment Feasibility Planner", url: "/calculators/apartment-development" }
    ],
    relatedGovernmentLinks: [
      { label: "BDA Building Plan approvals", url: "/government-links" }
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-10T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_4",
    title: "What Buyers Should Check Before Purchasing Plotted Developments",
    slug: "plotted-development-buyer-checklist",
    excerpt: "A comprehensive checklist covering mother deeds, conversion certificates, approach roads, and common layouts allocations.",
    category: "MS Legacy Advisory Notes",
    tags: ["Buyer Checklist", "Plots", "Plotted Developments"],
    sourceName: "MS Legacy Research",
    sourceUrl: "https://mslegacy.in",
    officialSource: false,
    publishedDate: "2026-06-22",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "advisory_note",
    jurisdiction: "Karnataka",
    affectedAudience: ["Buyers", "NRIs", "Investors"],
    summary: "Plotted land offers excellent capital appreciation, but carries title risks. Buyers must vet agricultural DC conversion status, trace release deeds from joint family heirs, check boundary sketching with Mojini, and confirm infrastructure setups.",
    msLegacyAdvisoryNote: "Make sure all common areas (roads, parks, civic amenities, utilities, drainages) are officially handed over to the local planning authority via registered relinquishment deeds.",
    actionRequired: "Review parent deeds for 30 years and verify that the developer has obtained a final approval certificate, not just a provisional one.",
    relatedLinks: [],
    relatedCalculators: [
      { label: "Land / Plot Cost Planner", url: "/calculators/land-plot-cost" }
    ],
    relatedGovernmentLinks: [
      { label: "Mojini Survey Sketch", url: "/government-links" }
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-22T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_5",
    title: "Why e-Khata & e-Swathu Matter for Rural Layout Plots",
    slug: "understanding-e-khata-e-swathu",
    excerpt: "Explaining Form 9 and Form 11 requirements for site mutations and Kaveri registration compliance under rural rules.",
    category: "Government Norms",
    tags: ["e-Khata", "e-Swathu", "Form 9", "Form 11"],
    sourceName: "Rural Development & Panchayat Raj Department",
    sourceUrl: "https://eswathu.karnataka.gov.in",
    officialSource: true,
    publishedDate: "2026-06-18",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "official_source",
    jurisdiction: "Gram_Panchayat",
    affectedAudience: ["Buyers", "Landowners", "Developers"],
    summary: "e-Swathu was created by the Karnataka government to prevent illegal layout registrations in Gram Panchayat areas. It generates Form 9 (Panchayat site certificates) and Form 11 (tax lists) digitally. Only properties with e-Swathu records can be registered in Kaveri.",
    msLegacyAdvisoryNote: "Manual Khata drafts are no longer acceptable for property registration or bank loan applications. Ensure that the property ID is digitally verified on the official e-Swathu database.",
    actionRequired: "Check the e-Swathu portal and confirm that the site has a digital khata issued under the correct owner's name.",
    relatedLinks: [
      { label: "e-Swathu Portal", url: "https://eswathu.karnataka.gov.in" }
    ],
    relatedCalculators: [
      { label: "Stamp Duty & Registration Calculator", url: "/calculators/stamp-duty-registration" }
    ],
    relatedGovernmentLinks: [
      { label: "e-Swathu Panchayat Records", url: "/government-links" }
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-18T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_6",
    title: "How MS Legacy Vets and Scores Developer Properties",
    slug: "how-ms-legacy-vets-properties",
    excerpt: "An inside look at our rigorous verification protocol: 30-year mother deed checks, GPS coordinates mapping, and local authority verification.",
    category: "MS Legacy Advisory Notes",
    tags: ["MS Legacy Protocol", "Verification", "Due Diligence"],
    sourceName: "MS Legacy Governance Guidelines",
    sourceUrl: "https://mslegacy.in",
    officialSource: false,
    publishedDate: "2026-06-05",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "advisory_note",
    jurisdiction: "Karnataka",
    affectedAudience: ["Buyers", "NRIs", "Landowners", "Developers", "Investors"],
    summary: "MS Legacy's core mission is to protect property buyers. Every developer project on our platform undergoes a documentation check covering land titles, environmental NOCs, RERA registrations, and physical layout setbacks before obtaining a PROPERTY WEALTH SCORE™.",
    msLegacyAdvisoryNote: "Vetting is performed by independent legal panels and surveyors to prevent conflicts of interest. We do not accept sponsorship payments for project listings.",
    actionRequired: "Compare project verification sheets side-by-side using the MS Legacy project comparison dashboard.",
    relatedLinks: [],
    relatedCalculators: [
      { label: "Project Shortlist Scorecard", url: "/calculators/project-shortlist-score" }
    ],
    relatedGovernmentLinks: [],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-05T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_7",
    title: "Property Planning Calculators: Use Cases for Buyers",
    slug: "buyer-property-calculator-guide",
    excerpt: "Understand how to simulate down payment thresholds, rental NOI offsets, and acquisition costs before visiting site developers.",
    category: "MS Legacy Advisory Notes",
    tags: ["Financial Planning", "Calculators Guide", "EMI"],
    sourceName: "MS Legacy Finance Desk",
    sourceUrl: "https://mslegacy.in",
    officialSource: false,
    publishedDate: "2026-06-25",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "advisory_note",
    jurisdiction: "Karnataka",
    affectedAudience: ["Buyers", "NRIs", "Investors"],
    summary: "A property decision requires careful financial planning. MS Legacy's calculators suite allows users to simulate home loan EMIs, buyer affordability thresholds, stamp duty registration slabbing, and rental net cash flows in an interactive layout.",
    msLegacyAdvisoryNote: "Simulators provide planning estimates only. Always consult with authorized banking officers, chartered accountants, and sub-registrar panels for official validation.",
    actionRequired: "Launch the Property Calculators dashboard to compute your acquisition budget.",
    relatedLinks: [],
    relatedCalculators: [
      { label: "Home Loan EMI Planner", url: "/calculators/home-loan-emi" },
      { label: "Buyer Affordability Desk", url: "/calculators/buyer-affordability" }
    ],
    relatedGovernmentLinks: [],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-25T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_8",
    title: "Layout Development Feasibility Metrics Explained",
    slug: "layout-development-feasibility-metrics",
    excerpt: "A guide for landowners and developers to calculate road, park, and civic allocations under BDA/BMRDA zoning parameters.",
    category: "Planning & Approval News",
    tags: ["Zoning Regulations", "Developers", "Feasibility"],
    sourceName: "Local Planning Norms",
    sourceUrl: "https://bmrda.karnataka.gov.in",
    officialSource: false,
    publishedDate: "2026-06-12",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "verified_summary",
    jurisdiction: "BMRDA",
    affectedAudience: ["Landowners", "Developers", "Investors"],
    summary: "Developing a plotted layout requires complying with local zoning regulations. Road networks, parks, utility lines, and civic amenities consume 45% to 55% of raw land area, leaving 45% to 50% as saleable plotted area. Learn how to map outlays.",
    msLegacyAdvisoryNote: "Ensure boundary sketches are signed by authorized surveyors. Setting up drainage structures and utility connections counts heavily towards total launch outlays.",
    actionRequired: "Use the Layout Development calculator to model conversion feasibility and launch cash flows.",
    relatedLinks: [
      { label: "BMRDA Portal", url: "https://bmrda.karnataka.gov.in" }
    ],
    relatedCalculators: [
      { label: "Layout Development Planner", url: "/calculators/layout-development" }
    ],
    relatedGovernmentLinks: [
      { label: "BMRDA Layout Plan search", url: "/government-links" }
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-12T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  },
  {
    id: "news_9",
    title: "Plotted Land Conversion & DC Process in Karnataka",
    slug: "land-conversion-dc-process-karnataka",
    excerpt: "Steps to convert agricultural land into residential zoning classification through online single-window portals.",
    category: "Government Norms",
    tags: ["Land Conversion", "DC Conversion", "Single Window"],
    sourceName: "Revenue Department Karnataka",
    sourceUrl: "https://landrecords.karnataka.gov.in",
    officialSource: true,
    publishedDate: "2026-06-08",
    lastCheckedDate: "2026-06-28",
    verificationStatus: "official_source",
    jurisdiction: "Karnataka",
    affectedAudience: ["Landowners", "Developers", "Investors"],
    summary: "Under Karnataka land laws, agricultural land must undergo DC Conversion to be utilized for residential or commercial development. The process is now integrated into a single-window system linked with Bhoomi records.",
    msLegacyAdvisoryNote: "Conversion is valid only for the specific layout and zoning approved. Any change in layout size requires an official amendment file.",
    actionRequired: "Verify the conversion status of the survey numbers on the official Bhoomi records page.",
    relatedLinks: [
      { label: "Bhoomi Land Records Portal", url: "https://landrecords.karnataka.gov.in" }
    ],
    relatedCalculators: [
      { label: "Land / Plot Cost Planner", url: "/calculators/land-plot-cost" }
    ],
    relatedGovernmentLinks: [
      { label: "Bhoomi RTC Pahani Search", url: "/government-links" }
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-08T10:00:00Z",
    updatedAt: "2026-06-28T11:00:00Z"
  }
];
