-- MS Legacy CRM Foundation Migration
-- Created at: 2026-06-28
-- Description: Sets up the database tables, triggers, Row-Level Security, and policies for the MS Legacy CRM.

-- =========================================================================
-- 1. UTILITY FUNCTIONS & TRIGGERS
-- =========================================================================

-- Trigger function to automatically update updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================================================================
-- 2. TABLES DEFINITIONS
-- =========================================================================

-- Table 1: Profiles (Linked to Supabase Auth auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  role text default 'client' check (role in ('founder', 'admin', 'sales', 'legal', 'property_manager', 'channel_partner', 'client')),
  status text default 'active' check (status in ('active', 'suspended', 'archived')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table 2: Leads
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  city_country text,
  interest_type text,
  buyer_type text,
  budget_range text,
  preferred_service text,
  message text,
  lead_source text default 'website',
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'documentation_review', 'site_visit_planned', 'proposal_sent', 'negotiation', 'converted', 'lost', 'archived')),
  priority text default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  assigned_to uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table 3: Lead Activities
create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade not null,
  activity_type text check (activity_type in ('call', 'email', 'whatsapp', 'site_visit', 'document_review', 'note')),
  title text not null,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null
);

-- Table 4: Opportunities (Real Estate listings / Layout participations)
create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  location text,
  land_area text,
  price_range text,
  development_model text,
  legal_status text,
  rera_status text,
  visibility text default 'private' check (visibility in ('public', 'private')),
  wealth_score numeric(3,1) default 0.0,
  status text default 'draft' check (status in ('draft', 'published', 'reserved', 'archived')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table 5: Opportunity Documents (Encrypted KYC or deeds)
create table public.opportunity_documents (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references public.opportunities(id) on delete cascade not null,
  document_name text not null,
  document_type text not null,
  storage_path text not null, -- Supabase Storage bucket link
  visibility text default 'private' check (visibility in ('public', 'private')),
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null
);

-- Table 6: Channel Partners Onboarding Applications
create table public.channel_partners (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  company_name text,
  rera_id text unique,
  city text,
  experience text,
  status text default 'pending_review' check (status in ('pending_review', 'approved', 'rejected')),
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table 7: Tasks
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  related_lead_id uuid references public.leads(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  due_date timestamptz,
  status text default 'open' check (status in ('open', 'in_progress', 'completed', 'cancelled')),
  priority text default 'normal' check (priority in ('low', 'normal', 'high')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table 8: Audit Logs
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamptz default now() not null
);

-- =========================================================================
-- 3. TRIGGERS ASSIGNMENT
-- =========================================================================
create trigger trigger_profiles_updated_at before update on public.profiles for each row execute procedure public.handle_updated_at();
create trigger trigger_leads_updated_at before update on public.leads for each row execute procedure public.handle_updated_at();
create trigger trigger_opportunities_updated_at before update on public.opportunities for each row execute procedure public.handle_updated_at();
create trigger trigger_channel_partners_updated_at before update on public.channel_partners for each row execute procedure public.handle_updated_at();
create trigger trigger_tasks_updated_at before update on public.tasks for each row execute procedure public.handle_updated_at();

-- =========================================================================
-- 4. ROW-LEVEL SECURITY (RLS) & POLICIES
-- =========================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.lead_activities enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_documents enable row level security;
alter table public.channel_partners enable row level security;
alter table public.tasks enable row level security;
alter table public.audit_logs enable row level security;

-- 4A. Profiles Policies
create policy "Allow founder and admin full access to profiles" 
  on public.profiles for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Allow users to read their own profile" 
  on public.profiles for select using (auth.uid() = id);

create policy "Allow users to update their own profile details" 
  on public.profiles for update using (auth.uid() = id);

-- 4B. Leads Policies
create policy "Founder and Admin manage all leads" 
  on public.leads for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Sales managers read/update assigned leads" 
  on public.leads for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'sales')
    and (assigned_to = auth.uid() or created_by = auth.uid())
  );

create policy "Legal reads leads in documentation review" 
  on public.leads for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'legal')
    and status = 'documentation_review'
  );

create policy "Allow public submissions to insert leads" 
  on public.leads for insert with check (true);

-- 4C. Lead Activities Policies
create policy "Founder and Admin manage all lead activities" 
  on public.lead_activities for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Sales managers manage assigned lead activities" 
  on public.lead_activities for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'sales')
    and exists (select 1 from public.leads l where l.id = lead_id and (l.assigned_to = auth.uid() or l.created_by = auth.uid()))
  );

-- 4D. Opportunities Policies
create policy "Founder and Admin manage all opportunities" 
  on public.opportunities for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Allow everyone to read public opportunities" 
  on public.opportunities for select using (visibility = 'public' and status = 'published');

create policy "Allow legal officers to view opportunities for review" 
  on public.opportunities for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'legal')
  );

-- 4E. Opportunity Documents Policies
create policy "Founder and Admin manage all opportunity documents" 
  on public.opportunity_documents for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

-- 4F. Channel Partners Policies
create policy "Founder and Admin manage all applications" 
  on public.channel_partners for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Allow public application inserts" 
  on public.channel_partners for insert with check (true);

-- 4G. Tasks Policies
create policy "Founder and Admin manage all tasks" 
  on public.tasks for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Users manage assigned tasks" 
  on public.tasks for all using (assigned_to = auth.uid() or created_by = auth.uid());

-- 4H. Audit Logs Policies
create policy "Only founder and admin read audit logs" 
  on public.audit_logs for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin'))
  );

create policy "Allow backend system to insert audit logs" 
  on public.audit_logs for insert with check (true);
