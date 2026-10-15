import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Discuss a Property Opportunity",
  "Share the property requirement or opportunity you want to discuss with MS LEGACY.",
  "/opportunities",
);
export default function OpportunitiesPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Property enquiries"
        title="Start with a specific property requirement."
        description="Discuss the location, intended use and support you need. Current property information and any proposed engagement must be confirmed separately."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>A conversation before a commitment.</h2>
          <p>
            We are not displaying sample investment inventory or return
            projections as available opportunities. Share your requirement so
            the team can discuss the relevant service and next steps.
          </p>
        </div>
      </section>
      <PublicCTA />
    </>
  );
}
