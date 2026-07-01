"use client";

import React, { useState } from "react";
import { Developer } from "@/lib/types/developerMarketplace";

interface DeveloperLogoProps {
  developer: Developer;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const DeveloperLogo = ({ developer, className = "", size = "md" }: DeveloperLogoProps) => {
  const [imageError, setImageError] = useState(false);

  const { name, logoPath, logoPermissionStatus } = developer;

  // Get first letters of developer name (up to 2 characters)
  const getInitials = (fullName: string) => {
    const parts = fullName.split(" ");
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  // Sizing styles
  const sizeStyles = {
    sm: "w-8 h-8 text-[10px] rounded-lg",
    md: "w-14 h-14 text-xs rounded-xl",
    lg: "w-20 h-20 text-sm rounded-2xl"
  };

  // Determine fallback rendering
  const showFallback = 
    !logoPath || 
    logoPermissionStatus === "permission_received_asset_pending" || 
    logoPermissionStatus === "pending_permission" || 
    imageError;

  if (showFallback) {
    return (
      <div 
        className={`flex items-center justify-center font-serif font-bold bg-[#f8f5ef] border border-[#d9c79f]/60 text-[#8b6e3a] shadow-xs shrink-0 select-none ${sizeStyles[size]} ${className}`}
        title={`${name} (Logo Pending Asset)`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center bg-white border border-[#d9c79f]/60 shadow-xs shrink-0 overflow-hidden ${sizeStyles[size]} ${className}`}>
      <img
        src={logoPath}
        alt={developer.logoAlt || `${name} Logo`}
        onError={() => setImageError(true)}
        className="w-full h-full object-contain p-1.5"
      />
    </div>
  );
};
export default DeveloperLogo;
