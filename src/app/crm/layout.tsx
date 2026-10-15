import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { isCrmUser, getRoleLabel } from "@/lib/auth/roles";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Landmark, Users, Activity, ShieldCheck, Compass, Scale } from "@/components/ui/Icons";
import { logout as handleLogout } from "@/app/login/actions";
import NotificationBell from "@/components/crm/NotificationBell";

// Server action or utility to handle mock cookies logout


export default async function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUserProfile();

  // If no session exists or user role is not authorized for CRM
  if (!profile || !isCrmUser(profile.role)) {
    redirect("/login");
  }

  const sidebarLinks = [
    { name: "Dashboard", href: "/crm/dashboard", icon: <Compass size={18} /> },
    { name: "Publishing Review", href: "/crm/project-publishing-review", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Leads", href: "/crm/leads", icon: <Users size={18} /> },
    { name: "Requirements Exchange", href: "/crm/requirements", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Kanban Pipeline", href: "/crm/pipeline", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 5h16M4 12h16m-7 7h7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Opportunities", href: "/crm/opportunities", icon: <Landmark size={18} /> },
    { name: "Developers", href: "/crm/developers", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Projects Catalog", href: "/crm/projects", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Project Enquiries", href: "/crm/project-enquiries", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Project Verification", href: "/crm/project-verification", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Data Import", href: "/crm/data-import", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8-4-4m0 0L8 8m4-4v12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Legal Review", href: "/crm/legal", icon: <ShieldCheck size={18} /> },
    { name: "Legal Documents", href: "/crm/legal-documents", icon: <Scale size={18} /> },
    { name: "Tasks", href: "/crm/tasks", icon: <Activity size={18} /> },
    { name: "Channel Partners", href: "/crm/channel-partners", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Reports", href: "/crm/reports", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "News Management", href: "/crm/news", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4h-4m4 0a2 2 0 100-4h-4m4 4v10a2 2 0 01-2 2h-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Settings", href: "/crm/settings", icon: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="3" strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[#10291f] text-slate-300 border-r border-slate-800">
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Logo Header */}
          <div className="flex items-center h-20 px-6 border-b border-slate-800 space-x-2">
            <Link href="/" className="inline-block rounded-lg bg-white border border-[#d9c79f]/60 shadow-xs px-2 py-0.5 transition-transform hover:scale-102">
              <img src="/brand/mslegacy-logo.svg" alt="MS Legacy Logo" className="h-8 w-auto object-contain" />
            </Link>
            <Badge variant="gold" className="text-[9px] px-1.5 py-0.5">CRM</Badge>
          </div>

          {/* User Profile Mini-block */}
          <div className="px-6 py-4 border-b border-slate-800 bg-[#070D1F]">
            <p className="text-xs font-bold text-white leading-none mb-1">{profile.fullName}</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{getRoleLabel(profile.role)}</p>
          </div>

          {/* Nav list */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center px-3 py-2.5 text-xs font-medium rounded transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                <span className="mr-3 text-slate-400">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-slate-800">
            <form action={handleLogout}>
              <Button type="submit" variant="outline" className="w-full text-xs font-semibold text-slate-400 border-slate-800 hover:text-white hover:bg-white/5">
                Sign Out Portal
              </Button>
            </form>
          </div>

        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header - Top bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <Badge variant="neutral" className="capitalize text-[10px]">{profile.role} Portal</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <span className="text-xs text-slate-500 font-semibold">{profile.fullName}</span>
            <div className="w-8 h-8 rounded-full bg-[#8b6e3a]/20 flex items-center justify-center text-[#8A704C] font-sans font-bold text-xs">
              {profile.fullName?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 md:p-8 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}

