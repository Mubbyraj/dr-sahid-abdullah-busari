import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminFatwasPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: fatwas,
    error,
  } = await supabase
    .from("fatwas")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-slate-950">
              Fatwas
            </h1>

            <p className="mt-3 text-slate-600">
              Create, review and manage Dr. Saheed Abdullahi Busari&apos;s
              published fatwas.
            </p>
          </div>

          <Link
            href="/admin/fatwas/new"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + New Fatwa
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Unable to load fatwas: {error.message}
          </div>
        )}

        {!fatwas || fatwas.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No fatwas yet
            </h2>

            <p className="mt-2 text-slate-500">
              Create the first fatwa from the button above.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="divide-y divide-slate-100">
              {fatwas.map((fatwa) => (
                <div
                  key={fatwa.id}
                  className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {fatwa.category || "Fiqh"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          fatwa.published
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {fatwa.published ? "Published" : "Draft"}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-semibold text-slate-950">
                      {fatwa.title}
                    </h2>

                    {fatwa.excerpt && (
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {fatwa.excerpt}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/admin/fatwas/${fatwa.id}`}
                    className="shrink-0 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
