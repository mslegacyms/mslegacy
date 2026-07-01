import React from "react";
import { Badge } from "@/components/ui/Badge";

interface ProjectStatusBadgeProps {
  status: string;
}

export const ProjectStatusBadge = ({ status }: ProjectStatusBadgeProps) => {
  const getStyle = () => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20";
      case "ongoing":
        return "bg-sky-500/10 text-sky-700 border border-sky-500/20";
      case "upcoming":
      case "pre_launch_watchlist":
        return "bg-purple-500/10 text-purple-700 border border-purple-500/20";
      default:
        return "bg-slate-500/10 text-slate-700 border border-slate-500/20";
    }
  };

  return (
    <Badge variant="neutral" className={getStyle()}>
      {status ? status.toUpperCase().replace("_", " ") : "UNDER VERIFICATION"}
    </Badge>
  );
};
