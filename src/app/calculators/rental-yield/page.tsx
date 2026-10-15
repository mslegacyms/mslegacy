import { PlanningToolNotice } from "@/components/public/PlanningToolNotice";
import { pageMetadata } from "@/lib/publicSite";
export const metadata = pageMetadata(
  "Rental Yield Planning",
  "This planning tool is under review. Discuss property-specific inputs and assumptions with MS LEGACY.",
  "/calculators/rental-yield",
);
export default function ToolPage() {
  return <PlanningToolNotice title="Rental Yield Planning" />;
}
