import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { submitProjectEnquiry } from "@/app/actions/projectEnquiries";

interface CalculatorActionBarProps {
  calculatorName: string;
  summaryMarkdown: string;
  onCopy?: () => void;
  onPrint?: () => void;
}

export const CalculatorActionBar = ({ calculatorName, summaryMarkdown, onCopy, onPrint }: CalculatorActionBarProps) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: `Requesting advisory review of my ${calculatorName} calculation summary. Details copied below.`
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy();
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const fullMessage = `${leadForm.message}\n\n=== Calculation Summary ===\n${summaryMarkdown}`;
      const res = await submitProjectEnquiry({
        fullName: leadForm.fullName,
        phone: leadForm.phone,
        email: leadForm.email,
        interestType: "general_advisory",
        message: fullMessage
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          setSuccess(false);
        }, 3000);
      } else {
        setError(res.error || "Failed to submit request.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected system error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 mt-6 font-sans">
      <Button 
        onClick={handleCopy} 
        variant="outline" 
        className="flex-1 text-xs font-bold uppercase tracking-wider py-2.5 border-slate-200 text-[#10291f] hover:bg-slate-50"
      >
        {copied ? "✓ Copied to Clipboard" : "📋 Copy Summary"}
      </Button>

      <Button 
        onClick={handlePrint} 
        variant="outline" 
        className="flex-1 text-xs font-bold uppercase tracking-wider py-2.5 border-slate-200 text-[#10291f] hover:bg-slate-50"
      >
        🖨️ Print Report
      </Button>

      <Button 
        onClick={() => setShowModal(true)} 
        className="flex-1 text-xs font-bold uppercase tracking-wider py-2.5 bg-[#10291f] text-white hover:bg-[#183d2e]"
      >
        💼 Request Advisor Review
      </Button>

      {/* Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <Card className="p-8 bg-white border border-gold-elegant max-w-md w-full space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#10291f] text-xl font-sans"
            >
              ×
            </button>
            <div className="space-y-1 text-center">
              <Badge variant="gold" className="bg-[#8b6e3a]/20 text-[#8b6e3a] border border-[#8b6e3a]/30 uppercase text-[9px] font-bold">
                Review Intake
              </Badge>
              <h3 className="font-serif text-xl font-bold text-[#10291f]">
                Request Advisory Review
              </h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Connect with an MS Legacy advisor to review your {calculatorName} inputs and confirm statutory compliance.
              </p>
            </div>

            {error && (
              <div className="bg-rose-500/10 text-rose-700 text-xs p-3 rounded font-semibold border border-rose-500/20">
                {error}
              </div>
            )}

            {success ? (
              <div className="bg-emerald-500/10 text-emerald-700 text-xs p-4 rounded font-bold border border-emerald-500/20 text-center uppercase tracking-wider">
                ✓ Advisory Request Logged. A consultant will review your inputs.
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4 text-xs font-sans text-left">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-medium focus:outline-none focus:border-gold-elegant"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-medium focus:outline-none focus:border-gold-elegant"
                    placeholder="Enter phone with country code"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-medium focus:outline-none focus:border-gold-elegant"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#10291f] text-white py-2.5 font-bold uppercase tracking-wider text-xs"
                  >
                    {loading ? "Registering Request..." : "Submit for Advisor Review"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
