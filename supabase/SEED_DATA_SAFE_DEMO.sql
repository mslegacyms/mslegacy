-- MS Legacy CRM Demo Seed Data
-- Created at: 2026-06-28
-- Description: Inserts safe demonstration rows into public tables. Runs cleanly after migrations 001 and 002.

-- IMPORTANT INSTRUCTION FOR FOUNDER ACCOUNT PROFILE SYNC:
-- Because users are authenticated via Supabase Auth (auth.users), profiles are linked to those system accounts.
-- To establish the first founder account:
-- 1. Create a user via Supabase Auth Auth console or SignUp form.
-- 2. Once the user is registered, find their account UUID from the Auth console.
-- 3. Execute this SQL update statement replacing 'YOUR-USER-UUID-HERE' with their actual UUID:
--
--    update public.profiles set role = 'founder' where id = 'YOUR-USER-UUID-HERE';


-- =========================================================================
-- 1. SEED MOCK PROFILES (for assigning tasks/leads)
-- =========================================================================
-- NOTE: We insert placeholder profiles for internal advisors. In production, these rows
-- will be generated automatically when users register via Supabase Auth.
-- We use dummy UUIDs for mock staff to run tasks assignment clean.

insert into public.profiles (id, full_name, phone, role, status) values
  ('00000000-0000-0000-0000-000000000001', 'Muzzamil Ahmad (Staff Demo)', '+91 99999 99991', 'sales', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'Sandeep Rao (Staff Demo)', '+91 99999 99992', 'legal', 'active'),
  ('00000000-0000-0000-0000-000000000003', 'Kiran Kumar (Staff Demo)', '+91 99999 99993', 'property_manager', 'active')
on conflict (id) do nothing;


-- =========================================================================
-- 2. SEED SAMPLE LEADS (Public Inquiries)
-- =========================================================================
insert into public.leads (id, full_name, phone, email, city_country, interest_type, buyer_type, budget_range, message, lead_source, status, priority, assigned_to) values
  (
    '11111111-1111-1111-1111-111111111111', 
    'Demo Client (Land Sourcing)', 
    '+91 90000 00001', 
    'demo.land@mslegacy-demo.in', 
    'Bangalore, India', 
    'land_sourcing', 
    'private_buyer', 
    '₹50 Lakhs - ₹1 Crore', 
    'Sample Lead: Interested in gated layout plots in North Bangalore corridor with RERA approvals.', 
    'website', 
    'new', 
    'normal',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '11111111-1111-1111-1111-111111111112', 
    'Demo Client (NRI Villa)', 
    '+1 555 0199', 
    'demo.nri@mslegacy-demo.in', 
    'San Francisco, USA', 
    'nri_services', 
    'hni_investor', 
    '₹3 Crores - ₹5 Crores', 
    'Sample Lead: NRI buyer looking for luxury villa coordinates adjacent to Whitefield corridor.', 
    'website_calculator', 
    'contacted', 
    'high',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '11111111-1111-1111-1111-111111111113', 
    'Demo Client (Co-Development)', 
    '+91 90000 00003', 
    'demo.partner@mslegacy-demo.in', 
    'Delhi, India', 
    'project_participation', 
    'developer', 
    '₹5 Crores+', 
    'Sample Lead: Land owner interested in joint layout development. Title reviews pending.', 
    'partner_referral', 
    'documentation_review', 
    'urgent',
    '00000000-0000-0000-0000-000000000002'
  )
on conflict (id) do nothing;


-- =========================================================================
-- 3. SEED SAMPLE OPPORTUNITIES (Sourced Properties)
-- =========================================================================
insert into public.opportunities (id, title, slug, location, land_area, price_range, development_model, legal_status, rera_status, visibility, wealth_score, status) values
  (
    '22222222-2222-2222-2222-222222222221',
    'Devanahalli Gated Layout (Demo Listing)',
    'devanahalli-gated-layout-demo',
    'Devanahalli, North Bangalore',
    '30x40 Ft, 40x60 Ft',
    '₹50 Lakhs - ₹1 Crore',
    'Gated Layout Development',
    'clear_title',
    'approved',
    'public',
    9.2,
    'published'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Whitefield Villa Plot Corridor (Demo Listing)',
    'whitefield-villa-plot-corridor-demo',
    'Whitefield, East Bangalore',
    '40x60 Ft, 50x80 Ft',
    '₹1 Crore - ₹3 Crores',
    'Joint Development',
    'clear_title',
    'approved',
    'private',
    9.5,
    'published'
  ),
  (
    '22222222-2222-2222-2222-222222222223',
    'Kanakapura Managed Farmstead (Demo Listing)',
    'kanakapura-managed-farmstead-demo',
    'Kanakapura Road, South Bangalore',
    '1.2 Acres - 2.5 Acres',
    '₹1 Crore - ₹3 Crores',
    'Managed Farm Life',
    'under_review',
    'pending',
    'private',
    8.8,
    'draft'
  )
