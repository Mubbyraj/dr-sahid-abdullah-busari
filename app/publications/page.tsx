import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { publications } from "@/data/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Explore publications by Dr. Saheed Abdullahi Busari, Associate Professor of Fiqh and Usul al-Fiqh at the International Islamic University Malaysia.",
  alternates: {
    canonical: "/publications",
  },
};

export default function PublicationsPage() {
  return (
    <main>
      {/* =========================
          PHOTOGRAPHIC HERO
          ========================= */}
      <section className="inner-hero inner-hero-publications">
        <div className="inner-hero-overlay" />

        <div className="container inner-hero-content">
          <span className="eyebrow">ACADEMIC WORK</span>

          <h1>Publications</h1>

          <p>
            Selected academic publications and research works by Dr. Saheed
            Abdullahi Busari.
          </p>
        </div>
      </section>

      {/* =========================
          INTRODUCTION
          ========================= */}
      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Scholarly Contributions</span>

            <h2>
              Academic research and contributions to Islamic scholarship.
            </h2>

            <p>
              Browse selected publications covering areas of Islamic
              jurisprudence, Usul al-Fiqh, Islamic finance and related fields.
            </p>
          </div>

          {/* =========================
              PUBLICATION LIST
              ========================= */}
          <div className="publication-list publication-list-enhanced">
            {publications.map((publication) => (
              <article
                key={publication.title}
                className="publication-card publication-card-enhanced"
              >
                <div className="publication-year">
                  {publication.year}
                </div>

                <div className="publication-icon">
                  <BookOpen size={24} />
                </div>

                <div className="publication-content">
                  <span className="publication-type">
                    ACADEMIC PUBLICATION
                  </span>

                  <h3>{publication.title}</h3>

                  <p className="publication-meta">
                    {publication.journal}
                    {publication.volume && ` · Vol. ${publication.volume}`}
                    {publication.pages && ` · pp. ${publication.pages}`}
                  </p>

                  <div className="publication-actions">
                    <Link href="/contact" className="text-link">
                      Publication enquiry
                      <ArrowRight size={16} />
                    </Link>

                    <span className="publication-reference">
                      <ExternalLink size={14} />
                      Scholarly work
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* =========================
              EMPTY STATE
              ========================= */}
          {publications.length === 0 && (
            <div className="empty-state">
              <BookOpen size={28} />

              <h3>No publications available yet</h3>

              <p>
                Publications will appear here as scholarly works are added to
                the collection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          CTA
          ========================= */}
      <section className="page-section publications-cta-section">
        <div className="container">
          <div className="publication-cta-card">
            <div>
              <span className="section-kicker">Academic Enquiries</span>

              <h2>Interested in a publication or research area?</h2>

              <p>
                Get in touch for relevant academic enquiries and scholarly
                matters.
              </p>
            </div>

            <Link href="/contact" className="button button-primary">
              Contact
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}