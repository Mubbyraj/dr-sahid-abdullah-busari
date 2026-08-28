import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminSubscribersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <h1 className="mt-4 text-3xl font-semibold">
            Newsletter Subscribers
          </h1>

          <p className="mt-2 text-slate-400">
            View people subscribed to updates from Dr. Sahid Abdullah Busari.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {error ? (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <h2 className="font-semibold text-red-300">
              Unable to load subscribers
            </h2>
            <p className="mt-2 text-sm text-red-400">
              {error.message}
            </p>
          </div>
        ) : !subscribers?.length ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <Mail size={40} className="mx-auto text-slate-600" />
            <h2 className="mt-5 text-xl font-semibold">
              No subscribers yet
            </h2>
            <p className="mt-2 text-slate-400">
              Newsletter subscribers will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left">
              <thead className="border-b border-slate-800 bg-slate-950">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Subscribed
                  </th>
                </tr>
              </thead>

              <tbody>
                {subscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-b border-slate-800 last:border-0"
                  >
                    <td className="px-6 py-4">
                      {subscriber.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs text-emerald-400">
                        {subscriber.status || "active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {subscriber.created_at
                        ? new Date(
                            subscriber.created_at
                          ).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
