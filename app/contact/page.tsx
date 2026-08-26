export default function ContactPage() {
  return (
    <main>
      <section className="bg-blue-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Connect</p>
          <h1 className="mt-3 text-5xl font-semibold">Contact</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <div className="rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Get in touch</h2>
          <p className="mt-3 leading-7 text-slate-500">
            Official contact details will be added once confirmed.
          </p>
        </div>
      </section>
    </main>
  );
}
