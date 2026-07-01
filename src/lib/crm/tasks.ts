"use server";

import { createClient } from "@/lib/supabase/server";
import { type Task } from "@/lib/types/crm";
import { logAuditAction } from "./audit";

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

const mockTasks: Task[] = [
  { id: "task-001", title: "Trace 30-Year Mother Deeds", description: "Audit legal chain histories and encumbrances for land sourcing review.", relatedLeadName: "Vikram Malhotra", assignedToName: "Muzzamil Ahmad", dueDate: "2026-06-30T17:00:00Z", status: "open", priority: "high" },
  { id: "task-002", title: "Schedule Video Inspection Walkthrough", description: "Schedule site coordinates verification with virtual client tools.", relatedLeadName: "Priya Sharma", assignedToName: "Kiran Kumar", dueDate: "2026-07-02T12:00:00Z", status: "in_progress", priority: "high" },
  { id: "task-003", title: "Verify BDA Layout Plan", description: "Audit municipal layout maps and RERA register status.", relatedLeadName: "Aravind Subramanian", assignedToName: "Kiran Kumar", dueDate: "2026-07-05T18:00:00Z", status: "open", priority: "normal" }
];

export async function getTasks(): Promise<Task[]> {
  if (!isSupabaseConfigured) {
    return mockTasks;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tasks")
      .select("id, title, description, due_date, status, priority, assigned_to, related_lead_id")
      .order("due_date", { ascending: true });

    if (error || !data) {
      console.error("Supabase fetch tasks error:", error?.message);
      return mockTasks;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || "",
      dueDate: item.due_date,
      status: item.status as any,
      priority: item.priority as any,
      assignedToName: "Advisory Staff",
      relatedLeadName: "Associated Client",
    }));
  } catch (err) {
    console.error("Tasks service exception:", err);
    return mockTasks;
  }
}

export async function createTask(taskData: Omit<Task, "id">): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured) {
    const newTask: Task = {
      ...taskData,
      id: `task-mock-${Date.now()}`,
    };
    mockTasks.push(newTask);
    return { success: true, data: newTask };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("tasks").insert([
      {
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.dueDate,
        status: taskData.status || "open",
        priority: taskData.priority || "normal",
      }
    ]).select().single();

    if (error) {
      return { success: false, error: error.message };
    }

    await logAuditAction("task_created", "task", data.id, { title: taskData.title });

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
