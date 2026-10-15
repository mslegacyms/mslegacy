import type { Metadata } from "next";
import { businessContact } from "@/lib/company/contact";
export const metadata: Metadata = { title: "Privacy notice | MS LEGACY", alternates: { canonical: "/privacy" } };
export default function PrivacyPage() { return <article className="max-w-3xl mx-auto px-6 py-16 space-y-6 text-slate-700">
  <h1 className="font-serif text-4xl font-bold text-[#10291f]">Privacy notice</h1>
  <p>MS LEGACY uses the information you submit to respond to your enquiry and manage the related request.</p>
  <h2 className="text-xl font-bold">Information you provide</h2><p>Forms may ask for your name, contact details, preferred location, budget, project selections and message. Partner applications also ask for business and registration details. Do not include identity documents, bank details or confidential deeds in a public message.</p>
  <h2 className="text-xl font-bold">Use and access</h2><p>Authorized team members use saved enquiries to follow up and manage the requested service. Hosting and database providers process information to operate the site. A project enquiry does not authorize unrelated marketing or onward sharing with a developer; any additional sharing should be agreed with you.</p>
  <h2 className="text-xl font-bold">Portal and browser drafts</h2><p>Secure portal sign-in uses authentication cookies. Working legal drafts currently stay in the signed-in user’s browser tab; they are not an official document archive or approval record. Keep your own authorized copy of required working material and sign out on shared devices.</p>
  <h2 className="text-xl font-bold">Analytics</h2><p>Optional third-party analytics tracking is currently disabled.</p>
  <h2 className="text-xl font-bold">Questions and requests</h2><p>Contact <a className="underline" href="mailto:mslegacyms@gmail.com">{businessContact.email}</a> about access, correction or deletion of submitted information. MS LEGACY will review the request, verify the relevant identity and explain any applicable retention obligation.</p>
</article>; }
