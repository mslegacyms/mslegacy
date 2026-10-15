import Link from "next/link";
import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "NRI Property Support",
  "Discuss local property inspections, maintenance coordination and reporting for overseas owners with MS LEGACY.",
  "/nri-support",
);
export default function NriPage() {
  return (
    <>
      <PublicIntro
        eyebrow="For overseas owners"
        title="Local property support. Wherever you live."
        description="Discuss the property you own or the search you are planning. We will explain the available local coordination and the scope to agree."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>Keep the practical details visible.</h2>
          <p>
            Agree the inspection frequency, photo-report format, maintenance
            approvals and a suitable contact time for your time zone.
          </p>
          <div className="site-deliverables">
            <article>
              <span className="site-step-number">01</span>
              <div>
                <h3>Property care</h3>
                <p>
                  Discuss support for a vacant or rented property, with visits
                  and reporting defined before engagement.
                </p>
              </div>
            </article>
            <article>
              <span className="site-step-number">02</span>
              <div>
                <h3>Search coordination</h3>
                <p>
                  Share the location, intended use and budget for a property
                  requirement. Further eligibility and professional checks
                  depend on the transaction.
                </p>
              </div>
            </article>
            <article>
              <span className="site-step-number">03</span>
              <div>
                <h3>Clear responsibilities</h3>
                <p>
                  Confirm who handles each task, the fee basis and the approval
                  process for additional work.
                </p>
              </div>
            </article>
          </div>
          <p>
            Tax advice, banking, repatriation, legal representation and powers
            of attorney require appropriately qualified professional support and
            a separate agreed scope.
          </p>
          <Link className="site-text-link" href="/services/property-management">
            Read the property-management service details →
          </Link>
        </div>
      </section>
      <PublicCTA
        href="/project-enquiry?interestType=nri_advisory"
        action="Discuss NRI property support"
      />
    </>
  );
}
