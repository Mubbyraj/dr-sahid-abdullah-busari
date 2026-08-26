import { publications } from "@/data/publications";

export default function PublicationsPage() {
  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Academic Work</p>
          <h1 className="mt-3 text-5xl font-semibold">Publications</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Selected academic publications and research works.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {publications.map((publication) => (
            <article key={publication.title} className="py-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                <span className="w-14 shrink-0 text-sm font-bold text-blue-700">{publication.year}</span>
                <div>
                  <h2 className="text-lg font-semibold leading-7 text-slate-900">{publication.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {publication.journal} · {publication.volume && `Vol. ${publication.volume}`} · pp. {publication.pages}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
