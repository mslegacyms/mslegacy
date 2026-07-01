import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  borderAccent?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, borderAccent = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded border border-slate-100 overflow-hidden shadow-xs",
          {
            "transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-200": hoverable,
            "border-t-4 border-t-[#8b6e3a]": borderAccent,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
