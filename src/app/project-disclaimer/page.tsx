import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Property Information Notice",
  "How to interpret property research, sample records and review status on the MS LEGACY website.",
  "/project-disclaimer",
);
export default function PropertyNoticePage() {
  return (
    <>
      <PublicIntro
        eyebrow="Property information"
        title="Research is the beginning of a review."
        description="Understand what a property entry does, and what still needs confirmation before a decision."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>Confirm the specific property.</h2>
          <p>
            A research entry is not evidence of an active listing, authorized
            representation, a completed legal review or current availability.
            Contact the relevant party for current prices, area basis,
            inclusions, possession status and documents.
          </p>
          <h2>Keep the checks separate.</h2>
          <p>
            A registration reference, an ownership-history check, a site visit
            and a professional opinion cover different questions. Ask for the
            source, date, scope and responsible reviewer for each item. A score
            or badge does not certify title, value or suitability.
          </p>
          <h2>Understand the engagement.</h2>
          <p>
            Service scope, fees and professional responsibilities are confirmed
            before engagement. A website enquiry does not reserve a property or
            confirm a visit.
          </p>
        </div>
      </section>
      <PublicCTA />
    </>
  );
}
