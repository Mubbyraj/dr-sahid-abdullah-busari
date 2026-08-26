export default function AboutPage() {
  return (
    <main>
      <section className="bg-slate-950 px-5 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">About</p>
          <h1 className="mt-4 text-5xl font-semibold">Dr. Sahid Abdullah Busari</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Associate Professor • Fiqh & Usul al-Fiqh
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
            <img
              src="/images/dr-saheed-abdullahi-busari.jpg"
              alt="Dr. Sahid Abdullah Busari"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Academic Profile</h2>
            <p className="mt-6 leading-8 text-slate-600">
              Dr. Sahid Abdullah Busari is an academic and researcher whose
              work engages Islamic jurisprudence, Usul al-Fiqh and contemporary
              issues in Islamic law and finance.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Field</p>
                <p className="mt-2 font-semibold">Fiqh & Usul al-Fiqh</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Research</p>
                <p className="mt-2 font-semibold">Islamic Law & Contemporary Issues</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Scholarship</p>
                <p className="mt-2 font-semibold">Jurisprudence & Islamic Finance</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Teaching</p>
                <p className="mt-2 font-semibold">Islamic Legal Studies</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
