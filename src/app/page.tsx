import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Landmark,
  UserCheck,
  Scale,
} from "@/components/ui/Icons";
import { ServiceCards, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata, publicServices, publicSite } from "@/lib/publicSite";

export const metadata = pageMetadata(
  "Property Advisory & Services in Bengaluru",
  "Discuss land sourcing, construction and PMC, property management and document-review coordination with MS LEGACY in Bengaluru.",
  "/",
);
const icons = [Compass, Landmark, UserCheck, Scale];
const steps = [
  {
    title: "Share your requirement",
    text: "Tell us the location, what you have in mind and where you need support.",
  },
  {
    title: "Agree the scope",
    text: "Understand the service, responsible team, fee basis and deliverables.",
  },
  {
    title: "Review the information",
    text: "Discuss suitable options or findings, including outstanding questions.",
  },
  {
    title: "Choose your next step",
    text: "Plan any visits, further checks or professional support you need.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="site-home-hero">
        <div className="site-container site-hero-grid">
          <div className="site-hero-copy">
            <p className="site-eyebrow">
              <span />
              Bengaluru · Property advisory & services
            </p>
            <h1>
              Find the right property.
              <br />
              <em>Plan your next step.</em>
            </h1>
            <p className="site-lead">
              From a focused property search to construction, local care and
              document review. A clearer conversation at every stage.
            </p>
            <div className="site-actions">
              <Link
                href="/project-enquiry"
                className="site-button site-button-gold"
              >
                Discuss my requirement
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/services" className="site-button site-button-light">
                Explore our services
              </Link>
            </div>
            <p className="site-hero-footnote">
              Clear scope. Considered decisions. A personal point of contact.
            </p>
          </div>
          <div className="site-hero-panel">
            <div className="site-panel-heading">
              <span>YOUR PROPERTY JOURNEY</span>
              <span className="site-panel-dot" />
            </div>
            <h2>What are you planning?</h2>
            <p>Start with the support you need.</p>
            <div className="site-journey-links">
              {publicServices.map((service, i) => {
                const Icon = icons[i];
                return (
                  <Link key={service.slug} href={`/services/${service.slug}`}>
                    <span className="site-journey-icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span>{service.shortTitle}</span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
            <div className="site-hero-panel-footer">
              <span>Let’s talk about your plans</span>
              <a href={publicSite.phoneHref}>{publicSite.phone}</a>
            </div>
          </div>
        </div>
        <div className="site-hero-rule" />
      </section>
      <section className="site-section">
        <div className="site-container">
          <div className="site-section-heading">
            <div>
              <p className="site-eyebrow site-eyebrow-dark">Our services</p>
              <h2>
                Practical support.
                <br />A clear way forward.
              </h2>
            </div>
            <p className="site-copy">
              Choose the service that matches your requirement. Each engagement
              starts with an agreed scope, responsibilities and next steps.
            </p>
          </div>
          <ServiceCards />
        </div>
      </section>
      <section className="site-section site-section-ivory">
        <div className="site-container site-discovery">
          <div>
            <p className="site-eyebrow site-eyebrow-dark">Property discovery</p>
            <h2>
              Explore the possibilities.
              <br />
              Ask the right questions.
            </h2>
            <p className="site-copy">
              Browse property information and compare locations and
              configurations. Confirm current prices, availability and the
              review needed for any property you are considering.
            </p>
            <div className="site-actions">
              <Link href="/projects" className="site-button">
                Explore property information
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/project-enquiry?interestType=land_sourcing"
                className="site-text-link"
              >
                Share a specific requirement
              </Link>
            </div>
          </div>
          <div className="site-discovery-grid">
            {[
              "Residential plots",
              "Apartments & villas",
              "Land requirements",
              "Property care",
            ].map((label, i) => (
              <Link
                key={label}
                href={
                  i === 3
                    ? "/services/property-management"
                    : `/project-enquiry?interestType=${i === 0 ? "plot_enquiry" : i === 1 ? "apartment_enquiry" : "land_sourcing"}`
                }
              >
                <span>0{i + 1}</span>
                <h3>{label}</h3>
                <ArrowRight size={21} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <p className="site-eyebrow site-eyebrow-dark">How we work</p>
          <h2>Start with clarity.</h2>
          <div className="site-process-grid">
            {steps.map((step, i) => (
              <article key={step.title}>
                <span className="site-step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section site-section-green">
        <div className="site-container site-nri-grid">
          <div>
            <p className="site-eyebrow">For overseas property owners</p>
            <h2>
              Your property is here.
              <br />
              You can stay informed.
            </h2>
            <p>
              Discuss local inspections, maintenance coordination and reporting
              for your property. Agree the support you need, wherever you live.
            </p>
            <Link href="/nri-support" className="site-button site-button-gold">
              Explore NRI property support
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="site-nri-points">
            <article>
              <span>01</span>
              <div>
                <h3>Local coordination</h3>
                <p>
                  A defined point of contact for the agreed property-care scope.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Meaningful updates</h3>
                <p>
                  Agree a visit schedule, dated photo reports and your reporting
                  channel.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Decisions stay with you</h3>
                <p>
                  Set approvals for maintenance spending and additional work.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container site-principles">
          <div>
            <p className="site-eyebrow site-eyebrow-dark">Our approach</p>
            <h2>
              Confidence starts
              <br />
              with the details.
            </h2>
            <Link href="/about" className="site-text-link">
              Get to know MS LEGACY
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="site-principle-grid">
            <article>
              <h3>Understand the scope</h3>
              <p>
                Know what is included, who is responsible and what the service
                will deliver.
              </p>
            </article>
            <article>
              <h3>Look at the source</h3>
              <p>
                Ask where property information comes from and what still needs
                confirmation.
              </p>
            </article>
            <article>
              <h3>Make an informed choice</h3>
              <p>
                Keep professional reviews and unresolved questions visible
                before committing.
              </p>
            </article>
            <article>
              <h3>Keep the conversation clear</h3>
              <p>
                Discuss fees, expectations and the next step before starting an
                engagement.
              </p>
            </article>
          </div>
        </div>
      </section>
      <PublicCTA />
    </>
  );
}
