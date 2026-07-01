# MS Legacy — Brand Asset Requirements

This document outlines the visual system parameters, typography, color codes, icon sets, media requirements, and missing brand elements needed before initiating the website frontend design and CRM interface builds.

---

## 1. Brand Visual Identity System

### A. Corporate Logo Requirements
The MS Legacy logo must convey heritage, institutional discipline, and security. Avoid overly complex shapes or generic real estate roof outlines.
*   **The Symbol (Logo Mark)**: A geometric emblem combining the letterform **MS** woven into a classic architectural pillar or structural shield.
*   **Typography (Word Mark)**: The word **LEGACY** rendered in a tracking-spread uppercase Serif typeface.
*   **Color Lockups**:
    *   *Gold on Dark Navy*: For the primary header and dark sections of the public website.
    *   *Navy on Transparent*: For white backgrounds and printed documentation.
    *   *Monochrome White*: For overlaying on high-resolution drone videos.

### B. Color Tokens (Hex Codes)
The frontend build will use a strict Tailwind token configuration based on this professional palette:

*   `primary-navy`: `#0B132B` (Header backgrounds, primary text, buttons)
*   `accent-gold`: `#C5A880` (Borders, highlights, score indicators, ratings)
*   `success-green`: `#1F4E5B` (Growth indicators, green checks, positive metrics)
*   `bg-alabaster`: `#F8F9FA` (Core website background)
*   `muted-slate`: `#4A5568` (Secondary copy, captions, outline borders)

### C. Typography Pairings
To reflect an editorial and technical brand feel, we specify the following Google Fonts:

*   **Headings & Highlights**: **Cormorant Garamond** (Serif font). Projects corporate heritage and prestige.
*   **Body Copy & CRM UI Tables**: **Outfit** (Sans-serif font). Clean, high-legibility geometric layout designed for metric tables and input interfaces.

### D. Iconography Direction
*   **Style**: Thin-line, minimalist vectors with a single-color accent (Champagne Gold or Dark Navy). Solid or cartoon icons are prohibited.
*   **Resource Library**: **Lucide React** (or Heroicons). Outlined variants only (`stroke-width={1.5}`).

---

## 2. Media Asset Standards

### A. High-Resolution Sourced Photography
*   All images must have a 16:9 landscape aspect ratio.
*   *Style*: High-contrast, natural lighting, highlighting land boundaries and clean asphalt roads.
*   *Villa mockups*: Rendered visuals showing modern, clean-cut structures, glass facades, and green gardens.

### B. Drone & Video Standards
*   *Resolution*: Minimum 1080p, preferred 4K at 60fps.
*   *Format*: Compressed H.264 MP4.
*   *Length*: Loop-friendly clips of 10–15 seconds for landing page backgrounds, and detailed 1–2 minute walkthroughs for detail pages.
*   *Content*: Smooth panning shots of plots showing surrounding green buffers and immediate transit access.

---

## 3. Web & CRM Visual Directions

*   **Website Visual Direction (Public-Facing)**:
    *   Sleek corporate editorial layout (similar to Savills or McKinsey).
    *   Use of thin separator lines (1px) in gold or light slate.
    *   Cards with subtle hover translations (1.02x scale shift) and soft shadows.
    *   Glassmorphic navbar overlays with backdrop blurs.
*   **CRM UI Direction (Internal Portal)**:
    *   Dark navy sidebar for administrative controls.
    *   White data tables with dense layout metrics.
    *   Use of soft-tinted status badges (e.g., RERA Approved = soft green card; Pending Legal Audit = soft yellow card).
    *   Kanban boards for drag-and-drop lead management.

---

## 4. Brand Assets Missing Checklist
The following assets are missing from the folder and must be generated or provided by the client before Stage 2 coding begins:

1.  [ ] **Official Logo Files**: High-resolution vector files (`.svg`) or transparent background files (`.png`).
2.  [ ] **Color Swatch Sign-off**: Final confirmation on the hex codes.
3.  [ ] **Staff Portraits**: Professional headshots of team leaders or advisors for the About Us profile page.
4.  [ ] **Asset Media Bank**: Drone footage or photos of at least 3 active properties in Bangalore to prevent placeholder use.
5.  [ ] **Calculated Wealth Score Mockups**: Final verification of the mathematical weights used for calculating the Location, Legal, and Infrastructure sub-scores.
