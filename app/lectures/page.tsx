import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  PlayCircle,
  Video,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Lectures",
  description:
    "Watch lectures by Dr. Saheed Abdullahi Busari on Fiqh, Usul al-Fiqh, Islamic jurisprudence and contemporary Islamic issues.",
  alternates: {
    canonical: "/lectures",
  },
};

export const dynamic = "force-dynamic";

export default async function LecturesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: lectures, error } = await supabase
    .from("lectures")
    .select(
      "id,title,slug,category,description,video_url,thumbnail_url,published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <main>
      {/* =========================
          PHOTOGRAPHIC HERO
          ========================= */}
      <section className="inner-hero inner-hero-lectures">
        <div className="inner-hero-overlay" />

        <div className="container inner-hero-content">
          <span className="eyebrow">VIDEO &amp; AUDIO</span>

          <h1>Lectures</h1>

          <p>
            Recorded lectures and educational materials covering Fiqh,
            Usul al-Fiqh and contemporary Islamic issues.
          </p>
        </div>
      </section>

      {/* =========================
          LECTURE CONTENT
          ========================= */}
      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Learning &amp; Teaching</span>

            <h2>
              Explore lectures and educational resources.
            </h2>

            <p>
              Browse published lectures and lessons by Dr. Saheed Abdullahi
              Busari.
            </p>
          </div>

          {/* =========================
              ERROR
              ========================= */}
          {error ? (
            <div className="lecture-status lecture-error">
              <Video size={26} />

              <div>
                <h2>Unable to load lectures right now.</h2>

                <p>
                  Please try again later.
                </p>
              </div>
            </div>
          ) : !lectures || lectures.length === 0 ? (
            /* =========================
                EMPTY STATE
                ========================= */
            <div className="empty-state">
              <PlayCircle size={30} />

              <h3>No published lectures yet</h3>

              <p>
                New lectures will appear here after they are published.
              </p>
            </div>
          ) : (
            /* =========================
                LECTURE GRID
                ========================= */
            <div className="lecture-grid">
              {lectures.map((lecture) => (
                <Link
                  href={`/lectures/${lecture.slug}`}
                  key={lecture.id}
                  className="lecture-card"
                >
                  {/* Thumbnail */}
                  <div className="lecture-thumbnail">
                    {lecture.thumbnail_url ? (
                      <img
                        src={lecture.thumbnail_url}
                        alt={lecture.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="lecture-thumbnail-placeholder">
                        <PlayCircle size={54} />
                      </div>
                    )}

                    <div className="lecture-thumbnail-overlay" />

                    <div className="lecture-play-button">
                      <PlayCircle size={25} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lecture-content">
                    <div className="lecture-meta-row">
                      {lecture.category && (
                        <span className="lecture-category">
                          {lecture.category}
                        </span>
                      )}

                      {lecture.published_at && (
                        <span className="lecture-date">
                          <CalendarDays size={14} />

                          {new Date(
                            lecture.published_at
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>

                    <h3>{lecture.title}</h3>

                    {lecture.description && (
                      <p>{lecture.description}</p>
                    )}

                    <span className="text-link">
                      Watch lecture
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================
          BOTTOM CTA
          ========================= */}
      {!error && lectures && lectures.length > 0 && (
        <section className="page-section lectures-cta-section">
          <div className="container">
            <div className="lecture-cta-card">
              <div>
                <span className="section-kicker">
                  Continue Learning
                </span>

                <h2>
                  Explore more scholarly resources.
                </h2>

                <p>
                  Discover research, publications and answers to questions
                  relating to Islamic scholarship.
                </p>
              </div>

              <div className="lecture-cta-actions">
                <Link
                  href="/research"
                  className="button button-primary"
                >
                  Research
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/questions"
                  className="button button-outline"
                >
                  Questions
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}