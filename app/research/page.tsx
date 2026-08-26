import Link from "next/link";

export default function ResearchPage() {
  return (
    <main>
      <section className="bg-blue-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Academic Work</p>
          <h1 className="mt-3 text-5xl font-semibold">Research</h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            Research areas, projects and scholarly contributions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            "Fiqh & Usul al-Fiqh",
            "Islamic Finance",
            "Halal Industry & Shariah",
            "Contemporary Islamic Legal Issues",
            "Islamic Social Finance",
            "Waqf & Zakat",
          ].map((area) => (
            <Link key={area} href="/publications" className="rounded-2xl border border-slate-200 p-7 text-xl font-semibold transition hover:border-blue-300 hover:text-blue-700">
              {area}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
