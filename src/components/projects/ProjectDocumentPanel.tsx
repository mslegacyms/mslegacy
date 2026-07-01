import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProjectDocumentPanelProps {
  projectName: string;
  brochurePath?: string;
  brochurePermissionStatus?: string;
  floorPlanPaths?: string[];
  floorPlanPermissionStatus?: string;
}

export const ProjectDocumentPanel = ({
  projectName,
  brochurePath,
  brochurePermissionStatus = "pending_permission",
  floorPlanPaths,
  floorPlanPermissionStatus = "pending_permission",
}: ProjectDocumentPanelProps) => {
  const isBrochureApproved = brochurePermissionStatus === "permission_received" && brochurePath;
  const isFloorPlanApproved = floorPlanPermissionStatus === "permission_received" && floorPlanPaths && floorPlanPaths.length > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
      {/* Brochure */}
      <Card className="p-6 bg-white border border-gold-elegant flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Project Literature</span>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Sourced Brochure</h4>
        </div>
        {isBrochureApproved ? (
          <a href={brochurePath} download className="block">
            <Button className="w-full bg-[#10291f] text-white font-bold text-xs">
              Download Project Brochure
            </Button>
          </a>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-medium italic leading-relaxed">
              Brochure access available after permission confirmation or advisory request.
            </p>
            <Link href={`/project-enquiry?project=${projectName}&interestType=apartment_enquiry`} className="block">
              <Button variant="outline" className="w-full border-gold-elegant text-[#10291f] font-bold text-xs">
                Request Brochure Sourcing
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Floor Plans */}
      <Card className="p-6 bg-white border border-gold-elegant flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Blueprints & Layouts</span>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Unit Floor Plans</h4>
        </div>
        {isFloorPlanApproved ? (
          <div className="space-y-2">
            {floorPlanPaths.map((path, idx) => (
              <a key={idx} href={path} download className="block">
                <Button className="w-full bg-[#10291f] text-white font-bold text-xs">
                  Download Floor Plan Layout {idx + 1}
                </Button>
              </a>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-medium italic leading-relaxed">
              Floor plan available after developer authorization or advisory review.
            </p>
            <Link href={`/project-enquiry?project=${projectName}&interestType=project_due_diligence`} className="block">
              <Button variant="outline" className="w-full border-gold-elegant text-[#10291f] font-bold text-xs">
                Request Floor Plan Vetting
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};
