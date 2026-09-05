"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type Fatwa = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  question: string | null;
  answer: string;
  source_references: string | null;
  status: "draft" | "published";
  published_at: string | null;
};

export default function EditFatwaPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const id = params.id as string;

  const [fatwa, setFatwa] = useState<Fatwa | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sourceReferences, setSourceReferences] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFatwa() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("fatwas")
        .select(
          "id, title, slug, category, question, answer, source_references, status, published_at"
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        setError(error?.message || "Fatwa not found.");
        setLoading(false);
        return;
      }

      setFatwa(data);
      setTitle(data.title || "");
      setSlug(data.slug || "");
      setCategory(data.category || "");
      setQuestion(data.question || "");
      setAnswer(data.answer || "");
      setSourceReferences(data.source_references || "");
      setStatus(data.status === "published" ? "published" : "draft");

      setLoading(false);
    }

    loadFatwa();
  }, [id, supabase]);

  async function saveFatwa(nextStatus: "draft" | "published") {
    setError("");

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!answer.trim()) {
      setError("Please enter the answer.");
      return;
    }

    const finalSlug = slug.trim() || makeSlug(title);

    if (!finalSlug) {
      setError("Please provide a valid slug.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("fatwas")
      .update({
        title: title.trim(),
        slug: finalSlug,
        category: category.trim() || null,
        question: question.trim() || null,
        answer: answer.trim(),
        source_references: sourceReferences.trim() || null,
        status: nextStatus,
        published_at:
          nextStatus === "published"
            ? fatwa?.published_at || new Date().toISOString()
            : null,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/fatwas");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">
            Loading fatwa...
          </div>
        </div>
      </main>
    );
  }

  if (!fatwa) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error || "Fatwa not found."}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push("/admin/fatwas")}
            className="text-sm font-semibold text-slate-500 hover:text-blue-700"
          >
            ← Back to Fatwas
          </button>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-700">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-semibold text-slate-950">
            Edit Fatwa
          </h1>

          <p className="mt-3 text-slate-600">
            Update the scholarly response and publication status.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-950">
              Basic Information
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Title
                </label>

                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!slug) {
                      setSlug(makeSlug(e.target.value));
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Slug
                </label>

                <input
                  value={slug}
                  onChange={(e) => setSlug(makeSlug(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Used for the public URL.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </label>

                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Islamic Finance, Fiqh, Family Fiqh"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-950">
              Fatwa Content
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Question
                </label>

                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={6}
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Answer
                </label>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={16}
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Sources & References
                </label>

                <textarea
                  value={sourceReferences}
                  onChange={(e) => setSourceReferences(e.target.value)}
                  rows={6}
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-950">
              Publication Status
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStatus("draft")}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  status === "draft"
                    ? "bg-amber-100 text-amber-800"
                    : "border border-slate-200 text-slate-600"
                }`}
              >
                Draft
              </button>

              <button
                type="button"
                onClick={() => setStatus("published")}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  status === "published"
                    ? "bg-emerald-100 text-emerald-800"
                    : "border border-slate-200 text-slate-600"
                }`}
              >
                Published
              </button>
            </div>
          </section>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => saveFatwa("draft")}
              disabled={saving}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() => saveFatwa("published")}
              disabled={saving}
              className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
