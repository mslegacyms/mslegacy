import Link from "next/link";
import { PublicIntro } from "@/components/public/PublicComponents";
export function PlanningToolNotice({ title }: { title: string }) {
  return (
    <>
      <PublicIntro
        eyebrow="Planning tools"
        title={title}
        description="This tool is under review. Please discuss the inputs and assumptions for your property before relying on an estimate."
      />
      <section className="site-section">
        <div className="site-container site-prose">
          <h2>Start with the right assumptions.</h2>
          <p>
            Rates, costs, available finance and development constraints vary by
            property and scope. We are keeping unverified calculator outputs out
            of this public page while their calculation and source assumptions
            are reviewed.
          </p>
          <p>
            Share a brief description of what you want to estimate. Do not send
            financial account details or private documents in your first
            enquiry.
          </p>
          <div className="site-actions">
            <Link className="site-button" href="/project-enquiry">
              Discuss a planning requirement
            </Link>
            <Link className="site-text-link" href="/resources">
              Back to guides →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
