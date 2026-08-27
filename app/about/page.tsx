import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      <section className="bg-slate-950 px-5 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            About
          </p>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Dr. Saheed Abdullahi Busari
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Associate Professor • Fiqh &amp; Usul al-Fiqh
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid items-start gap-12 md:grid-cols-[0.9fr_1.5fr]">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
            <Image
              src="/images/dr-saheed-abdullahi-busari-official.jpg"
              alt="Dr. Saheed Abdullahi Busari"
              width={1066}
              height={1600}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 90vw, 380px"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Academic Profile</h2>

            <p className="mt-6 leading-8 text-slate-600">
              Dr. Saheed Abdullahi Busari is an academic and researcher whose
              work engages Islamic jurisprudence, Usul al-Fiqh and contemporary
              issues in Islamic law and finance.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Field
                </p>
                <p className="mt-2 font-semibold">Fiqh &amp; Usul al-Fiqh</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Research
                </p>
                <p className="mt-2 font-semibold">
                  Islamic Law &amp; Contemporary Issues
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Scholarship
                </p>
                <p className="mt-2 font-semibold">
                  Jurisprudence &amp; Islamic Finance
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Teaching
                </p>
                <p className="mt-2 font-semibold">
                  Islamic Legal Studies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
