"use server";

import { createClient } from "@/lib/supabase/server";

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  notificationType: string;
  isRead: boolean;
  createdAt: string;
}

const mockNotifications: NotificationItem[] = [
  { id: "not-001", userId: "mock-user-id", title: "New Lead Onboarded", message: "Aravind Subramanian submitted a land sourcing inquiry.", notificationType: "new_lead", isRead: false, createdAt: new Date().toISOString() },
  { id: "not-002", userId: "mock-user-id", title: "Task Deadline Approaching", message: "Trace 30-Year Mother Deeds is due tomorrow.", notificationType: "follow_up_due", isRead: false, createdAt: new Date().toISOString() },
  { id: "not-003", userId: "mock-user-id", title: "Legal Review Flagged", message: "Boundary overlap flagged on Devanahalli Residential plots.", notificationType: "legal_review", isRead: true, createdAt: new Date().toISOString() }
];

export async function getNotifications(): Promise<NotificationItem[]> {
  if (!isSupabaseConfigured) {
    return mockNotifications;
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return mockNotifications;

    const { data, error } = await supabase
      .from("notifications")
      .select("id, user_id, title, message, notification_type, is_read, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Supabase fetch notifications error:", error?.message);
      return mockNotifications;
    }

    return data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      title: item.title,
      message: item.message || "",
      notificationType: item.notification_type || "general",
      isRead: item.is_read,
      createdAt: item.created_at,
    }));
  } catch (err) {
    console.error("Notifications service exception:", err);
    return mockNotifications;
  }
}

export async function markNotificationAsRead(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    const item = mockNotifications.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
      return { success: true };
    }
    return { success: false, error: "Notification not found." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
