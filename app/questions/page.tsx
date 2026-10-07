import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageCircleQuestion,
  Scale,
} from "lucide-react";
import { questions } from "@/data/content";

export const metadata: Metadata = {
  title: "Questions & Answers",
  description:
    "Explore selected answers by Dr. Saheed Abdullahi Busari to questions on Islamic law, jurisprudence and Islamic practice.",
  alternates: {
    canonical: "/questions",
  },
};

export default function QuestionsPage() {
  return (
    <main>
      {/* =========================
          PHOTOGRAPHIC HERO
          ========================= */}
      <section className="inner-hero inner-hero-questions">
        <div className="inner-hero-overlay" />

        <div className="container inner-hero-content">
          <span className="eyebrow">KNOWLEDGE &amp; GUIDANCE</span>

          <h1>Questions &amp; Answers</h1>

          <p>
            Selected answers to questions on Islamic law, jurisprudence and
            matters of Islamic practice.
          </p>
        </div>
      </section>

      {/* =========================
          QUESTIONS
          ========================= */}
      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Knowledge &amp; Guidance</span>

            <h2>
              Explore selected questions and scholarly answers.
            </h2>

            <p>
              Browse selected questions addressing Islamic law and practice,
              presented as part of Dr. Saheed Abdullahi Busari&apos;s scholarly
              work and educational resources.
            </p>
          </div>

          <div className="questions-grid">
            {questions.map((item) => (
              <Link
                href="/questions/selected"
                key={item.title}
                className="question-card"
              >
                <div className="question-card-top">
                  <div className="icon-box">
                    <MessageCircleQuestion size={23} />
                  </div>

                  <span className="question-category">
                    {item.category}
                  </span>
                </div>

                <h2>{item.title}</h2>

                <p>{item.excerpt}</p>

                <span className="text-link">
                  Read answer
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          {questions.length === 0 && (
            <div className="empty-state">
              <BookOpen size={30} />

              <h3>No questions available yet</h3>

              <p>
                Selected questions and answers will appear here as they are
                added to the collection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          GUIDANCE CTA
          ========================= */}
      <section className="page-section questions-cta-section">
        <div className="container">
          <div className="questions-cta-card">
            <div className="questions-cta-icon">
              <Scale size={25} />
            </div>

            <div className="questions-cta-content">
              <span className="section-kicker">
                Islamic Legal Scholarship
              </span>

              <h2>
                Explore the wider academic work.
              </h2>

              <p>
                Continue to the research and publications sections to explore
                broader areas of Islamic jurisprudence and scholarly work.
              </p>
            </div>

            <div className="questions-cta-actions">
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