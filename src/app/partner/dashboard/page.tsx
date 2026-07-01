import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PartnerReferralForm from "./PartnerReferralForm";

async function handleLogout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("mslegacy_mock_user");
  redirect("/login");
}

export default async function PartnerDashboardPage() {
  const profile = await getCurrentUserProfile();

  if (!profile || profile.role !== "channel_partner") {
    redirect("/login");
  }

  // Simulation data representing this channel partner details
  const partnerDetails = {
    companyName: "Apex Realty Bangalore",
    reraId: "PRM/KA/RERA/1251/309/PR/180222/001422",
    status: "verified",
    totalReferrals: 3,
    activeLeads: 1
  };

  const referrals = [
    { id: "ref-1", name: "Ramesh Gowda", phone: "+91 94440 98765", interest: "Land Sourcing", status: "reviewed" },
    { id: "ref-2", name: "Anitha Sen", phone: "+91 99000 12345", interest: "Turnkey Construction", status: "submitted" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-200">
          <div className="space-y-1">
            <span className="font-serif text-3xl font-bold text-[#10291f]">Channel Partner Portal</span>
            <p className="text-xs text-slate-500 font-sans">
              Agency: <span className="font-bold">{partnerDetails.companyName}</span> | RERA: <span className="font-mono text-slate-700">{partnerDetails.reraId}</span>
            </p>
          </div>
          <form action={handleLogout}>
            <Button type="submit" variant="outline" size="sm">
              Exit Secure Portal
            </Button>
          </form>
        </header>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Referrals summary & Lead onboarding form */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Lead Submission Form */}
            <Card className="p-6 bg-white space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Refer Client Lead</h3>
              <p className="text-xs text-slate-400">
                Register a new client prospect. Referrals are tracked under your partner account profile.
              </p>
              <PartnerReferralForm />
            </Card>

            {/* Submitted Referrals Listing */}
            <Card className="p-6 bg-white space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#10291f]">Your Submitted Referrals</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-sans text-[10px] font-bold uppercase border-b border-slate-100">
                      <th className="p-3">Client Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Division</th>
                      <th className="p-3 pr-3 text-right">Referral Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-sans">
                    {referrals.map((ref) => (
                      <tr key={ref.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-[#10291f]">{ref.name}</td>
                        <td className="p-3 font-semibold">{ref.phone}</td>
                        <td className="p-3">{ref.interest}</td>
                        <td className="p-3 pr-3 text-right">
                          <Badge variant={ref.status === "reviewed" ? "success" : "gold"} className="uppercase text-[8px]">
                            {ref.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

          </div>

          {/* Right Column: Status & Guidelines */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Partner status card */}
            <Card className="p-6 bg-[#10291f] text-white space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Partner verification</h3>
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Authorized Status:</span>
                  <Badge variant="success" className="uppercase">VERIFIED</Badge>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Referrals Logged:</span>
                  <span className="font-bold">{partnerDetails.totalReferrals}</span>
                </div>
              </div>
            </Card>

            {/* Compliance-safe disclaimer */}
            <div className="p-4 bg-slate-100 rounded border border-slate-200 text-[10px] text-slate-500 leading-relaxed space-y-2">
              <span className="font-bold text-[#10291f] block">PARTNER COMPLIANCE REMARK:</span>
              <p>
                Broker commission payments, project margins, and client ownership assignments are managed strictly via offline legal contracts. Do not promise fixed interest rates, assured asset gains, or secure resale pricing to prospective buyers.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
