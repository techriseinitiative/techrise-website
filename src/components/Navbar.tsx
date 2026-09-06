"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Rocket, Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-ink-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display font-bold text-lg sm:text-xl"
          onClick={() => setOpen(false)}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-lg shadow-primary-600/25 transition-transform group-hover:scale-105 group-hover:rotate-3">
            <Rocket className="h-5 w-5 text-white" strokeWidth={2.5} />
            <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 opacity-40 blur-md -z-10 group-hover:opacity-60 transition-opacity" />
          </span>
          <span className="tracking-tight">
            Tech<span className="text-primary-600">Rise</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-3.5 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 transition-colors rounded-lg hover:bg-ink-100/70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-ink-700 hover:text-ink-900 px-3 py-2 rounded-lg hover:bg-ink-100/70 transition"
          >
            Sign in
          </Link>
          <Link
            href="/donate"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:scale-[1.03] active:scale-95 transition-all"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            <span>Donate</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ink-200 bg-white/95 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-ink-800 hover:bg-ink-100 rounded-lg transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-ink-200">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-ink-800 hover:bg-ink-100 rounded-lg"
              >
                Sign in
              </Link>
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/30"
              >
                <Heart className="h-4 w-4" fill="currentColor" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
