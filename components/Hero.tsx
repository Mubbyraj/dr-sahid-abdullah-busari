"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#ebe9df] text-slate-900">
      {/* Top light area */}
      <div className="h-16 bg-[#ebe9df] sm:h-20 lg:h-24" />

      {/* Main blue hero band */}
      <div className="relative bg-[#0b3a82]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[430px] items-center justify-center lg:min-h-[390px]">

            {/* Portrait */}
            <div
              className="
                relative
                z-10
                h-[300px]
                w-[250px]
                shrink-0
                overflow-hidden
                bg-[#e7e5dc]
                shadow-2xl
                sm:h-[350px]
                sm:w-[295px]
                lg:absolute
                lg:left-[10%]
                lg:top-1/2
                lg:h-[400px]
                lg:w-[335px]
                lg:-translate-y-1/2
              "
            >
              <Image
                src="/images/dr-saheed-abdullahi-busari-official.jpg"
                alt="Dr. Saheed Abdullahi Busari"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 640px) 250px, (max-width: 1024px) 295px, 335px"
              />
            </div>

            {/* Name + academic information */}
            <div
              className="
                relative
                z-10
                hidden
                max-w-xl
                lg:ml-[42%]
                lg:block
              "
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Academic Profile
              </p>

              <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight text-[#c76f52] xl:text-6xl">
                Dr. Saheed
                <span className="block">Abdullahi</span>
                <span className="block">Busari</span>
              </h1>

              <p className="mt-6 text-sm font-semibold text-white">
                Associate Professor · Fiqh &amp; Usul al-Fiqh
              </p>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
                Islamic jurisprudence, legal theory, and contemporary Islamic finance.
              </p>

              <div className="mt-7">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-75"
                >
                  About Dr. Busari
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile text */}
      <div className="bg-[#0b3a82] px-5 pb-12 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Academic Profile
          </p>

          <h1 className="font-serif text-4xl font-bold leading-[0.95] tracking-tight text-[#c76f52] sm:text-5xl">
            Dr. Saheed
            <span className="block">Abdullahi</span>
            <span className="block">Busari</span>
          </h1>

          <p className="mt-5 text-sm font-semibold text-white">
            Associate Professor · Fiqh &amp; Usul al-Fiqh
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/75">
            Islamic jurisprudence, legal theory, and contemporary Islamic finance.
          </p>

          <div className="mt-7">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-75"
            >
              About Dr. Busari
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}