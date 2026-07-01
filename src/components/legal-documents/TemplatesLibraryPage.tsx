"use client";

import React, { useState } from "react";
import Link from "next/link";
import { legalTemplates } from "@/lib/legal-templates";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Compass } from "@/components/ui/Icons";

export default function TemplatesLibraryPage() {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const categories = ["all", "Property Sale", "Construction & Development", "Property Rental & Management", "Business Advisory & Partnerships", "Power of Attorney"];

  const filtered = legalTemplates.filter(t => {
    const matchesSearch = t.templateName.toLowerCase().includes(query.toLowerCase()) || t.category.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCat === "all" || t.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#10291f]">Legal Template Registry</h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse corporate legal draft models. Standard templates are fully approved. Pending templates are undergoing advocate review.
          </p>
        </div>
        <Link href="/crm/legal-documents">
          <Button variant="outline" size="sm" className="font-bold border-slate-200">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 border border-slate-100 rounded shadow-xs">
        <div className="relative max-w-sm w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search templates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C] bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`text-[10px] px-2.5 py-1 rounded font-bold capitalize transition-all ${
                selectedCat === cat
                  ? "bg-[#10291f] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => {
          const isPending = t.legalReviewStatus === "pending_legal_review";

          return (
            <Card key={t.templateId} className="p-6 bg-white border border-slate-100 flex flex-col justify-between h-56" borderAccent={!isPending}>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                    {t.category}
                  </span>
                  
                  {isPending ? (
                    <Badge variant="warning" className="text-[8px] py-0 px-1.5 uppercase font-bold tracking-wider">
                      Pending Review
                    </Badge>
                  ) : (
                    <Badge variant="success" className="text-[8px] py-0 px-1.5 uppercase font-bold tracking-wider">
                      Cleared
                    </Badge>
                  )}
                </div>

                <h3 className="font-serif text-sm font-bold text-[#10291f] leading-snug">
                  {t.templateName}
                </h3>

                <div className="text-[10px] text-slate-500 space-y-1">
                  <div><strong>Jurisdiction:</strong> {t.jurisdiction}</div>
                  <div><strong>Version:</strong> v{t.version}</div>
                  <div className="truncate">
                    <strong>Requires:</strong> {t.requiredFields.map(f => f.split(".").pop()).join(", ")}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between items-center">
                <span className="text-[9px] text-slate-400 italic">
                  {t.clauses.length} Standard Clauses
                </span>
                
                {isPending ? (
                  <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    Locked
                  </span>
                ) : (
                  <Link href={`/crm/legal-documents/new?templateId=${t.templateId}`}>
                    <Button variant="primary" size="sm" className="font-semibold text-[10px] bg-[#10291f] text-white">
                      Draft Agreement →
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
