"use client";

import React, { useState, useEffect } from "react";
import { getNotifications, markNotificationAsRead, type NotificationItem } from "@/lib/crm/notifications";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadNotifications() {
      const data = await getNotifications();
      setNotifications(data);
    }
    loadNotifications();
    
    // Poll every 30 seconds for new alerts
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = async (id: string) => {
    const result = await markNotificationAsRead(id);
    if (result.success) {
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-[#10291f] hover:bg-slate-100 rounded transition-colors focus:outline-none"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-rose-600 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold font-sans">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 shadow-lg rounded z-50 p-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
            <span className="font-serif text-sm font-bold text-[#10291f]">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="warning" className="text-[9px]">
                {unreadCount} Unread
              </Badge>
            )}
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleMarkRead(item.id)}
                  className={`pt-2.5 cursor-pointer transition-colors ${!item.isRead ? "bg-slate-50/50 px-1 rounded" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-xs block ${!item.isRead ? "font-bold text-[#10291f]" : "text-slate-600"}`}>
                      {item.title}
                    </span>
                    {!item.isRead && (
                      <span className="w-1.5 h-1.5 bg-rose-600 rounded-full mt-1.5" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.message}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-4">No notifications recorded.</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
