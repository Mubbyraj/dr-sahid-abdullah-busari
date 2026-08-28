"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function EditQuestionPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();

      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setName(data.name || "");
      setEmail(data.email || "");
      setQuestion(data.question || "");
      setCategory(data.category || "");
      setAnswer(data.answer || "");
      setStatus(data.status || "pending");
      setLoading(false);
    }

    load();
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase
      .from("questions")
      .update({
        name: name.trim() || null,
        email: email.trim() || null,
        question: question.trim(),
        category: category.trim() || null,
        answer: answer.trim() || null,
        status,
        answered_at: answer.trim() ? new Date().toISOString() : null,
        published_at:
          status === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/questions");
    router.refresh();
  }

  async function deleteQuestion() {
    if (!confirm("Delete this question permanently?")) return;

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase
      .from("questions")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/questions");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        Loading question...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/questions"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Questions
          </Link>

          <button
            onClick={deleteQuestion}
            className="inline-flex items-center gap-2 rounded-xl border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        <h1 className="mt-6 text-3xl font-semibold">
          Edit Question
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-7"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Name" value={name} onChange={setName} />
            <Field label="Email" value={email} onChange={setEmail} />
          </div>

          <Field
            label="Category"
            value={category}
            onChange={setCategory}
          />

          <Textarea
            label="Question"
            value={question}
            onChange={setQuestion}
            required
          />

          <Textarea
            label="Answer"
            value={answer}
            onChange={setAnswer}
            rows={12}
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
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  required = false,
  rows = 7,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
        required={required}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
      />
    </div>
  );
}
