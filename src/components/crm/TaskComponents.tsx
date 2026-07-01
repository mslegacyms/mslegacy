"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { type Task } from "@/lib/types/crm";

export function TaskStatusBadge({ status }: { status: Task["status"] }) {
  switch (status) {
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    case "in_progress":
      return <Badge variant="primary">In Progress</Badge>;
    case "cancelled":
      return <Badge variant="neutral">Cancelled</Badge>;
    case "open":
    default:
      return <Badge variant="warning">Open</Badge>;
  }
}

export function DueDateBadge({ dateString }: { dateString: string }) {
  const dueDate = new Date(dateString);
  const today = new Date();
  const isOverdue = dueDate < today && dueDate.toDateString() !== today.toDateString();

  return (
    <Badge variant={isOverdue ? "danger" : "neutral"} className="text-[9px]">
      {isOverdue ? "OVERDUE: " : "Due: "}
      {dueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
    </Badge>
  );
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="p-4 bg-white border border-slate-100 flex justify-between items-center">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Badge variant={task.priority === "high" ? "danger" : "neutral"} className="text-[9px] uppercase">
            {task.priority}
          </Badge>
          <h4 className="text-xs font-bold text-[#10291f]">{task.title}</h4>
        </div>
        {task.description && <p className="text-[11px] text-slate-400">{task.description}</p>}
        {task.relatedLeadName && (
          <p className="text-[10px] text-slate-500">
            Client: <span className="font-semibold">{task.relatedLeadName}</span>
          </p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <DueDateBadge dateString={task.dueDate} />
        <TaskStatusBadge status={task.status} />
      </div>
    </Card>
  );
}

export function TaskForm({
  onSubmitTask
}: {
  onSubmitTask: (title: string, dueDate: string, priority: "low" | "normal" | "high") => void;
}) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmitTask(title, dueDate, priority);
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Task Title *</label>
        <input
          type="text"
          required
          placeholder="E.g. Follow-up email"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-[#10291f]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Due Date</label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-slate-600"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-full text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[#10291f]"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <Button type="submit" variant="primary" fullWidth size="sm">
        Add Task Record
      </Button>
    </form>
  );
}
