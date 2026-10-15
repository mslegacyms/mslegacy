import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Landowner & Developer Enquiries",
  "Discuss a property-specific landowner or developer collaboration requirement with MS LEGACY.",
  "/project-participation",
);
export default function CollaborationPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Business enquiries"
        title="Discuss a landowner or developer requirement."
        description="Share the property location, intended collaboration and your role. The team can explain whether there is a suitable service to discuss."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>Begin with the property and the scope.</h2>
          <ul>
            <li>Property locality, approximate size and current stage.</li>
            <li>Your ownership or representation role.</li>
            <li>The support or collaboration you are considering.</li>
            <li>Any professional checks or approvals still needed.</li>
          </ul>
          <p>
            This page is an invitation to discuss a requirement. It does not
            present an investment offer, a confirmed development partnership or
            a return projection. Any proposed arrangement needs
            property-specific review and separate formal documentation.
          </p>
        </div>
      </section>
      <PublicCTA
        href="/project-enquiry?interestType=landowner_developer"
        action="Discuss a collaboration"
      />
    </>
  );
}
