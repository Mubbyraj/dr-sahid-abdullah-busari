"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "If an account exists for this email, a password reset link has been sent."
    );

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
            Administration
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white">
            Reset Password
          </h1>

          <p className="mt-3 text-slate-400">
            Enter your administrative email and we&apos;ll send you a password
            reset link.
          </p>
        </div>

        <form
          onSubmit={handleReset}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-7 shadow-2xl"
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            placeholder="admin@example.com"
          />

          {error && (
            <div className="mt-4 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {message && (
            <div className="mt-4 rounded-xl border border-emerald-900/50 bg-emerald-950/40 px-4 py-3">
              <p className="text-sm text-emerald-300">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>

          <Link
            href="/admin/login"
            className="mt-5 block text-center text-sm font-medium text-slate-400 hover:text-white"
          >
            ← Back to sign in
          </Link>
        </form>
      </div>
    </main>
  );
}
