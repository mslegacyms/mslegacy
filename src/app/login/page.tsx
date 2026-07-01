"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "@/components/ui/Icons";
import { authenticateUser } from "./actions";
import { type UserRole } from "@/lib/auth/roles";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("founder");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Determine if Supabase keys are configured based on client-exposed env variable
  const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authenticateUser(
        email, 
        password, 
        isSupabaseConfigured ? undefined : selectedRole
      );

      if (!result.success) {
        setError(result.error || "Authentication failed.");
      } else if (result.redirectUrl) {
        // Force reload/redirect to dashboard so middleware catches cookie updates
        window.location.href = result.redirectUrl;
      }
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <img src="/brand/mslegacy-logo.svg" alt="MS Legacy Logo" className="h-12 w-auto object-contain mx-auto" />
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Private Client & Team Portal
          </p>
        </div>

        <Card className="p-8 bg-white shadow-md border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Supabase Status Alert */}
            {!isSupabaseConfigured ? (
              <div className="bg-amber-500/5 text-amber-800 text-[11px] p-4 rounded border border-amber-500/20 leading-relaxed space-y-2">
                <span className="font-bold block text-amber-900">Database Sync Status: MOCK SIMULATOR</span>
                <p>
                  Supabase URL variables are missing from your environment. Running in simulation mode. Choose a test role below to verify RLS configurations and middleware route protections:
                </p>
              </div>
            ) : (
              <div className="bg-emerald-500/5 text-emerald-800 text-[11px] p-3 rounded border border-emerald-500/20 leading-relaxed">
                <span className="font-bold block text-emerald-950">Database Sync Status: CONNECTED</span>
                <p>Enter your database email and password to log in.</p>
              </div>
            )}

            {error && (
              <div className="bg-rose-500/10 text-rose-700 text-xs p-3 rounded font-semibold border border-rose-500/20">
                {error}
              </div>
            )}

            {/* Email (Hidden or shown depending on mode, but required for schema) */}
            {isSupabaseConfigured ? (
              <>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Registered Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]"
                    placeholder="E.g. admin@mslegacy.in"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded px-3 py-2 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]"
                    placeholder="••••••••"
                  />
                </div>
              </>
            ) : (
              /* Simulation Role Selection */
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Simulation Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-3 py-2.5 text-[#10291f] focus:outline-none focus:ring-2 focus:ring-[#8b6e3a]"
                >
                  <option value="founder">SuperAdmin / Founder</option>
                  <option value="sales">Sales Manager</option>
                  <option value="legal">Legal & Title Officer</option>
                  <option value="property_manager">Property Care Manager</option>
                  <option value="channel_partner">Registered Channel Partner</option>
                  <option value="client">Private Client</option>
                </select>
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
              {loading ? "Authenticating session..." : isSupabaseConfigured ? "Authenticate Login" : "Launch Simulator"}
            </Button>
          </form>
        </Card>

        {/* Security stamp */}
        <p className="text-center text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
          *Access to this portal is restricted to active team managers and registered private investors. Unauthorized access attempts are monitored and logged.
        </p>
      </div>
    </div>
  );
}
