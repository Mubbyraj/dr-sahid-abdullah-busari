import { notFound } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

type LecturePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LecturePage({
  params,
}: LecturePageProps) {
  const { slug } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: lecture, error } = await supabase
    .from("lectures")
    .select(
      "id, title, slug, category, description, transcript, video_url, thumbnail_url, status, published_at, created_at",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .single();

  if (error || !lecture) {
    notFound();
  }

  return (
    <main>
      <section className="bg-blue-700 px-5 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Lecture
          </p>

          {lecture.category && (
            <p className="mt-4 text-sm font-medium text-blue-100">
              {lecture.category}
            </p>
          )}

          <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
            {lecture.title}
          </h1>

          {lecture.published_at && (
            <p className="mt-4 text-sm text-blue-100">
              Published{" "}
              {new Date(lecture.published_at).toLocaleDateString("en-MY", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        {lecture.video_url ? (
          <div className="overflow-hidden rounded-2xl bg-black shadow-xl">
            <video
              controls
              preload="metadata"
              poster={lecture.thumbnail_url || undefined}
              className="aspect-video w-full"
            >
              <source src={lecture.video_url} />
              Your browser does not support the video element.
            </video>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Video unavailable
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The lecture has been published, but its video is not currently
              available.
            </p>
          </div>
        )}

        {lecture.description && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              About this lecture
            </h2>

            <p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-600">
              {lecture.description}
            </p>
          </div>
        )}

        {lecture.transcript && (
          <div className="mt-12 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              Transcript
            </h2>

            <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-700">
              {lecture.transcript}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}