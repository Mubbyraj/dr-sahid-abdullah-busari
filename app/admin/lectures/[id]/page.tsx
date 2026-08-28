"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type Lecture = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  description: string | null;
  transcript: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  status: "draft" | "published";
};

export default function EditLecturePage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const id = params.id as string;

  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transcript, setTranscript] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  useEffect(() => {
    async function loadLecture() {
      const { data, error } = await supabase
        .from("lectures")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setLecture(data);
      setTitle(data.title || "");
      setSlug(data.slug || "");
      setCategory(data.category || "");
      setDescription(data.description || "");
      setTranscript(data.transcript || "");
      setVideoUrl(data.video_url || "");
      setThumbnailUrl(data.thumbnail_url || "");
      setStatus(data.status || "draft");
      setLoading(false);
    }

    loadLecture();
  }, [id]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const { error } = await supabase
      .from("lectures")
      .update({
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim() || null,
        description: description.trim() || null,
        transcript: transcript.trim() || null,
        video_url: videoUrl.trim() || null,
        thumbnail_url: thumbnailUrl.trim() || null,
        status,
        published_at:
          status === "published"
            ? lecture?.status === "published"
              ? undefined
              : new Date().toISOString()
            : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setMessage("Lecture saved successfully.");
    setSaving(false);
    router.refresh();
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lecture? This cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    const { error } = await supabase
      .from("lectures")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      setDeleting(false);
      return;
    }

    router.push("/admin/lectures");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-400">Loading lecture...</p>
        </div>
      </main>
    );
  }

  if (error && !lecture) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/admin/lectures"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to Lectures
          </Link>

          <div className="mt-8 rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <h1 className="text-xl font-semibold">Unable to load lecture</h1>
            <p className="mt-2 text-sm text-red-300">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/lectures"
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          ← Back to Lectures
        </Link>

        <div className="mt-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
                Administration
              </p>

              <h1 className="mt-2 text-4xl font-semibold">
                Edit Lecture
              </h1>

              <p className="mt-3 text-slate-400">
                Update the lecture information and publication status.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl border border-red-900 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-950 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          <form
            onSubmit={handleSave}
            className="mt-10 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-7"
          >
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Lecture title
              </label>

              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Slug
              </label>

              <input
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Example: introduction-to-usul-al-fiqh
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Category
              </label>

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Fiqh, Usul al-Fiqh, Tafsir..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Transcript
              </label>

              <textarea
                rows={10}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Video URL
              </label>

              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Thumbnail URL
              </label>

              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Publication status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "draft" | "published")
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {error && (
              <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-xl border border-emerald-900 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
                {message}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-6">
              <Link
                href="/admin/lectures"
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Lecture"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
