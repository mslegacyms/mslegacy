"use client";
import { useState } from "react";
import Link from "next/link";
import { authenticateUser } from "./actions";
import { PublicIntro } from "@/components/public/PublicComponents";
import { isSupabaseConfigured } from "@/lib/env";
export default function LoginPage() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const configured = isSupabaseConfigured();
  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    setLoading(true);
    setError("");
    try {
      const result = await authenticateUser(email, password);
      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        setError(
          result.error ||
            "Sign-in was not completed. Please contact the team for help.",
        );
      }
    } catch {
      setError(
        "Sign-in is unavailable. Please try again later or contact the team.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <PublicIntro
        eyebrow="Existing account access"
        title="Client & team sign-in"
        description="Use the account details provided by the team. Contact us if you need help with access."
      />
      <section className="site-section">
        <div className="site-container site-enquiry-wrap">
          {configured ? (
            <div className="site-enquiry-card">
              <h2>Sign in</h2>
              <form className="site-enquiry-form" onSubmit={signIn}>
                <div>
                  <label htmlFor="login-email">Email address</label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                {error && (
                  <p role="alert" className="site-form-error">
                    {error}
                  </p>
                )}
                <button
                  className="site-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>
            </div>
          ) : (
            <div className="site-note">
              <h2>Online account access is unavailable.</h2>
              <p>
                Please contact MS LEGACY about your property or an existing
                engagement.
              </p>
            </div>
          )}
          <Link className="site-text-link" href="/contact">
            Contact the team →
          </Link>
        </div>
      </section>
    </>
  );
}
