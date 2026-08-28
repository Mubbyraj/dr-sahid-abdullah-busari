"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewFatwaPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sourceReferences, setSourceReferences] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(makeSlug(value));
  }

  async function saveFatwa(status: "draft" | "published") {
    setError("");

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!answer.trim()) {
      setError("Please enter the answer.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("fatwas").insert({
      title: title.trim(),
      slug: slug.trim() || makeSlug(title),
      category: category.trim() || null,
      question: question.trim() || null,
      answer: answer.trim(),
      source_references: sourceReferences.trim() || null,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/fatwas");
    router.refresh();
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
            New Fatwa
          </h1>

          <p className="mt-3 text-slate-600">
            Prepare a scholarly response for review and publication.
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
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter the title of the fatwa"
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
                  placeholder="fatwa-url-slug"
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
                  placeholder="Enter the question being answered..."
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
                  placeholder="Enter the scholarly answer..."
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
                  placeholder="Books, Qur'anic references, hadith references, scholarly sources, etc."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>
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
              {saving ? "Publishing..." : "Publish Fatwa"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
