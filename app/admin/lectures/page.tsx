import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminLecturesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: lectures, error } = await supabase
    .from("lectures")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/admin"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              ← Admin Dashboard
            </Link>

            <h1 className="mt-2 text-2xl font-semibold">
              Lecture Management
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Upload, edit and publish lectures.
            </p>
          </div>

          <Link
            href="/admin/lectures/new"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            + New Lecture
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {error ? (
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-5 text-red-300">
            Unable to load lectures: {error.message}
          </div>
        ) : !lectures || lectures.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <h2 className="text-xl font-semibold">No lectures yet</h2>

            <p className="mt-2 text-slate-400">
              Create your first lecture to start building the library.
            </p>

            <Link
              href="/admin/lectures/new"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
            >
              Create First Lecture
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-6 py-5">
              <h2 className="font-semibold">
                All Lectures ({lectures.length})
              </h2>
            </div>

            <div className="divide-y divide-slate-800">
              {lectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className="flex flex-col gap-5 p-6 transition hover:bg-slate-800/40 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold text-white">
                        {lecture.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          lecture.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {lecture.status}
                      </span>
                    </div>

                    {lecture.category && (
                      <p className="mt-2 text-sm text-blue-400">
                        {lecture.category}
                      </p>
                    )}

                    {lecture.description && (
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        {lecture.description}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/admin/lectures/${lecture.id}`}
                    className="shrink-0 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
