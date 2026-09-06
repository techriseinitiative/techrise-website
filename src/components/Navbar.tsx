"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full nav-surface shadow-lg shadow-black/20">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display font-bold text-lg text-[#F5F5F7]"
          onClick={() => setOpen(false)}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105 group-hover:rotate-3">
            <Rocket className="h-5 w-5 text-white" strokeWidth={2.5} />
            <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] opacity-40 blur-md -z-10 group-hover:opacity-60 transition-opacity" />
          </span>
          <span className="tracking-tight">
            Tech<span className="text-[#6366F1]">Rise</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5 ${
                  pathname === link.href
                    ? "text-[#F5F5F7] bg-white/10"
                    : "text-[#9CA3AF] hover:text-[#F5F5F7]"
                }`}
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
            className="px-4 py-2 text-sm font-semibold text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors rounded-lg hover:bg-white/5"
          >
            Sign in
          </Link>
          <Link
            href="/donate"
            className="btn-amber text-sm"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            <span>Donate</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#9CA3AF] hover:text-[#F5F5F7] hover:bg-white/5 transition"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#232330] bg-[#13131A]/95 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`px-4 py-3 text-base font-medium hover:text-[#F5F5F7] hover:bg-white/5 rounded-xl transition ${
                  pathname === link.href ? "text-[#F5F5F7] bg-white/10" : "text-[#9CA3AF]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-[#232330]">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-[#9CA3AF] hover:text-[#F5F5F7] hover:bg-white/5 rounded-xl transition"
              >
                Sign in
              </Link>
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="btn-amber justify-center text-base py-3"
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
