import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Channel Partner Enquiries",
  "Introduce your property business and discuss a potential working relationship with MS LEGACY.",
  "/channel-partners",
);
export default function PartnerPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Work with us"
        title="Let’s discuss how we could work together."
        description="Introduce your business, service geography and the type of property work you handle."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>What to include in your introduction</h2>
          <ul>
            <li>Your business name and role.</li>
            <li>The locations and property types you handle.</li>
            <li>The service or referral arrangement you want to discuss.</li>
            <li>Your preferred contact details.</li>
          </ul>
          <p>
            An introduction is an enquiry, not approval as an MS LEGACY partner.
            Any representation, referral terms, fees and use of brand assets
            need a separate agreed arrangement.
          </p>
        </div>
      </section>
      <PublicCTA
        href="/project-enquiry?interestType=channel_partner"
        action="Prepare a partner enquiry"
      />
    </>
  );
}
