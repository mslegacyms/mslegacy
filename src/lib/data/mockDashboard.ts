import { DashboardMetrics } from "@/lib/types/crm";

export const mockDashboardMetrics: DashboardMetrics = {
  totalLeads: 45,
  newLeads: 12,
  followUpsDue: 5,
  docsReviewCount: 3,
  opportunitiesCount: 4,
  partnerApplications: 8,
  highPriorityTasks: 4
};

export const mockRecentActivities = [
  { id: "act-001", type: "call", title: "Outbound Call", details: "Spoke to Aravind Subramanian regarding North Bangalore plots. Scheduled site visit.", time: "1 hour ago", user: "Muzzamil Ahmad" },
  { id: "act-002", type: "document_review", title: "Title Deed Uploaded", details: "Uploaded Mother Deed file for Vikram Malhotra's layout construction.", time: "3 hours ago", user: "Sandeep Rao" },
  { id: "act-003", type: "whatsapp", title: "WhatsApp Sent", details: "Sent project brochure copy to John Doe.", time: "5 hours ago", user: "Kiran Kumar" },
  { id: "act-004", type: "site_visit", title: "Site Visit Logged", details: "Priya Sharma completed virtual walkthrough video session.", time: "1 day ago", user: "Kiran Kumar" }
];
