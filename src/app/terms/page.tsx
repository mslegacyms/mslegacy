import Link from "next/link";
import { PublicIntro } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Terms of Use",
  "How to use MS LEGACY property information, service descriptions and enquiry-draft options.",
  "/terms",
);
export default function TermsPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Website information"
        title="Terms of use"
        description="Please read these notes when exploring property information and discussing a service."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <p className="site-caption">Updated 16 October 2026</p>
          <h2>Property information</h2>
          <p>
            Website information supports initial research. Confirm the property,
            phase, availability, price, approvals, registration references and
            documents with the relevant parties before making a decision. A
            research entry is not an authorized offer or a completed
            professional review.
          </p>
          <h2>Service scope</h2>
          <p>
            Descriptions explain the types of support to discuss. Service
            availability, fees, deliverables, responsibility and timing are
            confirmed in the relevant engagement. Professional opinions and
            third-party work must have a defined scope and responsible provider.
          </p>
          <h2>Enquiries and appointments</h2>
          <p>
            Preparing a website enquiry creates a draft. You choose whether to
            send it through email or WhatsApp. It does not reserve a property,
            confirm an appointment or establish that MS LEGACY received a
            message. Confirm arrangements directly with the team.
          </p>
          <h2>Further information</h2>
          <p>
            See the <Link href="/privacy">privacy notice</Link> for the
            website’s contact flow. Ask the team about any point that is unclear
            before sharing private documents or starting work.
          </p>
        </div>
      </section>
    </>
  );
}
