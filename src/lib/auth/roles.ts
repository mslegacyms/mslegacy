/**
 * Mappings and type guards for role-based authorization inside MS Legacy.
 */

export type UserRole =
  | "founder"
  | "admin"
  | "sales"
  | "legal"
  | "property_manager"
  | "channel_partner"
  | "client";

export interface UserProfile {
  id: string;
  fullName: string | null;
  phone: string | null;
  role: UserRole;
  status: "active" | "suspended" | "archived";
}

/**
 * Checks if a role is authorized to access the main CRM dashboard.
 */
export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && ["founder", "admin", "sales", "legal", "property_manager", "channel_partner", "client"].includes(value);
}

export function isCrmUser(role: UserRole): boolean {
  return ["founder", "admin", "sales", "legal", "property_manager"].includes(role);
}

/**
 * Returns a human-readable label for user roles.
 */
export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "founder":
      return "SuperAdmin / Founder";
    case "admin":
      return "Administrator";
    case "sales":
      return "Sales Representative";
    case "legal":
      return "Legal & Title Officer";
    case "property_manager":
      return "Property Care Manager";
    case "channel_partner":
      return "Registered Channel Partner";
    case "client":
      return "Private Client";
    default:
      return "Guest Client";
  }
}
