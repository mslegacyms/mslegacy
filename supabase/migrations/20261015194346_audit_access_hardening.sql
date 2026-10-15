-- Foundation hardening. Tested on a disposable PostgreSQL instance before use.
-- Authorization lookup is internal, accepts no caller-selected identity and returns only
-- the active caller's role. Its tightly scoped definer context breaks profile RLS recursion.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;
create or replace function private.current_app_role() returns text
language sql stable security definer set search_path = '' as $$
  select p.role from public.profiles p
  where p.id = (select auth.uid()) and p.status = 'active' and auth.uid() is not null
$$;
revoke all on function private.current_app_role() from public, anon;
grant execute on function private.current_app_role() to authenticated;
alter function public.handle_updated_at() set search_path = '';

-- Reconcile only the eight audited foundation tables; leave later features disabled.
do $$ declare item record; begin
  for item in select tablename, policyname from pg_policies where schemaname = 'public'
    and tablename = any(array['profiles','leads','lead_activities','opportunities','opportunity_documents','channel_partners','tasks','audit_logs'])
  loop execute format('drop policy %I on public.%I', item.policyname, item.tablename); end loop;
end $$;
revoke all on public.profiles, public.leads, public.lead_activities, public.opportunities,
  public.opportunity_documents, public.channel_partners, public.tasks, public.audit_logs from public, anon, authenticated;

-- Profile identity/role/status are administered through a trusted backend, never self-service.
grant select on public.profiles to authenticated;
grant update (full_name, phone) on public.profiles to authenticated;
create policy profiles_own_read on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy profiles_admin_read on public.profiles for select to authenticated using ((select private.current_app_role()) in ('founder','admin'));
create policy profiles_own_details on public.profiles for update to authenticated
  using (id = (select auth.uid()) and (select private.current_app_role()) is not null)
  with check (id = (select auth.uid()) and (select private.current_app_role()) is not null);

grant select, update, delete on public.leads to authenticated;
grant insert (id, full_name, phone, email, city_country, interest_type, buyer_type, budget_range, preferred_service, message, lead_source, status, priority, created_by, assigned_to) on public.leads to authenticated;
grant insert (id, full_name, phone, email, city_country, interest_type, buyer_type, budget_range, preferred_service, message, lead_source, status, priority) on public.leads to anon;
create policy leads_public_intake on public.leads for insert to anon, authenticated with check (
  status = 'new' and priority = 'normal' and assigned_to is null and created_by is null
  and lead_source in ('website','project_marketplace','calculator')
  and char_length(trim(full_name)) between 2 and 150
  and char_length(phone) between 8 and 30 and phone ~ '^[+()0-9 .-]+$'
  and char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  and coalesce(char_length(message),0) <= 8000
  and coalesce(char_length(city_country),0) <= 200
  and coalesce(char_length(interest_type),0) <= 80
  and coalesce(char_length(buyer_type),0) <= 80
  and coalesce(char_length(budget_range),0) <= 80
  and coalesce(char_length(preferred_service),0) <= 80
);
create policy leads_admin on public.leads for all to authenticated
  using ((select private.current_app_role()) in ('founder','admin'))
  with check ((select private.current_app_role()) in ('founder','admin'));
create policy leads_sales_read on public.leads for select to authenticated using (
  (select private.current_app_role()) = 'sales' and (assigned_to = (select auth.uid()) or created_by = (select auth.uid())));
create policy leads_sales_update on public.leads for update to authenticated using (
  (select private.current_app_role()) = 'sales' and (assigned_to = (select auth.uid()) or created_by = (select auth.uid())))
  with check ((select private.current_app_role()) = 'sales' and (assigned_to = (select auth.uid()) or created_by = (select auth.uid())));
create policy leads_sales_create on public.leads for insert to authenticated with check (
  (select private.current_app_role()) = 'sales' and created_by = (select auth.uid()) and (assigned_to is null or assigned_to = (select auth.uid())));
create policy leads_legal_assigned_read on public.leads for select to authenticated using (
  (select private.current_app_role()) = 'legal' and status = 'documentation_review' and assigned_to = (select auth.uid()));

grant select, insert, update, delete on public.lead_activities to authenticated;
create policy activities_admin on public.lead_activities for all to authenticated
  using ((select private.current_app_role()) in ('founder','admin')) with check ((select private.current_app_role()) in ('founder','admin'));
create policy activities_assigned_sales on public.lead_activities for all to authenticated using (
  (select private.current_app_role()) = 'sales' and exists (select 1 from public.leads l where l.id = lead_id and (l.assigned_to = (select auth.uid()) or l.created_by = (select auth.uid()))))
  with check ((select private.current_app_role()) = 'sales' and created_by = (select auth.uid()) and exists (select 1 from public.leads l where l.id = lead_id and (l.assigned_to = (select auth.uid()) or l.created_by = (select auth.uid()))));

