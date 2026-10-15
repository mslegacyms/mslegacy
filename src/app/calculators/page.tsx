import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Planning Tool Review",
  "MS LEGACY planning tools are under review. Discuss the current inputs and assumptions for your property requirement.",
  "/calculators",
);
export default function CalculatorsPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Planning tools"
        title="Reliable planning starts with the inputs."
        description="Our calculator estimates are under review. Discuss your property and the assumptions needed before using a budget, yield or feasibility figure."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>What to prepare for a planning discussion</h2>
          <ul>
            <li>
              Purchase planning: price basis, down payment, loan amount and
              lender terms.
            </li>
            <li>
              Construction: location, area basis, specifications, programme and
              exclusions.
            </li>
            <li>
              Property care: occupancy, visits, maintenance budget and reporting
              needs.
            </li>
            <li>
              Development: site details and professional confirmation of the
              applicable constraints.
            </li>
          </ul>
          <p>
            We have paused public calculator outputs while their formulas,
            validation and source assumptions are checked. This avoids
            presenting an estimate as an approval, valuation or confirmed
            budget.
          </p>
        </div>
      </section>
      <PublicCTA action="Discuss my planning requirement" />
    </>
  );
}
