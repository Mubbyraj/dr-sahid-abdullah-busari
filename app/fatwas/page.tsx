import Link from "next/link";

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

export default async function FatwasPage() {
  const supabase = await createSupabaseServerClient();

  const { data: fatwas, error } = await supabase
    .from("fatwas")
    .select("id, title, slug, category, question, answer, published_at")
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0b3a82] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Scholarly Guidance
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-bold tracking-tight sm:text-6xl">
            Fatwas
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Verified juristic responses and scholarly guidance published
            through the official platform of Dr. Saheed Abdullahi Busari.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Unable to load published fatwas at this time.
          </div>
        ) : !fatwas || fatwas.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No published fatwas yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Published scholarly responses will appear here when they are
              made available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {fatwas.map((fatwa) => {
              const date = formatDate(fatwa.published_at);

              return (
                <article
                  key={fatwa.id}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {fatwa.category || "Fiqh"}
                    </span>

                    {date && (
                      <span className="text-xs text-slate-400">{date}</span>
                    )}
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold leading-tight text-slate-950">
                    {fatwa.title}
                  </h2>

                  {fatwa.question && (
                    <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600">
                      {fatwa.question}
                    </p>
                  )}

                  {!fatwa.question && fatwa.answer && (
                    <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600">
                      {fatwa.answer}
                    </p>
                  )}

                  <div className="mt-auto pt-7">
                    <Link
                      href={`/fatwas/${fatwa.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                      Read full fatwa →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
