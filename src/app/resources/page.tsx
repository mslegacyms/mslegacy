import Link from "next/link";
import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Property Guides & Resources",
  "Practical questions for property research, construction scope and remote property care, with links to official portals.",
  "/resources",
);
const guides = [
  {
    title: "Before choosing a property",
    items: [
      "Record your intended use, budget and preferred locality.",
      "Ask who is authorized to offer the property and when availability was checked.",
      "Compare the area basis, total price and excluded costs.",
      "Identify the documents and professional reviews still needed.",
    ],
  },
  {
    title: "Before starting construction",
    items: [
      "Agree the design brief, specifications and area basis.",
      "Clarify turnkey and PMC responsibilities.",
      "Record inclusions, exclusions and payment milestones.",
      "Agree how scope changes, programme updates and handover checks are handled.",
    ],
  },
  {
    title: "Before appointing a property manager",
    items: [
      "Define visit frequency and the reporting format.",
      "Set spending approvals and an emergency-contact process.",
      "Confirm tenancy tasks and any money-handling responsibilities.",
      "Agree fees, additional charges and the named contact.",
    ],
  },
];
export default function ResourcesPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Guides & resources"
        title="Good questions lead to better decisions."
        description="Use these practical checklists to prepare for a conversation. The right review depends on your property and the service you need."
      />
      <section className="site-section">
        <div className="site-container">
          <div className="site-guide-grid">
            {guides.map((guide) => (
              <article className="site-guide-card" key={guide.title}>
                <h2>{guide.title}</h2>
                <ul>
                  {guide.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="site-resource-links">
            <Link href="/government-links">
              <h3>Official property portals</h3>
              <p>
                Find government sources and confirm the relevant property
                record.
              </p>
              <span>View official links →</span>
            </Link>
            <Link href="/calculators">
              <h3>Planning tools</h3>
              <p>
                See which estimates are under review and how to discuss your
                assumptions.
              </p>
              <span>View tool status →</span>
            </Link>
            <Link href="/news">
              <h3>Property reading</h3>
              <p>
                Check the source, jurisdiction and date before relying on an
                update.
              </p>
              <span>Browse articles →</span>
            </Link>
          </div>
        </div>
      </section>
      <PublicCTA />
    </>
  );
}
