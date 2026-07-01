import React from "react";
import { Badge } from "@/components/ui/Badge";

interface VerificationBadgeProps {
  status: string;
}

export const VerificationBadge = ({ status }: VerificationBadgeProps) => {
  const getBadgeStyle = () => {
    switch (status) {
      case "verified":
      case "mslegacy_verified":
      case "mslegacy_reviewed":
        return { label: "MS LEGACY VERIFIED", style: "bg-[#8b6e3a]/15 text-[#8b6e3a] border border-[#8b6e3a]/20" };
      case "rera_matched":
        return { label: "RERA RECORD MATCHED", style: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" };
      case "developer_confirmed":
        return { label: "DEVELOPER CONFIRMED", style: "bg-blue-500/10 text-blue-700 border border-blue-500/20" };
      case "needs_legal_review":
        return { label: "NEEDS LEGAL REVIEW", style: "bg-rose-500/10 text-rose-700 border border-rose-500/20" };
      case "public_information":
      case "pending_verification":
      default:
        return { label: "PUBLIC INFO · VERIFICATION PENDING", style: "bg-slate-500/10 text-slate-500 border border-slate-500/20" };
    }
  };

  const badge = getBadgeStyle();

  return (
    <Badge variant="neutral" className={badge.style}>
      {badge.label}
    </Badge>
  );
};
