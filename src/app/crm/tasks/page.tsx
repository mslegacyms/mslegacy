"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { validateTask } from "@/lib/validation/tasks";

export default function CrmTasksPage() {
  const [tasks, setTasks] = useState([
    { id: "task-001", title: "Trace 30-Year Mother Deeds", description: "Audit legal chain histories and encumbrances for land sourcing review.", relatedLeadId: "lead-003", relatedLeadName: "Vikram Malhotra", assignedToName: "Muzzamil Ahmad", dueDate: "2026-06-30T17:00:00Z", status: "open", priority: "high" },
    { id: "task-002", title: "Schedule Video Inspection Walkthrough", description: "Schedule site coordinates verification with virtual client tools.", relatedLeadId: "lead-002", relatedLeadName: "Priya Sharma", assignedToName: "Kiran Kumar", dueDate: "2026-07-02T12:00:00Z", status: "in_progress", priority: "high" },
    { id: "task-003", title: "Verify BDA Layout Plan", description: "Audit municipal layout maps and RERA register status.", relatedLeadId: "lead-001", relatedLeadName: "Aravind Subramanian", assignedToName: "Kiran Kumar", dueDate: "2026-07-05T18:00:00Z", status: "open", priority: "normal" }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("normal");
  const [error, setError] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const valResult = validateTask({
      title: newTaskTitle,
      dueDate: newTaskDue
    });

    if (!valResult.isValid) {
      setError(valResult.errors.title || valResult.errors.dueDate || "Validation error.");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: `task-mock-${Date.now()}`,
        title: newTaskTitle,
        description: "Manually registered follow-up task.",
        relatedLeadId: "",
        relatedLeadName: "General Lead",
        assignedToName: "Muzzamil Ahmad",
        dueDate: newTaskDue ? `${newTaskDue}T18:00:00Z` : new Date().toISOString(),
        status: "open",
        priority: newTaskPriority as any
      }
    ]);
    setNewTaskTitle("");
    setNewTaskDue("");
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent":
        return "danger";
      case "normal":
        return "primary";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#10291f]">Tasks Registry</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Track follow-up deadlines and operations assigned across the advisory divisions.
        </p>
      </div>

      {/* Grid Layout: Left Tasks Table, Right Add Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tasks Table */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-sans text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4 pl-6">Task / Details</th>
                    <th className="p-4">Assigned Agent</th>
                    <th className="p-4">Target Date</th>
                    <th className="p-4">Related Lead</th>
                    <th className="p-4 pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-600 divide-y divide-slate-100 font-sans">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-[#10291f]">
                        <div>{task.title}</div>
                        <span className="text-[10px] text-slate-400 font-normal">{task.description}</span>
                      </td>
                      <td className="p-4 font-semibold">{task.assignedToName}</td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-700">
                          {new Date(task.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </td>
                      <td className="p-4">
                        {task.relatedLeadId ? (
                          <Link href={`/crm/leads/${task.relatedLeadId}`} className="text-[#8b6e3a] font-semibold hover:underline">
                            {task.relatedLeadName}
                          </Link>
                        ) : (
                          <span className="text-slate-400 italic">None</span>
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <Badge variant={getPriorityBadgeVariant(task.priority)} className="uppercase text-[9px]">
                          {task.priority}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Quick Add Task Form */}
        <div className="lg:col-span-4">
          <Card className="p-6 bg-white space-y-4">
            <h3 className="font-sans text-base font-bold text-[#10291f]">Quick Add Task</h3>
            
            {error && (
              <div className="bg-rose-500/10 text-rose-700 text-[10px] p-2.5 rounded font-semibold border border-rose-500/20">
                {error}
              </div>
            )}

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Document review check"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Due Date *</label>
                <input
                  type="date"
                  required
                  value={newTaskDue}
                  onChange={(e) => setNewTaskDue(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[#10291f]"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <Button type="submit" variant="primary" fullWidth size="sm">
                Add Task Record
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

