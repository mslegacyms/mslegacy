import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Stamp Duty & Registration Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/stamp-duty-registration",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Stamp Duty & Registration Planning" />;
}
