"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1650083731644-0596fafde3e5?auto=format&fit=crop&fm=jpg&q=68&w=1920",
    eyebrow: "Academic Profile",
    title: "Dr. Saheed Abdullahi Busari",
    role: "Associate Professor · Fiqh & Usul al-Fiqh",
    description:
      "Islamic jurisprudence, legal theory, and contemporary Islamic finance.",
    cta: "Explore Academic Profile",
    href: "/about",
  },
  {
    image:
      "https://images.unsplash.com/photo-1577561426384-62154a1e9457?auto=format&fit=crop&fm=jpg&q=68&w=1920",
    eyebrow: "Fiqh & Usul al-Fiqh",
    title: "Scholarship rooted in Islamic jurisprudence",
    role: "Research · Teaching · Scholarly Engagement",
    description:
      "Exploring Islamic legal principles and their application to contemporary social and economic questions.",
    cta: "View Research",
    href: "/research",
  },
  {
    image:
      "https://images.unsplash.com/photo-1761939998890-cf9da6986546?auto=format&fit=crop&fm=jpg&q=68&w=1920",
    eyebrow: "Islamic Finance & Contemporary Issues",
    title: "Research at the intersection of Shariah and society",
    role: "Islamic Finance · Maqasid al-Shariah · Social Finance",
    description:
      "Academic work connecting the principles of Islamic jurisprudence with contemporary financial and social realities.",
    cta: "View Publications",
    href: "/publications",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active];

  return (
    <section
      className="relative isolate min-h-[560px] overflow-hidden bg-[#071a2e] text-white sm:min-h-[620px]"
      aria-label="Dr. Saheed Abdullahi Busari academic profile"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((item, index) => (
        <div
          key={item.image}
          aria-hidden={index !== active}
          className={`absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-1000 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url("${item.image}")` }}
        />
      ))}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,25,49,0.94)_0%,rgba(5,35,70,0.82)_42%,rgba(5,35,70,0.42)_100%)]" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#04182d]/80 via-transparent to-[#04182d]/20" />

      <div className="mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-24 sm:min-h-[620px] sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-blue-300" />

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-200">
              {slide.eyebrow}
            </p>
          </div>

          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {slide.title}
          </h1>

          <p className="mt-6 text-base font-semibold text-white sm:text-lg">
            {slide.role}
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
            >
              {slide.cta}
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/publications"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Scholarly Work
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === active
                ? "w-9 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-5 right-5 hidden gap-2 sm:flex">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() =>
            setActive((current) => (current - 1 + slides.length) % slides.length)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() =>
            setActive((current) => (current + 1) % slides.length)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
