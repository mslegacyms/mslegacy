import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Construction Cost Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/construction-cost",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Construction Cost Planning" />;
}
