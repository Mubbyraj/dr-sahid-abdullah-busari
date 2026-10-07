import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Scale,
  Search,
} from "lucide-react";
import { fatwas } from "@/data/content";

export const metadata: Metadata = {
  title: "Fatwas",
  description:
    "Browse selected fatwas and Islamic legal responses by Dr. Saheed Abdullahi Busari on matters of Islamic law and contemporary practice.",
  alternates: {
    canonical: "/fatwas",
  },
};

export default function FatwasPage() {
  return (
    <main>
      {/* =========================
          PHOTOGRAPHIC HERO
          ========================= */}
      <section className="inner-hero inner-hero-fatwas">
        <div className="inner-hero-overlay" />

        <div className="container inner-hero-content">
          <span className="eyebrow">
            ISLAMIC LEGAL RESPONSES
          </span>

          <h1>Fatwas</h1>

          <p>
            Selected Islamic legal responses addressing questions of
            jurisprudence, worship and contemporary Muslim life.
          </p>
        </div>
      </section>

      {/* =========================
          FATWA COLLECTION
          ========================= */}
      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">
              Islamic Legal Scholarship
            </span>

            <h2>
              Explore selected fatwas and legal responses.
            </h2>

            <p>
              Browse the collection of Islamic legal responses and scholarly
              guidance covering matters of Islamic law and practice.
            </p>
          </div>

          {/* Search */}
          <div className="fatwa-search-wrap">
            <div className="fatwa-search">
              <Search size={19} />

              <input
                type="search"
                placeholder="Search fatwas..."
                aria-label="Search fatwas"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="fatwa-grid">
            {fatwas.map((fatwa) => (
              <Link
                key={fatwa.title}
                href="/fatwas/recent"
                className="fatwa-card"
              >
                <div className="fatwa-card-header">
                  <div className="icon-box">
                    <Scale size={23} />
                  </div>

                  <span className="fatwa-category">
                    {fatwa.category}
                  </span>
                </div>

                <h2>{fatwa.title}</h2>

                <p>{fatwa.excerpt}</p>

                <span className="text-link">
                  Read fatwa
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          {fatwas.length === 0 && (
            <div className="empty-state">
              <BookOpen size={30} />

              <h3>No fatwas available yet</h3>

              <p>
                Published legal responses will appear here as they are added
                to the collection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          BOTTOM CTA
          ========================= */}
      <section className="page-section fatwas-cta-section">
        <div className="container">
          <div className="fatwa-cta-card">
            <div className="fatwa-cta-icon">
              <Scale size={25} />
            </div>

            <div className="fatwa-cta-content">
              <span className="section-kicker">
                Further Study
              </span>

              <h2>
                Explore Islamic jurisprudence in greater depth.
              </h2>

              <p>
                Discover research, publications and lectures covering Fiqh,
                Usul al-Fiqh and related areas of Islamic scholarship.
              </p>
            </div>

            <div className="fatwa-cta-actions">
              <Link
                href="/research"
                className="button button-primary"
              >
                Research
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/lectures"
                className="button button-outline"
              >
                Lectures
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}