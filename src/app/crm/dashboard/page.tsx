import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { isCrmUser } from "@/lib/auth/roles";
export default async function CrmDashboardPage() {
  const profile = await getCurrentUserProfile();
  if (!profile || !isCrmUser(profile.role)) redirect("/login");
  const db = await createClient();
  const queries = [
    db.from("leads").select("id", { count: "exact", head: true }),
    db.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    db.from("leads").select("id", { count: "exact", head: true }).eq("status", "documentation_review"),
    db.from("tasks").select("id", { count: "exact", head: true }).eq("status", "open"),
    db.from("opportunities").select("id", { count: "exact", head: true }),
    db.from("channel_partners").select("id", { count: "exact", head: true }),
  ];
  const results = await Promise.all(queries);
  const labels = ["Visible leads", "New enquiries", "Document reviews", "Open tasks", "Visible opportunities", "Partner applications"];
  return <section className="space-y-8"><h1 className="text-3xl font-bold">Operational dashboard</h1>
    <p className="text-sm text-slate-600">Counts reflect the database records your account is authorized to read.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{results.map((result,index)=><article key={labels[index]} className="rounded border bg-white p-6"><h2 className="text-sm font-semibold">{labels[index]}</h2><p className="text-3xl mt-3">{result.error ? "Unavailable" : result.count ?? 0}</p></article>)}</div>
    <div className="flex gap-6"><Link className="underline" href="/crm/leads">Open enquiry queue</Link><Link className="underline" href="/crm/pipeline">Open pipeline</Link></div>
    <p className="text-sm text-slate-600">Publishing, client/partner workflows and document approval require their remaining database integrations. Working drafts do not represent legal clearance.</p>
  </section>;
}
