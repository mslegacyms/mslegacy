import React from "react";
import { Badge } from "@/components/ui/Badge";

interface CalculatorHeroProps {
  title: string;
  subtitle: string;
  category: string;
}

export const CalculatorHero = ({ title, subtitle, category }: CalculatorHeroProps) => {
  return (
    <section className="bg-dark-luxury-gradient text-white py-16 relative overflow-hidden bg-luxury-grid border-b border-white/5 text-center">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <Badge variant="gold" className="px-3 border border-gold-elegant">
          {category}
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
