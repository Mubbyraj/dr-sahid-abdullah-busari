import type { Metadata } from "next";

import Image from "next/image";

import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Landmark,
  ScrollText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Dr. Saheed Abdullahi Busari",
  description:
    "Learn about Dr. Saheed Abdullahi Busari, Associate Professor of Fiqh and Usul al-Fiqh at the International Islamic University Malaysia.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      {/* =========================
          PHOTOGRAPHIC HERO
          ========================= */}
      <section className="inner-hero inner-hero-about">
        <div className="inner-hero-overlay" />

        <div className="container inner-hero-content">
          <span className="eyebrow">ABOUT THE SCHOLAR</span>

          <h1>Dr. Saheed Abdullahi Busari</h1>

          <p>
            Associate Professor of Fiqh &amp; Usul al-Fiqh, academic,
            researcher and educator.
          </p>
        </div>
      </section>

      {/* =========================
          PROFILE
          ========================= */}
      <section className="page-section">
        <div className="container content-grid">
          {/* Photograph */}
          <div className="about-photo-wrap">
            <div
              className="about-photo"
              style={{
                height: "520px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/dr-saheed-abdullahi-busari-official.jpg"
                alt="Dr. Saheed Abdullahi Busari"
                width={1066}
                height={1600}
                priority
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "center top",
                }}
                sizes="(max-width: 900px) 90vw, 430px"
              />
            </div>
          </div>

          {/* Profile text */}
          <div>
            <span className="section-kicker">Academic Profile</span>

            <h2>
              A commitment to knowledge, scholarship and Islamic legal
              studies.
            </h2>

            <p>
              Dr. Saheed Abdullahi Busari is an academic and researcher whose
              work engages Islamic jurisprudence, Usul al-Fiqh and contemporary
              issues in Islamic law and finance.
            </p>

            <p>
              His academic and teaching interests reflect a commitment to
              understanding Islamic legal principles while engaging with the
              questions and challenges of the contemporary world.
            </p>

            <Link href="/contact" className="button button-primary">
              Get in touch
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          AREAS OF SCHOLARSHIP
          ========================= */}
      <section className="page-section about-scholarship-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Areas of Scholarship</span>

            <h2>
              Teaching and research across Islamic legal scholarship.
            </h2>

            <p>
              Explore the principal areas reflected in Dr. Busari&apos;s
              academic work, research and teaching.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="icon-box">
                <BookOpen size={23} />
              </div>

              <h3>Fiqh &amp; Usul al-Fiqh</h3>

              <p>
                Islamic jurisprudence and the principles and methodologies that
                underpin the understanding of Islamic law.
              </p>
            </article>

            <article className="feature-card">
              <div className="icon-box">
                <Landmark size={23} />
              </div>

              <h3>Islamic Law &amp; Finance</h3>

              <p>
                Engagement with Islamic legal questions and contemporary issues
                relating to Islamic finance and society.
              </p>
            </article>

            <article className="feature-card">
              <div className="icon-box">
                <ScrollText size={23} />
              </div>

              <h3>Research &amp; Scholarship</h3>

              <p>
                Academic research, scholarly writing and contributions to the
                wider study of Islamic legal thought.
              </p>
            </article>

            <article className="feature-card">
              <div className="icon-box">
                <GraduationCap size={23} />
              </div>

              <h3>Teaching</h3>

              <p>
                Academic teaching focused on developing understanding of
                Islamic legal studies and scholarly methodology.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================
          EXPLORE MORE
          ========================= */}
      <section className="page-section about-final-section">
        <div className="container">
          <div className="about-final-card">
            <div>
              <span className="section-kicker">Explore the Work</span>

              <h2>
                Discover the research, publications and lectures.
              </h2>

              <p>
                Browse the wider collection of academic and educational
                resources available on this website.
              </p>
            </div>

            <div className="about-final-links">
              <Link href="/research" className="button button-primary">
                Research
                <ArrowRight size={18} />
              </Link>

              <Link href="/publications" className="button button-outline">
                Publications
                <ArrowRight size={18} />
              </Link>

              <Link href="/lectures" className="button button-outline">
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