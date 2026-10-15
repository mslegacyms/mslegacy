import { PublicIntro } from "@/components/public/PublicComponents";
import { pageMetadata, publicSite } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Privacy Notice",
  "How the MS LEGACY website’s enquiry draft and direct-contact options handle the information you choose to provide.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <PublicIntro
        eyebrow="Website information"
        title="Privacy notice"
        description="This notice describes the public website’s enquiry-draft and direct-contact flow."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <p className="site-caption">Updated 16 October 2026</p>
          <h2>Information you choose to provide</h2>
          <p>
            The enquiry composer asks for your name, preferred contact detail
            and the service you need. Location, budget and a message are
            optional. Please do not include identity numbers, bank details or
            confidential property documents.
          </p>
          <h2>Preparing and sending a message</h2>
          <p>
            Preparing a draft does not submit the form to an MS LEGACY database.
            Its contents remain in the current page and are not saved by the
            composer to browser storage. Opening email or WhatsApp passes the
            draft to that service; you decide whether to send it there. Those
            services process information under their own terms.
          </p>
          <h2>Contact about your enquiry</h2>
          <p>
            If you send a message, MS LEGACY can use the details you provide to
            discuss that enquiry. Before sharing private documents or starting
            an engagement, ask about the appropriate transfer method, service
            providers involved and document-handling arrangements.
          </p>
          <h2>Technical information</h2>
          <p>
            The hosting service may process routine technical connection and
            server logs. This version of the public website does not load its
            optional Google Analytics integration. External sites and messaging
            apps have their own data practices.
          </p>
          <h2>Questions and requests</h2>
          <p>
            For questions about information you have shared, correction or
            deletion requests, contact{" "}
            <a href={publicSite.emailHref}>{publicSite.email}</a> or{" "}
            <a href={publicSite.phoneHref}>{publicSite.phone}</a>. Identify the
            enquiry concerned without including confidential documents in your
            initial request.
          </p>
        </div>
      </section>
    </>
  );
}
