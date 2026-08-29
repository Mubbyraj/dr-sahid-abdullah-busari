"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type QuestionStatus = "pending" | "answered" | "published";

export default function EditQuestionPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<QuestionStatus>("pending");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createSupabaseBrowserClient();

      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", id)
        .single();

      if (cancelled) {
        return;
      }

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

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const trimmedQuestion = question.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion) {
      setError("Please enter the question.");
      setSaving(false);
      return;
    }

    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(trimmedEmail)) {
        setError("Please enter a valid email address.");
        setSaving(false);
        return;
      }
    }

    if (
      (status === "answered" || status === "published") &&
      !trimmedAnswer
    ) {
      setError(
        "An answer is required when the status is Answered or Published."
      );
      setSaving(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();

    const now = new Date().toISOString();

    const { data: existingQuestion, error: existingError } =
      await supabase
        .from("questions")
        .select("answered_at, published_at")
        .eq("id", id)
        .single();

    if (existingError) {
      setError(existingError.message);
      setSaving(false);
      return;
    }

    const updateData = {
      name: name.trim() || null,
      email: trimmedEmail || null,
      question: trimmedQuestion,
      category: category.trim() || null,
      answer: trimmedAnswer || null,
      status,
      answered_at: trimmedAnswer
        ? existingQuestion.answered_at || now
        : null,
      published_at:
        status === "published"
          ? existingQuestion.published_at || now
          : null,
      updated_at: now,
    };

    const { error: updateError } = await supabase
      .from("questions")
      .update(updateData)
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/questions");
    router.refresh();
  }

  async function deleteQuestion() {
    const confirmed = window.confirm(
      "Delete this question permanently? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error: deleteError } = await supabase
      .from("questions")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      setDeleting(false);
      return;
    }

    router.push("/admin/questions");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-400">Loading question...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/admin/questions"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Questions
          </Link>

          <button
            type="button"
            onClick={deleteQuestion}
            disabled={deleting || saving}
            className="inline-flex items-center gap-2 rounded-xl border border-red-900 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={16} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-semibold">
            Edit Question
          </h1>

          <p className="mt-2 text-slate-400">
            Review, answer, publish, or remove this question.
          </p>
        </div>

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
            rows={12}
          />

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-300"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as QuestionStatus)
              }
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="answered">Answered</option>
              <option value="published">Published</option>
            </select>

            <p className="mt-2 text-xs text-slate-500">
              Published questions are visible on the public website.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-900 bg-red-950/50 p-4 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving || deleting}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
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
  rows = 7,
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
      />
    </div>
  );
}