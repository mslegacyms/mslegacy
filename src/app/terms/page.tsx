import type { Metadata } from "next";
export const metadata: Metadata = { title: "Website terms | MS LEGACY", alternates: { canonical: "/terms" } };
export default function TermsPage() { return <article className="max-w-3xl mx-auto px-6 py-16 space-y-6 text-slate-700">
  <h1 className="font-serif text-4xl font-bold text-[#10291f]">Website terms</h1>
  <p>This site provides initial property information and planning tools. A service engagement or property transaction requires separately agreed terms and verified documents.</p>
  <h2 className="text-xl font-bold">Property information</h2><p>Research and sample entries may be incomplete or outdated. Confirm the exact project phase, price, availability, approvals, registration and ownership with the relevant developer, authority and independent advisers before deciding.</p>
  <h2 className="text-xl font-bold">Planning tools and drafts</h2><p>Calculator outputs depend on your inputs and editable assumptions. They do not establish loan eligibility, statutory charges, planning permission, title clearance or investment returns. Document templates are working drafts and require transaction-specific professional review before execution.</p>
  <h2 className="text-xl font-bold">Enquiries and accounts</h2><p>Use accurate contact details and submit only information you are authorized to share. A saved enquiry reference confirms receipt; it does not confirm a booking, transaction or response deadline. Keep account credentials private and use only the records and functions authorized for your account.</p>
  <h2 className="text-xl font-bold">Contact</h2><p>Questions about the site can be sent to <a className="underline" href="mailto:mslegacyms@gmail.com">mslegacyms@gmail.com</a>. Read the <a className="underline" href="/privacy">privacy notice</a> for information handling.</p>
</article>; }
