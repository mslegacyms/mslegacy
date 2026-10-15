import { PublicIntro } from "@/components/public/PublicComponents";
import { ProjectEnquiryForm } from "@/components/projects/ProjectEnquiryForm";
import { enquiryContext, type EnquirySearch } from "@/lib/enquiryPresentation";
import { pageMetadata, publicSite } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Contact MS LEGACY",
  "Contact MS LEGACY in Bengaluru about property sourcing, construction, property care or document-review support.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<EnquirySearch>;
}) {
  const context = enquiryContext(await searchParams);
  return (
    <>
      <PublicIntro
        eyebrow="Contact MS LEGACY"
        title="A conversation is a good place to start."
        description="Tell us about your property requirement and the support you need. Contact us directly or prepare a message below."
      />
      <section className="site-section">
        <div className="site-container site-contact-grid">
          <aside>
            <p className="site-eyebrow site-eyebrow-dark">Get in touch</p>
            <h2>
              We’re based
              <br />
              in Bengaluru.
            </h2>
            <dl className="site-contact-details">
              <dt>Call</dt>
              <dd>
                <a href={publicSite.phoneHref}>{publicSite.phone}</a>
              </dd>
              <dt>Email</dt>
              <dd>
                <a href={publicSite.emailHref}>{publicSite.email}</a>
              </dd>
              <dt>Address</dt>
              <dd>
                <address>{publicSite.address}</address>
              </dd>
            </dl>
            <a
              href={publicSite.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="site-text-link"
            >
              Open WhatsApp →
            </a>
            <p className="site-caption">
              Confirm service availability for your property location. Visits
              and appointments are arranged with the team.
            </p>
          </aside>
          <ProjectEnquiryForm key={JSON.stringify(context)} {...context} />
        </div>
      </section>
    </>
  );
}
