# Global Typography & Font System Audit

This audit evaluates the current font usage across the MS Legacy platform and outlines the plan to align typography with premium luxury corporate real estate standards (DAMAC, Emaar, Sobha grade).

## 1. Current Fonts Detected
- **Heading / Accent Serif Font**: `Cormorant Garamond` (imported via next/font/google, variable `--font-cormorant`)
- **Body / Interface Sans Font**: `Outfit` (imported via next/font/google, variable `--font-outfit`)
- **Tailwind Mapping**:
  - `font-sans` maps to Outfit
  - `font-serif` maps to Cormorant Garamond

## 2. Inconsistent Typography Issues Detected
1. **Excessive Serif Usage in UI Elements**:
   - Several metrics, cards, labels, and helper paragraphs (e.g. in the landing page, calculators, and CRM dashboard) currently use `font-serif` (Cormorant Garamond). This compromises readability and looks overly decorative for data-driven sections.
2. **Inconsistent Header Typography**:
   - Desktop and mobile active navigation states lack consistent typography. The mobile active states utilize heavy colored background boxes rather than elegant text coloring or underlines.
3. **Italic Abuse**:
   - Heavy italicization in headings and accents decreases the luxury corporate feel and makes text look playful or non-standard.
4. **Body Text Readability**:
   - Standard body text needs to be consistently paired with Outfit (sans-serif) with a target color of `#1f2a24` and optimal line heights (1.5 - 1.6) for clear readability.
5. **CRM Typography Inconsistency**:
   - CRM dashboards use mixing font families. These should be normalized to clean sans-serif Outfit throughout for operational efficiency.

## 3. Recommended Global Font System
We will enforce a strict **two-font pairing system**:
- **Body & UI Font**: `Outfit` (Sans-serif)
  - Used for body copy, buttons, labels, tables, navigation, forms, and results cards.
- **Premium Headings Font**: `Cormorant Garamond` (Serif)
  - Used selectively for hero titles, section titles, and page headers.

## 4. Typography Utility Tokens
We will introduce the following tokens in `globals.css`:
- `.font-body` / `.font-heading`
- `.text-hero` (64px - 80px desktop, 40px - 48px mobile)
- `.text-section-title` (36px - 48px)
- `.text-card-title` (20px - 26px semibold Outfit)
- `.text-label` (12px - 14px bold uppercase Outfit)
- `.text-button-label` (14px - 15px semibold Outfit)
- `.text-muted-readable` (color: `#5f6b63`)
- `.text-body-premium` (color: `#1f2a24`, size: `17px`)

## 5. Components Needing Updates
- **Header & Footer**: Clean up active states, remove boxed shapes, refine letter spacing.
- **Home Page Hero & Cards**: Ensure metrics, wealth scores, and general text are Outfit.
- **Calculators & Diagrams**: Enforce Outfit for results, labels, and forms.
- **Projects & Developers Catalog**: Standardize project titles and badges.
- **CRM Panels**: Restrict serif usage to page headers only; all forms and lists must use Outfit.
