-- Migration 005: Property Requirements Exchange Schema
-- Description: Creates tables, RLS policies, triggers, and foreign keys for the client requirement exchange.

-- =========================================================================
-- 1. TABLE DEFINITIONS
-- =========================================================================

-- Table 1: Property Requirements
CREATE TABLE IF NOT EXISTS public.property_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requirement_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('client_submitted', 'company_posted', 'developer_requirement', 'agent_requirement', 'nri_requirement', 'investor_requirement')),
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('buy', 'rent', 'lease', 'land_acquisition', 'jv_development', 'construction', 'property_management')),
  property_category TEXT NOT NULL CHECK (property_category IN ('apartment', 'plotted_development', 'villa', 'farmland', 'commercial', 'land', 'mixed_use', 'warehouse', 'rental')),
  buyer_profile TEXT NOT NULL CHECK (buyer_profile IN ('end_user', 'nri', 'hni', 'investor', 'developer', 'company', 'channel_partner')),
  preferred_city TEXT NOT NULL,
  preferred_locations TEXT[] NOT NULL,
  micro_market TEXT,
  budget_min NUMERIC NOT NULL,
  budget_max NUMERIC NOT NULL,
  budget_currency TEXT NOT NULL DEFAULT 'INR',
  land_size_min NUMERIC,
  land_size_max NUMERIC,
  land_size_unit TEXT,
  builtup_area_min NUMERIC,
  builtup_area_max NUMERIC,
  bedrooms TEXT,
  possession_timeline TEXT,
  purchase_timeline TEXT,
  road_width_requirement TEXT,
  approval_requirement TEXT,
  rera_required BOOLEAN DEFAULT FALSE,
  loan_required BOOLEAN DEFAULT FALSE,
  legal_due_diligence_required BOOLEAN DEFAULT FALSE,
  site_visit_required BOOLEAN DEFAULT FALSE,
  nri_support_required BOOLEAN DEFAULT FALSE,
  requirement_summary TEXT NOT NULL,
  must_have_features TEXT[] DEFAULT '{}',
  nice_to_have_features TEXT[] DEFAULT '{}',
  restrictions TEXT,
  public_visibility TEXT NOT NULL DEFAULT 'private' CHECK (public_visibility IN ('private', 'public_sanitized', 'internal_only', 'archived')),
  verification_status TEXT NOT NULL DEFAULT 'new' CHECK (verification_status IN ('new', 'under_review', 'qualified', 'approved_public', 'matched', 'shared_with_partners', 'converted', 'closed', 'rejected')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  contact_city TEXT,
  consent_to_contact BOOLEAN DEFAULT FALSE,
  consent_to_share_sanitized BOOLEAN DEFAULT FALSE,
  internal_notes TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 2: Requirement Matches
CREATE TABLE IF NOT EXISTS public.requirement_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requirement_id UUID REFERENCES public.property_requirements(id) ON DELETE CASCADE NOT NULL,
  matched_project_id UUID REFERENCES public.developer_projects(id) ON DELETE SET NULL,
  matched_developer_id UUID REFERENCES public.developers(id) ON DELETE SET NULL,
  matched_property_title TEXT,
  match_type TEXT NOT NULL CHECK (match_type IN ('project', 'developer', 'agent_property', 'land_parcel', 'manual_suggestion')),
  match_score NUMERIC CHECK (match_score >= 0 AND match_score <= 100),
  match_reason TEXT,
  match_status TEXT NOT NULL DEFAULT 'suggested' CHECK (match_status IN ('suggested', 'shortlisted', 'sent_to_client', 'client_interested', 'rejected', 'converted')),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 3: Requirement Responses
CREATE TABLE IF NOT EXISTS public.requirement_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requirement_id UUID REFERENCES public.property_requirements(id) ON DELETE CASCADE NOT NULL,
  responder_type TEXT NOT NULL CHECK (responder_type IN ('developer', 'agent', 'channel_partner', 'landowner', 'internal_team')),
  responder_name TEXT NOT NULL,
  responder_company TEXT,
  responder_phone TEXT NOT NULL,
  responder_email TEXT NOT NULL,
  property_title TEXT NOT NULL,
  property_location TEXT NOT NULL,
  property_category TEXT NOT NULL CHECK (property_category IN ('apartment', 'plotted_development', 'villa', 'farmland', 'commercial', 'land', 'mixed_use', 'warehouse', 'rental')),
  offered_price NUMERIC NOT NULL,
  property_details TEXT,
  document_links TEXT[] DEFAULT '{}',
  media_links TEXT[] DEFAULT '{}',
  response_status TEXT NOT NULL DEFAULT 'new' CHECK (response_status IN ('new', 'under_review', 'shortlisted', 'rejected', 'sent_to_client', 'converted')),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 4: Requirement Activity Logs
CREATE TABLE IF NOT EXISTS public.requirement_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requirement_id UUID REFERENCES public.property_requirements(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- =========================================================================
-- 2. TRIGGERS
-- =========================================================================

-- Trigger to handle updated_at for property_requirements
CREATE OR REPLACE TRIGGER tr_property_requirements_updated_at
  BEFORE UPDATE ON public.property_requirements
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================================
-- 3. ROW-LEVEL SECURITY & POLICIES
-- =========================================================================

-- Enable RLS
ALTER TABLE public.property_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirement_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirement_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirement_activity_logs ENABLE ROW LEVEL SECURITY;

-- 3A. Property Requirements Policies

-- 1. Read sanitized public requirements
CREATE POLICY "Allow public select of sanitized public requirements"
  ON public.property_requirements FOR SELECT USING (
    public_visibility = 'public_sanitized' 
    AND verification_status IN ('approved_public', 'matched', 'shared_with_partners')
  );

-- 2. Allow public inserts for client requirements submission
CREATE POLICY "Allow public insert of requirements"
  ON public.property_requirements FOR INSERT WITH CHECK (true);

-- 3. CRM Users manage all requirements (founder, admin, sales)
CREATE POLICY "Founder and Admin manage all requirements"
  ON public.property_requirements FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin', 'sales'))
  );

-- 4. Legal role can select JV/land clearance requirements
CREATE POLICY "Allow legal role select requirements"
  ON public.property_requirements FOR SELECT USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'legal')
  );

-- 3B. Requirement Matches Policies

CREATE POLICY "CRM users manage matches"
  ON public.requirement_matches FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin', 'sales'))
  );

-- 3C. Requirement Responses Policies

-- 1. Allow public insert for responders
CREATE POLICY "Allow public insert of responses"
  ON public.requirement_responses FOR INSERT WITH CHECK (true);

-- 2. CRM users manage all responses
CREATE POLICY "CRM users manage responses"
  ON public.requirement_responses FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin', 'sales'))
  );

-- 3D. Requirement Activity Logs Policies

CREATE POLICY "CRM users manage activity logs"
  ON public.requirement_activity_logs FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('founder', 'admin', 'sales'))
  );
