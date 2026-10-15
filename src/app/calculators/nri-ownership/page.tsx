import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "NRI Ownership Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/nri-ownership",
);
export default function ToolPage() {
  return <PlanningToolNotice title="NRI Ownership Planning" />;
}
