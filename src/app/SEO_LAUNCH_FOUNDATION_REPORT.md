# MS Legacy — SEO Launch Foundation Report

This report summarizes the Search Engine Optimization (SEO) mapping completed to establish index authority for the MS Legacy public advisory site.

---

## 1. Meta Tags & Open Graph Setup
*   **Centralized Metadata Layout**: Located in `src/app/layout.tsx`. Configured core SEO tags:
    *   *Title*: "MS Legacy — Premium Property Wealth & Sourcing Advisory"
    *   *Description*: "Consolidated property stewardship in Bangalore. Sourcing high-potential land parcels, executing turnkey construction, and auditing titles."
    *   *Robots*: Programmed to allow indexing of public routes while blocking private directories (`/crm`, `/partner`, `/client`).
    *   *Open Graph / Twitter Cards*: Configured placeholder mappings in the metadata schema.

---

## 2. Dynamic Sitemap & Robots.txt
*   **`src/app/robots.ts`**: Generates a compliant `robots.txt` instructing search bots to index the homepage and service subpages, while excluding private user log-in portals.
*   **`src/app/sitemap.ts`**: Generates a dynamic `sitemap.xml` mapping the 13 public routes with weekly refresh frequencies.

---

## 3. SEO Target Keywords Mapped
We optimized copy on public pages for these strategic high-intent search terms:
1.  **Property Wealth Advisory**: Targeted on the homepage and `/property-wealth-score`.
2.  **Land Sourcing Karnataka**: Targeted on `/services/land-sourcing`.
3.  **Legal Due Diligence Property**: Targeted on `/services/legal-due-diligence` and `/resources`.
4.  **NRI Property Management**: Targeted on `/services/property-management` and `/contact`.
5.  **Turnkey Construction Advisory**: Targeted on `/services/turnkey-construction`.

---

## 4. Google Search Console & Launch Action Plan
1.  **Submit Sitemap**: Submit the sitemap at `https://mslegacy.in/sitemap.xml` in Search Console.
2.  **Robots Testing**: Confirm that private folders are correctly blocked using the Robots Testing Tool.
3.  **Blog Content Plan**: Draft initial articles targeting search trends:
    *   *Topic 1*: "Understanding Mother Deeds and 30-Year Title Search in Karnataka."
    *   *Topic 2*: "Zoning DC Land Conversions: Red Flags for Layout Buyers."
    *   *Topic 3*: "Turnkey PMC vs. Local Construction Contractors: Cost Comparisons."
