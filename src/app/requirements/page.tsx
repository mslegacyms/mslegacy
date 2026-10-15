import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Share a Property Requirement",
  "Discuss your property requirement directly with MS LEGACY.",
  "/requirements",
);
export default function RequirementsPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Your property requirement"
        title="Tell us what you have in mind."
        description="Share your location, property type, approximate budget and the support you need directly with the team."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>A direct conversation with MS LEGACY.</h2>
          <p>
            The public requirement exchange is not accepting or publishing
            submissions here. You can prepare a direct enquiry and choose
            whether to send it through email or WhatsApp.
          </p>
          <p>
            Please leave out private owner details and confidential documents
            from your initial message.
          </p>
        </div>
      </section>
      <PublicCTA />
    </>
  );
}
