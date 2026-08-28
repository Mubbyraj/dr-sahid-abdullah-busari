"use client";

import { FormEvent, useState } from "react";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to subscribe.");
        return;
      }

      setMessage(data.message);
      setEmail("");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the subscription service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Notifications
          </p>

          <h1 className="mt-3 text-5xl font-semibold">
            Stay Updated
          </h1>

          <p className="mt-5 text-slate-300">
            Receive notifications when new fatwas, lectures and publications
            are added.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-5 py-20">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 p-7 shadow-sm"
        >
          <label
            htmlFor="email"
            className="text-sm font-semibold"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {message && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm text-emerald-700">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>

          <p className="mt-4 text-center text-xs text-slate-400">
            You can unsubscribe at any time.
          </p>
        </form>
      </section>
    </main>
  );
}