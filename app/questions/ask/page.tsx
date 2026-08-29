"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

export default function AskQuestionPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          category,
          question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to submit your question.");
        return;
      }

      setMessage(data.message);

      setName("");
      setEmail("");
      setCategory("");
      setQuestion("");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the question service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Questions & Answers
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Ask a Question
          </p>

          <h1 className="mt-3 text-5xl font-semibold">
            Submit Your Question
          </h1>

          <p className="mt-5 max-w-2xl text-slate-300">
            Submit a question concerning Islamic law, worship, family,
            transactions, or other matters of Islamic jurisprudence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />

              <p className="mt-2 text-xs text-slate-400">
                Optional. Provide it if you would like a response by email.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="">Select a category</option>
              <option value="Fiqh">Fiqh</option>
              <option value="Worship">Worship</option>
              <option value="Family">Family</option>
              <option value="Transactions">Transactions</option>
              <option value="Contemporary Issues">
                Contemporary Issues
              </option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="mt-6">
            <label
              htmlFor="question"
              className="block text-sm font-semibold text-slate-700"
            >
              Your Question
            </label>

            <textarea
              id="question"
              required
              rows={9}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Write your question in as much detail as necessary..."
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm text-emerald-700">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={17} />

            {loading ? "Submitting..." : "Submit Question"}
          </button>

          <p className="mt-5 text-center text-xs leading-5 text-slate-400">
            Questions are reviewed before publication. Please do not submit
            passwords, financial information, or other sensitive personal
            information.
          </p>
        </form>
      </section>
    </main>
  );
}
