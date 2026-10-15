import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Layout Development Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/layout-development",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Layout Development Planning" />;
}
