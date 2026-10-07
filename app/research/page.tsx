import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Landmark,
  Scale,
  Search,
  Coins,
  HandCoins,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore the research interests and academic work of Dr. Saheed Abdullahi Busari in Fiqh, Usul al-Fiqh, Islamic jurisprudence and related fields.",
  alternates: {
    canonical: "/research",
  },
};

const researchAreas = [
  {
    title: "Fiqh & Usul al-Fiqh",
    description:
      "Research into Islamic jurisprudence and the principles and methodologies used in understanding Islamic law.",
    icon: Scale,
  },
  {
    title: "Islamic Finance",
    description:
      "Academic engagement with Islamic financial principles, contemporary financial questions and Shariah-based approaches.",
    icon: Coins,
  },
  {
    title: "Halal Industry & Shariah",
    description:
      "Research examining Shariah considerations and contemporary issues within the growing halal industry.",
    icon: Landmark,
  },
  {
    title: "Contemporary Islamic Legal Issues",
    description:
      "Exploration of modern questions through the framework of Islamic jurisprudence and legal reasoning.",
    icon: Search,
  },
  {
    title: "Islamic Social Finance",
    description:
      "Study of Islamic social finance and its role in addressing economic and social needs.",
    icon: HandCoins,
  },
  {
    title: "Waqf & Zakat",
    description:
      "Research into the principles and contemporary applications of waqf and zakat within Islamic social and economic systems.",
    icon: BookOpen,
  },
];

export default function ResearchPage() {
  return (
    <main>
      {/* =========================
          PHOTOGRAPHIC HERO
          ========================= */}
      <section className="inner-hero inner-hero-research">
        <div className="inner-hero-overlay" />

        <div className="container inner-hero-content">
          <span className="eyebrow">ACADEMIC WORK</span>

          <h1>Research</h1>

          <p>
            Research interests, academic projects and scholarly contributions
            in Islamic jurisprudence and related fields.
          </p>
        </div>
      </section>

      {/* =========================
          INTRODUCTION
          ========================= */}
      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Research Areas</span>

            <h2>
              Exploring Islamic law in both classical and contemporary
              contexts.
            </h2>

            <p>
              Dr. Saheed Abdullahi Busari&apos;s research engages Fiqh, Usul
              al-Fiqh and a range of contemporary issues at the intersection
              of Islamic law, finance and society.
            </p>
          </div>

          {/* =========================
              RESEARCH CARDS
              ========================= */}
          <div className="feature-grid research-grid">
            {researchAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article className="feature-card research-card" key={area.title}>
                  <div className="icon-box">
                    <Icon size={23} />
                  </div>

                  <h3>{area.title}</h3>

                  <p>{area.description}</p>

                  <Link href="/publications" className="text-link">
                    Explore publications
                    <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          RESEARCH CTA
          ========================= */}
      <section className="page-section research-cta-section">
        <div className="container">
          <div className="research-cta-card">
            <div>
              <span className="section-kicker">Scholarly Contributions</span>

              <h2>Explore the published work.</h2>

              <p>
                Discover publications and scholarly materials connected to
                these areas of research.
              </p>
            </div>

            <Link href="/publications" className="button button-primary">
              View publications
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}