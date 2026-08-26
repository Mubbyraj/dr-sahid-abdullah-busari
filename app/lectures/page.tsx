import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { lectures } from "@/data/content";

export default function LecturesPage() {
  return (
    <main>
      <section className="bg-blue-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Video & Audio</p>
          <h1 className="mt-3 text-5xl font-semibold">Lectures</h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            Recorded lectures and educational materials.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-7 md:grid-cols-3">
          {lectures.map((lecture) => (
            <Link href="/lectures/featured" key={lecture.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex aspect-video items-center justify-center bg-slate-950">
                <PlayCircle size={50} className="text-blue-400 transition group-hover:scale-110" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">{lecture.category}</span>
                <h2 className="mt-2 text-xl font-semibold">{lecture.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{lecture.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
