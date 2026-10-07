import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Dr. Saheed Abdullahi Busari for academic, research and scholarly enquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <section className="inner-hero inner-hero-contact">
        <div className="inner-hero-overlay" />
        <div className="container inner-hero-content">
          <span className="eyebrow">CONNECT</span>
          <h1>Contact</h1>
          <p>
            Academic, research and scholarly enquiries.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Get in Touch</span>
            <h2>
              Connect regarding academic and scholarly matters.
            </h2>
            <p>
              For academic enquiries, research collaboration and other
              scholarly matters, you can contact Dr. Saheed Abdullahi Busari
              through the official channels below.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-intro-card">
              <div className="contact-large-icon">
                <UserRound size={30} />
              </div>

              <span className="section-kicker">
                Academic Contact
              </span>

              <h2>
                Dr. Saheed Abdullahi Busari
              </h2>

              <p>
                Associate Professor of Fiqh &amp; Usul al-Fiqh,
                academic and researcher.
              </p>

              <p>
                International Islamic University Malaysia (IIUM)
              </p>
            </div>

            <div className="contact-options">
              <a
                href="mailto:saheed@iium.edu.my"
                className="contact-option-card"
              >
                <div className="icon-box">
                  <Mail size={22} />
                </div>

                <div>
                  <span>Academic Email</span>
                  <h3>saheed@iium.edu.my</h3>
                  <p>
                    Official IIUM academic email for scholarly and
                    university-related enquiries.
                  </p>
                </div>
              </a>

              <a
                href="mailto:saheedbusari274@gmail.com"
                className="contact-option-card"
              >
                <div className="icon-box">
                  <Mail size={22} />
                </div>

                <div>
                  <span>Email</span>
                  <h3>saheedbusari274@gmail.com</h3>
                  <p>
                    Email for general academic, research and scholarly
                    enquiries.
                  </p>
                </div>
              </a>

              <a
                href="tel:+601127201225"
                className="contact-option-card"
              >
                <div className="icon-box">
                  <Phone size={22} />
                </div>

                <div>
                  <span>Phone</span>
                  <h3>+60 11-2720 1225</h3>
                  <p>
                    Contact Dr. Busari directly by telephone.
                  </p>
                </div>
              </a>

              <div className="contact-option-card">
                <div className="icon-box">
                  <MessageCircle size={22} />
                </div>

                <div>
                  <span>Academic Enquiries</span>
                  <h3>Research &amp; scholarly matters</h3>
                  <p>
                    Enquiries concerning research, publications,
                    lectures and academic collaboration are welcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section contact-cta-section">
        <div className="container">
          <div className="contact-cta-card">
            <div>
              <span className="section-kicker">
                Explore the Website
              </span>

              <h2>
                Discover the academic work.
              </h2>

              <p>
                Explore research, publications and lectures by Dr. Saheed
                Abdullahi Busari.
              </p>
            </div>

            <div className="contact-cta-actions">
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