on conflict (id) do nothing;


-- =========================================================================
-- 4. SEED SAMPLE TASKS (Advisory reminders)
-- =========================================================================
insert into public.tasks (id, title, description, related_lead_id, assigned_to, due_date, status, priority) values
  (
    '33333333-3333-3333-3333-333333333331',
    'Trace Mother Deeds (Demo Task)',
    'Log succession link deeds for the last 50 years to verify encumbrance clearances.',
    '11111111-1111-1111-1111-111111111113',
    '00000000-0000-0000-0000-000000000002',
    now() + interval '2 days',
    'open',
    'high'
  ),
  (
    '33333333-3333-3333-3333-333333333332',
    'Virtual Walkthrough Call (Demo Task)',
    'Complete coordinates audit and host zoom video inspection of site boundaries.',
    '11111111-1111-1111-1111-111111111112',
    '00000000-0000-0000-0000-000000000001',
    now() + interval '4 days',
    'in_progress',
    'high'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Verify BDA Layout Plan (Demo Task)',
    'Verify layout map approvals on the BDA state registry site.',
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000003',
    now() + interval '7 days',
    'open',
    'normal'
  )
on conflict (id) do nothing;


-- =========================================================================
-- 5. SEED SAMPLE CHANNEL PARTNERS (Agency Applications)
-- =========================================================================
insert into public.channel_partners (id, full_name, phone, email, company_name, rera_id, city, experience, status, notes) values
  (
    '44444444-4444-4444-4444-444444444441',
    'Rajesh Kumar (Demo Broker)',
    '+91 90000 00010',
    'demo.broker1@mslegacy-demo.in',
    'Apex Realty Bangalore',
    'PRM/KA/RERA/1251/309/PR/180222/001422',
    'Bangalore',
    '10 Years Sourcing experience in North Corridor',
    'pending_review',
    'Sample Application: Document clearances under review by legal desk.'
  ),
  (
    '44444444-4444-4444-4444-444444444442',
    'Suresh Gowda (Demo Broker)',
    '+91 90000 00020',
    'demo.broker2@mslegacy-demo.in',
    'Deccan Homes & Sourcing',
    'PRM/KA/RERA/1251/310/PR/180322/001567',
    'Bangalore',
    '8 Years experience in South farmland belts',
    'approved',
    'Sample Application: Verification completed. Portal permissions granted.'
  )
on conflict (id) do nothing;


-- =========================================================================
-- 6. SEED SAMPLE NOTIFICATIONS (In-app Alerts)
-- =========================================================================
insert into public.notifications (id, user_id, title, message, notification_type, related_entity_type, related_entity_id, is_read) values
  (
    '55555555-5555-5555-5555-555555555551',
    '00000000-0000-0000-0000-000000000001',
    'New Lead Onboarded',
    'Aravind Subramanian submitted a land sourcing inquiry.',
    'new_lead',
    'lead',
    '11111111-1111-1111-1111-111111111111',
    false
  ),
  (
    '55555555-5555-5555-5555-555555555552',
    '00000000-0000-0000-0000-000000000001',
    'Task Deadline Approaching',
    'Virtual Walkthrough Call is due in 4 days.',
    'follow_up_due',
    'task',
    '33333333-3333-3333-3333-333333333332',
    false
  ),
  (
    '55555555-5555-5555-5555-555555555553',
    '00000000-0000-0000-0000-000000000002',
    'Legal Review Flagged',
    'Zoning DC conversion status updated to under_review.',
    'legal_review',
    'opportunity',
    '22222222-2222-2222-2222-222222222223',
    true
  )
on conflict (id) do nothing;
