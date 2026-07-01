"use client";

import React, { useState, useEffect } from "react";
import { ProjectMediaPlaceholder } from "./ProjectMediaPlaceholder";

interface ProjectImageFrameProps {
  src?: string;
  alt: string;
  className?: string;
  mediaPermissionStatus?: string;
  publicUsageAllowed?: boolean;
  hideText?: boolean;
}

export const ProjectImageFrame = ({
  src,
  alt,
  className = "w-full h-48 object-cover",
  mediaPermissionStatus = "pending_permission",
  publicUsageAllowed = false,
  hideText = false,
}: ProjectImageFrameProps) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const showImage =
    !hasError &&
    (mediaPermissionStatus === "permission_received" ||
      mediaPermissionStatus === "public_marketing_use_allowed" ||
      (mediaPermissionStatus === "permission_claimed_pending_document" && publicUsageAllowed)) &&
    !!src;

  if (!showImage) {
    return <ProjectMediaPlaceholder hideText={hideText} />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
      />
      {mediaPermissionStatus === "permission_claimed_pending_document" && (
        <span className="absolute bottom-2 left-2 bg-amber-500/90 text-white font-bold text-[8px] uppercase px-1.5 py-0.5 rounded tracking-wide font-sans">
          Verbal Permission Sourced
        </span>
      )}
    </div>
  );
};
