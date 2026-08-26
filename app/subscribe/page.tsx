export default function SubscribePage() {
  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Notifications</p>
          <h1 className="mt-3 text-5xl font-semibold">Stay Updated</h1>
          <p className="mt-5 text-slate-300">
            Receive notifications when new fatwas, lectures and publications are added.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-5 py-20">
        <form className="rounded-3xl border border-slate-200 p-7 shadow-sm">
          <label className="text-sm font-semibold">Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
          <button className="mt-4 w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">
            Subscribe
          </button>
          <p className="mt-4 text-center text-xs text-slate-400">
            Newsletter integration can be connected after the design is approved.
          </p>
        </form>
      </section>
    </main>
  );
}
