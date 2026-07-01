# MS Legacy — Design & Brand System

This document outlines the brand personality, color theory, typography system, visual standards, and UI specifications required to construct a premium web application and CRM system for MS Legacy.

---

## 1. Brand Personality & Values
The MS Legacy brand must feel elite, corporate, analytically rigorous, and secure. It should look like a cross between a premier investment bank (e.g., Blackstone) and a modern high-growth tech platform (e.g., Stripe).

*   **Trust & Security (Primary)**: Shifting the real estate narrative away from emotional sales pitches toward verified, legal, and data-backed safety.
*   **Elite Legacy**: Appealing to HNIs, NRIs, and developers by prioritizing long-term multi-generational wealth over speculative property transactions.
*   **Analytical Clarity**: Using clear scores, charts, lists, and calculators to explain investments.

---

## 2. Color Palette Recommendation
We propose a refined corporate color system designed to project authority and premium craftsmanship. Plain reds, neon blues, or simple greens are prohibited.

| Color Role | Hex Code | Visual Application | Psychological Effect |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#0B132B` | Headers, page footers, hero text, buttons, CRM sidebar background. | Authority, structural stability, legal security. |
| **Champagne Gold** | `#C5A880` | Accent lines, ratings stars, primary highlights, border gradients. | Luxury, elite quality, wealth accumulation. |
| **Emerald Green** | `#1F4E5B` | Profit indicators, Wealth Score positive metrics, ROI charts. | High growth, security, agricultural wealth. |
| **Alabaster White** | `#F8F9FA` | Main body background, input cards, layout section dividers. | Clarity, spacious breathing room, modern feel. |
| **Muted Slate** | `#4A5568` | Secondary copy, descriptors, form borders, card text. | Balanced readability, technical detail. |

---

## 3. Typography Direction
To establish a balanced editorial and technical feel, we recommend combining a classic serif typeface with a modern geometric sans-serif typeface:

```
                  ┌─────────────────────────────────────┐
                  │              HEADINGS               │
                  │   Cormorant Garamond (Google Font)  │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │         BODY & CRM METRICS          │
                  │         Outfit / Inter              │
                  └─────────────────────────────────────┘
```

*   **Primary Headings**: **Cormorant Garamond** (or Playfair Display). A serif typeface that projects corporate heritage, credibility, and prestigious wealth management.
*   **Body Text & Interactive Elements**: **Outfit** (or Inter). A geometric, highly legible sans-serif font designed for numeric density, data tables, metrics, and labels.

---

## 4. Visual Style & Styling Rules

*   **Accent Borders**: Card and section borders should use ultra-thin lines (1px) in light slate (`#E2E8F0`) with subtle Gold accents on hover.
*   **Shadows & Depth**: Card elements must sit on smooth, long shadow gradients (e.g., `shadow-sm` transitioning to `shadow-md` on hover) instead of harsh dark borders.
*   **Glassmorphism (Backdrop Blurring)**: Navigation bars, modal overlays, and quick search bars should use semi-transparent white overlays with blur filters:
    ```css
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    ```
*   **UI Micro-Animations**:
    *   Transition delays on hover effects: `transition: all 0.3s ease-in-out;`
    *   Smooth expansion accordion actions for FAQ sections.
    *   Progress bars in the investment cards should animate from 0% to target capacity on page load.

---

## 5. Image & Asset Quality Audit
*   **Current State**: The audit proves that **no visual assets currently exist** in the project directory. There are no logos, color spec sheets, or photography catalogs.
*   **Visual Procurement Guidelines**:
    1.  *Logo Guidelines*: Create a minimalist corporate logo featuring the letters **MS** interlinked with a geometric crown or architectural pillar in Champagne Gold, followed by the word **LEGACY** in custom-tracked uppercase letters (Primary Navy).
    2.  *Property Photography*: Avoid generic stock imagery with low-resolution lighting. Procurement must focus on:
        *   Drone imagery of layout corridors showing clean road connections.
        *   High-contrast architectural renders of modern villas.
        *   Clean, minimalist vector icons representing metrics (Location, Legal, Connectivity).
    3.  *NRI Virtual Sourcing Visuals*: High-definition video player placeholders showing modern, drone-based bird's-eye footage of green agricultural plots and Bangalore infrastructure.

---

## 6. CRM UI Design Rules
*   **Left-Hand Navigation Sidebar**: Deep navy (`#0B132B`) sidebar with golden accent icons. Active menu items are highlighted with a vertical gold line on the left border.
*   **Leads Kanban Board**: Modern drag-and-drop board style with column headers depicting stages. Cards contain client names, budget tags, and alert icons indicating overdue follow-up dates.
*   **Data Density**: Use clear tables with thin rows (`py-3`) and distinct search inputs. Column styling must prioritize numeric alignment (numbers aligned right, labels aligned left).
*   **Badges & Statuses**: Stages and RERA approvals must use soft-tinted labels:
    *   *RERA Approved*: Soft green background with dark green text.
    *   *Under Due Diligence*: Soft yellow background with dark gold text.
    *   *Closed Lost*: Soft red background with dark red text.
