import Link from "next/link";
import { ArrowRight, MessageCircleQuestion, Plus } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: questions, error } = await supabase
    .from("questions")
    .select(
      "id, name, question, category, answer, status, published_at, created_at"
    )
    .eq("status", "published")
    .not("answer", "is", null)
    .order("published_at", { ascending: false });

  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Knowledge
          </p>

          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-5xl font-semibold">
                Questions & Answers
              </h1>

              <p className="mt-4 max-w-2xl text-slate-300">
                Scholarly answers to questions on Islamic law, worship,
                family, transactions, and contemporary issues.
              </p>
            </div>

            <Link
              href="/questions/ask"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              <Plus size={17} />
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-800">
              Unable to load questions
            </h2>

            <p className="mt-2 text-sm text-red-700">
              Please try again later.
            </p>
          </div>
        ) : !questions || questions.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <MessageCircleQuestion
              size={44}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-2xl font-semibold text-slate-900">
              No published answers yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Published questions and scholarly answers will appear here.
            </p>

            <Link
              href="/questions/ask"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Ask a Question
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                  Latest
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  Recent Questions & Answers
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {questions.map((item) => (
                <Link
                  href={`/questions/${item.id}`}
                  key={item.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
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

                  <h3 className="mt-4 text-xl font-semibold leading-8 text-slate-900">
                    {item.question}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                    {item.answer}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="text-xs text-slate-400">
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      Dr. Saheed Abdullahi Busari
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
