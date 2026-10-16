import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Property Planning Calculators Suite | MS Legacy",
  description: "Detailed premium financial planning planners for buyer affordability, home loan EMIs, stamp duty, layouts, apartments, and NRI ownership. Planning estimates only."
};

interface CalculatorTool {
  title: string;
  forWho: string;
  calculates: string;
  route: string;
  tag: "Buyer" | "Developer" | "NRI" | "Landowner" | "Investor";
}

const TOOLS_BY_CATEGORY = [
  {
    category: "1. Buyer Planning Calculators",
    description: "Determine affordability boundaries, loan balances, stamp duty taxes, and shortlist score matrices.",
    tools: [
      {
        title: "Home Loan EMI Planner",
        forWho: "Buyers & Investors",
        calculates: "Monthly EMIs, LTV limits, prepayment schedules, and bank checklist files.",
        route: "/calculators/home-loan-emi",
        tag: "Buyer"
      },
      {
        title: "Buyer Affordability Desk",
        forWho: "Buyers & Families",
        calculates: "Safe and aggressive property budgets, liquid fund checks, and financial readiness.",
        route: "/calculators/buyer-affordability",
        tag: "Buyer"
      },
      {
        title: "Stamp Duty & Registration Calculator",
        forWho: "Buyers & Developers",
        calculates: "Karnataka stamp duty estimates, cess surcharges, sub-registrar fees, and total acquisition costs.",
        route: "/calculators/stamp-duty-registration",
        tag: "Buyer"
      },
      {
        title: "Rental Yield Planner",
        forWho: "Investors & Landowners",
        calculates: "Gross/net rental yields, vacancy impacts, management retainers, and cashflows.",
        route: "/calculators/rental-yield",
        tag: "Investor"
      },
      {
        title: "Project Shortlist Scorecard",
        forWho: "Buyers & NRI Clients",
        calculates: "Total suitability score, strengths/risks, construction progress check, and grades.",
        route: "/calculators/project-shortlist-score",
        tag: "Buyer"
      }
    ] as CalculatorTool[]
  },
  {
    category: "2. Landowner & Developer Calculators",
    description: "Assess layout allocations, FAR built-up areas, construction components, and investor conversion returns.",
    tools: [
      {
        title: "Layout Development Feasibility Planner",
        forWho: "Developers & Landowners",
        calculates: "BDA/BMRDA road allocations, park setbacks, conversion costs, and launch budgets.",
        route: "/calculators/layout-development",
        tag: "Developer"
      },
      {
        title: "Apartment Feasibility Planner",
        forWho: "Promoters & Landowners",
        calculates: "FAR potentials, built-up areas, unit mix configurations, and break-even sales.",
        route: "/calculators/apartment-development",
        tag: "Developer"
      },
      {
        title: "Land / Plot Cost Planner",
        forWho: "Buyers & Landowners",
        calculates: "Acreage-to-Sq.Ft conversion rate, fencing compound walls, legal searches, and clean values.",
        route: "/calculators/land-plot-cost",
        tag: "Landowner"
      },
      {
        title: "Detailed Construction Cost Planner",
        forWho: "Clients & Developers",
        calculates: "RCC civil works, woodworks interiors, MEP, professional PMC fees, and contingency margins.",
        route: "/calculators/construction-cost",
        tag: "Developer"
      }
    ] as CalculatorTool[]
  },
  {
    category: "3. NRI & Asset Management Calculators",
    description: "Evaluate foreign exchange cashflows, repatriation rules, and property management expenses.",
    tools: [
      {
        title: "NRI Property Ownership Planner",
        forWho: "NRI Property Owners",
        calculates: "FX conversions, annual holding costs, NRE/NRO transfers, and management readiness.",
        route: "/calculators/nri-ownership",
        tag: "NRI"
      }
    ] as CalculatorTool[]
  }
];

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-20 relative overflow-hidden bg-luxury-grid border-b border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Planning Suite</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Property Planning Calculators
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Use these detailed planners to prepare for a property decision. All rates and percentages are editable planning assumptions.
          </p>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {TOOLS_BY_CATEGORY.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <div className="border-b border-[#d9c79f]/60 pb-3">
                <h2 className="font-serif text-2xl font-bold text-[#10291f]">{cat.category}</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.tools.map((tool, toolIdx) => (
                  <Card key={toolIdx} className="p-6 bg-white border border-[#d9c79f]/50 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="gold" className="bg-[#8b6e3a]/10 text-[#8b6e3a] border border-[#8b6e3a]/20 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          {tool.tag}
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                          {tool.forWho}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#10291f] pt-1">{tool.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {tool.calculates}
                      </p>
                    </div>

                    <div className="pt-6">
                      <Link href={tool.route}>
                        <Button className="w-full text-xs font-bold uppercase py-2 bg-[#10291f] text-white hover:bg-[#183d2e] tracking-wider border-none">
                          Open Detailed Planner ➔
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Disclaimer */}
      <section className="bg-white py-12 border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto px-6 text-[10px] text-slate-400 leading-relaxed space-y-2">
          <span className="font-bold text-[#10291f] uppercase tracking-wide block">Global Planning Disclaimers</span>
          <p>
            Planning estimate only — verify with banks, government authorities, developers, licensed professionals, and independent legal/financial advisors before making any decision. Actual EMI, stamp duty, registration charges, taxes, loan eligibility, rent, construction cost, and legal costs may vary. MS Legacy provides planning support, not guaranteed outcomes.
          </p>
        </div>
      </section>
    </div>
  );
}
