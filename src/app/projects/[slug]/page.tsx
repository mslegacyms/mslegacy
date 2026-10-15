"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/lib/developers/projects";
import type { DeveloperProject } from "@/lib/types/developerMarketplace";
import {
  isPublicProject,
  isResearchProject,
  projectPrice,
  projectSource,
} from "@/lib/projectPresentation";
import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<DeveloperProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    getProjectBySlug(slug)
      .then((item) => {
        if (active) setProject(item && isPublicProject(item) ? item : null);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);
  if (loading)
    return (
      <section className="site-section">
        <div className="site-container" role="status">
          Loading property information…
        </div>
      </section>
    );
  if (!project)
    return (
      <>
        <PublicIntro
          eyebrow="Property information"
          title={
            error
              ? "Property information is unavailable."
              : "This property is not available to view."
          }
          description="Return to property discovery or contact MS LEGACY to discuss your requirement."
        />
        <section className="site-section">
          <div className="site-container">
            <Link className="site-button" href="/projects">
              Back to property information
            </Link>
          </div>
        </section>
      </>
    );
  const research = isResearchProject(project),
    source = projectSource(project);
  return (
    <>
      <PublicIntro
        eyebrow={
          research
            ? "Research entry · confirmation required"
            : "Property information"
        }
        title={project.name}
        description={
          [project.locality, project.city].filter(Boolean).join(", ") ||
          "Location to confirm"
        }
      />
      <section className="site-section">
        <div className="site-container site-service-layout">
          <div>
            <Link className="site-text-link" href="/projects">
              ← Back to property information
            </Link>
            <div className="site-note">
              <h2>
                {research
                  ? "This is a research entry."
                  : "Confirm the current details."}
              </h2>
              <p>
                {research
                  ? "The catalog record is for research. It does not establish an active listing, authorized representation, approval, title clearance or current availability. Sample numerical claims are not shown as confirmed facts."
                  : "Confirm the current price, availability, representation and property-specific evidence before making a decision."}
              </p>
            </div>
            <h2>Information to discuss</h2>
            <dl className="site-property-facts">
              <dt>Property type</dt>
              <dd>{project.projectType?.replace(/_/g, " ") || "To confirm"}</dd>
              <dt>Current price</dt>
              <dd>{projectPrice(project)}</dd>
              <dt>Availability</dt>
              <dd>Confirmation required</dd>
              <dt>Information date</dt>
              <dd>{project.lastUpdated || "Not supplied"}</dd>
              <dt>Area & configurations</dt>
              <dd>
                {research
                  ? "Request current details and area basis"
                  : project.configurationSummary || "Request current details"}
              </dd>
              <dt>Approvals & documents</dt>
              <dd>
                Request the project- and phase-specific records for review
              </dd>
            </dl>
            {source && (
              <a
                className="site-text-link"
                href={source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the stated information source ↗
              </a>
            )}
            <h2 className="site-detail-subheading">
              Questions for your next step
            </h2>
            <ul className="site-property-questions">
              <li>Who is authorized to represent this property?</li>
              <li>
                What does the quoted price include, and what is the area basis?
              </li>
              <li>
                Which current records and professional reviews are available?
              </li>
              <li>What information remains unconfirmed?</li>
            </ul>
          </div>
          <aside className="site-service-aside">
            <p className="site-eyebrow site-eyebrow-dark">
              Interested in this property?
            </p>
            <h2>Start with your questions.</h2>
            <p>We will carry this property name into your enquiry draft.</p>
            <Link
              className="site-button"
              href={`/project-enquiry?project=${encodeURIComponent(project.slug)}`}
            >
              Ask about this property →
            </Link>
            <Link
              className="site-text-link"
              href={`/project-enquiry?project=${encodeURIComponent(project.slug)}&interestType=site_visit_support`}
            >
              Request a site visit
            </Link>
            <p className="site-caption">
              A request does not reserve a property or confirm a visit.
            </p>
          </aside>
        </div>
      </section>
      <PublicCTA
        href={`/project-enquiry?project=${encodeURIComponent(project.slug)}&interestType=project_due_diligence`}
        action="Discuss a document review"
      />
    </>
  );
}
