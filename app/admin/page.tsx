import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import {
  BookOpen,
  FileText,
  MessageCircleQuestion,
  PenLine,
  LogOut,
  Video,
  ArrowUpRight,
  Mail,
} from "lucide-react";

const adminSections = [
  {
    title: "Lectures",
    description: "Upload and manage lectures, videos and transcripts.",
    href: "/admin/lectures",
    icon: Video,
  },
  {
    title: "Fatwas",
    description: "Create, edit and publish scholarly fatwas.",
    href: "/admin/fatwas",
    icon: PenLine,
  },
  {
    title: "Questions & Answers",
    description: "Answer questions and publish approved responses.",
    href: "/admin/questions",
    icon: MessageCircleQuestion,
  },
  {
    title: "Articles",
    description: "Publish scholarly articles and research writings.",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    title: "Publications",
    description: "Manage books, papers and other publications.",
    href: "/admin/publications",
    icon: BookOpen,
  },
  {
    title: "Subscribers",
    description:
      "View and manage people receiving website notifications.",
    href: "/admin/subscribers",
    icon: Mail,
  },
];

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
              Administration
            </p>

            <h1 className="mt-1 text-xl font-semibold">
              Dr. Saheed Abdullahi Busari
            </h1>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-2xl">
          <p className="text-sm text-blue-400">
            Welcome, {user?.email}
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Scholar Dashboard
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-400">
            Manage the scholarly content published on Dr. Saheed Abdullahi
            Busari&apos;s academic platform.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.href}
                href={section.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/50 hover:bg-slate-900/80"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-600 transition group-hover:text-blue-400"
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {section.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="font-semibold">Website status</h3>

          <p className="mt-2 text-sm text-slate-400">
            The public website is live. Content added through this dashboard
            will become part of the scholarly platform.
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View public website
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}