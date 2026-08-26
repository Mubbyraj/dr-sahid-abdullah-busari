import Link from "next/link";
import { questions } from "@/data/content";

export default function QuestionsPage() {
  return (
    <main>
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Knowledge</p>
          <h1 className="mt-3 text-5xl font-semibold">Questions & Answers</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Selected answers to questions on Islamic law and practice.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {questions.map((item) => (
            <Link href="/questions/selected" key={item.title} className="rounded-2xl border border-slate-200 p-7 transition hover:border-blue-300 hover:shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">{item.category}</span>
              <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
