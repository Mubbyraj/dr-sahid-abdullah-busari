"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Fatwas", href: "/fatwas" },
  { label: "Questions & Answers", href: "/questions" },
  { label: "Lectures", href: "/lectures" },
  { label: "Publications", href: "/publications" },
  { label: "Research", href: "/research" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Academic &amp; Scholarly Resources</span>
          <span>Fiqh · Usul al-Fiqh · Islamic Jurisprudence</span>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <div className="brand-mark">SB</div>
            <div className="brand-text">
              <strong>Dr. Saheed Abdullahi Busari</strong>
              <span>Associate Professor · Fiqh &amp; Usul al-Fiqh</span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/subscribe" className="subscribe-button">
              Subscribe
            </Link>

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mobile-nav">
          <div className="container mobile-nav-inner">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/subscribe"
              className="mobile-subscribe"
              onClick={() => setOpen(false)}
            >
              Subscribe for updates
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
