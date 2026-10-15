import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { logout } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/server";
import PartnerReferralForm from "./PartnerReferralForm";
export default async function PartnerDashboardPage() {
  const profile = await getCurrentUserProfile();
  if (!profile || profile.role !== "channel_partner") redirect("/login");
  const db=await createClient();
  const { data, error }=await db.from("partner_lead_submissions").select("id, client_name, status, created_at").eq("partner_id",profile.id).order("created_at",{ascending:false});
  return <section className="max-w-4xl mx-auto px-6 py-16 space-y-8"><h1 className="text-3xl font-bold">Your partner portal</h1><p>Signed in as {profile.fullName || "Partner"}.</p>
    <div className="rounded border bg-white p-6"><h2 className="text-xl font-semibold mb-4">Refer a client</h2><PartnerReferralForm /></div>
    <h2 className="text-xl font-semibold">Your referrals</h2>{error ? <p role="status">Referral history is currently unavailable.</p> : !data?.length ? <p>No saved referrals are available for this account.</p> : <ul>{data.map(referral=><li key={referral.id} className="border-b p-4">{referral.client_name} — {referral.status}</li>)}</ul>}
    <form action={logout}><button className="rounded bg-[#10291f] text-white px-4 py-2">Sign out</button></form>
  </section>;
}
