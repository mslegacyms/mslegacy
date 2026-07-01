# MS Legacy — Website Foundation Plan

This plan establishes the architecture, layout systems, sitemap, and visual design rules for the public-facing corporate website. The design targets high-value corporate investors, NRIs, and affluent home buyers, reflecting visual quality on par with global leaders like Stripe, McKinsey, and Sotheby's International Realty.

---

## 1. Complete Sitemap

```
MS Legacy Public Website
├── / (Home) - Core Value Proposition, Division Gateways, Wealth Score Showcase
├── /about - Executive Profile, Vision, Core Values, Integrated Ecosystem Details
├── /properties - Advanced Search & Filters (BDA Plots, Villas, Commercial, Farms)
│   └── /properties/[id] - Detail Page, High-Res Media, Maps, Property Wealth Score Card
├── /investments - Land Banking, Project Share Tiers, Dashboard Preview, ROI Calculator
├── /services - Service Portal Directory
│   ├── /services/construction - Turnkey Projects, Architectural PMC, Client Process
│   ├── /services/property-management - Rental Management, Tenant Sourcing, NRI Care
│   └── /services/legal-services - Title Verification, Khata, Documentation Center
├── /nri-services - Remote Sourcing, Virtual Drone Visits, Dedicated NRI Liaison
├── /wealth-score - Property Wealth Score™ System Explanation & Request Form
├── /contact - Interactive Lead Capture (Custom fields for buyer type)
├── /channel-partners - Broker Network Onboarding & Portal Access Form
└── /resources - Government Portals Directory, Document checklists, Legal links
```

---

## 2. Page-by-Page Objective & Architecture

### A. Homepage (The Entryway)
*   **Objective**: Immediately distinguish MS Legacy from traditional real estate agencies. Establish the platform as a corporate wealth partner.
*   **Structure**:
    1.  **Hero Section**: High-impact heading, professional typography, dynamic sliders, and primary action buttons (`Explore Properties` | `Invest in Projects`).
    2.  **Trust Bar**: Minimalist, animated banner displaying client segment endorsements: "Trusted by Home Buyers, HNIs, Family Offices, and NRIs worldwide."
    3.  **The MS Legacy Ecosystem (Interactive Grid)**: Visual hover cards for each of the 5 divisions.
    4.  **Property Wealth Score™ Highlight**: Interactive card demonstrating the data-driven rating framework with sample score metrics.
    5.  **Featured Listings**: Carousel of curated luxury plots, commercial assets, and pre-launch JV layouts.
    6.  **Social Proof / Testimonials**: Soft fading carousel showing validated reviews.
    7.  **Final Call-To-Action (CTA)**: Premium lead-capture component.

### B. About Us Page
*   **Objective**: Build absolute trust. Present the scale, integration, and institutional discipline of the company.
*   **Structure**:
    *   **Vision & Mission**: Interactive blocks highlighting wealth protection, legal safety, and legacy creation.
    *   **The Difference (Comparison Matrix)**: Table comparing "Traditional Real Estate" (fragmented, high-risk, speculative) vs "MS Legacy Platform" (integrated, zero-risk, data-backed).
    *   **Operational Ecosystem Walkthrough**: A process diagram showing how acquisitions flow into development, build, management, and appreciation.

### C. Properties Listing & Details Page
*   **Objective**: Provide a premium, fluid search experience.
*   **Structure**:
    *   *Search Hub*: Real-time search with visual filters: Budget range, Asset Class (Plots, Apartments, Commercial, Farm Land), RERA status, and Location.
    *   *Detail Page*: 
        *   Hero header with listing images and drone video player.
        *   **Property Wealth Score™ Widget**: A radial gauge display showing the overall score (e.g., 9.2/10) with expandable breakdown charts (Location, Legal, Infrastructure, Connectivity).
        *   Technical specifications, RERA certificate download, and map integrations.
        *   `Schedule Site Visit / Video Walkthrough` lead form.

### D. Investment Opportunities Page
*   **Objective**: Secure leads for Project Share Investments and Land Banking.
*   **Structure**:
    *   *Introduction*: How value is created during pre-launch layout developments.
    *   *Investment Card Layouts*: Cards detailing active project opportunities:
        *   Project type, funding status bar, estimated ROI, target duration, and minimum ticket size.
    *   *ROI Calculator*: Interactive slide widget to calculate returns based on capital investment, duration, and asset type.
    *   `Register as Qualified Investor` portal prompt.

### E. Service Landing Pages (Construction, Property Management, Legal)
*   **Objective**: Showcase specialized technical competence and turnkey reliability.
*   **Structure**:
    *   *Header*: Clear value statement (e.g., "Design. Build. Deliver." for Construction).
    *   *Process Map*: Sequential, numbered roadmap illustrating project milestones (e.g., Site survey -> Architectural design -> Approvals -> Construction -> Quality checks -> Handover).
    *   *FAQ Accordion*: Interactive toggle questions regarding timeline, costs, approvals, and legal guarantees.

---

## 3. SEO Structure & Metadata Strategy
The website will target high-intent, premium search traffic using modern SEO patterns:

*   **Canonical URL Management**: Strict implementation of semantic URL trees.
*   **Meta Tags & Structured Schema**: Custom meta descriptors for each page.
*   **Schema.org JSON-LD Markup**:
    *   *Organization Schema* for the corporate brand.
    *   *RealEstateAgent / ProfessionalService Schema* for location and phone coordinates.
    *   *Product/Place Schema* for property details pages to render structured snippets in Google Search.
*   **Target SEO Keywords**:
    *   *Primary*: Real Estate Wealth Creation India, Bangalore Property Investment, NRI Land Management Services.
    *   *Secondary*: BDA approved plots Bangalore, Turnkey villa construction, Property legal verification services Karnataka, Project Share Real Estate.

---

## 4. Premium Design & Styling Guidelines
The frontend styling will use a strict, bespoke corporate token system:

*   **Design Language**: Corporate Elegance, High-Tech, Clean, Metric-driven.
*   **Color Hierarchy**:
    *   `Background`: Clean off-white/alabaster (#F8F9FA) for public site, deep charcoal/slate for dark components and dashboard.
    *   `Primary (Typography & Base)`: Deep Navy/Midnight Blue (#0A192F) - represents stability and trust.
    *   `Accent (Accents & CTA highlights)`: Soft Metallic Champagne Gold (#D4AF37 or #C5A880) - represents wealth, legacy, and luxury.
    *   `Success / Metrics`: Soft Emerald Green (#10B981) - representing growth and appreciation.
*   **Typography**:
    *   `Headings`: Serif fonts (e.g., Cormorant Garamond, Playfair Display) to convey premium establishment status.
    *   `Body & Interface`: High-legibility sans-serif fonts (e.g., Inter, Outfit) to convey clean, modern metrics.
*   **Interactions**:
    *   Soft hover scales (1.02x) on cards.
    *   Glassmorphism (backdrop-blur) navigation bars.
    *   Smooth scroll behaviors and minimal scroll-triggered fade animations.
