import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Landmark, ShieldCheck, Mail, Compass } from "@/components/ui/Icons";

async function handleLogout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("mslegacy_mock_user");
  redirect("/login");
}

export default async function ClientDashboardPage() {
  const profile = await getCurrentUserProfile();

  if (!profile || profile.role !== "client") {
    // Redirect to login if user is not a private client
    redirect("/login");
  }

  // Simulation parameters for client details
  const clientEnquiry = {
    submittedDate: "2026-06-27",
    division: "Land Sourcing Division",
    status: "documentation_review",
    advisoryRepresentative: "Muzzamil Ahmad",
  };

  const documentChecklist = [
    { name: "Investor PAN Card & KYC ID", status: "cleared" },
    { name: "Indian Residence Address Proof", status: "received" },
    { name: "Power of Attorney (POA) Draft", status: "under_review" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation / Header Bar */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-200">
          <div className="space-y-1">
            <span className="font-serif text-3xl font-bold text-[#10291f]">Private Client Vault</span>
            <p className="text-xs text-slate-500 font-sans">
              Logged in as private investor: <span className="font-bold">{profile.fullName}</span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <form action={handleLogout}>
              <Button type="submit" variant="outline" size="sm">
                Exit Secure Portal
              </Button>
            </form>
          </div>
        </header>

        {/* Layout: Main contents (Left) & Advisors Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dossier, Checklists, Next steps */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Onboarding Welcome Card */}
            <Card className="p-6 bg-white space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#10291f] flex items-center">
                <Compass size={20} className="mr-2 text-[#8b6e3a]" />
                Investment Portfolio Status
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Welcome to your private client workspace. Sourced land parcels, custom construction blueprints, and active title due diligence checks associated with your profile are tracked here.
              </p>
            </Card>

            {/* Submitted Enquiry / Pipeline Status */}
            <Card className="p-6 bg-white space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Active Consultations Dossier</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600 border-t pt-4 border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Preferred Division</span>
                  <span className="font-semibold">{clientEnquiry.division}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Submission Date</span>
                  <span className="font-semibold">
                    {new Date(clientEnquiry.submittedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600 border-t pt-4 border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Current Review Stage</span>
                  <Badge variant="gold" className="capitalize mt-1">
                    {clientEnquiry.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Assigned Advisory Lead</span>
                  <span className="font-semibold">{clientEnquiry.advisoryRepresentative}</span>
                </div>
              </div>
            </Card>

            {/* Document Checklist Panel */}
            <Card className="p-6 bg-white space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Your Sourcing Document Checklist</h3>
              <p className="text-[11px] text-slate-400">
                Upload requests issued by our legal team for KYC clearing and deed registrations.
              </p>
              
              <div className="divide-y divide-slate-100">
                {documentChecklist.map((item, index) => (
                  <div key={index} className="py-3 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-600">{item.name}</span>
                    <Badge variant={item.status === "cleared" ? "success" : item.status === "received" ? "primary" : "warning"} className="capitalize">
                      {item.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Right Column: Advisor details & Disclaimers */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Representative details */}
            <Card className="p-6 bg-[#10291f] text-white space-y-4">
              <h3 className="font-serif text-base font-bold text-white flex items-center">
                <ShieldCheck size={18} className="mr-2 text-[#8b6e3a]" />
                Your Advisor desk
              </h3>
              
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  For secure document submission, layout updates, or coordination requests, please contact your advisory representative:
                </p>
                <div className="bg-white/5 border border-white/10 p-4 rounded text-xs space-y-2">
                  <span className="font-serif font-bold text-[#8b6e3a] block text-sm">
                    {clientEnquiry.advisoryRepresentative}
                  </span>
                  <div className="flex items-center text-slate-400 font-medium">
                    <Mail size={12} className="mr-2" /> advisory@mslegacy.in
                  </div>
                </div>
              </div>
            </Card>

            {/* Compliance-safe disclaimer */}
            <div className="p-4 bg-slate-100 rounded border border-slate-200 text-[10px] text-slate-500 leading-relaxed">
              <span className="font-bold text-[#10291f] block mb-1">REGULATORY COMPLIANCE MEMORANDUM:</span>
              MS Legacy private client dashboard does not hold public share registries, direct investment payout balances, or securities buying commands. All land transactions depend on formal, registered Sale Deeds and DC Conversion approvals.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
