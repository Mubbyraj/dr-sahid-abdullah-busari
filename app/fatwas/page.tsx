import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { fatwas } from "@/data/content";

export default function FatwasPage() {
  return (
    <main>
      <section className="bg-blue-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Islamic Legal Responses</p>
          <h1 className="mt-3 text-5xl font-semibold">Fatwas</h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            Browse newly published and archived fatwas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 flex max-w-xl items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
          <Search size={19} className="text-slate-400" />
          <input className="w-full outline-none placeholder:text-slate-400" placeholder="Search fatwas..." />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {fatwas.map((fatwa) => (
            <Link key={fatwa.title} href="/fatwas/recent" className="group rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">{fatwa.category}</span>
              <h2 className="mt-3 text-xl font-semibold group-hover:text-blue-700">{fatwa.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{fatwa.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Read fatwa <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
