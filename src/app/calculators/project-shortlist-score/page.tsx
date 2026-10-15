import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Property Shortlist Review",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/project-shortlist-score",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Property Shortlist Review" />;
}
