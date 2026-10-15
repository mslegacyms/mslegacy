import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium rounded transition-all duration-300 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C2A778]",
          // Variant styles
          {
            "bg-[#0F291E] text-white hover:bg-[#203E30] border border-[#0F291E]":
              variant === "primary",
            "bg-[#C2A778] text-[#0F291E] hover:bg-[#D2BC93] border border-[#C2A778]":
              variant === "secondary",
            "bg-transparent text-[#0F291E] border border-[#0F291E]/20 hover:bg-[#0F291E]/5 hover:border-[#0F291E]":
              variant === "outline",
            "bg-transparent text-[#0F291E] hover:underline p-0":
              variant === "text",
          },
          // Size styles
          {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-7 py-3": size === "lg",
          },
          // Width style
          fullWidth ? "w-full" : "",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
