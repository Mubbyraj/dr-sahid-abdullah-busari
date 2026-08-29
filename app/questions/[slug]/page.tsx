import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: question, error } = await supabase
    .from("questions")
    .select(
      "id, name, question, category, answer, status, published_at, created_at"
    )
    .eq("id", slug)
    .eq("status", "published")
    .not("answer", "is", null)
    .single();

  if (error || !question) {
    notFound();
  }

  const publishedDate = question.published_at || question.created_at;

  return (
    <main>
      <section className="bg-slate-950 px-5 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Questions & Answers
          </Link>

          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {question.category || "Islamic Q&A"}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {question.question}
            </h1>

            {publishedDate && (
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays size={16} />

                <span>
                  Published{" "}
                  {new Date(publishedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
          <div className="border-b border-slate-200 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              The Question
            </p>

            <h2 className="mt-4 text-2xl font-semibold leading-9 text-slate-900">
              {question.question}
            </h2>

            {question.name && (
              <p className="mt-4 text-sm text-slate-500">
                Submitted by {question.name}
              </p>
            )}
          </div>

          <div className="pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              Scholarly Answer
            </p>

            <div className="mt-6 whitespace-pre-wrap text-lg leading-9 text-slate-700">
              {question.answer}
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Answered by
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              Dr. Saheed Abdullahi Busari
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Associate Professor · Fiqh & Usul al-Fiqh
            </p>
          </div>
        </article>

        <div className="mt-8">
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft size={16} />
            Back to Questions & Answers
          </Link>
        </div>
      </section>
    </main>
  );
}
