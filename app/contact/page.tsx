import Link from "next/link";
import {
  Mail,
  Phone,
  ExternalLink,
  MessageCircleQuestion,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-blue-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Connect
          </p>

          <h1 className="mt-3 text-5xl font-semibold">Contact</h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            For academic enquiries, scholarly correspondence, research
            matters, and questions relating to Islamic jurisprudence.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Contact Details */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Get in touch
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Academic &amp; Scholarly Enquiries
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              For academic correspondence, research enquiries, scholarly
              collaboration, or questions concerning Fiqh, Usul al-Fiqh and
              contemporary Islamic jurisprudence, please use one of the
              contact channels below.
            </p>

            <div className="mt-8 space-y-4">
              {/* Institutional Email */}
              <a
                href="mailto:saheed@iium.edu.my"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Institutional Email
                  </p>

                  <p className="mt-1 font-medium text-slate-950 group-hover:text-blue-700">
                    saheed@iium.edu.my
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Preferred for academic correspondence
                  </p>
                </div>

                <ExternalLink
                  size={17}
                  className="ml-auto mt-1 text-slate-400 transition group-hover:text-blue-600"
                />
              </a>

              {/* Personal Email */}
              <a
                href="mailto:saheedbusari274@gmail.com"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 font-medium text-slate-950 group-hover:text-blue-700">
                    saheedbusari274@gmail.com
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    General correspondence
                  </p>
                </div>

                <ExternalLink
                  size={17}
                  className="ml-auto mt-1 text-slate-400 transition group-hover:text-blue-600"
                />
              </a>

              {/* Telephone */}
              <a
                href="tel:+601127201225"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Telephone
                  </p>

                  <p className="mt-1 font-medium text-slate-950 group-hover:text-blue-700">
                    +60 11-2720 1225
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Direct contact
                  </p>
                </div>

                <ExternalLink
                  size={17}
                  className="ml-auto mt-1 text-slate-400 transition group-hover:text-blue-600"
                />
              </a>
            </div>
          </div>

          {/* Questions CTA */}
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
              <MessageCircleQuestion size={22} />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-950">
              Submit a Scholarly Question
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              If your enquiry concerns a question of Islamic jurisprudence,
              you may submit it through the Questions &amp; Answers section
              of this website.
            </p>

            <Link
              href="/questions"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Questions &amp; Answers
              <ExternalLink size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}