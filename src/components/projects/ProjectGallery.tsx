import React from "react";
import { ProjectImageFrame } from "./ProjectImageFrame";

interface ProjectGalleryProps {
  galleryImages?: string[];
  projectName: string;
  mediaPermissionStatus?: string;
}

export const ProjectGallery = ({
  galleryImages,
  projectName,
  mediaPermissionStatus = "pending_permission",
}: ProjectGalleryProps) => {
  const hasImages = galleryImages && galleryImages.length > 0;
  const isApproved =
    mediaPermissionStatus === "permission_received" ||
    mediaPermissionStatus === "public_marketing_use_allowed";

  if (!isApproved || !hasImages) {
    return (
      <div className="bg-slate-50 border border-gold-elegant p-6 rounded text-center text-xs text-slate-500 font-sans font-medium space-y-1">
        <h4 className="font-serif text-sm font-bold text-[#10291f]">Gallery Media Pending Clearance</h4>
        <p className="max-w-md mx-auto leading-relaxed">
          Project gallery photographs are currently awaiting developer authorization releases.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {galleryImages.map((img, idx) => (
        <div key={idx} className="h-40 rounded overflow-hidden border border-gold-elegant">
          <ProjectImageFrame
            src={img}
            alt={`${projectName} Gallery ${idx + 1}`}
            mediaPermissionStatus={mediaPermissionStatus}
            publicUsageAllowed={true}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
