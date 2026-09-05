import Link from "next/link";
import { PlayCircle } from "lucide-react";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function LecturesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: lectures, error } = await supabase
    .from("lectures")
    .select(
      "id, title, slug, category, description, transcript, video_url, thumbnail_url, status, published_at, created_at",
    )
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  return (
    <main>
      <section className="bg-blue-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Video &amp; Audio
          </p>

          <h1 className="mt-3 text-5xl font-semibold">Lectures</h1>

          <p className="mt-4 max-w-2xl text-blue-100">
            Recorded lectures and educational materials by Dr. Saheed
            Abdullahi Busari.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-red-900">
              Unable to load lectures
            </h2>

            <p className="mt-2 text-sm text-red-700">
              Please try again later.
            </p>
          </div>
        ) : lectures && lectures.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {lectures.map((lecture) => (
              <Link
                href={`/lectures/${lecture.slug}`}
                key={lecture.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  {lecture.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={lecture.thumbnail_url}
                      alt={lecture.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PlayCircle
                        size={50}
                        className="text-blue-400 transition group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                    <PlayCircle
                      size={52}
                      className="text-white opacity-90 drop-shadow-lg transition group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="p-6">
                  {lecture.category && (
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      {lecture.category}
                    </span>
                  )}

                  <h2 className="mt-2 text-xl font-semibold text-slate-900">
                    {lecture.title}
                  </h2>

                  {lecture.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                      {lecture.description}
                    </p>
                  )}

                  {lecture.published_at && (
                    <p className="mt-4 text-xs text-slate-400">
                      {new Date(lecture.published_at).toLocaleDateString(
                        "en-MY",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <PlayCircle
              size={48}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-2xl font-semibold text-slate-900">
              No lectures published yet
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              New lectures and recorded lessons will appear here when they are
              officially published.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}