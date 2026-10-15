"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { isSupabaseConfigured } from "@/lib/env";
import { authenticateUser } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const result = await authenticateUser(email, password);
      if (result.success && result.redirectUrl) window.location.assign(result.redirectUrl);
      else setError(result.error || "Sign-in failed. Please try again.");
    } catch { setError("Sign-in is temporarily unavailable. Please try again."); }
    finally { setLoading(false); }
  }
  return <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
    <Card className="max-w-md w-full p-8 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-[#10291f]">Private portal sign-in</h1>
      {!configured ? <p role="status" className="text-sm text-slate-700">Secure sign-in is temporarily unavailable. Please contact MS LEGACY for assistance.</p> :
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label htmlFor="login-email" className="block text-sm font-semibold mb-2">Registered email</label>
            <input id="login-email" name="email" type="email" autoComplete="username" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded border border-slate-300 p-3" /></div>
          <div><label htmlFor="login-password" className="block text-sm font-semibold mb-2">Password</label>
            <input id="login-password" name="password" type="password" autoComplete="current-password" required maxLength={1024} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded border border-slate-300 p-3" /></div>
          {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
          <Button type="submit" disabled={loading} fullWidth>{loading ? "Signing in…" : "Sign in"}</Button>
        </form>}
    </Card>
  </section>;
}
