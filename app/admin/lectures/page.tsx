import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";

type PageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function AdminLecturesPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const activeFilter =
    params.status === "published" || params.status === "draft"
      ? params.status
      : "all";

  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("lectures")
    .select("*")
    .order("created_at", { ascending: false });

  if (activeFilter === "published") {
    query = query.eq("status", "published");
  }

  if (activeFilter === "draft") {
    query = query.eq("status", "draft");
  }

  const { data: lectures, error } = await query;

  const allCountQuery = await supabase
    .from("lectures")
    .select("id, status");

  const allLectures = allCountQuery.data ?? [];
  const allCount = allLectures.length;
  const publishedCount = allLectures.filter(
    (lecture) => lecture.status === "published"
  ).length;
  const draftCount = allLectures.filter(
    (lecture) => lecture.status === "draft"
  ).length;

  const tabs = [
    {
      label: "All",
      value: "all",
      count: allCount,
      href: "/admin/lectures",
    },
    {
      label: "Published",
      value: "published",
      count: publishedCount,
      href: "/admin/lectures?status=published",
    },
    {
      label: "Drafts",
      value: "draft",
      count: draftCount,
      href: "/admin/lectures?status=draft",
    },
  ];

  const heading =
    activeFilter === "published"
      ? "Published Lectures"
      : activeFilter === "draft"
        ? "Draft Lectures"
        : "All Lectures";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="text-sm text-blue-400 transition hover:text-blue-300"
            >
              ← Admin Dashboard
            </Link>

            <h1 className="mt-2 text-2xl font-semibold">
              Lecture Management
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Create, edit, organize and publish lectures.
            </p>
          </div>

          <Link
            href="/admin/lectures/new"
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
          >
            + New Lecture
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-900 p-2">
          {tabs.map((tab) => {
            const active = activeFilter === tab.value;

            return (
              <Link
                key={tab.value}
                href={tab.href}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </Link>
            );
          })}
        </div>

        {error ? (
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-5 text-red-300">
            Unable to load lectures: {error.message}
          </div>
        ) : !lectures || lectures.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <h2 className="text-xl font-semibold">
              {activeFilter === "draft"
                ? "No drafts yet"
                : activeFilter === "published"
                  ? "No published lectures"
                  : "No lectures yet"}
            </h2>

            <p className="mt-2 text-slate-400">
              {activeFilter === "all"
                ? "Create your first lecture to start building the library."
                : activeFilter === "draft"
                  ? "Draft lectures will appear here."
                  : "Published lectures will appear here."}
            </p>

            {activeFilter === "all" && (
              <Link
                href="/admin/lectures/new"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Create First Lecture
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-6 py-5">
              <h2 className="font-semibold">
                {heading} ({lectures.length})
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
                        {lecture.status === "published"
                          ? "Published"
                          : "Draft"}
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

                    <p className="mt-3 text-xs text-slate-500">
                      {lecture.status === "published"
                        ? lecture.published_at
                          ? `Published ${new Date(
                              lecture.published_at
                            ).toLocaleDateString()}`
                          : "Published"
                        : "Not visible publicly"}
                    </p>
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
