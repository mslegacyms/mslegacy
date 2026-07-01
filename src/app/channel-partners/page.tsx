"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTAStrip } from "@/components/layout/CTAStrip";
import { ShieldCheck } from "@/components/ui/Icons";
import { submitChannelPartnerForm } from "./actions";

export default function ChannelPartnersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    reraId: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await submitChannelPartnerForm(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Submission failed. Please check inputs and try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during partner onboarding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Partner Onboarding Desk</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Join the MS Legacy Channel Partner Network
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Gain authorized access to RERA-registered inventory layouts, institutional sales backing, and transparent referral terms.
          </p>
        </div>
      </section>

      {/* Program details */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-[#10291f] text-center mb-8">
              A Partnership Built on Transparency
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              At MS Legacy, we value our relationship with external real estate brokers and channel partners. We provide our partners with real-time inventory updates, RERA-approved layout kits, and clear client-registration tracking to prevent disputes.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-slate-50 py-20 sm:py-24 border-t border-b border-slate-100 bg-luxury-grid">
        <div className="max-w-xl mx-auto px-6">
          <Card className="p-8 bg-white border border-gold-elegant shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#10291f] text-center mb-4">Partner Onboarding Intake</h3>
                
                {error && (
                  <div className="bg-rose-500/10 text-rose-700 text-xs p-3 rounded font-semibold border border-rose-500/20">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Broker Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                    placeholder="E.g. Rajesh Kumar"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Agency / Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                    placeholder="E.g. Apex Realty Bangalore"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                      placeholder="E.g. +91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                      placeholder="E.g. partner@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">RERA Registration ID (Mandatory)</label>
                  <input
                    type="text"
                    required
                    value={formData.reraId}
                    onChange={(e) => setFormData({ ...formData, reraId: e.target.value })}
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                    placeholder="E.g. PRM/KA/RERA/1251/..."
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading} className="bg-gold-gradient text-[#10291f] border-none font-bold">
                  {loading ? "Submitting Partner Request..." : "Submit Onboarding Request"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="p-4 bg-[#8b6e3a]/15 text-[#8b6e3a] rounded-full w-fit mx-auto border border-gold-elegant">
                  <ShieldCheck size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#10291f]">Onboarding Request Logged</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Your agency information has been received. Our partner relations team will verify your RERA registration card and contact you within 24 business hours to set up your referral dashboard.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="border-gold-elegant font-bold text-xs">
                  Modify Onboarding Form
                </Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
}
