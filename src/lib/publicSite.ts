import type { Metadata } from "next";

// Public contact master from MS LEGACY Brand Identity Standards v2.0.
export const publicSite = {
  name: "MS LEGACY",
  phone: "+91 9035687671",
  phoneHref: "tel:+919035687671",
  email: "mslegacyms@gmail.com",
  emailHref: "mailto:mslegacyms@gmail.com",
  whatsapp: "https://wa.me/919035687671",
  address:
    "No. 901, 20th Cross, MCECHS Layout, Shivram Karanth Nagar, Bengaluru 560077",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://mslegacy.vercel.app"
  ).replace(/\/$/, ""),
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | MS LEGACY` },
    description,
    alternates: { canonical: `${publicSite.url}${path}` },
    openGraph: {
      title: `${title} | MS LEGACY`,
      description,
      url: `${publicSite.url}${path}`,
      type: "website",
      locale: "en_IN",
    },
  };
}

export interface PublicService {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  headline: string;
  summary: string;
  description: string;
  interest: string;
  action: string;
  audience: string;
  deliverables: { title: string; text: string }[];
  boundaries: string;
  preparation: string[];
  faqs: { question: string; answer: string }[];
}

export const publicServices: PublicService[] = [
  {
    slug: "land-sourcing",
    number: "01",
    title: "Land & Property Sourcing",
    shortTitle: "Find a property",
    headline: "Find land that fits your plans.",
    summary:
      "A focused search around your location, budget and intended use, with site-visit and review coordination.",
    description:
      "Start with what you need. We help you discuss suitable property options, compare the available information and plan the checks needed before a purchase.",
    interest: "land_sourcing",
    action: "Discuss land sourcing",
    audience:
      "Plot buyers, individual home builders and clients with a specific land requirement.",
    deliverables: [
      {
        title: "A clear requirement",
        text: "Agree the location, approximate size, budget, intended use and timing before starting the search.",
      },
      {
        title: "Relevant options",
        text: "Review a shortlist with the source of information, quoted price basis and details that still need confirmation.",
      },
      {
        title: "Site-visit coordination",
        text: "Discuss access, boundaries and visit arrangements. Any survey or technical inspection is scoped separately.",
      },
      {
        title: "A next-step checklist",
        text: "Identify missing documents and the professional reviews needed before moving forward.",
      },
    ],
    boundaries:
      "Sourcing is not a guarantee of title, approval, appreciation or availability. Any legal opinion, survey or technical assessment must identify its responsible professional and agreed scope.",
    preparation: [
      "Preferred locality and intended use",
      "Approximate budget and land size",
      "Your purchase timeline",
    ],
    faqs: [
      {
        question: "Can I enquire before choosing a property?",
        answer:
          "Yes. Share your requirement so we can discuss the search scope and the locations we can support.",
      },
      {
        question: "How are sourcing fees agreed?",
        answer:
          "Ask for a written fee basis, the services included and any brokerage or third-party charges before engagement.",
      },
      {
        question: "Does a listing mean the property is cleared?",
        answer:
          "No. Confirm current availability, representation, approvals and the required independent reviews for the specific property.",
      },
    ],
  },
  {
    slug: "turnkey-construction",
    number: "02",
    title: "Construction & Project Management",
    shortTitle: "Plan a build",
    headline: "A clearer plan for your build.",
    summary:
      "Discuss your site, specifications and project-coordination needs with a defined scope and delivery model.",
    description:
      "Bring your site details and priorities. We will discuss the construction or project-management support available, the responsible team and the deliverables to agree before work begins.",
    interest: "construction_support",
    action: "Discuss my construction project",
    audience:
      "Property owners planning a residence or a construction project, subject to site and service suitability.",
    deliverables: [
      {
        title: "Project brief & specifications",
        text: "Record site dimensions, intended use, design priorities, material specifications and the scope to be priced.",
      },
      {
        title: "Turnkey or PMC",
        text: "Clarify whether the engagement is a construction contract or project-management consultancy. Responsibilities are agreed in writing.",
      },
      {
        title: "Programme & reporting",
        text: "Agree milestones, progress-update frequency, quality-review scope and how changes are approved.",
      },
      {
        title: "Handover scope",
        text: "Define the completion checks, outstanding-item list and documents included in the agreed handover.",
      },
    ],
    boundaries:
      "Approvals are issued by the relevant authorities. Cost, timing and completion depend on the agreed specifications, site conditions and changes. A planning discussion is not an approved building design or a fixed-price quotation.",
    preparation: [
      "Site location and dimensions",
      "Current design or construction stage",
      "Budget range and preferred timing",
    ],
    faqs: [
      {
        question: "What is the difference between turnkey and PMC?",
        answer:
          "A turnkey engagement defines the appointed builder’s construction scope. PMC defines coordination and oversight services. Confirm who contracts with each designer and contractor in your engagement.",
      },
      {
        question: "Can you give a construction rate immediately?",
        answer:
          "A meaningful estimate needs the site, area basis, specifications, inclusions and exclusions. Request a scope-based quotation rather than relying on a generic rate.",
      },
      {
        question: "How are changes handled?",
        answer:
          "Agree a written process for scope changes, cost effects and programme revisions before construction starts.",
      },
    ],
  },
  {
    slug: "property-management",
    number: "03",
    title: "Property Management & NRI Care",
    shortTitle: "Care for a property",
    headline: "Closer to your property. Wherever you are.",
    summary:
      "Local inspections, maintenance coordination and tenancy support under an agreed property-care scope.",
    description:
      "Discuss what your property needs, from periodic visits to tenancy administration. Agree the visit schedule, reporting and approval process so you know what is being handled locally.",
    interest: "property_management",
    action: "Discuss property management",
    audience:
      "Local and overseas owners of vacant or rented property, including NRIs seeking local coordination.",
    deliverables: [
      {
        title: "Property-care plan",
        text: "Choose the support needed for a vacant property, a tenanted home or a remote-owner requirement.",
      },
      {
        title: "Inspection updates",
        text: "Agree inspection frequency, dated photographs, observations and how reports will be shared.",
      },
      {
        title: "Maintenance coordination",
        text: "Set the spending-approval process, contractor responsibilities and how repair invoices are reviewed.",
      },
      {
        title: "Tenancy administration",
        text: "Where included, define tenant coordination, renewal reminders and the scope of rent or expense reporting.",
      },
    ],
    boundaries:
      "Property management does not guarantee occupancy, rent, returns or freedom from disputes. Any rent or deposit handling, emergency response, tax work or legal representation needs a separate, explicit arrangement.",
    preparation: [
      "Property location and type",
      "Vacant or occupied status",
      "Visit and reporting needs",
    ],
    faqs: [
      {
        question: "Can an overseas owner enquire?",
        answer:
          "Yes. Tell us the property location, your time zone and the local support needed. The service scope and reporting arrangements are agreed before engagement.",
      },
      {
        question: "Are repairs carried out automatically?",
        answer:
          "Agree an approval limit and the process for quotations and invoices. A property-care enquiry does not authorize repair spending.",
      },
      {
        question: "Will I receive updates through a dashboard?",
        answer:
          "Confirm the available reporting channel when agreeing the service. Do not assume portal access or a particular inspection frequency is included.",
      },
    ],
  },
  {
    slug: "legal-due-diligence",
    number: "04",
    title: "Document Review & Due Diligence Coordination",
    shortTitle: "Understand the documents",
    headline: "Know the questions before you decide.",
    summary:
      "Coordinate the document checklist and professional review, with findings and outstanding questions clearly recorded.",
    description:
      "Discuss the property and the documents available. We help define the review process and coordination needed, including who provides any legal opinion or technical assessment.",
    interest: "project_due_diligence",
    action: "Discuss a document review",
    audience:
      "Buyers and owners who need a clearer document checklist and a defined professional review process.",
    deliverables: [
      {
        title: "Document checklist",
        text: "Identify the property-specific records requested for the agreed review and list missing information.",
      },
      {
        title: "Responsible reviewer",
        text: "Confirm the appointed professional, the records being reviewed and what their written deliverable covers.",
      },
      {
        title: "Findings & limitations",
        text: "Record the information checked, questions raised and any follow-up needed before a transaction decision.",
      },
      {
        title: "Next-step coordination",
        text: "Discuss document requests, professional clarifications and registration-support tasks if included.",
      },
    ],
    boundaries:
      "A document collection service is distinct from an advocate’s legal opinion, a survey or an authority approval. A listing, score or portal reference does not certify title or guarantee the absence of a dispute.",
    preparation: [
      "Property locality and transaction stage",
      "A list of available documents",
      "The questions you need reviewed",
    ],
    faqs: [
      {
        question: "Who provides a legal opinion?",
        answer:
          "Confirm the appointed qualified legal professional and the scope of their engagement. MS LEGACY’s coordination role and any professional review must be clearly identified.",
      },
      {
        question: "Should I upload confidential documents here?",
        answer:
          "No. Begin with a brief description. Agree a suitable document-transfer process with the team before sharing deeds, identity records or private client information.",
      },
      {
        question: "Are all reviews the same?",
        answer:
          "No. Requirements vary by the property, jurisdiction, available records and proposed transaction. Agree the document list, fee and written deliverable first.",
      },
    ],
  },
];
