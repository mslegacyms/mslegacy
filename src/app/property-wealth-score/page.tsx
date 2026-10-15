import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Property Review Checklist",
  "Questions to discuss when reviewing a property’s information, costs, location and documentation.",
  "/property-wealth-score",
);
export default function PropertyChecklistPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Property research"
        title="A checklist for a clearer property review."
        description="A score alone cannot establish a property’s title, value or suitability. Keep the individual questions and evidence visible."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>Questions to take into your review</h2>
          <ul>
            <li>What is the source, date and scope of each property claim?</li>
            <li>Who is authorized to represent the property?</li>
            <li>What area basis, costs and exclusions apply?</li>
            <li>Which documents and professional opinions are still needed?</li>
            <li>
              What is confirmed about access, use and current availability?
            </li>
          </ul>
          <p>
            The previous demonstration score is not presented as a property
            assessment. Discuss an evidence-based review for your particular
            property.
          </p>
        </div>
      </section>
      <PublicCTA
        href="/project-enquiry?interestType=project_due_diligence"
        action="Discuss a property review"
      />
    </>
  );
}
