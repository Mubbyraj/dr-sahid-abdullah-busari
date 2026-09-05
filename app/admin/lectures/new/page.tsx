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

    let uploadedVideoPath: string | null = null;
    let uploadedThumbnailPath: string | null = null;

    try {
      const supabase = createSupabaseBrowserClient();

      // Verify the browser has an authenticated Supabase session.
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(`Authentication check failed: ${userError.message}`);
      }

      if (!user) {
        router.push("/admin/login");
        return;
      }

      // Verify that the authenticated user is actually an admin.
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw new Error(`Profile check failed: ${profileError.message}`);
      }

      if (profile?.role !== "admin") {
        throw new Error(
          `Your account is authenticated, but its role is "${profile?.role ?? "unknown"}".`
        );
      }

      const slug =
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
        "-" +
        Date.now();

      const videoFileName = video.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "-"
      );

      const videoPath = `${user.id}/${slug}-${videoFileName}`;
      uploadedVideoPath = videoPath;

      // Upload video.
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

      // Upload thumbnail if provided.
      if (thumbnail) {
        const thumbnailFileName = thumbnail.name.replace(
          /[^a-zA-Z0-9._-]/g,
          "-"
        );

        const thumbnailPath = `${user.id}/${slug}-${thumbnailFileName}`;
        uploadedThumbnailPath = thumbnailPath;

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

      // Save lecture record.
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
          published_at:
            status === "published"
              ? new Date().toISOString()
              : null,
        });

      if (databaseError) {
        throw new Error(
          `Lecture could not be saved: ${databaseError.message}`
        );
      }

      router.push("/admin/lectures");
      router.refresh();
    } catch (err) {
      const supabase = createSupabaseBrowserClient();

      if (uploadedVideoPath) {
        const { error: cleanupError } = await supabase.storage
          .from("lecture-videos")
          .remove([uploadedVideoPath]);

        if (cleanupError) {
          console.error(
            "Failed to clean up uploaded lecture video:",
            cleanupError
          );
        }
      }

      if (uploadedThumbnailPath) {
        const { error: cleanupError } = await supabase.storage
          .from("lecture-thumbnails")
          .remove([uploadedThumbnailPath]);

        if (cleanupError) {
          console.error(
            "Failed to clean up uploaded lecture thumbnail:",
            cleanupError
          );
        }
      }

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-400">
            Admin
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Add New Lecture
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Upload a lecture and choose whether it should remain a
            draft or be published immediately.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Lecture Details
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Title
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Enter lecture title"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Category
                </label>

                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  placeholder="e.g. Tafsir, Fiqh, Aqeedah"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Brief description of the lecture"
                  rows={5}
                  disabled={loading}
                  className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="transcript"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Transcript
                </label>

                <textarea
                  id="transcript"
                  value={transcript}
                  onChange={(event) =>
                    setTranscript(event.target.value)
                  }
                  placeholder="Lecture transcript (optional)"
                  rows={10}
                  disabled={loading}
                  className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-50"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Media
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="video"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Lecture Video
                </label>

                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  required
                  disabled={loading}
                  onChange={(event) =>
                    setVideo(event.target.files?.[0] ?? null)
                  }
                  className="block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 text-sm text-slate-300 file:mr-4 file:border-0 file:bg-slate-800 file:px-4 file:py-3 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 disabled:opacity-50"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Select the lecture video to upload.
                </p>
              </div>

              <div>
                <label
                  htmlFor="thumbnail"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Thumbnail
                </label>

                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={(event) =>
                    setThumbnail(
                      event.target.files?.[0] ?? null
                    )
                  }
                  className="block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 text-sm text-slate-300 file:mr-4 file:border-0 file:bg-slate-800 file:px-4 file:py-3 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 disabled:opacity-50"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Optional. Recommended for the public lecture listing.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Publication
            </h2>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as
                      | "draft"
                      | "published"
                  )
                }
                disabled={loading}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>

              <p className="mt-2 text-xs text-slate-500">
                Draft lectures are not visible on the public website.
              </p>
            </div>
          </section>

          {error && (
            <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/lectures")}
              disabled={loading}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving Lecture..." : "Save Lecture"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}