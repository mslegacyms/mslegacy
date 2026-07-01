"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockNewsUpdates } from "@/lib/data/mockNewsUpdates";
import { ShieldCheck, Search, ArrowRight, ExternalLink } from "@/components/ui/Icons";

const CATEGORIES = [
  "All Updates",
  "Government Norms",
  "RERA Updates",
  "Land Records & Registration",
  "Planning & Approval News",
  "Property Market News",
  "Infrastructure Updates",
  "MS Legacy Advisory Notes"
];

export default function NewsHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Updates");

  const filteredNews = mockNewsUpdates.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === "All Updates" || item.category === activeCategory;

    return matchesSearch && matchesCategory && item.isPublished;
  });

  const featuredArticle = mockNewsUpdates.find((item) => item.isFeatured && item.isPublished) || mockNewsUpdates[0];

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
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans pb-16">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-20 relative overflow-hidden bg-luxury-grid border-b border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Advisory Insights Hub</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Property News & Government Norms Updates
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Track important real estate updates, government circulars, RERA changes, approval norms, land record updates, and property market insights with MS Legacy’s documentation-first advisory view.
          </p>
        </div>
      </section>

      {/* Featured Update Banner */}
      {featuredArticle && activeCategory === "All Updates" && searchQuery === "" && (
        <section className="max-w-7xl mx-auto px-6 pt-12 w-full">
          <Card className="bg-[#10291f] border-none text-white p-8 sm:p-10 rounded-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 max-w-3xl z-10">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold" className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">Featured Update</Badge>
                {getVerificationBadge(featuredArticle.verificationStatus)}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-semibold uppercase tracking-wider pt-2">
                <span>Source: {featuredArticle.sourceName}</span>
                <span>•</span>
                <span>Date: {featuredArticle.publishedDate}</span>
              </div>
            </div>

            <div className="pt-8 z-10">
              <Link href={`/news/${featuredArticle.slug}`}>
                <Button className="bg-gold-gradient text-[#10291f] font-bold text-xs uppercase tracking-wider px-6 py-3 border-none">
                  Read Detailed Advisory Report ➔
                </Button>
              </Link>
            </div>
            
            {/* Background absolute graphic */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-12 translate-x-12">
              <ShieldCheck size={300} className="text-[#8b6e3a]" />
            </div>
          </Card>
        </section>
      )}

      {/* Filter and Search Bar Control */}
      <section className="max-w-7xl mx-auto px-6 pt-12 w-full space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 border-b border-slate-200 pb-4">
          {/* Categories Horizontal Scroller */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-[#10291f] text-white border-[#10291f]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <input
              type="text"
              placeholder="Search news, tags, rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:border-gold-elegant"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-6 w-full flex-grow">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Card key={article.id} className="p-6 bg-white border border-[#d9c79f]/50 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <Badge variant="gold" className="bg-[#8b6e3a]/10 text-[#8b6e3a] border border-[#8b6e3a]/20 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {article.category}
                    </Badge>
                    {getVerificationBadge(article.verificationStatus)}
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#10291f] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((t) => (
                      <span key={t} className="text-[9px] bg-slate-100 text-slate-500 font-semibold px-1.5 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[10px] text-slate-400 font-semibold">
                    <div className="flex justify-between">
                      <span>Affected:</span>
                      <span className="text-slate-600">{article.affectedAudience.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Source:</span>
                      <span className="text-slate-600 max-w-[150px] truncate">{article.sourceName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link href={`/news/${article.slug}`}>
                    <Button className="w-full text-xs font-bold uppercase py-2.5 bg-[#10291f] text-white hover:bg-[#183d2e] tracking-wider border-none flex items-center justify-center">
                      Read Advisory Report <ArrowRight size={12} className="ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-[#d9c79f]/50 rounded-lg space-y-2">
            <p className="font-serif text-lg font-bold text-[#10291f]">No matching updates found</p>
            <p className="text-xs text-slate-400 font-medium">Try modifying your search queries or selecting another categories tab.</p>
          </div>
        )}
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
