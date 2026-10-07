import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LecturePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: lecture, error } = await supabase
    .from("lectures")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !lecture) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <Link
        href="/lectures"
        className="text-sm font-semibold text-blue-700 hover:text-blue-800"
      >
        ← Back to Lectures
      </Link>

      <article className="mt-8">
        {lecture.category && (
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            {lecture.category}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          {lecture.title}
        </h1>

        {lecture.description && (
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {lecture.description}
          </p>
        )}

        {lecture.video_url && (
          <div className="mt-10 overflow-hidden rounded-3xl bg-black shadow-2xl">
            <video
              controls
              preload="metadata"
              poster={lecture.thumbnail_url || undefined}
              className="aspect-video w-full"
              src={lecture.video_url}
            >
              Your browser does not support video playback.
            </video>
          </div>
        )}

        {lecture.transcript && (
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              Transcript
            </h2>
            <div className="mt-5 whitespace-pre-wrap text-base leading-8 text-slate-700">
              {lecture.transcript}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
