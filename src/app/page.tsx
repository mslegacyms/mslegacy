import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, MapPin, Scale, Compass, Landmark, ArrowRight, Sparkles, Activity, Users, UserCheck } from "@/components/ui/Icons";
import { mockProperties } from "@/lib/data/mockProperties";
import { mockNewsUpdates } from "@/lib/data/mockNewsUpdates";
import { formatINR } from "@/lib/utils";

export default function HomePage() {
  const featuredOpportunities = mockProperties.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* SECTION 1: CINEMATIC HERO SYSTEM */}
      <section className="relative bg-dark-luxury-gradient text-white py-32 sm:py-40 overflow-hidden border-b border-white/5 bg-luxury-grid">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_20%,_#070B19_80%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Col - Copy */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-gold-elegant px-4 py-1.5 rounded-full text-xs text-[#8b6e3a] tracking-wider uppercase font-semibold">
                <Sparkles size={12} className="animate-pulse" />
                <span>Integrated Real Estate Wealth Platform</span>
              </div>
              
              <h1 className="text-hero-luxury font-bold tracking-tight leading-none text-white">
                Find a property. <br />
                <span className="text-[#8b6e3a] italic font-normal block mt-2">Plan your next step.</span>
              </h1>
              
              <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-medium">
                Explore property information, compare options and discuss your requirements with MS LEGACY. Confirm price, availability, approvals and documents before making a decision.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link href="/opportunities">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold bg-gold-gradient text-[#10291f] hover:brightness-110 border-none px-8 py-4 h-fit">
                    Explore Sourced Showroom
                  </Button>
                </Link>
                <Link href="/property-wealth-score">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-gold-elegant hover:bg-white/5 px-8 py-4 h-fit">
                    Assess Wealth Score
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-lg">
                <div className="space-y-1">
                  <span className="text-xl font-body font-bold text-[#8b6e3a]">Explore</span>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold tracking-wider">Property information</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xl font-body font-bold text-[#8b6e3a]">Compare</span>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold tracking-wider">Your options</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xl font-body font-bold text-[#8b6e3a]">Discuss</span>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold tracking-wider">Your next step</span>
                </div>
              </div>
            </div>

            {/* Right Col - Score Widget Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="glass-panel-dark p-8 rounded border border-gold-elegant max-w-md w-full space-y-6 shadow-2xl relative">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white tracking-wide">PROPERTY WEALTH SCORE™</h3>
                    <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Illustrative planning example</p>
                  </div>
                  <Badge variant="gold" className="bg-[#8b6e3a]/20 text-[#8b6e3a] border border-gold-elegant text-xs font-body font-bold px-3">
                    9.5 / 10
                  </Badge>
                </div>
                
                {/* Score parameters */}
                <div className="space-y-4 font-body">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Legal Title Integrity (35%)</span>
                      <span className="text-[#8b6e3a]">9.8 / 10</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-[#8b6e3a] h-full rounded-full" style={{ width: "98%" }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Location Dynamics (30%)</span>
                      <span className="text-[#8b6e3a]">9.5 / 10</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-[#8b6e3a] h-full rounded-full" style={{ width: "95%" }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Infrastructure Development (20%)</span>
                      <span className="text-[#8b6e3a]">9.0 / 10</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-[#8b6e3a] h-full rounded-full" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded text-xs text-slate-300 border border-gold-elegant leading-relaxed font-medium">
                  <strong>Assessment Verdict:</strong> Illustrative score only. No property title, RERA status or physical access is certified by this widget. Independent document review is required.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LUXURY TRUST STRIP */}
      <section className="bg-white py-8 border-b border-slate-100 shadow-xs z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-ui-label text-[#10291f]/60">
            Securing Premium Assets for Family Offices, HNI Investors, and Private Buyers
          </p>
        </div>
      </section>

      {/* SECTION 3: THE MS LEGACY DIFFERENCE */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="inline-block border-b-2 border-[#8b6e3a] pb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b6e3a]">Executive Summary</span>
          </div>
          <h2 className="text-section-luxury leading-tight">
            Eliminating Asset Sourcing Risk through Single-Desk Integration
          </h2>
          <p className="font-body text-sm sm:text-base text-[#4A5568] leading-relaxed max-w-3xl mx-auto font-medium">
            Traditional real estate acquisition is highly fragmented. Buyers are forced to coordinate with unverified land brokers, independent engineers, title search counsels, and caretakers—creating structural delays, inflating budgets, and risking title disputes.
          </p>
          <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed max-w-3xl mx-auto font-medium">
            MS Legacy acts as a single unified desk. We take complete responsibility for title clearances,DC conversion checks, RERA registrations, architectural coordination, turnkey build PMC, and long-term asset care. 
          </p>
        </div>
      </section>

      {/* SECTION 4: THE FIVE INTEGRATED DIVISIONS */}
      <section className="bg-slate-50 py-24 border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold" className="px-3">Core Pillars</Badge>
            <h2 className="text-section-luxury">
              Our Five Sourcing and Asset Desks
            </h2>
            <p className="font-body text-sm text-slate-500 max-w-md mx-auto font-medium">
              Stewardship and asset support managed under a single unified advisory ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Division 1 */}
            <Card className="p-6 flex flex-col justify-between card-lift bg-white border border-gold-elegant">
              <div className="space-y-4">
                <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                  <Compass size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#10291f]">Land Sourcing</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Auditing high-growth corridors using infrastructure data and 30-year parent deed traces.
                </p>
              </div>
              <Link href="/services/land-sourcing" className="text-xs font-bold text-[#8b6e3a] mt-6 flex items-center hover:underline">
                View Sourcing Model <ArrowRight size={12} className="ml-1" />
              </Link>
            </Card>

            {/* Division 2 */}
            <Card className="p-6 flex flex-col justify-between card-lift bg-white border border-gold-elegant">
              <div className="space-y-4">
                <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                  <Landmark size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#10291f]">Turnkey PMC</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Engineering design and contractor oversight with cost-plus transparency.
                </p>
              </div>
              <Link href="/services/turnkey-construction" className="text-xs font-bold text-[#8b6e3a] mt-6 flex items-center hover:underline">
                View Build Process <ArrowRight size={12} className="ml-1" />
              </Link>
            </Card>

            {/* Division 3 */}
            <Card className="p-6 flex flex-col justify-between card-lift bg-white border border-gold-elegant">
              <div className="space-y-4">
                <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                  <UserCheck size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#10291f]">Property Custody</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Overseeing NRI portfolios with digital checks and lease compliance management.
                </p>
              </div>
              <Link href="/services/property-management" className="text-xs font-bold text-[#8b6e3a] mt-6 flex items-center hover:underline">
                View Custody Services <ArrowRight size={12} className="ml-1" />
              </Link>
            </Card>

            {/* Division 4 */}
            <Card className="p-6 flex flex-col justify-between card-lift bg-white border border-gold-elegant">
              <div className="space-y-4">
                <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#10291f]">Legal Clearance</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Comprehensive legal clearance checks including mutation records and khata audits.
                </p>
              </div>
              <Link href="/services/legal-due-diligence" className="text-xs font-bold text-[#8b6e3a] mt-6 flex items-center hover:underline">
                View Clearance Audits <ArrowRight size={12} className="ml-1" />
              </Link>
            </Card>

            {/* Division 5 */}
            <Card className="p-6 flex flex-col justify-between card-lift bg-white border border-gold-elegant">
              <div className="space-y-4">
                <div className="p-3 bg-[#10291f]/5 rounded w-fit text-[#8b6e3a]">
                  <Activity size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#10291f]">Project Review</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Structured layout developments and land banking opportunities under private review.
                </p>
              </div>
              <Link href="/project-participation" className="text-xs font-bold text-[#8b6e3a] mt-6 flex items-center hover:underline">
                Review Framework <ArrowRight size={12} className="ml-1" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: ADVOCACY PROCESS TIMELINE */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="gold">Workflow Rigor</Badge>
            <h2 className="text-section-luxury">
              The Four-Step Sourcing Protocol
            </h2>
            <p className="font-sans text-sm text-slate-500 max-w-md mx-auto font-medium">
              How we inspect, qualify, and deliver real estate assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-body text-4xl font-bold text-[#8b6e3a]/30 block">01</span>
              <h4 className="font-body text-base font-bold text-[#10291f]">Corridor Analysis</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Demographic growth and upcoming transit nodes evaluation in Karnataka.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-body text-4xl font-bold text-[#8b6e3a]/30 block">02</span>
              <h4 className="font-body text-base font-bold text-[#10291f]">Documentation Audit</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Tracing mother deeds and verifying municipal and zoning approvals.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-body text-4xl font-bold text-[#8b6e3a]/30 block">03</span>
              <h4 className="font-body text-base font-bold text-[#10291f]">Physical Verification</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                On-site survey checking coordinates and approach road access parameters.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-body text-4xl font-bold text-[#8b6e3a]/30 block">04</span>
              <h4 className="font-body text-base font-bold text-[#10291f]">Desk Clearance</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Issuing PROPERTY WEALTH SCORE™ and onboarding layout onto client dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 8: HOMEPAGE CLIENT ENTRY POINT */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="gold">Marketplace Showroom</Badge>
            <h2 className="text-section-luxury leading-tight">
              Explore Projects, Compare Options, Calculate Costs
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Search curated apartments, plots, villas, and managed land opportunities across Karnataka. Compare projects, estimate ownership costs, and request MS Legacy’s documentation-first advisory review before making a decision.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects">
                <Button className="bg-[#10291f] text-white font-bold text-xs">Explore Projects</Button>
              </Link>
              <Link href="/developers">
                <Button variant="outline" className="border-gold-elegant text-xs font-bold text-[#10291f]">Browse Developers</Button>
              </Link>
              <Link href="/calculators">
                <Button variant="outline" className="border-gold-elegant text-xs font-bold text-[#10291f]">Use Calculators</Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#10291f]/5 p-8 rounded border border-gold-elegant space-y-4">
            <h4 className="font-display text-lg font-bold text-[#10291f]">Need Sourcing Advisory?</h4>
            <p className="text-xs text-slate-500 font-medium">
              MS Legacy provides documentation-first review desks to protect buyers. Request a consultation with our legal panel.
            </p>
            <Link href="/project-enquiry" className="inline-block">
              <Button className="bg-gold-gradient text-[#10291f] border-none font-bold text-xs py-2 px-4 h-auto">Request Advisory Review</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PHASE 10: EVERYTHING A CLIENT NEEDS SECTION */}
      <section className="py-24 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <Badge variant="gold">Client Toolkit</Badge>
            <h2 className="text-section-luxury">
              Everything a Property Buyer Needs in One Place
            </h2>
            <p className="font-body text-xs text-slate-500 max-w-md mx-auto font-medium">
              MS Legacy equips HNIs, NRIs, and land buyers with documentation checks and financial planning tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">1. Browse Trusted Developers</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Filter verified company profiles and establish dates in Karnataka.</p>
              <Link href="/developers" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">View Directory →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">2. Compare Project Options</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Select up to 3 layout specifications to audit pricing brackets side-by-side.</p>
              <Link href="/projects" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Start Compare →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">3. Check RERA Status</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Access verified state registry numbers and official government portals.</p>
              <Link href="/government-links" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Govt RERA Portals →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">4. Understand Floor Plans</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Review unit layouts, carpet sizes, and SBA specs under verified parameters.</p>
              <Link href="/projects" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">View Configurations →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">5. Estimate Cost Outlays</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Calculate EMIs, registration duties, and detailed construction costs.</p>
              <Link href="/calculators" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Use Cost Calculator →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">6. Review Title Readiness</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Vetting environmental permissions and 30-year mother deeds.</p>
              <Link href="/project-disclaimer" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Read Disclaimers →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">7. Request Site Visit Support</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Coordinate on-ground boundaries checks and road access surveys.</p>
              <Link href="/project-enquiry" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Schedule Siting →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">8. NRI Property Advisory</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Align forex cash flows and legal repatriation clearances.</p>
              <Link href="/project-enquiry" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Request NRI Desk →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">9. Siting Vetting checks</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Request complete legal title clearance briefs before signing documents.</p>
              <Link href="/project-enquiry" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Vetting Requests →</Link>
            </Card>

            <Card className="p-6 bg-white border border-gold-elegant space-y-3 font-body">
              <h4 className="font-body text-sm font-bold text-[#10291f]">10. Layout Development Feasibility</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Estimate BDA, BMRDA, Gram Panchayat, and DTCP land allocations and cost outlays.</p>
              <Link href="/calculators/layout-development" className="text-xs font-bold text-[#8b6e3a] hover:underline block pt-2">Feasibility Planner →</Link>
            </Card>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-24 border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="p-8 sm:p-12 bg-white border border-gold-elegant shadow-lg space-y-6 relative">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b6e3a]">Founders Message</span>
            <blockquote className="font-display text-lg sm:text-xl text-[#10291f] italic leading-relaxed">
              "MS Legacy was established to resolve the fragmentation in Bangalore's land sourcing and build industry. We believe luxury real estate is built on transparency, documentation, and data, not speculation. Our desks ensure your family's assets are protected."
            </blockquote>
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#8b6e3a]/20 flex items-center justify-center font-bold text-xs text-[#10291f]">
                MA
              </div>
              <div>
                <span className="font-body text-xs font-bold text-[#10291f] block">Muzzamil Ahmad</span>
                <span className="font-body text-[10px] text-slate-400 block">Chief Technical Architect</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 6: LATEST NEWS UPDATES */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="gold">Knowledge Center</Badge>
            <h2 className="text-section-luxury">
              Latest Property Updates & Government Norms
            </h2>
            <p className="font-sans text-xs text-slate-500 max-w-md mx-auto font-medium">
              Stay informed about RERA updates, land records, approval norms, registration changes, and real estate market developments with MS Legacy’s advisory-first knowledge hub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockNewsUpdates.slice(0, 3).map((article) => (
              <Card key={article.id} className="p-6 bg-white border border-[#d9c79f]/50 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="gold" className="text-[8px]">{article.category}</Badge>
                    <span className="text-[9px] text-slate-400 font-semibold">{article.publishedDate}</span>
                  </div>
                  <h4 className="font-body text-xs font-bold text-[#10291f] leading-snug">{article.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{article.excerpt}</p>
                </div>
                <div className="pt-6">
                  <Link href={`/news/${article.slug}`}>
                    <Button variant="outline" className="w-full text-xs font-bold uppercase py-2 border-[#10291f]/20 hover:border-[#8b6e3a] text-[#10291f]">
                      Read Advisory Update ➔
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link href="/news">
              <Button className="bg-[#10291f] text-white font-bold text-xs px-6 py-2.5 h-auto">Read Latest Updates</Button>
            </Link>
            <Link href="/government-links">
              <Button variant="outline" className="border-[#10291f] text-[#10291f] font-bold text-xs px-6 py-2.5 h-auto">View Government Links</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* SECTION 6.5: PROPERTY SOURCING EXCHANGE DEMAND CTA */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#f8f5ef] border border-gold-elegant rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
            <div className="space-y-4 max-w-2xl text-left">
              <Badge variant="gold" className="bg-[#8b6e3a]/15 text-[#8b6e3a] border border-[#8b6e3a]/20 uppercase tracking-wider text-[9px]">Sourcing Exchange</Badge>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#10291f] leading-tight">
                Tell Us What You Need. <br className="hidden sm:block" />
                <span className="text-[#8b6e3a] italic font-normal">We’ll Match the Market.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Post your apartment, plot, villa, farmland, rental, land, or JV requirement. MS Legacy reviews your need, protects your details, and matches it with verified developers, agents, and property opportunities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link href="/requirements/post" className="w-full sm:w-auto">
                <Button className="w-full bg-[#10291f] hover:bg-[#10291f]/90 text-white font-bold text-xs px-6 py-3 h-auto">
                  Post Requirement
                </Button>
              </Link>
              <Link href="/requirements" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-gold-elegant text-[#10291f] font-bold text-xs px-6 py-3 h-auto">
                  View Open Requirements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 7: FINAL CTA */}
      <section className="bg-dark-luxury-gradient text-white py-20 text-center relative overflow-hidden bg-luxury-grid">
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
          <Badge variant="gold" className="bg-[#8b6e3a]/20 text-[#8b6e3a] border border-gold-elegant">Advisory Desk</Badge>
          <h2 className="text-section-luxury text-white">Request Private Review</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Contact our advisors for land sourcing audits, due diligence checks, PMC scheduling, or NRI property management support.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gold-gradient text-[#10291f] hover:brightness-110 font-bold px-8 border-none h-fit py-3.5">
                Book Private Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
