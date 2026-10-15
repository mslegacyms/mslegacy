const {test}=require('node:test');
const assert=require('node:assert/strict');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {loadTs}=require('./load-ts.cjs');
const math=loadTs('src/lib/calculators/financialMath.ts');
const near=(actual,expected,tolerance=.0001)=>assert.ok(Math.abs(actual-expected)<tolerance,actual+' != '+expected);
test('standard and zero-interest EMI match independent expected values',()=>{
 near(math.monthlyPayment(6400000,8.5,240),55540.686935);
 near(math.monthlyPayment(6400000,0,240),26666.6666667);
 near(math.loanFromPayment(55540.686935,8.5,240),6400000,.01);
});
test('prepayments cannot create negative durations or save more than total interest',()=>{
 for(const months of [1,12,240])for(const frequency of ['annual','one_time'])for(const extra of [0,1,100000,1e10]){
  const result=math.prepaymentImpact(6400000,8.5,months,extra,frequency);
  assert.ok(result.monthsReduced>=0&&result.monthsReduced<=months);
  assert.ok(result.interestSaved>=0&&result.interestSaved<=math.monthlyPayment(6400000,8.5,months)*months-6400000+.01);
 }
 const result=math.prepaymentImpact(12000,0,12,6000,'one_time');
 assert.equal(result.monthsReduced,6);assert.equal(result.interestSaved,0);
});
test('affordability falls to zero when household spending exceeds disposable income',()=>{
 assert.equal(math.affordability(200000,20000,40000,35),50000);
 assert.equal(math.affordability(200000,20000,190000,35),0);
 assert.equal(math.affordability(200000,20000,170000,35),10000);
});
test('numeric validation rejects invalid denominators, negatives and non-finite values',()=>{
 for(const x of [0,-1,NaN,Infinity,-Infinity,1e20])assert.ok(math.validateNumbers({tenure:x},['tenure']));
 assert.ok(math.validateNumbers({vacancy:101},[],['vacancy']));
 assert.equal(math.validateNumbers({interest:0},[],['interest']),undefined);
});
function calculate(file,exportName,overrides={}){
 let index=0;
 const useState=initial=>{const value=Object.hasOwn(overrides,index)?overrides[index]:initial;index++;return [value,()=>{}];};
 const component=loadTs('src/components/calculators/'+file+'.tsx',{
  react:{...React,useState},
  './CalculatorShell':{CalculatorShell:()=>null},
  './CalculatorActionBar':{CalculatorActionBar:()=>null},
 });
 return component[exportName]().props;
}
test('the actual EMI component blocks zero tenure and never reports negative prepayment reduction',()=>{
 assert.ok(calculate('HomeLoanEmiDetailedCalculator','HomeLoanEmiDetailedCalculator',{3:0}).validationError);
 const props=calculate('HomeLoanEmiDetailedCalculator','HomeLoanEmiDetailedCalculator',{3:1});
 assert.equal(props.validationError,undefined);
 assert.ok(!props.actionBar.props.summaryMarkdown.includes('~-'));
});
test('the actual affordability component uses household spending',()=>{
 const summary=calculate('BuyerAffordabilityDetailedCalculator','BuyerAffordabilityDetailedCalculator',{3:190000}).actionBar.props.summaryMarkdown;
 assert.match(summary,/Safe Monthly EMI Limit\*\*: ₹0/);
});
test('land, NRI and rental components hide invalid results and sharing',()=>{
 for(const [file,name,overrides] of [
  ['LandPlotCostDetailedCalculator','LandPlotCostDetailedCalculator',{0:0,1:'acre'}],
  ['NriOwnershipDetailedCalculator','NriOwnershipDetailedCalculator',{2:0}],
  ['RentalYieldDetailedCalculator','RentalYieldDetailedCalculator',{0:0}],
 ])assert.ok(calculate(file,name,overrides).validationError);
});
test('document rendering displays untrusted HTML as inert text in both preview paths',()=>{
 const {DocumentText}=loadTs('src/components/legal-documents/DocumentText.tsx');
 const html=renderToStaticMarkup(React.createElement(DocumentText,{text:'# <img src=x onerror=alert(1)>\n<script>alert(1)</script>\n* <b>AUDIT</b>'}));
 assert.ok(!html.includes('<img'));assert.ok(!html.includes('<script'));assert.ok(!html.includes('<b>'));
 assert.match(html,/&lt;img/);assert.match(html,/&lt;script/);
});
test('public enquiry intent survives comparison handoff and unknown input falls back safely',()=>{
 const {getEnquiryIntent}=loadTs('src/lib/validation/enquiry.ts');
 assert.equal(getEnquiryIntent('project_comparison',true),'project_comparison');
 assert.equal(getEnquiryIntent('forged',true),'project_due_diligence');
 assert.equal(getEnquiryIntent(null,false),'general_advisory');
});
function authFixture({configured=true,profile={role:'admin',status:'active'},profileError=null,authError=null}={}){
 let signouts=0;
 const client={auth:{signInWithPassword:async()=>({data:{user:{id:'user-id'}},error:authError}),signOut:async()=>{signouts++;return {error:null};},getUser:async()=>({data:{user:{id:'user-id'}},error:authError})},
  from:()=>({select:()=>({eq:()=>({single:async()=>({data:profile&&{id:'user-id',...profile},error:profileError})})})})};
 const stubs={'@/lib/env':{isSupabaseConfigured:()=>configured},'@/lib/supabase/server':{createClient:async()=>client},'next/headers':{cookies:async()=>({delete:()=>{}})},'next/navigation':{redirect:url=>{throw new Error('REDIRECT:'+url);}}};
 return {stubs,signouts:()=>signouts};
}
test('login refuses missing configuration, forged role arguments and missing/inactive profiles',async()=>{
 const missing=authFixture({configured:false});
 const action=loadTs('src/app/login/actions.ts',missing.stubs);
 assert.equal((await action.authenticateUser('test@example.com','password','founder')).success,false);
 for(const profile of [null,{role:'admin',status:'suspended'},{role:'root',status:'active'}]){
  const fixture=authFixture({profile});
  const {authenticateUser}=loadTs('src/app/login/actions.ts',fixture.stubs);
  assert.equal((await authenticateUser('test@example.com','password')).success,false);
  assert.equal(fixture.signouts(),1);
 }
 const fixture=authFixture();
 assert.equal((await loadTs('src/app/login/actions.ts',fixture.stubs).authenticateUser('test@example.com','password')).redirectUrl,'/crm/dashboard');
});
test('profile lookup never manufactures an active client on failure',async()=>{
 for(const options of [{configured:false},{profile:null},{profileError:{message:'42P17'}},{profile:{role:'client',status:'archived'}}]){
  const fixture=authFixture(options);
  assert.equal(await loadTs('src/lib/auth/getCurrentUserProfile.ts',fixture.stubs).getCurrentUserProfile(),null);
 }
});
test('logout calls Supabase signOut before redirecting',async()=>{
 const fixture=authFixture();const {logout}=loadTs('src/app/login/actions.ts',fixture.stubs);
 await assert.rejects(logout(),/REDIRECT:\/login/);assert.equal(fixture.signouts(),1);
});
test('public intake only returns success and a reference after a durable insert',async()=>{
 const input={name:'Test visitor',phone:'+919035687671',email:'test@example.com',location:'Bengaluru',interestType:'general_advisory',buyerType:'end_user',budgetRange:'₹50 Lakhs - ₹1 Crore',message:'Synthetic test'};
 for(const mode of ['missing','error','throw','success']){
  let inserted;
  const {submitContactForm}=loadTs('src/app/contact/actions.ts',{
   '@/lib/env':{isSupabaseConfigured:()=>mode!=='missing',SUBMISSION_UNAVAILABLE:'Unavailable'},
   '@/lib/supabase/server':{createClient:async()=>({from:()=>({insert:async row=>{inserted=row;if(mode==='throw')throw Error('network');return {error:mode==='error'?{message:'db'}:null};}})})},
  });
  const result=await submitContactForm(input);
  assert.equal(result.success,mode==='success');
  if(mode==='success'){assert.equal(result.reference,inserted.id);assert.equal(inserted.status,'new');}
  else assert.equal(result.reference,undefined);
 }
});
test('validation rejects oversized or malformed public fields',()=>{
 const {validateContact,text}=loadTs('src/lib/validation/intake.ts');
 for(const phone of ['123','bad-phone','x'.repeat(40)])assert.throws(()=>validateContact({name:'Test',phone,email:'test@example.com'}));
 assert.throws(()=>validateContact({name:'Test',phone:'1234567890',email:'invalid'}));
 assert.throws(()=>text('x'.repeat(8001),8000));
});
test('browser drafts are owner-scoped and cannot certify approval',()=>{
 const data=new Map();global.window={};global.sessionStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};
 try{
  const store=loadTs('src/lib/crm/legalDocumentsStore.ts');
  const owner='00000000-0000-4000-8000-000000000001',other='00000000-0000-4000-8000-000000000002';
  const draft={id:'test-draft',createdById:owner,status:'draft'};
  store.upsertStoredDraft(draft,owner);
  assert.equal(store.getStoredDrafts(owner).length,1);assert.equal(store.getStoredDrafts(other).length,0);
  assert.throws(()=>store.upsertStoredDraft(draft,other));
  assert.throws(()=>store.upsertStoredDraft({...draft,status:'approved_for_print'},owner));
 }finally{delete global.window;delete global.sessionStorage;}
});
test('pipeline failures are visible and do not silently imply a saved status',()=>{
 const useStateValues=[[], 'Permission denied', false, '', 'all', 'all'];let index=0;
 const useState=initial=>[index<useStateValues.length?useStateValues[index++]:initial,()=>{}];
 const {default:Pipeline}=loadTs('src/components/crm/LeadPipeline.tsx',{
  react:{...React,useState},'@/lib/crm/leads':{updateLeadStatus:async()=>({success:false,error:'Permission denied'})},
 });
 const element=Pipeline({initialLeads:[]});
 assert.ok(React.Children.toArray(element.props.children).some(child=>child?.props?.role==='alert'&&child.props.children==='Permission denied'));
});
test('session redirects retain refreshed cookies and use the existing property-manager route',async()=>{
 const {NextRequest}=require('next/server');
 const {updateSession}=loadTs('src/lib/supabase/middleware.ts',{
  '@/lib/env':{isSupabaseConfigured:()=>true,env:{supabaseUrl:'https://example.supabase.co',supabaseAnonKey:'public-test-placeholder'}},
  '@supabase/ssr':{createServerClient:(_url,_key,{cookies})=>({
   auth:{getUser:async()=>{cookies.setAll([{name:'sb-refresh-test',value:'refreshed',options:{httpOnly:true,path:'/'}}]);return {data:{user:{id:'user-id'}},error:null};}},
   from:()=>({select:()=>({eq:()=>({single:async()=>({data:{role:'property_manager',status:'active'},error:null})})})}),
  })},
 });
 const response=await updateSession(new NextRequest('http://localhost/login'));
 assert.equal(new URL(response.headers.get('location')).pathname,'/crm/opportunities');
 assert.equal(response.cookies.get('sb-refresh-test').value,'refreshed');
 assert.match(response.headers.get('cache-control'),/no-store/);
});
test('the proxy ignores forged role cookies when backend configuration is absent',async()=>{
 const {NextRequest}=require('next/server');
 const {updateSession}=loadTs('src/lib/supabase/middleware.ts',{'@/lib/env':{isSupabaseConfigured:()=>false,env:{}}});
 const response=await updateSession(new NextRequest('http://localhost/crm/leads',{headers:{cookie:'mslegacy_mock_user=founder'}}));
 assert.equal(new URL(response.headers.get('location')).pathname,'/login');
});
test('project enquiries preserve the full comparison context in the durable lead handoff',async()=>{
 let captured;
 const {submitProjectEnquiry}=loadTs('src/app/actions/projectEnquiries.ts',{'@/app/contact/actions':{submitContactForm:async input=>{captured=input;return {success:true,reference:'saved-reference'};}}});
 const result=await submitProjectEnquiry({fullName:'Test buyer',phone:'1234567890',email:'test@example.com',interestType:'project_comparison',message:'Compare these',projectIds:['project-a','project-b'],cityCountry:'Bengaluru',buyerType:'end_user',budgetRange:'50l_to_1cr'});
 assert.equal(result.reference,'saved-reference');assert.equal(captured.interestType,'project_comparison');
 assert.ok(captured.message.includes('"projectIds":["project-a","project-b"]'));
 assert.equal(captured.city_country,undefined);assert.equal(captured.location,'Bengaluru');
});
test('publishing decisions require an active administrator and cannot fake a save',async()=>{
 const input={projectId:'00000000-0000-4000-8000-000000000001',decision:'keep_internal',decisionNote:'Test',nextAction:'Review'};
 const stubs={'@/lib/auth/getCurrentUserProfile':{getCurrentUserProfile:async()=>({id:'admin-id',role:'sales',status:'active'})}};
 assert.equal((await loadTs('src/app/actions/projectPublishingDecisions.ts',stubs).submitPublishingDecision(input)).success,false);
 let inserted;
 const publishingActions=loadTs('src/app/actions/projectPublishingDecisions.ts',{
  '@/lib/auth/getCurrentUserProfile':{getCurrentUserProfile:async()=>({id:'trusted-admin',fullName:'Test admin',role:'admin',status:'active'})},
  '@/lib/supabase/server':{createClient:async()=>({from:()=>({insert:async row=>{inserted=row;return {error:{message:'table unavailable'}};}})})},
 });
 assert.equal((await publishingActions.submitPublishingDecision(input)).success,false);
 assert.equal(inserted.decided_by,'trusted-admin');
});
