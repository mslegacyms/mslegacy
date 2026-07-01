import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockDashboardMetrics, mockRecentActivities } from "@/lib/data/mockDashboard";
import { Users, Landmark, Activity, ShieldCheck, Compass } from "@/components/ui/Icons";
import { isSupabaseConfigured } from "@/lib/env";

export default function CrmDashboardPage() {
  const isLive = isSupabaseConfigured();

  const metrics = [
    { name: "Total Leads", value: mockDashboardMetrics.totalLeads, icon: <Users size={18} />, color: "primary" },
    { name: "New Leads", value: mockDashboardMetrics.newLeads, icon: <Activity size={18} />, color: "success" },
    { name: "Follow-ups Due", value: mockDashboardMetrics.followUpsDue, icon: <Compass size={18} />, color: "warning" },
    { name: "Doc Reviews Pending", value: mockDashboardMetrics.docsReviewCount, icon: <ShieldCheck size={18} />, color: "gold" },
    { name: "Opportunities Listed", value: mockDashboardMetrics.opportunitiesCount, icon: <Landmark size={18} />, color: "neutral" },
    { name: "Partner Applications", value: mockDashboardMetrics.partnerApplications, icon: <Users size={18} />, color: "warning" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-3xl font-bold text-[#10291f]">Executive Dashboard</h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Real-time metrics and operational updates for the MS Legacy wealth ecosystem.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6 bg-white flex items-center justify-between border border-gold-elegant card-lift">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{metric.name}</span>
              <span className="text-3xl font-sans font-bold text-[#10291f] block">{metric.value}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded text-[#8b6e3a] border border-slate-100">
              {metric.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Split section: Recent Activity & Setup Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left - Activities */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-sans text-xl font-bold text-[#10291f] mb-2 border-b pb-2 border-slate-100">
            Recent System Activities
          </h3>
          
          <div className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <Card key={activity.id} className="p-4 bg-white flex justify-between items-start border border-gold-elegant">
                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center space-x-2">
                    <Badge variant="neutral" className="text-[9px] px-1.5 py-0.5 uppercase font-bold tracking-wider">{activity.type}</Badge>
                    <h4 className="text-xs font-bold text-[#10291f]">{activity.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{activity.details}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-medium font-sans">
                  <span>{activity.time}</span>
                  <span className="block mt-0.5 font-bold">By {activity.user}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right - Database Connection Setup Mini-Card */}
        <div className="lg:col-span-4">
          <Card className="p-6 bg-white space-y-4 border border-gold-elegant shadow-sm" borderAccent>
            <h3 className="font-sans text-base font-bold text-[#10291f]">Supabase Sync Status</h3>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600 font-sans">
              {isLive ? (
                <div className="flex items-center space-x-2 text-emerald-700 font-bold bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
                  <span>Syncing Live with Database</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-amber-600 font-bold bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                  <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
                  <span>Running in Mock Fallback Mode</span>
                </div>
              )}
              <p className="text-[11px] text-slate-400 font-medium">
                To connect to a live Supabase PostgreSQL database and retrieve real-time table values:
              </p>
              <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-500 font-medium">
                <li>Create a project in your Supabase Dashboard.</li>
                <li>Run the migration script in <code>/supabase/migrations/001_mslegacy_crm_foundation.sql</code>.</li>
                <li>Add your credentials to <code>.env.local</code>.</li>
              </ol>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

