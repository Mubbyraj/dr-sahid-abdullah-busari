import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import {
  Plus,
  ArrowLeft,
  MessageCircleQuestion,
  Mail,
} from "lucide-react";

export default async function AdminQuestionsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>

            <h1 className="mt-3 text-3xl font-semibold">
              Questions & Answers
            </h1>

            <p className="mt-2 text-slate-400">
              Manage questions and verified scholarly responses.
            </p>
          </div>

          <Link
            href="/admin/questions/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            <Plus size={17} />
            New Question
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {error ? (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <h2 className="font-semibold text-red-300">
              Unable to load questions
            </h2>

            <p className="mt-2 text-sm text-red-400">
              Please try again later.
            </p>
          </div>
        ) : !questions || questions.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <MessageCircleQuestion
              size={40}
              className="mx-auto text-slate-600"
            />

            <h2 className="mt-5 text-xl font-semibold">
              No questions yet
            </h2>

            <p className="mt-2 text-slate-400">
              Questions submitted by visitors will appear here.
            </p>

            <Link
              href="/admin/questions/new"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
            >
              Add a question
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-blue-400">
                      {question.category || "General"}
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      {question.question}
                    </h2>

                    {question.name && (
                      <p className="mt-3 text-sm text-slate-400">
                        Asked by {question.name}
                      </p>
                    )}

                    {question.email && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Mail size={14} />
                        {question.email}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs capitalize text-slate-400">
                        {question.status || "pending"}
                      </span>

                      {question.answer && (
                        <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs text-emerald-400">
                          Answered
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/admin/questions/${question.id}`}
                    className="shrink-0 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-blue-500 hover:text-blue-400"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}