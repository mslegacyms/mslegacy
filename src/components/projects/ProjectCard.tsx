import Link from "next/link";
import type {
  DeveloperProject,
  Developer,
} from "@/lib/types/developerMarketplace";
import { ArrowRight, Landmark } from "@/components/ui/Icons";
import {
  canShowProjectImage,
  isResearchProject,
  projectPrice,
} from "@/lib/projectPresentation";
import { ProjectImageFrame } from "./ProjectImageFrame";
interface ProjectCardProps {
  project: DeveloperProject;
  developerName?: string;
  developer?: Developer;
}
export function ProjectCard({ project }: ProjectCardProps) {
  const research = isResearchProject(project);
  return (
    <article className="site-property-card">
      <div className="site-property-visual">
        {canShowProjectImage(project) && project.cardImage ? (
          <ProjectImageFrame
            src={project.cardImage}
            alt={project.name}
            mediaPermissionStatus={project.mediaPermissionStatus}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="site-property-placeholder">
            <Landmark size={40} aria-hidden="true" />
            <span>Property information</span>
          </div>
        )}
        <span className="site-property-type">
          {project.projectType?.replace(/_/g, " ") || "Property"}
        </span>
      </div>
      <div className="site-property-body">
        <p className="site-property-status">
          {research
            ? "Research entry · confirmation required"
            : "Property information · confirm details"}
        </p>
        <h2>
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h2>
        <p className="site-property-location">
          {[project.locality, project.city].filter(Boolean).join(", ") ||
            "Location to confirm"}
        </p>
        <dl>
          <dt>Price</dt>
          <dd>{projectPrice(project)}</dd>
          <dt>Availability</dt>
          <dd>Confirm with the relevant party</dd>
          <dt>Information date</dt>
          <dd>{project.lastUpdated || "Not supplied"}</dd>
        </dl>
        <p className="site-caption">
          {research
            ? "Research information is not an active listing or a completed document review."
            : "Confirm representation, current price, approvals and availability before deciding."}
        </p>
        <div className="site-property-actions">
          <Link className="site-text-link" href={`/projects/${project.slug}`}>
            View details
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link
            className="site-text-link"
            href={`/project-enquiry?project=${encodeURIComponent(project.slug)}`}
          >
            Ask about this property
          </Link>
        </div>
      </div>
    </article>
  );
}
