"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GovernmentLinkCard, GovernmentLink } from "@/components/resources/GovernmentLinkCard";

export default function GovernmentLinksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const linksData: GovernmentLink[] = [
    {
      name: "Karnataka RERA Project Search",
      authority: "RERA Karnataka",
      purpose: "Verify real estate project registration details, promoter history, approved floor plans, and compliance status.",
      documentsNeeded: "RERA Registration Number, Project Name, or Promoter Name.",
      useCase: "Verifying gated community layouts or apartment construction approvals.",
      url: "https://rera.karnataka.gov.in",
      caution: "Ensure the RERA registration number matches the promoter's official marketing sheets exactly.",
      lastChecked: "2026-06",
      category: "RERA"
    },
    {
      name: "Kaveri Online Services",
      authority: "Department of Stamps and Registration",
      purpose: "Search Encumbrance Certificates (EC), view registered sale deeds, and calculate guidance value.",
      documentsNeeded: "Property Survey Number, Schedule details, boundaries, or owner name.",
      useCase: "Verifying title history and confirming previous transaction encumbrances.",
      url: "https://kaverionline.karnataka.gov.in",
      caution: "Encumbrance certificates may have delay logs. Inspect physical deeds at the Sub-Registrar Office for absolute certainty.",
      lastChecked: "2026-06",
      category: "Registration"
    },
    {
      name: "Bhoomi RTC Pahani Search",
      authority: "Revenue Department",
      purpose: "Search Record of Rights, Tenancy and Crops (RTC) / Pahani and mutation status of land parcels.",
      documentsNeeded: "District, Taluk, Hobli, Village, and Survey Number.",
      useCase: "Vetting farmland borders and checking agriculture zoning status.",
      url: "https://landrecords.karnataka.gov.in",
      caution: "Ensure the RTC is updated with current mutation records and Bhoo-Suraksha security watermarks.",
      lastChecked: "2026-06",
      category: "Land Records"
    },
    {
      name: "Mojini Survey Sketch",
      authority: "Survey Settlement and Land Records",
      purpose: "Track land measurement applications, view 11E sketch, and match village maps.",
      documentsNeeded: "Application Number or Survey Number.",
      useCase: "Verifying boundary dimensions for plots and agricultural land holdings.",
      url: "https://mojini2.karnataka.gov.in",
      caution: "Mojini sketches must be physically matched on-site using GPS coordinators to avoid border disputes.",
      lastChecked: "2026-06",
      category: "Survey"
    },
    {
      name: "e-Swathu Panchayat Records",
      authority: "Rural Development and Panchayat Raj",
      purpose: "Verify Form 9 and Form 11 for rural properties and plots within Gram Panchayat limits.",
      documentsNeeded: "Property ID, Owner Name, or Panchayat Code.",
      useCase: "Verifying layout authorization for countryside villas and plotted holdings.",
      url: "https://eswathu.karnataka.gov.in",
      caution: "Only GP layouts with e-Swathu Form 9/11 certificates are eligible for registration in Kaveri.",
      lastChecked: "2026-06",
      category: "Khata"
    },
    {
      name: "BBMP Property Tax Portal",
      authority: "Bruhat Bengaluru Mahanagara Palike",
      purpose: "Check property tax payment history, print tax receipts, and verify PID numbers.",
      documentsNeeded: "10-digit Application Number or Base PID number.",
      useCase: "Verifying municipal tax paid status for urban apartments and villas.",
      url: "https://bbmptax.karnataka.gov.in",
      caution: "Verify that all outstanding tax arrears are cleared by the developer before signing the sale deed.",
      lastChecked: "2026-06",
      category: "Property Tax"
    },
    {
      name: "BDA Building Plan approvals",
      authority: "Bangalore Development Authority",
      purpose: "Verify layout plans, BDA zoning clearances, and master development boundaries.",
      documentsNeeded: "Layout sanction number or survey details.",
      useCase: "Checking development plans for major urban townships and commercial layouts.",
      url: "https://bdabangalore.org",
      caution: "Ensure the BDA layouts do not overlap with green belts, buffer zones, or civic amenity plots.",
      lastChecked: "2026-06",
      category: "Approvals"
    },
    {
      name: "BMRDA Layout Plan search",
      authority: "Bangalore Metropolitan Region Development Authority",
      purpose: "Verify planning permissions and zoning clearances for layouts on urban fringes.",
      documentsNeeded: "Sanction reference number, landowner details.",
      useCase: "Checking peripheral layout approvals across Anekal, Hoskote, and Devanahalli.",
      url: "https://bmrda.karnataka.gov.in",
      caution: "Check if the layout layout falls under high-tension line buffer restrictions.",
      lastChecked: "2026-06",
      category: "Approvals"
    },
    {
      name: "DTCP Planning approvals",
      authority: "Directorate of Town & Country Planning",
      purpose: "Confirm layout approvals and change of land use orders in district outskirts.",
      documentsNeeded: "Zoning application number, survey number.",
      useCase: "Verifying plotted developments across regional centers in Karnataka.",
      url: "https://dtcp.karnataka.gov.in",
      caution: "Confirm DC conversion order is issued prior to DTCP plan release.",
      lastChecked: "2026-06",
      category: "Approvals"
    },
    {
      name: "BESCOM Electric Utility Connection",
      authority: "Bangalore Electricity Supply Company",
      purpose: "Check electricity connection logs, meter transfer records, and deposit statuses.",
      documentsNeeded: "Account ID or consumer number.",
      useCase: "Verifying power allocation clearances for new constructions.",
      url: "https://bescom.karnataka.gov.in",
      caution: "Developer must provide individual Bescom sanction letters for each unit in an apartment.",
      lastChecked: "2026-06",
      category: "Utilities"
    },
    {
      name: "BWSSB Water & Sewerage NOC",
      authority: "Bangalore Water Supply and Sewerage Board",
      purpose: "Check water connection clearances and sewage treatment plant layout sanctions.",
      documentsNeeded: "Sanction plan copies, land deed records.",
      useCase: "Verifying municipal water availability and sewerage design approvals.",
      url: "https://bwssb.karnataka.gov.in",
      caution: "NOC from BWSSB is mandatory for building plan release for apartments with more than 8 units.",
      lastChecked: "2026-06",
      category: "Utilities"
    },
    {
      name: "Karnataka Fire Force NOC",
      authority: "Karnataka State Fire & Emergency Services",
      purpose: "Verify building height clearances and fire driveway dimensions compliance.",
      documentsNeeded: "Site plan sketches, height declarations.",
      useCase: "Auditing compliance for high-rise residential properties.",
      url: "https://ksfes.karnataka.gov.in",
      caution: "Fire NOC clearances require a minimum 6-meter driveway path clear of projections.",
      lastChecked: "2026-06",
      category: "Approvals"
    },
    {
      name: "eCourts Case Status Portal",
      authority: "High Court of Karnataka & Civil Courts",
      purpose: "Search civil litigation records, property disputes, and land partition suits.",
      documentsNeeded: "CNR number, party names, or advocate details.",
      useCase: "Auditing litigation risks and verifying clear marketability title history.",
      url: "https://ecourts.gov.in",
      caution: "Run searches across local district courts and tribunals to detect hidden dispute claims.",
      lastChecked: "2026-06",
      category: "Legal Search"
    },
    {
      name: "Bangalore One Citizen Portal",
      authority: "Directorate of Electronic Delivery of Citizen Services",
      purpose: "Access single-window citizen facilities for utilities, khata applications, and PAN checks.",
      documentsNeeded: "Citizen login, Aadhaar/PAN numbers.",
      useCase: "Facilitating basic utility name changes post-registration.",
      url: "https://bangaloreone.gov.in",
      caution: "Always match Aadhaar details with registered sale deed names to ensure record alignments.",
      lastChecked: "2026-06",
      category: "Citizen Services"
    }
  ];

  const handleQuickFilter = (category: string) => {
    setActiveCategory(category);
  };

  const filteredLinks = linksData.filter((link) => {
    const categoryMatch = activeCategory === "all" || link.category.toLowerCase().includes(activeCategory.toLowerCase()) || 
      (activeCategory === "due_diligence" && ["rera", "registration", "legal"].includes(link.category.toLowerCase())) ||
      (activeCategory === "land" && ["land records", "survey"].includes(link.category.toLowerCase())) ||
      (activeCategory === "construction" && ["approvals", "utilities"].includes(link.category.toLowerCase()));

    const queryMatch = link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && queryMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* 1. Page Header */}
      <section className="bg-dark-luxury-gradient text-white py-16 sm:py-20 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,110,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,110,58,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Advisory Resources</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Government Property Links & Verification Portals
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Access important official portals for RERA checks, land records, property tax, khata, registration, survey sketches, building approvals, and utility verification across Karnataka.
          </p>
        </div>
      </section>

      {/* 2. Main Content and Search Dashboard */}
      <section className="py-12 sm:py-16 flex-grow max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
          
          {/* Sidebar Controls */}
          <div className="space-y-6">
            <Card className="p-6 bg-white border border-gold-elegant space-y-6">
              <div>
                <h3 className="font-serif text-base font-bold text-[#10291f] mb-1">Search Portals</h3>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider font-sans">Quick Query</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Keywords</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-semibold bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                  placeholder="RERA, Bhoomi, Kaveri..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Verification Goal</label>
                <div className="flex flex-col space-y-1.5 pt-1 text-xs">
                  <button
                    onClick={() => handleQuickFilter("all")}
                    className={`text-left px-3 py-2 rounded font-bold transition-all ${
                      activeCategory === "all" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"
                    }`}
                  >
                    All Links
                  </button>
                  <button
                    onClick={() => handleQuickFilter("due_diligence")}
                    className={`text-left px-3 py-2 rounded font-bold transition-all ${
                      activeCategory === "due_diligence" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"
                    }`}
                  >
                    Buyer Due Diligence
                  </button>
                  <button
                    onClick={() => handleQuickFilter("land")}
                    className={`text-left px-3 py-2 rounded font-bold transition-all ${
                      activeCategory === "land" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"
                    }`}
                  >
                    Land / Plot Verification
                  </button>
                  <button
                    onClick={() => handleQuickFilter("rera")}
                    className={`text-left px-3 py-2 rounded font-bold transition-all ${
                      activeCategory === "rera" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"
                    }`}
                  >
                    Apartment RERA Checks
                  </button>
                  <button
                    onClick={() => handleQuickFilter("construction")}
                    className={`text-left px-3 py-2 rounded font-bold transition-all ${
                      activeCategory === "construction" ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"
                    }`}
                  >
                    Construction Approval
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Links Grid */}
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Showing {filteredLinks.length} official portals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLinks.map((link, idx) => (
                <GovernmentLinkCard key={idx} link={link} />
              ))}
            </div>

            {/* Verification Flow section */}
            <div className="pt-8 border-t border-slate-200 space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#10291f]">Recommended Property Verification Flow</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">MS Legacy recommends completing all ten steps before signing property transaction agreements.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 1: Confirm Identity</span>
                  <p className="text-slate-600">Cross-reference developer legal names and project titles against RERA databases.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 2: Check RERA Records</span>
                  <p className="text-slate-600">Ensure the layout RERA number is active, approved, and has no pending complaints.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 3: Title Vetting</span>
                  <p className="text-slate-600">Conduct a 30-year physical search of parent sale deeds and land partition history.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 4: Encumbrance Vetting</span>
                  <p className="text-slate-600">Download a digital Encumbrance Certificate (EC) from Kaveri Online to check liabilities.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 5: RTC/Pahani Search</span>
                  <p className="text-slate-600">Inspect Bhoomi mutation logs to confirm agricultural status and current owner mutation.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 6: Boundary Survey</span>
                  <p className="text-slate-600">Match border dimensions against Mojini survey sketches and local village maps.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 7: Khata Audit</span>
                  <p className="text-slate-600">Check BBMP e-Khata or e-Swathu Form 9/11 layout approvals to avoid registration holds.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 8: Tax Compliance</span>
                  <p className="text-slate-600">Confirm all outstanding municipal property taxes are paid up to the current assessment year.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 9: Layout Approvals</span>
                  <p className="text-slate-600">Verify BDA, BMRDA, or BIAPPA layout sanction letters and local NOC requirements.</p>
                </Card>
                <Card className="p-4 bg-white border border-gold-elegant space-y-1">
                  <span className="text-[#8b6e3a] font-bold">Step 10: Legal Opinion</span>
                  <p className="text-slate-600">Consult independent legal counsel and request a formal MS Legacy title due diligence report.</p>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <Link href="/project-enquiry?interestType=project_due_diligence">
                  <Button className="bg-[#10291f] text-white font-bold text-xs py-3 px-8 h-auto">
                    Request MS Legacy Title Due Diligence Review
                  </Button>
                </Link>
              </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="bg-white border border-gold-elegant p-6 rounded text-[10px] text-slate-400 leading-relaxed text-center">
              <span className="font-bold text-[#10291f] uppercase tracking-wide block mb-1">Advisory Links Disclaimer</span>
              <p>
                These links are provided for convenience and advisory education. Government portals, forms, charges, processes, and URLs may change without notice. Buyers must verify records directly with the concerned department and independent legal advisors before making any property decision.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
