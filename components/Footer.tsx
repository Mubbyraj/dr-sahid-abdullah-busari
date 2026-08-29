import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  MessageCircleQuestion,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-intro">
            <div className="footer-brand">
              <div>
                <strong>Dr. Saheed Abdullahi Busari</strong>
                <span>Associate Professor</span>
              </div>
            </div>

            <p>
              Academic and scholarly resources in Fiqh, Usul al-Fiqh and
              contemporary Islamic jurisprudence.
            </p>

            <Link href="/about" className="footer-link">
              Academic profile <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="footer-column">
            <h3>Scholarly Resources</h3>

            <Link href="/fatwas">
              <MessageCircleQuestion size={16} />
              Fatwas
            </Link>

            <Link href="/questions">
              <MessageCircleQuestion size={16} />
              Questions &amp; Answers
            </Link>

            <Link href="/lectures">
              <BookOpen size={16} />
              Lectures
            </Link>

            <Link href="/publications">
              <BookOpen size={16} />
              Publications
            </Link>
          </div>

          <div className="footer-column">
            <h3>Information</h3>

            <Link href="/about">About</Link>
            <Link href="/research">Research</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h3>Stay Updated</h3>

            <p>
              Receive notifications when new fatwas, lectures, publications
              and scholarly articles are published.
            </p>

            <Link href="/subscribe" className="footer-subscribe">
              <Mail size={16} />
              Subscribe for updates
              <ArrowUpRight size={14} />
            </Link>

            <Link href="/contact" className="footer-link">
              Contact Dr. Busari
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} Dr. Saheed Abdullahi Busari. All
            rights reserved.
          </p>

          <div>
            <Link href="/privacy">Privacy</Link>
            <span>·</span>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}