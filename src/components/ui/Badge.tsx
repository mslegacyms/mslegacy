import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "gold" | "neutral";
}

export const Badge = ({ className, variant = "neutral", children, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider",
        {
          "bg-[#10291f]/10 text-[#10291f]": variant === "primary",
          "bg-emerald-500/10 text-emerald-700": variant === "success",
          "bg-amber-500/10 text-amber-700": variant === "warning",
          "bg-rose-500/10 text-rose-700": variant === "danger",
          "bg-[#8b6e3a]/15 text-[#8A704C]": variant === "gold",
          "bg-slate-500/10 text-slate-700": variant === "neutral",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
