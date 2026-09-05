import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { publications } from "@/data/publications";

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b3a82]">
            Scholarly Work
          </p>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Publications
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Selected scholarly publications by Assoc. Prof. Dr. Saheed
            Abdullahi Busari in Islamic jurisprudence, Islamic finance,
            halal studies, and related fields.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {publications.map((publication) => (
            <article
              key={`${publication.year}-${publication.title}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md sm:p-7"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
                    <span className="text-[#0b3a82]">
                      {publication.year}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <span className="text-slate-500">
                      {publication.type}
                    </span>
                  </div>

                  <h2 className="max-w-4xl font-serif text-xl font-bold leading-7 text-slate-900 sm:text-2xl">
                    {publication.title}
                  </h2>

                  <div className="mt-4 space-y-1 text-sm leading-6 text-slate-600">
                    <p>{publication.journal}</p>

                    {(publication.volume || publication.pages) && (
                      <p className="text-slate-500">
                        {publication.volume}
                        {publication.volume && publication.pages ? " · " : ""}
                        {publication.pages}
                      </p>
                    )}
                  </div>
                </div>

                {publication.url && (
                  <Link
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0b3a82] transition-colors hover:text-[#082d63]"
                  >
                    View Publication
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
