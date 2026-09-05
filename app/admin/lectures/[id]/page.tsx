"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  published_at: string | null;
};

export default function EditLecturePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [lecture, setLecture] = useState<Lecture | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transcript, setTranscript] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadLecture() {
      try {
        const supabase = createSupabaseBrowserClient();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/admin/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError || profile?.role !== "admin") {
          router.push("/admin");
          return;
        }

        const { data, error: lectureError } = await supabase
          .from("lectures")
          .select("*")
          .eq("id", id)
          .single();

        if (lectureError) {
          throw new Error(lectureError.message);
        }

        if (!data) {
          throw new Error("Lecture not found.");
        }

        const loadedLecture = data as Lecture;

        setLecture(loadedLecture);
        setTitle(loadedLecture.title);
        setSlug(loadedLecture.slug);
        setCategory(loadedLecture.category ?? "");
        setDescription(loadedLecture.description ?? "");
        setTranscript(loadedLecture.transcript ?? "");
        setVideoUrl(loadedLecture.video_url ?? "");
        setThumbnailUrl(loadedLecture.thumbnail_url ?? "");
        setStatus(loadedLecture.status);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load lecture."
        );
      } finally {
        setLoading(false);
      }
    }

    loadLecture();
  }, [id, router]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!title.trim()) {
      setError("Please enter a lecture title.");
      return;
    }

    if (!slug.trim()) {
      setError("Please enter a lecture slug.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createSupabaseBrowserClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/admin/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        throw new Error("You do not have permission to edit lectures.");
      }

      const response = await fetch(`/api/admin/lectures/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          category: category.trim() || null,
          description: description.trim() || null,
          transcript: transcript.trim() || null,
          video_url: videoUrl.trim() || null,
          thumbnail_url: thumbnailUrl.trim() || null,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to save lecture.");
      }

      setLecture(result.lecture as Lecture);
      setMessage("Lecture saved successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save lecture."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleStatusAction(nextStatus: "draft" | "published") {
    const confirmed = window.confirm(
      nextStatus === "published"
        ? "Are you sure you want to publish this lecture?"
        : "Are you sure you want to hide this lecture and move it back to draft?"
    );

    if (!confirmed) {
      return;
    }

    setStatus(nextStatus);
    setMessage(
      nextStatus === "published"
        ? "Lecture marked for publishing. Click Save Lecture to apply the change."
        : "Lecture marked as draft. Click Save Lecture to apply the change."
    );
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lecture? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");
    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/lectures/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to delete lecture.");
      }

      router.push("/admin/lectures");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete lecture."
      );
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm text-gray-500">Loading lecture...</p>
      </main>
    );
  }

  if (error && !lecture) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>

        <Link
          href="/admin/lectures"
          className="mt-5 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to lectures
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/lectures"
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            ← Back to lectures
          </Link>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
            Edit Lecture
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the lecture content, media, and publication status.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {status === "draft" ? (
            <button
              type="button"
              onClick={() => handleStatusAction("published")}
              disabled={saving || deleting}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Publish
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleStatusAction("draft")}
              disabled={saving || deleting}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hide
            </button>
          )}

          <button
            type="button"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Publication
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Draft lectures are hidden from the public website. Published
              lectures are publicly visible.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "draft" | "published")
                }
                disabled={saving || deleting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                Current state:{" "}
                <span className="font-semibold capitalize text-gray-900">
                  {status}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Changing the status does not save immediately. Click{" "}
            <strong>Save Lecture</strong> to apply the change.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Lecture Details
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={saving || deleting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Slug
              </label>

              <input
                id="slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                disabled={saving || deleting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-gray-500">
                Used in the public lecture URL.
              </p>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <input
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                disabled={saving || deleting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={saving || deleting}
                rows={5}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="transcript"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Transcript
              </label>

              <textarea
                id="transcript"
                value={transcript}
                onChange={(event) => setTranscript(event.target.value)}
                disabled={saving || deleting}
                rows={10}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Media</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage the lecture video and thumbnail.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="videoUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video URL
                </label>

                {videoUrl && (
                  <button
                    type="button"
                    onClick={() => setShowPreview((current) => !current)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {showPreview ? "✕ Close Preview" : "▶ Preview Video"}
                  </button>
                )}
              </div>

              <input
                id="videoUrl"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
                disabled={saving || deleting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              {showPreview && videoUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-black">
                  <video
                    key={videoUrl}
                    src={videoUrl}
                    controls
                    preload="metadata"
                    className="max-h-[520px] w-full"
                  >
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="thumbnailUrl"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Thumbnail URL
              </label>

              <input
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(event) => setThumbnailUrl(event.target.value)}
                disabled={saving || deleting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Deleting this lecture permanently removes the database record and
            attempts to remove its associated media files.
          </p>

          <div className="flex gap-3">
            <Link
              href="/admin/lectures"
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving || deleting}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Lecture"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
