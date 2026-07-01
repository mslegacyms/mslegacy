import React from "react";
import Link from "next/link";
import { Mail, Phone, Globe } from "@/components/ui/Icons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#10291f] text-slate-300 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-block rounded-xl bg-white border border-[#d9c79f]/60 shadow-xs px-3 py-1.5 transition-transform hover:scale-102">
              <img src="/brand/mslegacy-logo.svg" alt="MS Legacy Logo" className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              India's premier integrated real estate wealth creation and asset management platform. We protect, construct, manage, and scale your real estate assets under one trusted ecosystem.
            </p>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#8b6e3a]" />
                <span>+91 (80) 4567-8900 (Advisory)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#8b6e3a]" />
                <span>advisory@mslegacy.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-[#8b6e3a]" />
                <span>www.mslegacy.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6 border-l-2 border-[#8b6e3a] pl-3">
              Corporate Portfolio
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#8b6e3a] transition-colors">
                  About the Platform
                </Link>
              </li>
              <li>
                <Link href="/property-wealth-score" className="hover:text-[#8b6e3a] transition-colors">
                  Property Wealth Score™
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-[#8b6e3a] transition-colors">
                  Investment Opportunities
                </Link>
              </li>
              <li>
                <Link href="/project-participation" className="hover:text-[#8b6e3a] transition-colors">
                  Project Participation
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#8b6e3a] transition-colors">
                  Resources Directory
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-[#8b6e3a] transition-colors font-semibold">
                  Property Calculators Suite
                </Link>
              </li>
              <li>
                <Link href="/requirements" className="hover:text-[#8b6e3a] transition-colors font-semibold">
                  Property Sourcing Exchange
                </Link>
              </li>
              <li>
                <Link href="/government-links" className="hover:text-[#8b6e3a] transition-colors">
                  Govt Property Links
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8b6e3a] transition-colors">
                  Schedule Advisory Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6 border-l-2 border-[#8b6e3a] pl-3">
              Integrated Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services/land-sourcing" className="hover:text-[#8b6e3a] transition-colors">
                  Land Sourcing Division
                </Link>
              </li>
              <li>
                <Link href="/services/turnkey-construction" className="hover:text-[#8b6e3a] transition-colors">
                  Turnkey Construction & PMC
                </Link>
              </li>
              <li>
                <Link href="/services/property-management" className="hover:text-[#8b6e3a] transition-colors">
                  Professional Property Management
                </Link>
              </li>
              <li>
                <Link href="/services/legal-due-diligence" className="hover:text-[#8b6e3a] transition-colors">
                  Legal Due Diligence & Titles
                </Link>
              </li>
              <li>
                <Link href="/channel-partners" className="hover:text-[#8b6e3a] transition-colors">
                  Channel Partner Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Compliance Mini-card */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6 border-l-2 border-[#8b6e3a] pl-3">
              Corporate Governance
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              MS Legacy strictly operates in compliance with RERA guidelines. All gated layouts and residential constructions conform to state municipal authorizations. Client data and KYC details are processed under strict privacy mandates.
            </p>
            <div className="bg-[#121E3E] border border-slate-800 p-4 rounded text-[11px] text-slate-400">
              <span className="font-semibold text-white block mb-1">RERA Karnataka Reference:</span>
              MS Legacy Partner Network registration is under active RERA license compliance protocols.
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Section */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-4">
          <p>
            <strong>Regulatory Disclaimer & Legal Disclosure:</strong> Project participation opportunities, land banking, and structured development partnerships advertised on this platform are offered exclusively on a private selection basis. They do not constitute public offerings of securities, collective investment schemes (CIS), or mutual funds under the regulations of the Securities and Exchange Board of India (SEBI). MS Legacy does not guarantee returns, future asset appreciation, exit horizons, or specific financial outcomes.
          </p>
          <p>
            Real estate assets involve inherent market fluctuations, municipal approval processes, construction timelines, and regulatory policies. Users are required to perform independent legal and financial due diligence before entering into any private project agreement. Access to opportunities is subject to eligibility-based reviews, customer KYC validation, and formal project documentation.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            © {currentYear} MS Legacy Group. All Rights Reserved. Designed for Private Wealth Preservation.
          </div>
          <div className="flex space-x-6">
            <Link href="/resources" className="hover:underline">Privacy Policy</Link>
            <Link href="/resources" className="hover:underline">Terms of Use</Link>
            <Link href="/project-disclaimer" className="hover:underline">Disclaimers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
