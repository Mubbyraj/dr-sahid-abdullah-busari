import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageCircleQuestion,
  PlayCircle,
} from "lucide-react";

import Hero from "@/components/Hero";
import { fatwas } from "@/data/content";
import { publications } from "@/data/publications";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { data: questions } = await supabase
    .from("questions")
    .select(
      "id, question, category, answer, published_at, created_at"
    )
    .eq("status", "published")
    .not("answer", "is", null)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <main>
      <Hero />

      {/* Main sections */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 md:grid-cols-3 lg:px-8">

          <Link
            href="/fatwas"
            className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <BookOpen size={21} />
              </span>

              <ArrowRight
                className="text-slate-300 transition group-hover:text-blue-600"
                size={20}
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold">Fatwas</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Latest and archived Islamic legal responses.
            </p>
          </Link>

          <Link
            href="/questions"
            className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <MessageCircleQuestion size={21} />
              </span>

              <ArrowRight
                className="text-slate-300 transition group-hover:text-blue-600"
                size={20}
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Questions &amp; Answers
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find answers to questions on Islamic matters.
            </p>
          </Link>

          <Link
            href="/lectures"
            className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <PlayCircle size={21} />
              </span>

              <ArrowRight
                className="text-slate-300 transition group-hover:text-blue-600"
                size={20}
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold">Lectures</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Recorded lectures and educational materials.
            </p>
          </Link>

        </div>
      </section>

      {/* Recent Fatwas */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Latest
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Recent Fatwas
              </h2>
            </div>

            <Link
              href="/fatwas"
              className="hidden text-sm font-semibold text-blue-700 sm:block"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {fatwas.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  {item.category}
                </span>

                <h3 className="mt-3 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.excerpt}
                </p>

                <Link
                  href="/fatwas"
                  className="mt-5 inline-block text-sm font-semibold text-blue-700"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Latest Questions & Answers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Questions &amp; Answers
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Latest Questions &amp; Answers
              </h2>

              <p className="mt-3 max-w-2xl text-slate-500">
                Recent questions answered by Dr. Saheed Abdullahi Busari.
              </p>
            </div>

            <Link
              href="/questions"
              className="hidden text-sm font-semibold text-blue-700 sm:block"
            >
              View all →
            </Link>
          </div>

          {!questions || questions.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <MessageCircleQuestion
                size={36}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 font-semibold text-slate-700">
                No published questions yet.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {questions.map((item) => (
                <Link
                  key={item.id}
                  href={`/questions/${item.id}`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      {item.category || "General"}
                    </span>

                    <ArrowRight
                      size={17}
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </div>

                  <h3 className="mt-4 line-clamp-3 text-xl font-semibold leading-8 text-slate-900">
                    {item.question}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                    {item.answer}
                  </p>

                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="text-xs text-slate-400">
                      {item.published_at
                        ? new Date(
                            item.published_at
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : ""}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      Dr. Saheed Abdullahi Busari
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Featured Lecture */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Featured
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Lecture Video
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-slate-500">
              New lectures and recorded lessons will be presented here
              prominently.
            </p>

            <Link
              href="/lectures"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
            >
              Browse lectures
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-950 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.3),transparent_50%)]" />

            <div className="relative flex h-full items-center justify-center">
              <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl">
                  <PlayCircle size={34} />
                </div>

                <p className="mt-5 font-semibold text-white">
                  Featured Lecture
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Official video to be added
                </p>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Publications */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Scholarship
              </p>

              <h2 className="mt-2 text-3xl font-semibold">
                Selected Publications
              </h2>
            </div>

            <Link
              href="/publications"
              className="text-sm font-semibold text-blue-700"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {publications.slice(0, 5).map((publication) => (
              <Link
                href="/publications"
                key={publication.title}
                className="group block py-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                  <div>
                    <span className="text-xs font-bold text-blue-700">
                      {publication.year}
                    </span>

                    <h3 className="mt-1 max-w-4xl font-semibold text-slate-900 group-hover:text-blue-700">
                      {publication.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {publication.journal}
                      {publication.volume &&
                        ` · Vol. ${publication.volume}`}
                      {" · "}
                      pp. {publication.pages}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mt-1 shrink-0 text-slate-300 group-hover:text-blue-600"
                  />

                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-700 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center lg:px-8">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Stay informed
            </p>

            <h2 className="mt-2 text-3xl font-semibold">
              New fatwas and lectures, delivered.
            </h2>

            <p className="mt-2 max-w-xl text-blue-100">
              Subscribe for notifications when new scholarly materials are
              published.
            </p>
          </div>

          <Link
            href="/subscribe"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Subscribe
          </Link>

        </div>
      </section>
    </main>
  );
}
