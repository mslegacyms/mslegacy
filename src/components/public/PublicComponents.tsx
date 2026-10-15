import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Landmark,
  UserCheck,
  Scale,
} from "@/components/ui/Icons";
import {
  publicServices,
  publicSite,
  type PublicService,
} from "@/lib/publicSite";

const serviceIcons = [Compass, Landmark, UserCheck, Scale];

export function PublicIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="site-intro">
      <div className="site-container">
        <p className="site-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="site-lead">{description}</p>
      </div>
    </section>
  );
}

export function ServiceCards() {
  return (
    <div className="site-service-grid">
      {publicServices.map((service, i) => {
        const Icon = serviceIcons[i];
        return (
          <Link
            className="site-service-card"
            href={`/services/${service.slug}`}
            key={service.slug}
          >
            <div className="site-card-top">
              <Icon size={28} aria-hidden="true" />
              <span>{service.number}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <span className="site-text-link">
              View service <ArrowRight size={17} aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function ContactActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className="site-actions">
      <a className="site-button" href={publicSite.phoneHref}>
        {compact ? "Call MS LEGACY" : publicSite.phone}
      </a>
      <a
        className="site-button site-button-outline"
        href={publicSite.emailHref}
      >
        Email us
      </a>
    </div>
  );
}

export function PublicCTA({
  title = "Let’s discuss your property requirement.",
  text = "Tell us the location, what you are planning and the support you need. We will explain the available service and next steps.",
  href = "/project-enquiry",
  action = "Discuss my requirement",
}: {
  title?: string;
  text?: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className="site-cta">
      <div className="site-container site-cta-inner">
        <div>
          <p className="site-eyebrow">Your next step</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link href={href} className="site-button site-button-gold">
          {action}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ServiceDetail({ service }: { service: PublicService }) {
  return (
    <>
      <PublicIntro
        eyebrow={`Our services / ${service.number}`}
        title={service.headline}
        description={service.description}
      />
      <section className="site-section">
        <div className="site-container site-service-layout">
          <div>
            <p className="site-eyebrow site-eyebrow-dark">{service.title}</p>
            <h2>What we can help you plan.</h2>
            <p className="site-copy">{service.audience}</p>
            <div className="site-deliverables">
              {service.deliverables.map((item, i) => (
                <article key={item.title}>
                  <span className="site-step-number">0{i + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="site-note">
              <h3>Agree the scope before you begin</h3>
              <p>{service.boundaries}</p>
            </div>
          </div>
          <aside className="site-service-aside">
            <p className="site-eyebrow site-eyebrow-dark">
              Start a conversation
            </p>
            <h2>{service.shortTitle}</h2>
            <p>Helpful details for your first enquiry:</p>
            <ul>
              {service.preparation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              className="site-button"
              href={`/project-enquiry?interestType=${service.interest}`}
            >
              {service.action}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a className="site-aside-phone" href={publicSite.phoneHref}>
              {publicSite.phone}
            </a>
            <p className="site-caption">
              Fees, inclusions and timing are agreed after reviewing your
              requirement.
            </p>
          </aside>
        </div>
      </section>
      <section className="site-section site-section-ivory">
        <div className="site-container site-faq-wrap">
          <div>
            <p className="site-eyebrow site-eyebrow-dark">Before you enquire</p>
            <h2>A few useful answers.</h2>
          </div>
          <div>
            {service.faqs.map((faq) => (
              <details className="site-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <PublicCTA
        href={`/project-enquiry?interestType=${service.interest}`}
        action={service.action}
      />
    </>
  );
}
