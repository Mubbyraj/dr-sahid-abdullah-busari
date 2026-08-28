import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Plus, ArrowLeft, FileText } from "lucide-react";

export default async function AdminArticlesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: articles, error } = await supabase
    .from("articles")
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

            <h1 className="mt-3 text-3xl font-semibold">Articles</h1>

            <p className="mt-2 text-slate-400">
              Publish scholarly articles, essays and commentary.
            </p>
          </div>

          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            <Plus size={17} />
            New Article
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {error ? (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <h2 className="font-semibold text-red-300">
              Unable to load articles
            </h2>
            <p className="mt-2 text-sm text-red-400">{error.message}</p>
          </div>
        ) : !articles || articles.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <FileText size={40} className="mx-auto text-slate-600" />
            <h2 className="mt-5 text-xl font-semibold">
              No articles yet
            </h2>
            <p className="mt-2 text-slate-400">
              Create your first scholarly article.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-400">
                      {article.category || "Article"}
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      {article.title}
                    </h2>

                    {article.excerpt && (
                      <p className="mt-3 leading-7 text-slate-400">
                        {article.excerpt}
                      </p>
                    )}

                    <span className="mt-4 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                      {article.status || "draft"}
                    </span>
                  </div>

                  <Link
                    href={`/admin/articles/${article.id}`}
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
