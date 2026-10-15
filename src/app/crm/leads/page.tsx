import LeadsDirectory from "@/components/crm/LeadsDirectory";
import { getLeads } from "@/lib/crm/leads";
export default async function CrmLeadsPage() { return <LeadsDirectory leads={await getLeads()} />; }
