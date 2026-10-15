import Link from "next/link";
import type {
  DeveloperProject,
  Developer,
} from "@/lib/types/developerMarketplace";
import { isResearchProject, projectPrice } from "@/lib/projectPresentation";
interface ProjectComparisonTableProps {
  projects: DeveloperProject[];
  developers?: Developer[];
  onRemove: (id: string) => void;
}
export function ProjectComparisonTable({
  projects,
  onRemove,
}: ProjectComparisonTableProps) {
  if (!projects.length)
    return (
      <div className="site-empty">
        <h2>Choose the properties you want to compare.</h2>
        <p>Select up to three entries from property discovery.</p>
        <Link className="site-button" href="/projects">
          Explore property information
        </Link>
      </div>
    );
  const rows: [string, (p: DeveloperProject) => string][] = [
    [
      "Location",
      (p) => [p.locality, p.city].filter(Boolean).join(", ") || "Not supplied",
    ],
    [
      "Property type",
      (p) => p.projectType?.replace(/_/g, " ") || "Not supplied",
    ],
    ["Price", projectPrice],
    ["Availability", () => "Confirmation required"],
    ["Area basis", () => "Request current details"],
    ["Information date", (p) => p.lastUpdated || "Not supplied"],
    [
      "Information status",
      (p) =>
        isResearchProject(p)
          ? "Research entry · confirmation required"
          : "Confirm property-specific information",
    ],
    ["Professional review", () => "Scope and evidence to be agreed"],
  ];
  const query = projects.map((p) => encodeURIComponent(p.id)).join(",");
  return (
    <>
      <div
        className="site-comparison-scroll"
        role="region"
        aria-label="Property comparison table, scroll horizontally to see all properties"
        tabIndex={0}
      >
        <table className="site-comparison-table">
          <caption>
            Property comparison. Research entries are not active listings or
            verified assessments.
          </caption>
          <thead>
            <tr>
              <th scope="col">Compare the details</th>
              {projects.map((p) => (
                <th scope="col" key={p.id}>
                  <Link href={`/projects/${p.slug}`}>{p.name}</Link>
                  <button
                    type="button"
                    aria-label={`Remove ${p.name} from comparison`}
                    onClick={() => onRemove(p.id)}
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {projects.map((p) => (
                  <td key={p.id}>{value(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="site-actions">
        <Link
          className="site-button"
          href={`/project-enquiry?ids=${query}&interestType=project_comparison`}
        >
          Discuss all selected properties →
        </Link>
        <Link className="site-text-link" href="/projects">
          Change selections
        </Link>
      </div>
    </>
  );
}
