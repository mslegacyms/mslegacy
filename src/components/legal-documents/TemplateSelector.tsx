import React, { useState } from "react";
import { LegalDocumentTemplate } from "@/lib/types/legalDocuments";
import { legalTemplates } from "@/lib/legal-templates";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Search } from "@/components/ui/Icons";

interface TemplateSelectorProps {
  selectedTemplateId?: string;
  onSelect: (template: LegalDocumentTemplate) => void;
}

export default function TemplateSelector({
  selectedTemplateId,
  onSelect
}: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Property Sale", "Construction & Development", "Property Rental & Management", "Business Advisory & Partnerships", "Power of Attorney"];

  const filteredTemplates = legalTemplates.filter((template) => {
    const matchesSearch = template.templateName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative flex-grow max-w-md w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search agreement templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#8A704C] bg-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] px-2.5 py-1 rounded font-bold capitalize transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#10291f] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.templateId;
          const isPendingReview = template.legalReviewStatus === "pending_legal_review";

          return (
            <Card
              key={template.templateId}
              onClick={() => onSelect(template)}
              borderAccent={isSelected}
              className={`p-5 flex flex-col justify-between h-48 transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? "bg-[#8b6e3a]/5 border-[#8b6e3a] ring-1 ring-[#8b6e3a]/30 shadow-md"
                  : "bg-white hover:border-[#8b6e3a]/40 hover:shadow-sm"
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] text-[#8b6e3a] font-bold uppercase tracking-wider">
                    {template.category}
                  </span>
                  
                  {isPendingReview ? (
                    <Badge variant="warning" className="text-[8px] py-0 px-1.5 uppercase font-black tracking-wider">
                      Pending Review
                    </Badge>
                  ) : (
                    <Badge variant="success" className="text-[8px] py-0 px-1.5 uppercase font-bold tracking-wider">
                      Standard Draft
                    </Badge>
                  )}
                </div>

                <h4 className="font-serif text-sm font-bold text-[#10291f] leading-snug">
                  {template.templateName}
                </h4>
                
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Standard template clauses for {template.templateName} in {template.jurisdiction} jurisdiction.
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-3">
                <span className="text-[10px] text-slate-400 font-semibold">
                  v{template.version}
                </span>
                
                {isPendingReview ? (
                  <span className="text-[10px] text-slate-400 font-bold flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Locked
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8b6e3a] font-bold flex items-center">
                    Select Template →
                  </span>
                )}
              </div>
            </Card>
          );
        })}

        {filteredTemplates.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white border border-dashed border-slate-200 rounded-lg text-slate-500 text-xs">
            No templates found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
