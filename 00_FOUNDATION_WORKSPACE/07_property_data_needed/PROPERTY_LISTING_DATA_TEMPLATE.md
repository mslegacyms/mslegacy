# MS Legacy — Property Listing Data Template

This template defines the data structure and field mappings required to onboard a property listing onto the MS Legacy platform and synchronize it with the CRM and public search engine.

---

## 1. Core Property Metadata (JSON Schema Structure)

```json
{
  "property_id": "uuid-v4-placeholder",
  "visibility": "public", // Options: 'public' (website + CRM), 'private' (CRM only/investor matching)
  "crm_lead_owner": "sales_manager_uuid",
  
  "specification": {
    "title": "Premium BDA-Approved Plots, Devanahalli",
    "price_inr": 7500000.00,
    "land_area_sqft": 2400.0,
    "dimensions": "40 x 60 sqft",
    "location": {
      "display_address": "Devanahalli Growth Corridor, North Bangalore",
      "google_maps_url": "https://maps.google.com/?q=13.25,77.71",
      "latitude": 13.2456,
      "longitude": 77.7123
    }
  },
  
  "legal_compliance": {
    "ownership_status": "clear_title", // Options: 'clear_title', 'under_verification', 'disputed'
    "legal_status": "verified_by_legal_division",
    "rera_status": "approved", // Options: 'approved', 'applied', 'exempt', 'not_applicable'
    "rera_registration_number": "PRM/KA/RERA/1250/303/PR/2026/00456",
    "khata_category": "A-Khata", // Options: 'A-Khata', 'B-Khata', 'e-Khata'
    "encumbrance_status": "clear_no_liens"
  },
  
  "infrastructure_utilities": {
    "road_access": "40ft asphalt approach road",
    "water_source": "Municipal connection + community borewell",
    "electricity": "BESCOM connection grid installed",
    "sewage": "Underground drainage and STP layout connected"
  },
  
  "development_model": {
    "expected_model": "turnkey_residential_layout", // Options: 'turnkey_residential_layout', 'custom_villa_build', 'managed_farmland', 'commercial_rental_asset'
    "exit_horizon_months": 36
  },
  
  "property_wealth_score": {
    "overall_score": 9.2,
    "parameters": {
      "location_score": 9.5,       // 30% Weight
      "legal_score": 9.8,          // 35% Weight
      "infrastructure_score": 8.5, // 20% Weight
      "connectivity_score": 8.8    // 15% Weight
    },
    "score_justification_summary": "Located in a high-appreciation corridor adjacent to Airport expansion. Title chain trace shows zero encumbrances for 30 years. Road access and electrical grids are fully operational."
  },
  
  "risk_assessment_notes": "Adjacent development layouts are active. Road widenings are proposed in the master plan but do not encroach on layout boundaries. Minimal risk."
}
```

---

## 2. Media Asset Requirements Checklist
Every property onboarded for public marketing must have the following visual assets:

*   [ ] **High-Resolution Photography**: Minimum of 10 pictures (exterior road layout, plot boundary, surrounding amenities).
*   [ ] **Drone Walkthrough Footage**: A 4K bird's-eye video showing land access, neighborhood spacing, and boundary lines.
*   [ ] **3D Rendering mockups (if applicable)**: Architectural rendering layouts showing proposed villa shapes.
*   [ ] **Interactive Location Map**: Pinpoint maps marking proximity to nearest metro, highway, school, and hospital.

---

## 3. Required Legal Documents Checklist
To publish the property with a "Verified Legal Title" badge, the legal officer must upload these documents to the CRM Storage:

*   [ ] **Registered Sale Deed / Mother Deed**: Establish the 30-year ownership chain.
*   [ ] **Encumbrance Certificate (EC)**: Covering a minimum of the past 13 to 30 years.
*   [ ] **Khata Certificate & Extract**: Establishing municipal registration details.
*   [ ] **Land Conversion Order (Non-Agricultural)**: Verification of zoning permissions.
*   [ ] **Approved Layout Plan**: Authorized by BDA, BIAAPA, or relevant local municipal authority.
*   [ ] **Tax Paid Receipts**: Verifying no outstanding municipal dues.
