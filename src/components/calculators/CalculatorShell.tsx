import React from "react";
import { CalculatorHero } from "./CalculatorHero";
import { CalculatorDisclaimer } from "./CalculatorDisclaimer";

interface CalculatorShellProps {
  title: string;
  subtitle: string;
  category: string;
  inputs: React.ReactNode;
  results: React.ReactNode;
  explanation?: React.ReactNode;
  actionBar?: React.ReactNode;
}

export const CalculatorShell = ({ title, subtitle, category, inputs, results, explanation, actionBar }: CalculatorShellProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans pb-16">
      <CalculatorHero title={title} subtitle={subtitle} category={category} />
      
      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left - Inputs */}
            <div className="lg:col-span-7 bg-white border border-gold-elegant p-6 rounded-lg space-y-6 shadow-xs">
              {inputs}
            </div>

            {/* Right - Sticky Results Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-6 bg-[#10291f] text-white p-6 rounded-lg space-y-6 border border-[#1d3e30] shadow-md">
              {results}
              {actionBar}
            </div>
          </div>

          {/* Explanation Section */}
          {explanation && (
            <div className="mt-12 bg-white border border-gold-elegant p-8 rounded-lg space-y-4 shadow-xs">
              {explanation}
            </div>
          )}

          {/* Disclaimer */}
          <CalculatorDisclaimer />
        </div>
      </section>
    </div>
  );
};
