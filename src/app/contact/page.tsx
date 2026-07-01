"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, ShieldCheck } from "@/components/ui/Icons";
import { submitContactForm } from "./actions";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    interestType: "general",
    buyerType: "private_buyer",
    budgetRange: "50l_1c",
    message: ""
  });

  const interestTypes = [
    { value: "land_sourcing", label: "Land Sourcing Division" },
    { value: "construction", label: "Turnkey Construction & PMC" },
    { value: "property_management", label: "Professional Property Management" },
    { value: "legal_due_diligence", label: "Legal Due Diligence & Titles" },
    { value: "project_participation", label: "Project Participation Review" },
    { value: "nri_services", label: "NRI Property Sourcing & Care" },
    { value: "general", label: "General Corporate Consultation" }
  ];

  const buyerTypes = [
    { value: "private_buyer", label: "Private Home Buyer" },
    { value: "hni_investor", label: "HNI / Wealth Builder" },
    { value: "developer", label: "Landowner / Development Partner" },
    { value: "broker", label: "Channel Partner (Broker)" }
  ];

  const budgetRanges = [
    { value: "25l_50l", label: "₹25 Lakhs - ₹50 Lakhs" },
    { value: "50l_1c", label: "₹50 Lakhs - ₹1 Crore" },
    { value: "1c_3c", label: "₹1 Crore - ₹3 Crores" },
    { value: "3c_5c", label: "₹3 Crores - ₹5 Crores" },
    { value: "5c_plus", label: "₹5 Crores+" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f]">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 sm:py-32 relative overflow-hidden bg-luxury-grid border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Private Consultations</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Schedule a Private Consultation
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Connect with our advisory team to review sourcing inventories, turnkey construction briefs, or project participation eligibility.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 sm:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
            {/* Left Info Col */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#10291f]">Advisory Offices</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  MS Legacy Group operates a private corporate advisory layout in Bangalore, Karnataka. Consultations are arranged strictly by appointment.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-sans">
                <div className="flex items-start space-x-3">
                  <Phone size={18} className="text-[#8b6e3a] mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#10291f]">Phone Advisory</span>
                    <span className="font-semibold">+91 (80) 4567-8900</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail size={18} className="text-[#8b6e3a] mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#10291f]">Advisory Desk</span>
                    <span className="font-semibold">advisory@mslegacy.in</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-gold-elegant p-4 rounded text-xs text-slate-500 leading-relaxed font-medium">
                <span className="font-bold text-[#10291f] block mb-1">Corporate Non-Disclosure:</span>
                All advisory client details and property portfolio requests are managed under standard corporate non-disclosure protocols.
              </div>

              {/* Requirements Exchange CTA */}
              <Card className="p-4 bg-[#10291f] text-white border-none space-y-3">
                <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Demand Sourcing</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  Have a specific land, plot, or apartment requirement? Submit it directly to our live Demand Sourcing board.
                </p>
                <Link href="/requirements/post" className="block">
                  <Button className="w-full bg-gold-gradient text-[#10291f] border-none font-bold text-[10px] py-1.5 h-auto">
                    Submit Requirement
                  </Button>
                </Link>
              </Card>
            </div>

            {/* Right Form Col */}
            <div className="lg:col-span-8">
              <Card className="p-8 bg-slate-50 border border-gold-elegant">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {error && (
                      <div className="bg-rose-500/10 text-rose-700 text-xs p-3 rounded font-semibold border border-rose-500/20">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                          placeholder="E.g. Muzzamil Ahmad"
                        />
                      </div>
                      
                      {/* Phone */}
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                          placeholder="E.g. client@example.com"
                        />
                      </div>
                      
                      {/* City/Country */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">City / Country of Residence</label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                          placeholder="E.g. London, UK or Bangalore, India"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Interest Type */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Primary Interest</label>
                        <select
                          value={formData.interestType}
                          onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                          className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                        >
                          {interestTypes.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Buyer Type */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Profile Type</label>
                        <select
                          value={formData.buyerType}
                          onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                          className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                        >
                          {buyerTypes.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Budget Allocation</label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                        >
                          {budgetRanges.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Message / Requirements Description</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]/30"
                        placeholder="E.g. Interested in sourcing residential plots in North Bangalore corridor with clear title clearances..."
                      />
                    </div>

                    <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading} className="bg-gold-gradient text-[#10291f] border-none font-bold">
                      {loading ? "Submitting Inquiry..." : "Submit Consultation Request"}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-6">
                    <div className="p-4 bg-[#8b6e3a]/15 text-[#8b6e3a] rounded-full w-fit mx-auto border border-gold-elegant">
                      <ShieldCheck size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-[#10291f]">Consultation Request Received</h3>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                        Thank you for contacting MS Legacy. Your details have been securely logged. A private wealth advisor will contact you shortly to verify credentials and schedule a private review session.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="border-gold-elegant font-bold text-xs">
                      Submit Another Query
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
