import Link from "next/link";

import { notFound } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) return null;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function FatwaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: fatwa, error } = await supabase
    .from("fatwas")
    .select(
      "id, title, slug, category, question, answer, source_references, published_at"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .single();

  if (error || !fatwa) {
    notFound();
  }

  const date = formatDate(fatwa.published_at);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0b3a82] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <Link
            href="/fatwas"
            className="text-sm font-semibold text-white/70 transition hover:text-white"
          >
            ← Back to Fatwas
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              {fatwa.category || "Fiqh"}
            </span>

            {date && <span className="text-sm text-white/60">{date}</span>}
          </div>

          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            {fatwa.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        {fatwa.question && (
          <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Question
            </p>

            <p className="mt-4 whitespace-pre-line text-lg leading-8 text-slate-800">
              {fatwa.question}
            </p>
          </section>
        )}

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Answer
          </p>

          <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-700">
            {fatwa.answer}
          </div>
        </section>

        {fatwa.source_references && (
          <section className="mt-12 border-t border-slate-200 pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Sources & References
            </p>

            <div className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
              {fatwa.source_references}
            </div>
          </section>
        )}

        <div className="mt-14 border-t border-slate-200 pt-8">
          <Link
            href="/fatwas"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← Browse all fatwas
          </Link>
        </div>
      </article>
    </main>
  );
}
