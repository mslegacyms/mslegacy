import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Land & Plot Cost Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/land-plot-cost",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Land & Plot Cost Planning" />;
}
