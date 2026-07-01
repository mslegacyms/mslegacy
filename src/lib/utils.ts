/**
 * Utility functions for MS Legacy application.
 */

/**
 * Combines multiple class names into a single clean string.
 * This is a lightweight alternative to clsx + tailwind-merge that handles
 * basic conditional styling without requiring external packages.
 */
export function cn(...inputs: (string | undefined | null | boolean | { [key: string]: boolean })[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(" ");
}

/**
 * Formats a number as Indian Rupees (INR) currency.
 */
export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