grant select on public.opportunities to anon;
grant select, insert, update, delete on public.opportunities to authenticated;
create policy opportunities_public on public.opportunities for select to anon, authenticated using (visibility = 'public' and status = 'published');
create policy opportunities_admin on public.opportunities for all to authenticated
  using ((select private.current_app_role()) in ('founder','admin')) with check ((select private.current_app_role()) in ('founder','admin'));
create policy opportunities_legal_read on public.opportunities for select to authenticated using ((select private.current_app_role()) = 'legal');

grant select, insert, update, delete on public.opportunity_documents to authenticated;
create policy documents_admin on public.opportunity_documents for all to authenticated
  using ((select private.current_app_role()) in ('founder','admin')) with check ((select private.current_app_role()) in ('founder','admin'));

grant insert (id, full_name, phone, email, company_name, rera_id, city, experience, status) on public.channel_partners to anon;
grant select, update, delete on public.channel_partners to authenticated;
grant insert (id, full_name, phone, email, company_name, rera_id, city, experience, status, notes) on public.channel_partners to authenticated;
create policy partner_public_intake on public.channel_partners for insert to anon, authenticated with check (
  status = 'pending_review' and notes is null and char_length(trim(full_name)) between 2 and 150
  and char_length(phone) between 8 and 30 and char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  and char_length(company_name) between 1 and 200 and char_length(rera_id) between 1 and 150
  and coalesce(char_length(city),0) <= 200 and coalesce(char_length(experience),0) <= 2000);
create policy partner_admin on public.channel_partners for all to authenticated
  using ((select private.current_app_role()) in ('founder','admin')) with check ((select private.current_app_role()) in ('founder','admin'));

grant select, insert, update, delete on public.tasks to authenticated;
create policy tasks_admin on public.tasks for all to authenticated
  using ((select private.current_app_role()) in ('founder','admin')) with check ((select private.current_app_role()) in ('founder','admin'));
create policy tasks_assigned_staff on public.tasks for all to authenticated using (
  (select private.current_app_role()) in ('sales','legal','property_manager') and (assigned_to = (select auth.uid()) or created_by = (select auth.uid())))
  with check ((select private.current_app_role()) in ('sales','legal','property_manager') and (assigned_to = (select auth.uid()) or created_by = (select auth.uid())));

grant select on public.audit_logs to authenticated;
create policy audit_admin_read on public.audit_logs for select to authenticated using ((select private.current_app_role()) in ('founder','admin'));
-- Supabase's trusted service role retains its pre-existing grants and bypass RLS.
-- Browser roles cannot append, edit, delete or truncate the audit history.

create index if not exists leads_assigned_to_idx on public.leads (assigned_to);
create index if not exists leads_created_by_idx on public.leads (created_by);
create index if not exists lead_activities_lead_id_idx on public.lead_activities (lead_id);
create index if not exists lead_activities_created_by_idx on public.lead_activities (created_by);
create index if not exists tasks_assigned_to_idx on public.tasks (assigned_to);
create index if not exists tasks_created_by_idx on public.tasks (created_by);
create index if not exists tasks_related_lead_id_idx on public.tasks (related_lead_id);
create index if not exists opportunities_created_by_idx on public.opportunities (created_by);
create index if not exists opportunity_documents_opportunity_id_idx on public.opportunity_documents (opportunity_id);
create index if not exists opportunity_documents_uploaded_by_idx on public.opportunity_documents (uploaded_by);
create index if not exists audit_logs_actor_id_idx on public.audit_logs (actor_id);

-- Durable audit events are generated inside the transaction, not by a browser insert.
create or replace function private.audit_lead_change() returns trigger
language plpgsql security definer set search_path = '' as $$
declare actor uuid;
begin
  select p.id into actor from public.profiles p where p.id = auth.uid() and p.status = 'active';
  if tg_op = 'INSERT' then
    insert into public.audit_logs(actor_id, action, entity_type, entity_id, metadata)
    values(actor, 'lead_created', 'lead', new.id, jsonb_build_object('source',new.lead_source));
  elsif new.status is distinct from old.status then
    insert into public.audit_logs(actor_id, action, entity_type, entity_id, metadata)
    values(actor, 'lead_status_updated', 'lead', new.id, jsonb_build_object('previous_status',old.status,'status',new.status));
  end if;
  return new;
end $$;
revoke all on function private.audit_lead_change() from public, anon, authenticated;
drop trigger if exists audit_lead_change on public.leads;
create trigger audit_lead_change after insert or update of status on public.leads for each row execute function private.audit_lead_change();
