import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { logout } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/server";
export default async function ClientDashboardPage() {
  const profile = await getCurrentUserProfile();
  if (!profile || profile.role !== "client") redirect("/login");
  const db = await createClient();
  const { data, error } = await db.from("client_requests").select("id, request_type, status, created_at").eq("client_id",profile.id).order("created_at",{ascending:false});
  return <section className="max-w-4xl mx-auto px-6 py-16 space-y-6"><h1 className="text-3xl font-bold">Your client portal</h1><p>Signed in as {profile.fullName || "Client"}.</p>
    <h2 className="text-xl font-semibold">Your requests</h2>{error ? <p role="status">Request history is currently unavailable. Please contact MS LEGACY with your enquiry reference.</p> : !data?.length ? <p>No requests are available for this account.</p> : <ul>{data.map(request=><li key={request.id} className="border-b p-4">{request.request_type} — {request.status}</li>)}</ul>}
    <p className="text-sm text-slate-600">No document or KYC clearance is implied by access to this portal.</p><form action={logout}><button className="rounded bg-[#10291f] text-white px-4 py-2">Sign out</button></form>
  </section>;
}
