const { test } = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTs } = require('./load-ts.cjs');

test('public comparison handoff keeps distinct property references and rejects malformed references', () => {
  const { enquiryContext } = loadTs('src/lib/enquiryPresentation.ts');
  const { mockDeveloperProjects } = loadTs('src/lib/data/mockDeveloperProjects.ts');
  const project = mockDeveloperProjects[0];
  const context = enquiryContext({ project: project.slug, ids: `${project.id},property-b,<script>,property-c,property-d`, interestType: 'project_comparison', message: 'Compare the selected properties' });
  assert.deepEqual(context.selectedProjects.map(item => item.id), [project.id, 'property-b', 'property-c']);
  assert.equal(context.initialInterestType, 'project_comparison');
  assert.equal(context.initialMessage, 'Compare the selected properties');
});

test('reviewed public enquiry remains a draft and carries every selected property into messaging links', () => {
  let index = 0;
  const values = ['Test Buyer', 'phone', '+919999999999', 'project_comparison', 'Bengaluru', 'Review scope', '<img src=x onerror=alert(1)>', true, '', ''];
  const { ProjectEnquiryForm } = loadTs('src/components/projects/ProjectEnquiryForm.tsx', {
    react: { ...React, useState: initial => [index < values.length ? values[index++] : initial, () => {}], useEffect: () => {}, useId: () => 'test', useRef: () => ({ current: null }) },
    'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  });
  const html = renderToStaticMarkup(ProjectEnquiryForm({ selectedProjects: [{ id: 'property-a', name: 'Property A' }, { id: 'property-b', name: 'Property B' }] }));
  assert.match(html, /Nothing has been sent/);
  assert.match(html, /reference: property-a/);
  assert.match(html, /reference: property-b/);
  const emailHref = html.match(/href="(mailto:[^"]+)"/)[1];
  assert.ok(decodeURIComponent(emailHref).includes('Property A (reference: property-a)'));
  assert.ok(decodeURIComponent(emailHref).includes('Property B (reference: property-b)'));
  assert.ok(!html.includes('<img'));
});

test('sitemap uses the public catalog and excludes private records and enquiry pages', async () => {
  const { default: sitemap } = loadTs('src/app/sitemap.ts', {
    '@/lib/publicSite': { publicSite: { url: 'https://example.test' } },
    '@/lib/developers/projects': { getProjects: async () => [{ slug: 'published', publicVisibility: 'published' }, { slug: 'research', publicVisibility: 'public_information' }, { slug: 'private', publicVisibility: 'internal_only' }] },
    '@/lib/developers/developers': { getDevelopers: async () => [{ slug: 'active', status: 'active' }, { slug: 'inactive', status: 'inactive' }] },
    '@/lib/data/mockNewsUpdates': { mockNewsUpdates: [] },
  });
  const entries = await sitemap();
  const urls = entries.map(item => item.url);
  assert.ok(urls.includes('https://example.test/projects/published'));
  assert.ok(urls.includes('https://example.test/projects/research'));
  assert.ok(!urls.includes('https://example.test/projects/private'));
  assert.ok(!urls.includes('https://example.test/developers/inactive'));
  assert.ok(!urls.some(url => /\/(crm|client|partner|requirements|project-enquiry)(\/|$)/.test(url)));
});
