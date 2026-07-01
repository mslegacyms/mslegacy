# MS Legacy — Logo Asset Audit

This document lists the brand logo assets located inside the project directory and outlines their format suitability.

---

## 1. Logo Files Mapped

| Logo File Name | Format | Target copied Destination | Description / Background Suitability |
| :--- | :--- | :--- | :--- |
| `LOGO MS.png` | PNG | `/public/brand/mslegacy-logo.png` | Clear emblem overlay. Suitable for light/dark headers. |
| `LOGO MS (1).png` | PNG | `/public/brand/mslegacy-logo-primary.png` | Primary alternative logo badge. Transparent background. |
| `LOGO MS (2).png` | PNG | `/public/brand/mslegacy-logo-dark.png` | Dark background suitability. |

---

## 2. Favicon & Web Application Suitability
*   **Favicon**: The primary emblem (`mslegacy-logo.png`) works well as a square web icon.
*   **Header**: Mapped to standard proportions (e.g. `height: 36px`, `width: auto`) inside client layouts to prevent layout shifting.
*   **Accessible Labeling**: Always render with `alt="MS Legacy"` text.
