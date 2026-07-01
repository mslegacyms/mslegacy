import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ProjectVideoPanelProps {
  videoUrl?: string;
  videoPoster?: string;
  projectName: string;
  mediaPermissionStatus?: string;
}

export const ProjectVideoPanel = ({
  videoUrl,
  videoPoster,
  projectName,
  mediaPermissionStatus = "pending_permission",
}: ProjectVideoPanelProps) => {
  const isApproved =
    mediaPermissionStatus === "permission_received" ||
    mediaPermissionStatus === "public_marketing_use_allowed";

  if (!isApproved || !videoUrl) {
    return (
      <div className="bg-slate-50 border border-gold-elegant p-6 rounded text-center text-xs text-slate-500 font-sans font-medium space-y-3">
        <div>
          <h4 className="font-serif text-sm font-bold text-[#10291f]">Walkthrough Video Pending Authorization</h4>
          <p className="max-w-md mx-auto leading-relaxed mt-1">
            Official drone surveys and interior walkthrough videos are locked until promoter permission clearances are recorded.
          </p>
        </div>
        <Link href={`/project-enquiry?project=${projectName}&interestType=site_visit_support`} className="inline-block">
          <Button variant="outline" size="sm" className="text-[10px] font-bold border-gold-elegant text-[#10291f] uppercase px-4 h-auto py-2">
            Request Site Survey Brief
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded overflow-hidden border border-gold-elegant bg-black aspect-video relative">
      <video
        src={videoUrl}
        poster={videoPoster}
        controls
        className="w-full h-full object-cover"
      />
    </div>
  );
};
