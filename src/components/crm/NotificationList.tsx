"use client";

import React from "react";
import { type NotificationItem } from "@/lib/crm/notifications";
import { Card } from "@/components/ui/Card";

export default function NotificationList({
  notifications,
  onMarkRead
}: {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {notifications.map((item) => (
        <Card
          key={item.id}
          className={`p-4 bg-white border border-slate-100 flex justify-between items-center transition-colors cursor-pointer hover:bg-slate-50/50 ${!item.isRead ? "border-l-4 border-l-[#8b6e3a]" : ""}`}
          onClick={() => onMarkRead(item.id)}
        >
          <div className="space-y-1">
            <h4 className={`text-xs font-bold ${!item.isRead ? "text-[#10291f]" : "text-slate-500"}`}>{item.title}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">{item.message}</p>
          </div>
          {!item.isRead && (
            <span className="w-2 h-2 bg-[#8b6e3a] rounded-full" />
          )}
        </Card>
      ))}
    </div>
  );
}
