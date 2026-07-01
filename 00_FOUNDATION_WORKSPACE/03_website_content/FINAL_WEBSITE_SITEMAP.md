# MS Legacy — Final Website Sitemap

This sitemap outlines the structural navigation, routing hierarchy, page objectives, and access levels for the public corporate website and the private CRM dashboard.

---

## 1. Public Website Directory & Route Map

```
/ (Homepage)
│   ├── /about (About Us, Vision, Values, & Integrated Ecosystem)
│   ├── /properties (Property Listing Search Center)
│   │   └── /properties/[id] (Individual Property Details & Property Wealth Score™ Card)
│   ├── /investments (Land Banking & Structured Project Share Opportunities)
│   ├── /services (Services Portal & Directory Hub)
│   │   ├── /services/land-sourcing (Emerging growth corridor acquisition)
│   │   ├── /services/construction (Turnkey structural build & design PMC)
│   │   ├── /services/property-management (Rental operations, tenant care, NRI care)
│   │   └── /services/legal-due-diligence (Title verifications, khata audits, registrations)
│   ├── /nri-services (Virtual inspections, remote property sourcing, OCI compliance support)
│   ├── /wealth-score (Property Wealth Score™ overview, calculator requesting tool)
│   ├── /channel-partners (Broker registry, referral terms, and onboarding form)
│   ├── /resources (Government property portals, documentation guides, checklists)
│   └── /contact (Interactive consultation request page)
```

---

## 2. Page-by-Page Specifications

### 1. Homepage (`/`)
*   **Objective**: Present the core brand value proposition and introduce the 5-division integrated ecosystem.
*   **Target Call-to-Actions (CTAs)**: `Explore Properties` (points to `/properties`), `Invest in Projects` (points to `/investments`), and `Book Free Consultation` (points to `/contact`).

### 2. About Us (`/about`)
*   **Objective**: Outline the corporate mission, company values, comparison grid (Traditional vs. MS Legacy Platform), and founder/executive profiles.

### 3. Properties Listing Search (`/properties`)
*   **Objective**: Provide an interactive listing catalog of active BDA plots, apartments, farmhouses, and commercial plots.
*   **Filters**: Location, Asset Type, Price Range, RERA Status, and Property Wealth Score™.

### 4. Property Detail Page (`/properties/[id]`)
*   **Objective**: Display detailed property dimensions, high-resolution media galleries, and maps.
*   **Key Feature**: Embedded **Property Wealth Score™ Widget** highlighting individual parameters (Location, Legal, Infrastructure, Connectivity).

### 5. Project Share & Investment Opportunities (`/investments`)
*   **Objective**: Show structured pre-launch layout developments, fractional project participations, and minimum ticket sizes.
*   **Key Feature**: Dynamic **ROI Capital Estimation Widget** (slider to model returns).

### 6. Land Sourcing Services (`/services/land-sourcing`)
*   **Objective**: Explain how MS Legacy identifies, legal-audits, and acquires land in emerging corridors before market price surges.

### 7. Turnkey Construction Services (`/services/construction`)
*   **Objective**: Detail building capabilities for luxury villas, apartments, commercial centers, and warehouse facilities.
*   **Key Feature**: Architectural design milestones & construction roadmap.

### 8. Property Management Services (`/services/property-management`)
*   **Objective**: Outline landlord services, rent deposit protocols, routine maintenance audits, and remote NRI care.

### 9. Legal Due Diligence Services (`/services/legal-due-diligence`)
*   **Objective**: List legal audit packages, title reports, khata registration guidance, and sale deed drafting.

### 10. Non-Resident Indian (NRI) Services (`/nri-services`)
*   **Objective**: Showcase specialized services for overseas investors (virtual drone inspections, legal power of attorney templates, direct bank tracking).

### 11. Property Wealth Score™ Overview (`/wealth-score`)
*   **Objective**: Explain the metrics behind the proprietary 10-point evaluation system and offer a form to request an audit of a custom property.

### 12. Channel Partners Onboarding (`/channel-partners`)
*   **Objective**: Register local real estate brokers into the referral system.

### 13. Public Resources Directory (`/resources`)
*   **Objective**: Provide direct link access to Karnataka government records (Kaveri, Bhoomi, e-Swathu, RERA) alongside checklist manuals for buyers.

### 14. Contact & Consultation (`/contact`)
*   **Objective**: Capture client details and route them directly to the CRM leads database.

---

## 3. Private Portal Route Placeholder (CRM)

To secure client files and dashboard statistics, the CRM is placed behind a strict middleware barrier:

*   **CRM Portal Entry Route**: `/auth/login` (Standard secure login interface for email and password validation).
*   **Private Base Route**: `/crm/` (Validates session and matches roles: superadmin, sales, legal, property_manager).
*   **Internal CRM Directories**:
    *   `/crm/dashboard` (Metrics, active sales, rental statistics, capital inflows).
    *   `/crm/leads` (Kanban board for lead progression).
    *   `/crm/properties` (Database inputs for listings and Wealth Score values).
    *   `/crm/documents` (Uploaded customer KYC, title deeds, and legal reports).
    *   `/crm/settings` (Role administration, audit log details).
