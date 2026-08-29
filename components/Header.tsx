"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationItem {
  href: string;
  label: string;
}

const navigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/fatwas", label: "Fatwas" },
  { href: "/questions", label: "Questions & Answers" },
  { href: "/lectures", label: "Lectures" },
  { href: "/publications", label: "Publications" },
  { href: "/articles", label: "Articles" },
  { href: "/research", label: "Research" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="min-w-0"
          >
            <div className="truncate text-base font-bold tracking-tight text-slate-950 dark:text-white sm:text-lg">
              Dr. Saheed Abdullahi Busari
            </div>

            <div className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Associate Professor · Fiqh &amp; Usul al-Fiqh
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                {item.label}
              </Link>
            ))}

            {/* Subscribe Button */}
            <Link
              href="/subscribe"
              className="whitespace-nowrap rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Subscribe
            </Link>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Subscribe Button */}
            <Link
              href="/subscribe"
              onClick={closeMobileMenu}
              className="rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Subscribe
            </Link>

            {/* Menu Button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-slate-200 py-4 dark:border-slate-800 lg:hidden">
            <nav className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/subscribe"
                onClick={closeMobileMenu}
                className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Subscribe for updates
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}