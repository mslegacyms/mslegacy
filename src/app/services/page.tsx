import Link from "next/link";
import {
  PublicIntro,
  ServiceCards,
  PublicCTA,
} from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Property Services",
  "Explore land sourcing, construction and PMC, property management and document-review coordination from MS LEGACY.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Our services"
        title="Support for your next property decision."
        description="Find the right conversation for your property search, build, local care or document-review requirement."
      />
      <section className="site-section">
        <div className="site-container">
          <ServiceCards />
          <div className="site-note site-note-spaced">
            <h2>What to expect before engagement</h2>
            <p>
              We discuss your requirement, available support, the responsible
              team, fee basis and deliverables. Professional opinions and
              third-party work are identified in the agreed scope.
            </p>
          </div>
          <div className="site-business-links">
            <Link href="/nri-support">NRI property support →</Link>
            <Link href="/project-participation">
              Landowner & developer enquiries →
            </Link>
            <Link href="/channel-partners">Channel partner enquiries →</Link>
          </div>
        </div>
      </section>
      <PublicCTA />
    </>
  );
}
