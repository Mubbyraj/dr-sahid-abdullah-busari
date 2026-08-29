"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export default function EditLecturePage() {
  const params = useParams();
  const router = useRouter();

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
    let cancelled = false;

    async function loadLecture() {
      setLoading(true);
      setError("");

      try {
        const { data, error: fetchError } = await supabase
          .from("lectures")
          .select("*")
          .eq("id", id)
          .single();

        if (cancelled) return;

        if (fetchError) {
          setError(fetchError.message);
          setLoading(false);
          return;
        }

        if (!data) {
          setError("Lecture not found.");
          setLoading(false);
          return;
        }

        const lectureData = data as Lecture;

        setLecture(lectureData);
        setTitle(lectureData.title || "");
        setSlug(lectureData.slug || "");
        setCategory(lectureData.category || "");
        setDescription(lectureData.description || "");
        setTranscript(lectureData.transcript || "");
        setVideoUrl(lectureData.video_url || "");
        setThumbnailUrl(lectureData.thumbnail_url || "");
        setStatus(lectureData.status || "draft");
        setLoading(false);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Failed to load lecture."
        );
        setLoading(false);
      }
    }

    if (id) {
      loadLecture();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const cleanTitle = title.trim();
    const cleanSlug = slug.trim();
    const cleanCategory = category.trim();
    const cleanDescription = description.trim();
    const cleanTranscript = transcript.trim();
    const cleanVideoUrl = videoUrl.trim();
    const cleanThumbnailUrl = thumbnailUrl.trim();

    if (!cleanTitle) {
      setError("Lecture title is required.");
      setSaving(false);
      return;
    }

    if (!cleanSlug) {
      setError("Slug is required.");
      setSaving(false);
      return;
    }

    if (!/^[a-z0-9-]+$/.test(cleanSlug)) {
      setError(
        "Slug can only contain lowercase letters, numbers, and hyphens."
      );
      setSaving(false);
      return;
    }

    let publishedAt: string | null = null;

    if (status === "published") {
      if (lecture?.status === "published" && lecture.published_at) {
        publishedAt = lecture.published_at;
      } else {
        publishedAt = new Date().toISOString();
      }
    }

    try {
      const { data, error: updateError } = await supabase
        .from("lectures")
        .update({
          title: cleanTitle,
          slug: cleanSlug,
          category: cleanCategory || null,
          description: cleanDescription || null,
          transcript: cleanTranscript || null,
          video_url: cleanVideoUrl || null,
          thumbnail_url: cleanThumbnailUrl || null,
          status,
          published_at: publishedAt,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select("*")
        .single();

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      if (data) {
        setLecture(data as Lecture);
      }

      setMessage("Lecture saved successfully.");
      setSaving(false);

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save lecture."
      );
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lecture? This cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");
    setMessage("");

    try {
      const { error: deleteError } = await supabase
        .from("lectures")
        .delete()
        .eq("id", id);

      if (deleteError) {
        setError(deleteError.message);
        setDeleting(false);
        return;
      }

      router.push("/admin/lectures");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete lecture."
      );
      setDeleting(false);
    }
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
            className="text-sm text-blue-400 transition hover:text-blue-300"
          >
            ← Back to Lectures
          </Link>

          <div className="mt-8 rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <h1 className="text-xl font-semibold">
              Unable to load lecture
            </h1>

            <p className="mt-2 text-sm text-red-300">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/lectures"
          className="text-sm text-blue-400 transition hover:text-blue-300"
        >
          ← Back to Lectures
        </Link>

        <div className="mt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
                Administration
              </p>

              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Edit Lecture
              </h1>

              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Update the lecture information and publication status.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || saving}
              className="w-full rounded-xl border border-red-900 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          <form
            onSubmit={handleSave}
            className="mt-10 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-300"
              >
                Lecture title
              </label>

              <input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-slate-300"
              >
                Slug
              </label>

              <input
                id="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Example: introduction-to-usul-al-fiqh
              </p>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-300"
              >
                Category
              </label>

              <input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Fiqh, Usul al-Fiqh, Tafsir..."
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-300"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="transcript"
                className="block text-sm font-medium text-slate-300"
              >
                Transcript
              </label>

              <textarea
                id="transcript"
                rows={10}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="mt-2 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-slate-300"
              >
                Video URL
              </label>

              <input
                id="videoUrl"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://..."
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="thumbnailUrl"
                className="block text-sm font-medium text-slate-300"
              >
                Thumbnail URL
              </label>

              <input
                id="thumbnailUrl"
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://..."
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-slate-300"
              >
                Publication status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "draft" | "published")
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                role="status"
                className="rounded-xl border border-emerald-900 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300"
              >
                {message}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-end">
              <Link
                href="/admin/lectures"
                className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving || deleting}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
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