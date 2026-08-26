export default function ArticlesPage() {
  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Writing</p>
          <h1 className="mt-3 text-5xl font-semibold">Articles</h1>
          <p className="mt-4 text-slate-300">Selected articles and scholarly commentary.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="rounded-2xl border border-slate-200 p-8">
          <h2 className="text-2xl font-semibold">Articles will appear here</h2>
          <p className="mt-3 leading-7 text-slate-500">
            This section is ready for verified articles, essays and commentary.
          </p>
        </div>
      </section>
    </main>
  );
}
