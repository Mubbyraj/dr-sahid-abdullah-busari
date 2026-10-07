import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  PenLine,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Explore articles, essays and scholarly commentary by Dr. Saheed Abdullahi Busari on Islamic jurisprudence and contemporary Islamic issues.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesPage() {
  return (
    <main>
      {/* =========================
          PHOTOGRAPHIC HERO
          ========================= */}
      <section className="inner-hero inner-hero-articles">
        <div className="inner-hero-overlay" />

        <div className="container inner-hero-content">
          <span className="eyebrow">WRITING &amp; COMMENTARY</span>

          <h1>Articles</h1>

          <p>
            Selected articles, essays and scholarly commentary on Islamic
            jurisprudence and contemporary issues.
          </p>
        </div>
      </section>

      {/* =========================
          INTRODUCTION
          ========================= */}
      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Scholarly Writing</span>

            <h2>
              Thoughtful engagement with Islamic scholarship and contemporary
              questions.
            </h2>

            <p>
              This section brings together articles, essays and commentary
              addressing areas of Islamic law, jurisprudence and issues
              relevant to contemporary Muslim societies.
            </p>
          </div>

          {/* =========================
              ARTICLE COLLECTION
              ========================= */}
          <div className="articles-placeholder-card">
            <div className="articles-placeholder-icon">
              <PenLine size={28} />
            </div>

            <span className="section-kicker">Article Collection</span>

            <h2>Articles will appear here</h2>

            <p>
              This collection is being prepared for verified articles,
              essays and scholarly commentary. Published materials will be
              added here as they become available.
            </p>

            <div className="articles-placeholder-features">
              <div>
                <FileText size={19} />
                <span>Scholarly articles</span>
              </div>

              <div>
                <BookOpen size={19} />
                <span>Academic essays</span>
              </div>

              <div>
                <PenLine size={19} />
                <span>Commentary</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          EXPLORE MORE
          ========================= */}
      <section className="page-section articles-cta-section">
        <div className="container">
          <div className="articles-cta-card">
            <div>
              <span className="section-kicker">
                Explore the Scholarship
              </span>

              <h2>
                Discover research and published academic work.
              </h2>

              <p>
                Explore the wider academic resources available on the
                website, including research areas and publications.
              </p>
            </div>

            <div className="articles-cta-actions">
              <Link
                href="/research"
                className="button button-primary"
              >
                Research
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/publications"
                className="button button-outline"
              >
                Publications
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}