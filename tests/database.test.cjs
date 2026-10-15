const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { PGlite } = require('@electric-sql/pglite');
const ids={client:'00000000-0000-4000-8000-000000000001',other:'00000000-0000-4000-8000-000000000002',admin:'00000000-0000-4000-8000-000000000003',sales:'00000000-0000-4000-8000-000000000004',suspended:'00000000-0000-4000-8000-000000000005'};
test('foundation hardening enforces real PostgreSQL row and column permissions', async t=>{
 const db=await PGlite.create();
 t.after(()=>db.close());
 await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
 create schema auth; create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 grant usage on schema public, auth to anon, authenticated, service_role;
 grant execute on function auth.uid() to anon, authenticated, service_role;`);
 await db.exec(fs.readFileSync('supabase/migrations/001_mslegacy_crm_foundation.sql','utf8'));
 await db.exec('grant all on all tables in schema public to anon, authenticated, service_role');
 for(const [name,id] of Object.entries(ids)){
  await db.query('insert into auth.users values ($1)',[id]);
  await db.query('insert into public.profiles(id,full_name,role,status) values($1,$2,$3,$4)',[id,name,name==='admin'?'admin':name==='sales'?'sales':'client',name==='suspended'?'suspended':'active']);
 }
 await db.query("insert into public.leads(full_name,assigned_to,status) values('Assigned lead',$1,'new'),('Unassigned lead',null,'new')",[ids.sales]);
 const migration=fs.readdirSync('supabase/migrations').find(f=>f.endsWith('_audit_access_hardening.sql'));
 await db.exec(fs.readFileSync('supabase/migrations/'+migration,'utf8'));
 async function as(role,id){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id||'']);await db.exec('set role '+role);}
 await t.test('own profile reads succeed without recursion; other profiles remain private',async()=>{
  await as('authenticated',ids.client);
  assert.equal((await db.query('select * from profiles')).rows.length,1);
  assert.equal((await db.query('select * from profiles where id=$1',[ids.other])).rows.length,0);
  assert.equal((await db.query('select private.current_app_role() role')).rows[0].role,'client');
 });
 await t.test('self-service cannot promote a role or reactivate an account',async()=>{
  await assert.rejects(db.query("update profiles set role='admin' where id=$1",[ids.client]),e=>e.code==='42501');
  await assert.rejects(db.query("update profiles set status='active' where id=$1",[ids.client]),e=>e.code==='42501');
  await db.query("update profiles set full_name='Updated name' where id=$1",[ids.client]);
  assert.equal((await db.query('select full_name from profiles')).rows[0].full_name,'Updated name');
 });
 await t.test('clients cannot read staff leads or create staff tasks',async()=>{
  assert.equal((await db.query('select * from leads')).rows.length,0);
  await assert.rejects(db.query("insert into tasks(title,assigned_to) values('forged',$1)",[ids.client]),e=>e.code==='42501');
 });
 await t.test('suspended accounts receive no role and no staff access',async()=>{
  await as('authenticated',ids.suspended);
  assert.equal((await db.query('select private.current_app_role() role')).rows[0].role,null);
  assert.equal((await db.query("update profiles set full_name='bypass' where id=$1",[ids.suspended])).affectedRows,0);
  assert.equal((await db.query('select * from leads')).rows.length,0);
 });
 await t.test('sales can access assigned leads, not the entire intake queue',async()=>{
  await as('authenticated',ids.sales);
  assert.equal((await db.query('select * from leads')).rows.length,1);
 });
 await t.test('administrators can read the operational queue and profiles',async()=>{
  await as('authenticated',ids.admin);
  assert.equal((await db.query('select * from profiles')).rows.length,5);
  assert.equal((await db.query('select * from leads')).rows.length,2);
 });
 await t.test('anonymous intake persists without allowing private reads or forged workflow fields',async()=>{
  await as('anon');
  await db.query("insert into leads(full_name,phone,email,message) values('Test enquiry','+919035687671','test@example.com','Synthetic regression fixture')");
  await assert.rejects(db.query('select * from leads'),e=>e.code==='42501');
  await assert.rejects(db.query("insert into leads(full_name,phone,email,status) values('Invalid lead','1234567890','test@example.com','converted')"),e=>e.code==='42501');
  await assert.rejects(db.query("insert into leads(full_name,phone,email,assigned_to) values('Invalid lead','1234567890','test@example.com',$1)",[ids.admin]),e=>e.code==='42501');
  await assert.rejects(db.query("insert into leads(full_name,phone,email,created_at) values('Invalid lead','1234567890','test@example.com','2000-01-01')"),e=>e.code==='42501');
  await assert.rejects(db.query("insert into leads(full_name,phone,email,message) values('Invalid lead','1234567890','test@example.com',$1)",['x'.repeat(8001)]),e=>e.code==='42501');
 });
 await t.test('partner applications cannot be pre-approved or given internal notes',async()=>{
  await db.query("insert into channel_partners(full_name,phone,email,company_name,rera_id) values('Test partner','1234567890','test@example.com','Test agency','TEST-ONLY')");
  await assert.rejects(db.query("insert into channel_partners(full_name,phone,email,company_name,rera_id,status) values('Invalid partner','1234567890','test@example.com','Test','BAD-1','approved')"),e=>e.code==='42501');
  await assert.rejects(db.query("insert into channel_partners(full_name,notes) values('Invalid partner','forged')"),e=>e.code==='42501');
 });
 await t.test('browser roles cannot forge audit events, call the internal lookup anonymously, or truncate tables',async()=>{
  await assert.rejects(db.query("insert into audit_logs(action,entity_type) values('forged','lead')"),e=>e.code==='42501');
  await assert.rejects(db.query('select private.current_app_role()'),e=>e.code==='42501');
  await assert.rejects(db.query('truncate leads'),e=>e.code==='42501');
  await as('authenticated',ids.admin);
  await assert.rejects(db.query("insert into audit_logs(action,entity_type) values('forged','lead')"),e=>e.code==='42501');
  await assert.rejects(db.query('truncate leads'),e=>e.code==='42501');
 });
 await t.test('no identity means no private rows; RLS stays enabled on all eight tables',async()=>{
  await as('authenticated');
  assert.equal((await db.query('select * from profiles')).rows.length,0);
  assert.equal((await db.query('select * from leads')).rows.length,0);
  await as('service_role');
  assert.equal((await db.query('select count(*)::int n from leads')).rows[0].n,3);
  await db.exec('reset role');
  assert.equal((await db.query("select count(*)::int n from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind='r' and c.relrowsecurity")).rows[0].n,8);
 });
});
test('pending requirement schema never exposes contact-bearing rows through public access',async t=>{
 const db=await PGlite.create();t.after(()=>db.close());
 await db.exec("create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$; grant usage on schema public,auth to anon,authenticated,service_role; grant execute on function auth.uid() to anon,authenticated,service_role;");
 for(const file of fs.readdirSync('supabase/migrations').filter(f=>/\.sql$/.test(f)).sort()){
  await db.exec(fs.readFileSync('supabase/migrations/'+file,'utf8'));
 }
 // Model broad provider defaults so the test proves the explicit revoke and row policy.
 await db.exec('grant select,insert on public.property_requirements to authenticated;');
 const client=ids.client;
 await db.query('insert into auth.users values($1)',[client]);
 await db.query("insert into profiles(id,role,status) values($1,'client','active')",[client]);
 await db.exec("insert into property_requirements(requirement_code,title,slug,source_type,requirement_type,property_category,buyer_profile,preferred_city,preferred_locations,budget_min,budget_max,requirement_summary,public_visibility,verification_status,contact_name,contact_phone,internal_notes) values('TEST','Test requirement','test-only','client_submitted','buy','land','end_user','Test city',array['Test'],1,2,'Synthetic test','public_sanitized','approved_public','Private contact','1234567890','Private review')");
 await db.exec('set role anon');
 await assert.rejects(db.query('select contact_name,contact_phone,internal_notes from property_requirements'),e=>e.code==='42501');
 await db.exec('reset role');
 await db.query("select set_config('request.jwt.claim.sub',$1,false)",[client]);
 await db.exec('set role authenticated');
 assert.equal((await db.query('select * from property_requirements')).rows.length,0);
 await assert.rejects(db.query("insert into property_requirements(requirement_code,title,slug,source_type,requirement_type,property_category,buyer_profile,preferred_city,preferred_locations,budget_min,budget_max,requirement_summary,public_visibility,verification_status) values('BAD','Bad','bad','client_submitted','buy','land','end_user','City',array['Test'],1,2,'Test','public_sanitized','approved_public')"),e=>e.code==='42501');
});
