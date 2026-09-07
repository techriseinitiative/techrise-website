"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Compass, Heart, MessageCircle, UserPlus } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Programs" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full nav-surface">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="TechRise Initiative — Home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 border border-primary/30 transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5 text-primary-light" strokeWidth={2} />
          </span>
          <span className="font-display font-bold text-lg text-[#F9FAFB] tracking-tight">
            TechRise
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg ${
                  pathname === link.href
                    ? "text-[#F9FAFB] bg-primary/10"
                    : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/donate"
            className="btn-ghost text-sm"
          >
            <Heart className="h-4 w-4" />
            <span className="hide-mobile">Donate</span>
          </Link>
          <Link
            href="/signup"
            className="btn-primary text-sm"
          >
            <UserPlus className="h-4 w-4" />
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] transition"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#1F2937] bg-[#111827]/95 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`px-4 py-3 text-base font-medium hover:text-[#F9FAFB] hover:bg-[#1F2937] rounded-lg transition ${
                  pathname === link.href ? "text-[#F9FAFB] bg-primary/10" : "text-[#9CA3AF]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-[#1F2937]">
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] rounded-lg transition flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Donate
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="btn-primary justify-center text-base py-3"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
