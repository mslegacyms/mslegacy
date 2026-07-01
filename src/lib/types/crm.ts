import { UserRole } from "@/lib/auth/roles";

export interface Lead {
  id: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  cityCountry: string | null;
  interestType: string;
  buyerType: string;
  budgetRange: string;
  preferredService?: string;
  message: string | null;
  leadSource: string;
  status: "new" | "contacted" | "qualified" | "documentation_review" | "site_visit_planned" | "proposal_sent" | "negotiation" | "converted" | "lost" | "archived";
  priority: "low" | "normal" | "high" | "urgent";
  assignedToName?: string | null;
  createdDate: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  activityType: "call" | "email" | "whatsapp" | "site_visit" | "document_review" | "note";
  title: string;
  notes: string;
  createdBy: string;
  createdDate: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  relatedLeadName?: string;
  assignedToName?: string;
  dueDate: string;
  status: "open" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "normal" | "high";
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  followUpsDue: number;
  docsReviewCount: number;
  opportunitiesCount: number;
  partnerApplications: number;
  highPriorityTasks: number;
}
