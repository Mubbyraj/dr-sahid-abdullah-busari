"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Your password has been updated successfully.");

    setTimeout(() => {
      router.push("/admin/login");
      router.refresh();
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
            Administration
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white">
            Create New Password
          </h1>

          <p className="mt-3 text-slate-400">
            Choose a new password for your administrative account.
          </p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-7 shadow-2xl"
        >
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-300"
          >
            New password
          </label>

          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            placeholder="At least 8 characters"
          />

          <label
            htmlFor="confirm-password"
            className="mt-5 block text-sm font-medium text-slate-300"
          >
            Confirm password
          </label>

          <input
            id="confirm-password"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            placeholder="Repeat your password"
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
            {loading ? "Updating..." : "Update password"}
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
