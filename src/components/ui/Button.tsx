import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium rounded transition-all duration-300 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b6e3a]",
          // Variant styles
          {
            "bg-[#10291f] text-white hover:bg-[#1A2644] border border-[#10291f]": variant === "primary",
            "bg-[#8b6e3a] text-[#10291f] hover:bg-[#B6966B] border border-[#8b6e3a]": variant === "secondary",
            "bg-transparent text-[#10291f] border border-[#10291f]/20 hover:bg-[#10291f]/5 hover:border-[#10291f]": variant === "outline",
            "bg-transparent text-[#10291f] hover:underline p-0": variant === "text",
          },
          // Size styles
          {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-7 py-3": size === "lg",
          },
          // Width style
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
