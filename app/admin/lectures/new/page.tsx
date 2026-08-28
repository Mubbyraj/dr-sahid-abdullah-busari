"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function NewLecturePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transcript, setTranscript] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Please enter a lecture title.");
      return;
    }

    if (!video) {
      setError("Please select a video.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const slug =
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
        "-" +
        Date.now();

      const videoPath = `${user.id}/${slug}-${video.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;

      const { error: videoError } = await supabase.storage
        .from("lecture-videos")
        .upload(videoPath, video, {
          cacheControl: "3600",
          upsert: false,
        });

      if (videoError) {
        throw new Error(`Video upload failed: ${videoError.message}`);
      }

      const {
        data: { publicUrl: videoUrl },
      } = supabase.storage
        .from("lecture-videos")
        .getPublicUrl(videoPath);

      let thumbnailUrl: string | null = null;

      if (thumbnail) {
        const thumbnailPath = `${user.id}/${slug}-${thumbnail.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;

        const { error: thumbnailError } = await supabase.storage
          .from("lecture-thumbnails")
          .upload(thumbnailPath, thumbnail, {
            cacheControl: "3600",
            upsert: false,
          });

        if (thumbnailError) {
          throw new Error(
            `Thumbnail upload failed: ${thumbnailError.message}`
          );
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("lecture-thumbnails")
          .getPublicUrl(thumbnailPath);

        thumbnailUrl = publicUrl;
      }

      const { error: databaseError } = await supabase
        .from("lectures")
        .insert({
          title: title.trim(),
          slug,
          category: category.trim() || null,
          description: description.trim() || null,
          transcript: transcript.trim() || null,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl,
          status,
          published_at: status === "published" ? new Date().toISOString() : null,
        });

      if (databaseError) {
        throw new Error(
          `Lecture could not be saved: ${databaseError.message}`
        );
      }

      router.push("/admin/lectures");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
              Administration
            </p>
            <h1 className="mt-1 text-xl font-semibold">
              Add New Lecture
            </h1>
          </div>

          <button
            onClick={() => router.push("/admin/lectures")}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Back to lectures
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            Upload Lecture
          </h2>

          <p className="mt-2 text-slate-400">
            Add a recorded lecture, transcript and supporting thumbnail.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-7"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Lecture title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter lecture title"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Category
            </label>

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Fiqh, Usul al-Fiqh, Islamic Finance"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Brief description of the lecture..."
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Transcript
            </label>

            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={10}
              placeholder="Paste the lecture transcript here..."
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Lecture video
            </label>

            <input
              type="file"
              accept="video/*"
              required
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="mt-2 block w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300"
            />

            <p className="mt-2 text-xs text-slate-500">
              Select the lecture video from your computer.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="mt-2 block w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional. Recommended for the lecture preview.
            </p>
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

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-6">
            <button
              type="button"
              onClick={() => router.push("/admin/lectures")}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Save Lecture"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
