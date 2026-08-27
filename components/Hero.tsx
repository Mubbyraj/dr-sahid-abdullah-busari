"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.28),transparent_35%),linear-gradient(135deg,#020617,#0f172a)]" />

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            Fiqh • Usul al-Fiqh • Islamic Research
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Dr. Saheed Abdullahi
            <span className="block text-blue-400">Busari</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Associate Professor and scholar specialising in Fiqh, Usul
            al-Fiqh and contemporary Islamic legal research.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/fatwas"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Fatwas
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/lectures"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <PlayCircle size={17} />
              Watch Lectures
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[360px] lg:max-w-[430px]"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
            <Image
              src="/images/dr-saheed-abdullahi-busari-official.jpg"
              alt="Dr. Saheed Abdullahi Busari"
              width={1066}
              height={1600}
              priority
              className="h-auto w-full object-cover object-top"
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 55vw, 430px"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
