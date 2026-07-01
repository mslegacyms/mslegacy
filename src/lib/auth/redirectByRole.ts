import { type UserRole } from "./roles";

/**
 * Returns the target dashboard URL route based on the user's role authorization.
 */
export function getRedirectRouteByRole(role: UserRole): string {
  switch (role) {
    case "founder":
    case "admin":
      return "/crm/dashboard";
    case "sales":
      return "/crm/leads";
    case "legal":
      return "/crm/legal";
    case "property_manager":
      return "/crm/opportunities"; // CRM properties listing
    case "channel_partner":
      return "/partner/dashboard";
    case "client":
    default:
      return "/client/dashboard";
  }
}
