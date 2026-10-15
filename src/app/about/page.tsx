import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata, publicSite } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "About MS LEGACY",
  "Learn about MS LEGACY’s approach to property sourcing, construction coordination, property care and document-review support.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PublicIntro
        eyebrow="About MS LEGACY"
        title="Property decisions deserve a clear conversation."
        description="Property sourcing, construction coordination, property care and document-review support, with a defined scope for every engagement."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <p className="site-eyebrow site-eyebrow-dark">Our approach</p>
          <h2>
            Understand your requirement.
            <br />
            Agree the way forward.
          </h2>
          <p>
            A property journey can involve owners, developers, contractors and
            specialist advisers. Our approach starts by understanding the
            support you need and making the responsibilities clear.
          </p>
          <p>
            Whether you are exploring land, planning construction or arranging
            local care for a property, discuss the service scope, fees,
            reporting and deliverables before engagement.
          </p>
          <h2>Clarity at each stage</h2>
          <ul>
            <li>
              Property information is a starting point for questions and further
              checks.
            </li>
            <li>
              Any legal, technical or professional review should identify its
              responsible reviewer and scope.
            </li>
            <li>
              Prices, availability and project-specific information need current
              confirmation.
            </li>
            <li>
              Additional work and third-party services should be agreed
              separately.
            </li>
          </ul>
          <h2>Based in Bengaluru</h2>
          <p>{publicSite.address}</p>
          <p>
            Contact us to confirm service availability for your property
            location.
          </p>
        </div>
      </section>
      <PublicCTA />
    </>
  );
}
