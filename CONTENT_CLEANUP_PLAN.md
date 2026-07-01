# MS Legacy — Content Cleanup Plan

This plan audits the textual content, copy structures, and folder layouts inside the project folders, providing specific recommendations to clean, rewrite, and format the copy for web release.

---

## 1. Content Audit Summary

### A. Content Ready to Use (90% Complete)
*   **About Us Copy**: The content in `ABOUT US PAGE done.docx` is excellent. It details the company's vision, core values, and integrated divisions with high professional standards.
*   **Core Services Copy**: The pages for NRI Services, Property Management, and Construction (`NRI SERVICES PAGE done.docx`, `PROPERTY MANAGEMENT PAGE done.docx`, `CONSTRUCTION PAGE done.docx`) require almost no rewriting. They are clean, well-formatted, and contain comprehensive value propositions.
*   **Customer FAQs**: The text in `Why Should Residential Buyers Choose MS LEGACY.docx` is highly converting and ready to be integrated into FAQ accordions on the homepage and properties page.

### B. Content Requiring Rewrite or Consolidation
*   **Property Wealth Score Explanation**: The content in `PROPERTY WEALTH SCORE done.docx` is highly detailed but very text-heavy. To keep users engaged, the explanations of Location, Legal, and Infrastructure scoring must be distilled into **short, interactive dashboard-style descriptors (1-2 sentences per score parameter)**.
*   **Resource & Links Duplicates**: `important web sites.docx` and `property documentation and links.docx` are exact duplicates. They contain invaluable links to Karnataka government land records (Kaveri, Bhoomi, e-Swathu). These must be formatted into a **Public Resources Hub directory page** with clean links instead of plain text dumps.
*   **Land Division & Commercial Real Estate Copy**: Needs to be parsed and organized into individual layout categories (e.g., separating commercial plots from retail shop listings).

### C. Missing Content (To be created during Stage 1)
*   **Specific Listing Data**: Real parameters (sizes, boundaries, prices, coordinates, RERA registration numbers) for at least 3-5 mock properties to test the search center during construction.
*   **Detailed Investment Prospectuses**: Short summary PDF sheets or downloadable prospectuses for the "Project Share" section (explaining exit timelines, historical returns, and legal guarantees).
*   **Privacy & Terms Specifics**: Incorporation address details, contact telephone coordinates, and official corporate email handles.

---

## 2. Recommended Naming & Folder Cleanup (Do Not Rename Yet)
Once approved by the user, the folder structure and file extensions should be cleaned up as follows:

1.  **Rename Folders**:
    *   Change `website contant` to `website-content`.
    *   Change `website structer` to `website-structure`.
    *   Change `MS legacy Group` to `business-strategy-and-master-copy`.
2.  **Convert to Markdown (`.md`)**:
    *   Convert all verified `.docx` files to plain Markdown files (`.md`). This eliminates Microsoft Office metadata and makes it easier for developers to reference the copy directly inside VS Code.
3.  **Naming Convention**:
    *   Standardize all filenames to lowercase-kebab-case (e.g., `ABOUT US PAGE done.docx` becomes `about-us-page.md`, `Channel Partner page done.docx` becomes `channel-partner-page.md`).

---

## 3. SEO Keywords & Copy Hierarchy

### A. Primary SEO Target Keywords
*   "Real Estate Wealth Creation India"
*   "Bangalore Land Investment Growth Corridors"
*   "NRI Property Management Services Bangalore"
*   "Property Legal Verification Karnataka"
*   "RERA Approved Layout Developments"
*   "Project Share Real Estate India"

### B. Standard Page Copy Hierarchy
For every page, the text must flow systematically to optimize conversion:

```
[Hero Title: Core Value Statement]
                 │
                 ▼
[Subtitle: Pain-Point Mapping & Solution]
                 │
                 ▼
[Ecosystem Integration: How this division works with others]
                 │
                 ▼
[Detailed Features & Parameters (e.g., Property Wealth Score Card)]
                 │
                 ▼
[Social Proof: Trust endorsements or reviews]
                 │
                 ▼
[Closing CTA Form: Direct connection to CRM database]
```

---

## 4. Page-wise Content Checklist

*   **Homepage**:
    *   [ ] Primary Hero Title (Build wealth through real estate)
    *   [ ] Call-to-actions (Explore Properties, Invest in Projects)
    *   [ ] 5-division showcase cards
    *   [ ] Property Wealth Score interactive visualization
    *   [ ] FAQ Accordion (Derived from Why Should Residential Buyers Choose)
*   **About Us**:
    *   [ ] Mission and Vision Statements
    *   [ ] 6 core corporate values (Integrity, Excellence, Transparency, etc.)
    *   [ ] Comparison matrix table (Traditional broker vs Integrated ecosystem)
*   **Properties Search Center**:
    *   [ ] Title and intro text
    *   [ ] Search filter labels (Budget, Category, Location)
    *   [ ] Mock listings description copy
    *   [ ] Sample Wealth Score radial gauges
*   **Investment Opportunities**:
    *   [ ] Land Banking vs Project Share intro copy
    *   [ ] Tiers of Investment (₹10L–₹50L, ₹50L–₹1C, etc.)
    *   [ ] Exit timeline terms (1, 3, 5, 10 years)
*   **NRI Services**:
    *   [ ] Sourcing assistance copy
    *   [ ] Virtual inspection and drone services copy
    *   [ ] Property management and rent collection details
*   **Contact / Onboarding Form**:
    *   [ ] Labels for custom CRM fields (Full name, Email, Phone, NRI Status, Target budget, Preferred asset class)
