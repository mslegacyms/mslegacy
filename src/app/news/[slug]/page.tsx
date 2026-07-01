"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockNewsUpdates } from "@/lib/data/mockNewsUpdates";
import { ShieldCheck, ArrowLeft, ExternalLink, Copy, Check } from "@/components/ui/Icons";

export default function NewsArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  const article = mockNewsUpdates.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Advisory Report Not Found</h2>
        <p className="text-xs text-slate-500 max-w-md">The requested property news or government norms update slug does not match our current directories.</p>
        <Link href="/news">
          <Button className="bg-[#10291f] text-white text-xs font-bold uppercase">Back to Insights Hub</Button>
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "official_source":
        return <Badge variant="success" className="text-[9px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold">✓ Official Source Verified</Badge>;
      case "verified_summary":
        return <Badge variant="gold" className="text-[9px] bg-[#8b6e3a]/10 text-[#8b6e3a] border border-[#8b6e3a]/20 font-bold">✓ Verified Summary</Badge>;
      case "advisory_note":
        return <Badge variant="primary" className="text-[9px] bg-blue-500/10 text-blue-600 border border-blue-500/20 font-bold">💡 Advisory Explainer</Badge>;
      default:
        return <Badge variant="neutral" className="text-[9px] bg-slate-500/10 text-slate-600 border border-slate-500/20 font-bold">Verification Pending</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans pb-20">
      {/* Hero Header */}
      <section className="bg-dark-luxury-gradient text-white py-16 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <Link href="/news" className="inline-flex items-center text-xs text-slate-300 font-semibold hover:text-[#8b6e3a] transition-colors mb-2">
            <ArrowLeft size={12} className="mr-1.5" /> Back to Insights Hub
          </Link>
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" className="bg-[#8b6e3a]/20 text-[#d9c79f] border border-[#d9c79f]/30 text-[9px] uppercase tracking-wider font-bold">
              {article.category}
            </Badge>
            {getVerificationBadge(article.verificationStatus)}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider pt-2 border-t border-white/10 mt-4">
            <span>Jurisdiction: {article.jurisdiction}</span>
            <span>•</span>
            <span>Published: {article.publishedDate}</span>
            <span>•</span>
            <span>Last Checked: {article.lastCheckedDate}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-4xl mx-auto px-6 pt-10 grid grid-cols-1 gap-8 w-full">
        
        {/* Verification Summary Card */}
        <Card className="p-6 bg-white border border-[#d9c79f]/60 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="text-emerald-600" size={18} />
              <span className="font-sans text-xs font-bold text-[#10291f] uppercase tracking-wider">Advisory Summary & Compliance Vetting</span>
            </div>
            
            <button 
              onClick={handleCopyLink}
              className="inline-flex items-center text-[10px] font-bold text-slate-500 hover:text-[#10291f] transition-colors border border-slate-200 rounded px-2 py-1 bg-slate-50"
            >
              {copied ? (
                <>
                  <Check size={10} className="mr-1 text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={10} className="mr-1" /> Copy Link
                </>
              )}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {article.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">What Changed / Core Update</span>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {article.excerpt}
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Affected Audience</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {article.affectedAudience.map((aud) => (
                  <span key={aud} className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded border">
                    {aud}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Source citation */}
        {article.sourceUrl && (
          <div className="bg-slate-100/80 border border-slate-200 p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Official Document Reference</span>
              <p className="font-bold text-[#10291f]">{article.sourceName}</p>
            </div>
            <a 
              href={article.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#10291f] text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded hover:bg-[#183d2e] transition-colors"
            >
              Access Official Source <ExternalLink size={10} className="ml-1.5" />
            </a>
          </div>
        )}

        {/* MS Legacy Advisory Insights Block */}
        <div className="bg-[#10291f] text-white p-6 rounded-lg border border-gold-elegant space-y-4 relative overflow-hidden">
          <div className="z-10 relative space-y-3">
            <span className="text-[9px] text-[#d9c79f] uppercase tracking-widest font-bold block">MS Legacy Sourcing Advisory Note</span>
            <p className="text-xs sm:text-sm leading-relaxed font-medium text-slate-200">
              {article.msLegacyAdvisoryNote}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-y-6 translate-x-6">
            <ShieldCheck size={180} className="text-white" />
          </div>
        </div>

        {/* Action checklist */}
        {article.actionRequired && (
          <Card className="p-6 bg-amber-50/50 border border-amber-200 rounded space-y-3">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">Suggested Buyer Actions</span>
            <div className="text-xs text-amber-900 leading-relaxed font-semibold">
              {article.actionRequired}
            </div>
          </Card>
        )}

        {/* Related calculators and links split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Related Tools */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">Related Planning Tools</h4>
            {article.relatedCalculators.length > 0 ? (
              <div className="space-y-2">
                {article.relatedCalculators.map((calc, idx) => (
                  <Link key={idx} href={calc.url} className="block p-3 bg-white border rounded hover:border-[#8b6e3a] transition-all">
                    <span className="text-xs font-bold text-[#10291f] flex justify-between items-center">
                      {calc.label} ➔
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <span className="text-xs text-slate-400">No specific calculator tools linked to this topic.</span>
            )}
          </div>

          {/* Related Government Portals */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">Related Government Links</h4>
            {article.relatedGovernmentLinks.length > 0 ? (
              <div className="space-y-2">
                {article.relatedGovernmentLinks.map((gov, idx) => (
                  <Link key={idx} href={gov.url} className="block p-3 bg-white border rounded hover:border-[#8b6e3a] transition-all">
                    <span className="text-xs font-bold text-[#10291f] flex justify-between items-center">
                      {gov.label} ➔
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <span className="text-xs text-slate-400">No specific government references linked to this topic.</span>
            )}
          </div>

        </div>

      </section>

      {/* Advisory Warnings Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pt-16 text-center">
        <div className="bg-white border border-gold-elegant p-6 rounded-lg text-[10px] text-slate-400 leading-relaxed space-y-2 shadow-xs">
          <span className="font-bold text-[#10291f] uppercase tracking-wide block">Regulatory Notice & Disclaimer</span>
          <p>
            News and government update summaries are provided for advisory education only. Government rules, circulars, charges, forms, and procedures may change. Always verify with the official department, developer, RERA records, and independent legal advisors before making any property decision. MS Legacy does not provide formal legal opinions or guaranteed transaction reviews.
          </p>
        </div>
      </section>
    </div>
  );
}
