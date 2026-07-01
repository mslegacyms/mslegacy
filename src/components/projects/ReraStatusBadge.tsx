import React from "react";
import { Badge } from "@/components/ui/Badge";

interface ReraStatusBadgeProps {
  status: string;
  verificationStatus?: string;
}

export const ReraStatusBadge = ({ status, verificationStatus = "pending_verification" }: ReraStatusBadgeProps) => {
  let label = "RERA Verification Pending";
  let variant: "success" | "warning" | "neutral" = "warning";
  let classes = "bg-amber-500/10 text-amber-700 border border-amber-500/20";

  if (status === "approved") {
    if (verificationStatus === "rera_matched") {
      label = "RERA Record Matched";
      variant = "success";
      classes = "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20";
    } else {
      label = "RERA Registration Found · Verification Pending";
      variant = "warning";
      classes = "bg-amber-500/10 text-amber-700 border border-amber-500/20";
    }
  } else if (status === "not_applicable" || status === "exempt") {
    label = "RERA Not Applicable";
    variant = "neutral";
    classes = "bg-slate-500/10 text-slate-700 border border-slate-500/20";
  } else if (status === "under_process") {
    label = "RERA Verification Pending";
    variant = "warning";
    classes = "bg-amber-500/10 text-amber-700 border border-amber-500/20";
  } else {
    label = "Subject to Confirmation";
    variant = "neutral";
    classes = "bg-slate-500/10 text-slate-700 border border-slate-500/20";
  }

  return (
    <Badge 
      variant={variant}
      className={`${classes} whitespace-nowrap text-[10px] font-bold py-0.5 px-2`}
    >
      {label}
    </Badge>
  );
};
