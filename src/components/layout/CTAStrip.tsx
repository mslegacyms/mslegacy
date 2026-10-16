import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CTAStripProps {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  primaryHref?: string;
}

export const CTAStrip = ({
  title = "Initiate Your Real Estate Legacy Today",
  subtitle = "Schedule a private advisory consultation to discuss property acquisitions, custom turnkey construction builds, or eligibility for project partnerships.",
  primaryText = "Request Private Consultation",
  primaryHref = "/contact"
}: CTAStripProps) => {
  return (
    <section className="bg-slate-50 border-t border-b border-slate-100 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10291f] mb-4">
          {title}
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href={primaryHref}>
            <Button variant="primary" size="lg" className="w-full sm:w-auto font-semibold">
              {primaryText}
            </Button>
          </Link>
          <Link href="/property-wealth-score">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn About Wealth Score™
            </Button>
          </Link>
        </div>
        <p className="text-[10px] text-slate-400 mt-6 leading-relaxed">
          *Advisory services are strictly private. All discussions are protected under standard non-disclosure guidelines.
        </p>
      </div>
    </section>
  );
};
