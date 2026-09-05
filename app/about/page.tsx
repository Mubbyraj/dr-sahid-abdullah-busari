import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Landmark,
  Scale,
  ScrollText,
} from "lucide-react";

const qualifications = [
  {
    degree: "PhD in Islamic Jurisprudence",
    institution: "International Islamic University Malaysia",
    year: "2019",
    detail: "Specialisation in Fiqh & Usul al-Fiqh, Maqasid al-Shariah, Islamic Banking & Capital Market.",
  },
  {
    degree: "Master of Arts in Islamic Jurisprudence",
    institution: "International Islamic University Malaysia",
    year: "2017",
    detail: "Specialisation in Fiqh, Usul al-Fiqh & Islamic Banking.",
  },
  {
    degree: "Postgraduate Diploma in Shariah Islamiyyah",
    institution: "American Open University, Egypt",
    year: "2010",
    detail: "",
  },
  {
    degree: "Bachelor of Arts in Arabic and Islamic Studies",
    institution: "Al-Azhar University, Cairo",
    year: "2012",
    detail: "",
  },
  {
    degree: "Higher National Diploma in Business Administration",
    institution: "Yaba College of Technology, Lagos",
    year: "1999",
    detail: "",
  },
];

const researchAreas = [
  "Fiqh & Usul al-Fiqh",
  "Maqasid al-Shariah",
  "Islamic Banking & Capital Market",
  "Halal Financing",
  "Islamic Social Finance",
  "Islamic Wealth Management",
  "Integration of Knowledge",
  "Research Methodology",
  "Sustainable Development",
];

const teachingAreas = [
  "Islamic Jurisprudence",
  "Islamic Legal Maxims",
  "Maqasid al-Shariah",
  "Islamic Social Finance",
  "Islamic Wealth Management",
  "Leadership & Management",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f7f6f1] text-slate-900">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[#0b3a82] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#e3a36b]">
              About the Scholar
            </p>

            <h1 className="font-serif text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-7xl">
              Assoc. Prof. Dr.
              <br />
              Saheed Abdullahi Busari
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-medium text-white/90 sm:text-lg">
              <span>Associate Professor</span>
              <span className="hidden text-white/40 sm:inline">•</span>
              <span>Fiqh &amp; Usul al-Fiqh</span>
              <span className="hidden text-white/40 sm:inline">•</span>
              <span>IIUM</span>
            </div>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
              An academic and researcher in Islamic jurisprudence and legal
              theory whose work explores the relationship between the
              principles of Islamic jurisprudence and contemporary
              socio-economic realities.
            </p>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3a82]">
              Academic Profile
            </p>

            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Scholarship at the intersection of Islamic jurisprudence and
              contemporary realities
            </h2>

            <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-slate-600">
              <p>
                Assoc. Prof. Dr. Saheed Abdullahi Busari is an Associate
                Professor of Islamic jurisprudence and legal theory at the
                International Islamic University Malaysia (IIUM). His academic
                work is centred on Fiqh and Usul al-Fiqh, with particular
                attention to how Islamic legal principles can engage with
                contemporary financial, social, and management issues.
              </p>

              <p>
                His research interests extend across Maqasid al-Shariah,
                Islamic banking and capital markets, halal financing, Islamic
                social finance, Islamic wealth management, integration of
                knowledge, research methodology, and sustainable development.
              </p>

              <p>
                His scholarly work reflects an interdisciplinary approach,
                bringing Islamic revealed knowledge into dialogue with social,
                management, and human sciences. This approach is particularly
                visible in his research on Islamic financial systems,
                contracts, regulation, social finance, and contemporary
                socio-economic questions.
              </p>

              <p>
                Dr. Busari has also contributed to teaching and academic
                research in areas including Islamic jurisprudence, Islamic
                legal maxims, Maqasid al-Shariah, Islamic social finance,
                Islamic wealth management, and leadership and management.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:sticky lg:top-24">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b3a82]/10 text-[#0b3a82]">
              <Landmark size={24} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Current Position
            </p>

            <h3 className="mt-2 font-serif text-2xl font-bold">
              Associate Professor
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Fiqh &amp; Usul al-Fiqh
            </p>

            <div className="my-6 border-t border-slate-200" />

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Institution
            </p>

            <p className="mt-2 font-medium leading-7 text-slate-800">
              International Islamic University Malaysia
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              AbdulHamid AbuSulayman Kulliyyah of Islamic Revealed Knowledge
              and Human Sciences
            </p>
          </aside>
        </div>
      </section>

      {/* Research */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3a82]">
              Research &amp; Expertise
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Areas of scholarly interest
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              His academic and research interests span Islamic jurisprudence,
              legal theory, Islamic finance, and the application of Islamic
              principles to contemporary social and economic challenges.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <div
                key={area}
                className="group rounded-2xl border border-slate-200 bg-[#f7f6f1] p-6 transition hover:-translate-y-1 hover:border-[#0b3a82]/30 hover:shadow-sm"
              >
                <Scale
                  size={21}
                  className="text-[#0b3a82] transition-transform group-hover:scale-110"
                />

                <h3 className="mt-5 font-serif text-lg font-semibold">
                  {area}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3a82]">
              Academic Formation
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Education
            </h2>

            <p className="mt-5 max-w-md leading-7 text-slate-600">
              His academic formation combines traditional Islamic scholarship
              with studies in business administration and contemporary Islamic
              finance.
            </p>
          </div>

          <div className="space-y-4">
            {qualifications.map((qualification, index) => (
              <div
                key={`${qualification.degree}-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-5">
                  <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b3a82]/10 text-[#0b3a82] sm:flex">
                    <GraduationCap size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="font-serif text-xl font-bold leading-snug">
                        {qualification.degree}
                      </h3>

                      <span className="shrink-0 text-sm font-semibold text-[#0b3a82]">
                        {qualification.year}
                      </span>
                    </div>

                    <p className="mt-2 font-medium text-slate-700">
                      {qualification.institution}
                    </p>

                    {qualification.detail && (
                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {qualification.detail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching */}
      <section className="border-y border-slate-200 bg-[#0b3a82] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e3a36b]">
                Teaching
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                Areas of teaching
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-white/70">
                His teaching interests reflect his wider commitment to
                connecting Islamic revealed knowledge with contemporary
                intellectual and professional disciplines.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {teachingAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <BookOpen size={18} className="shrink-0 text-[#e3a36b]" />
                  <span className="text-sm font-medium text-white/90">
                    {area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scholarly Work */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3a82]">
            Scholarly Work
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            Explore his academic contributions
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Browse the resources published on this platform, including
            lectures, fatwas, publications, and other scholarly materials.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Link
            href="/fatwas"
            className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <ScrollText className="text-[#0b3a82]" size={24} />

            <h3 className="mt-5 font-serif text-2xl font-bold">Fatwas</h3>

            <p className="mt-3 leading-7 text-slate-600">
              Explore published Islamic legal responses and scholarly
              guidance.
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0b3a82]">
              Explore Fatwas
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>

          <Link
            href="/lectures"
            className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <BookOpen className="text-[#0b3a82]" size={24} />

            <h3 className="mt-5 font-serif text-2xl font-bold">Lectures</h3>

            <p className="mt-3 leading-7 text-slate-600">
              Access recorded lectures and scholarly lessons.
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0b3a82]">
              View Lectures
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>

          <Link
            href="/publications"
            className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <GraduationCap className="text-[#0b3a82]" size={24} />

            <h3 className="mt-5 font-serif text-2xl font-bold">
              Publications
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Browse academic publications and scholarly research.
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0b3a82]">
              View Publications
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
