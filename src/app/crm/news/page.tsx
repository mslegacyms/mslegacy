"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockNewsUpdates as initialNewsUpdates } from "@/lib/data/mockNewsUpdates";
import { NewsUpdateItem, NewsVerificationStatus, NewsJurisdiction, AffectedAudience } from "@/lib/types/news";

export default function CrmNewsDashboardPage() {
  const [newsList, setNewsList] = useState<NewsUpdateItem[]>(initialNewsUpdates);
  const [editingItem, setEditingItem] = useState<NewsUpdateItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Government Norms");
  const [excerpt, setExcerpt] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<NewsVerificationStatus>("official_source");
  const [jurisdiction, setJurisdiction] = useState<NewsJurisdiction>("Karnataka");
  const [msLegacyAdvisoryNote, setMsLegacyAdvisoryNote] = useState("");
  const [actionRequired, setActionRequired] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const resetForm = () => {
    setTitle("");
    setCategory("Government Norms");
    setExcerpt("");
    setSummary("");
    setSourceName("");
    setSourceUrl("");
    setVerificationStatus("official_source");
    setJurisdiction("Karnataka");
    setMsLegacyAdvisoryNote("");
    setActionRequired("");
    setIsPublished(true);
    setIsFeatured(false);
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleEdit = (item: NewsUpdateItem) => {
    setEditingItem(item);
    setIsAddingNew(false);
    setTitle(item.title);
    setCategory(item.category);
    setExcerpt(item.excerpt);
    setSummary(item.summary);
    setSourceName(item.sourceName);
    setSourceUrl(item.sourceUrl);
    setVerificationStatus(item.verificationStatus);
    setJurisdiction(item.jurisdiction);
    setMsLegacyAdvisoryNote(item.msLegacyAdvisoryNote);
    setActionRequired(item.actionRequired);
    setIsPublished(item.isPublished);
    setIsFeatured(item.isFeatured);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      // Edit mode
      const updatedList = newsList.map((n) => {
        if (n.id === editingItem.id) {
          return {
            ...n,
            title,
            category,
            excerpt,
            summary,
            sourceName,
            sourceUrl,
            verificationStatus,
            jurisdiction,
            msLegacyAdvisoryNote,
            actionRequired,
            isPublished,
            isFeatured,
            updatedAt: new Date().toISOString()
          };
        }
        return n;
      });
      setNewsList(updatedList);
    } else {
      // Add mode
      const newItem: NewsUpdateItem = {
        id: `news_${Date.now()}`,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        excerpt,
        category,
        tags: ["Manual Update"],
        sourceName,
        sourceUrl,
        officialSource: true,
        publishedDate: new Date().toISOString().split("T")[0],
        lastCheckedDate: new Date().toISOString().split("T")[0],
        verificationStatus,
        jurisdiction,
        affectedAudience: ["Buyers"],
        summary,
        msLegacyAdvisoryNote,
        actionRequired,
        relatedLinks: [],
        relatedCalculators: [],
        relatedGovernmentLinks: [],
        isFeatured,
        isPublished,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNewsList([newItem, ...newsList]);
    }
    resetForm();
  };

  const handleTogglePublish = (id: string) => {
    const updatedList = newsList.map((n) => {
      if (n.id === id) {
        return { ...n, isPublished: !n.isPublished };
      }
      return n;
    });
    setNewsList(updatedList);
  };

  return (
    <div className="space-y-6 font-sans text-xs text-[#10291f]">
      <div>
        <h2 className="font-sans text-2xl font-bold text-[#10291f]">CRM News & Sourcing Advisory Management</h2>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Founders & Compliance Desk Panel</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Listing */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 bg-white border border-slate-100 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="font-sans text-sm font-bold text-[#10291f]">Active Advisory Notes ({newsList.length})</span>
              <Button 
                onClick={() => { resetForm(); setIsAddingNew(true); }}
                className="bg-[#10291f] text-white font-bold text-[10px] uppercase py-2 border-none"
              >
                Add News Item +
              </Button>
            </div>

            <div className="space-y-3">
              {newsList.map((news) => (
                <div key={news.id} className="p-3 bg-slate-50 border border-slate-100 rounded flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="gold" className="text-[8px] px-1.5 py-0.5">{news.category}</Badge>
                      <Badge variant={news.isPublished ? "success" : "neutral"} className="text-[8px] px-1.5 py-0.5">
                        {news.isPublished ? "Published" : "Draft"}
                      </Badge>
                      {news.isFeatured && <Badge variant="primary" className="text-[8px] px-1.5 py-0.5 bg-blue-500/10 text-blue-700">Featured</Badge>}
                    </div>

                    <h4 className="font-sans text-xs font-bold text-[#10291f]">{news.title}</h4>
                    <p className="text-[10px] text-slate-400 max-w-md truncate">{news.excerpt}</p>
                    <div className="text-[9px] text-slate-400 font-semibold uppercase">
                      Source: {news.sourceName} | Last checked: {news.lastCheckedDate}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(news)}
                      className="text-[#8b6e3a] hover:underline font-bold text-[10px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleTogglePublish(news.id)}
                      className="text-slate-500 hover:underline font-bold text-[10px]"
                    >
                      {news.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Side: Edit/Add Form */}
        <div className="lg:col-span-5">
          {(isAddingNew || editingItem) ? (
            <Card className="p-6 bg-white border border-gold-elegant space-y-4">
              <span className="font-sans text-sm font-bold text-[#10291f] border-b pb-2 block">
                {editingItem ? "Edit Advisory Article" : "Create New Advisory Article"}
              </span>

              <form onSubmit={handleSave} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold"
                    >
                      <option value="Government Norms">Government Norms</option>
                      <option value="RERA Updates">RERA Updates</option>
                      <option value="Land Records & Registration">Land Records & Reg</option>
                      <option value="Planning & Approval News">Planning & Approvals</option>
                      <option value="Property Market News">Property Market</option>
                      <option value="Infrastructure Updates">Infrastructure</option>
                      <option value="MS Legacy Advisory Notes">MS Legacy Notes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Jurisdiction</label>
                    <select
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value as NewsJurisdiction)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="BDA">BDA</option>
                      <option value="BMRDA">BMRDA</option>
                      <option value="GBA_BBMP">BBMP</option>
                      <option value="Gram_Panchayat">Gram Panchayat</option>
                      <option value="DTCP">DTCP</option>
                      <option value="RERA">RERA</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Article Excerpt (Brief)</label>
                  <input
                    type="text"
                    required
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Summary (Markdown)</label>
                  <textarea
                    required
                    rows={4}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Source Name</label>
                    <input
                      type="text"
                      required
                      value={sourceName}
                      onChange={(e) => setSourceName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Source URL</label>
                    <input
                      type="text"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Verification Status</label>
                    <select
                      value={verificationStatus}
                      onChange={(e) => setVerificationStatus(e.target.value as NewsVerificationStatus)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold"
                    >
                      <option value="official_source">Official Source Verified</option>
                      <option value="verified_summary">Verified Summary</option>
                      <option value="advisory_note">Advisory Explainer</option>
                      <option value="pending_verification">Pending Vetting</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <label className="flex items-center space-x-1.5 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="accent-[#8b6e3a] cursor-pointer"
                      />
                      <span>Published</span>
                    </label>
                    <label className="flex items-center space-x-1.5 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="accent-[#8b6e3a] cursor-pointer"
                      />
                      <span>Featured</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">MS Legacy Advisory Note</label>
                  <textarea
                    rows={3}
                    value={msLegacyAdvisoryNote}
                    onChange={(e) => setMsLegacyAdvisoryNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Action Required Checklist</label>
                  <input
                    type="text"
                    value={actionRequired}
                    onChange={(e) => setActionRequired(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button type="submit" className="flex-1 bg-[#10291f] text-white text-[10px] uppercase font-bold py-2 border-none">
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    onClick={resetForm}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] uppercase font-bold py-2 border-none"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="p-6 bg-slate-50 border border-dashed border-slate-200 text-center py-16 space-y-1.5">
              <span className="font-sans text-sm font-bold text-slate-500">No Article Selected</span>
              <p className="text-[10px] text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                Select an article to edit its parameters or click "Add News Item" to publish a new advisory note.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

