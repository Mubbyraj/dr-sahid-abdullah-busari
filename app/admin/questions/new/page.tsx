"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function NewQuestionPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.from("questions").insert({
      name: name.trim() || null,
      email: email.trim() || null,
      question: question.trim(),
      category: category.trim() || null,
      answer: answer.trim() || null,
      status,
      answered_at: answer.trim() ? new Date().toISOString() : null,
      published_at:
        status === "published" ? new Date().toISOString() : null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/questions");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/admin/questions"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Questions
        </Link>

        <h1 className="mt-6 text-3xl font-semibold">
          New Question & Answer
        </h1>

        <p className="mt-2 text-slate-400">
          Add a question and scholarly response.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-7"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Visitor's name"
            />

            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="visitor@example.com"
            />
          </div>

          <Field
            label="Category"
            value={category}
            onChange={setCategory}
            placeholder="Fiqh, Worship, Family, etc."
          />

          <Textarea
            label="Question"
            value={question}
            onChange={setQuestion}
            required
            placeholder="Enter the question..."
          />

          <Textarea
            label="Answer"
            value={answer}
            onChange={setAnswer}
            placeholder="Enter the scholarly response..."
            rows={10}
          />

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            >
              <option value="pending">Pending</option>
              <option value="answered">Answered</option>
              <option value="published">Published</option>
            </select>
          </div>

          {error && (
            <div className="rounded-xl bg-red-950/50 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Question"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 6,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}
