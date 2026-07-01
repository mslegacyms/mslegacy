import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export interface GovernmentLink {
  name: string;
  authority: string;
  purpose: string;
  documentsNeeded: string;
  useCase: string;
  url: string;
  caution: string;
  lastChecked: string;
  category: string;
}

interface GovernmentLinkCardProps {
  link: GovernmentLink;
}

export const GovernmentLinkCard = ({ link }: GovernmentLinkCardProps) => {
  return (
    <Card className="p-6 bg-white border border-gold-elegant flex flex-col justify-between h-full font-sans text-xs space-y-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-base font-bold text-[#10291f] leading-snug">{link.name}</h3>
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mt-0.5">{link.authority}</span>
          </div>
          <span className="bg-[#8b6e3a]/10 text-[#8b6e3a] border border-[#8b6e3a]/20 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            {link.category}
          </span>
        </div>

        <p className="text-slate-600 leading-relaxed font-medium">
          <strong>Purpose:</strong> {link.purpose}
        </p>

        <div className="space-y-1.5 text-slate-500 border-t border-slate-100 pt-3">
          <p><strong>Required Details:</strong> {link.documentsNeeded}</p>
          <p><strong>MS Legacy Use Case:</strong> {link.useCase}</p>
        </div>

        <div className="bg-[#10291f]/5 border border-gold-elegant p-3 rounded text-[10px] text-slate-500 leading-relaxed font-medium italic">
          <strong>Caution Note:</strong> {link.caution}
        </div>
      </div>

      <div className="pt-2 flex justify-between items-center border-t border-slate-100">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Checked: {link.lastChecked}</span>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className="bg-[#10291f] text-white text-[10px] font-bold uppercase py-1.5 px-4 h-auto">
            Open Official Portal
          </Button>
        </a>
      </div>
    </Card>
  );
};
