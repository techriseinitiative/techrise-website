import Link from "next/link";
import { Rocket, Heart, Code2, Globe, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Programs: [
    { label: "Events", href: "/events" },
    { label: "Competitions", href: "/events" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
  Organization: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Donate", href: "/donate" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer-surface text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-20 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-5 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3 mb-5">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] shadow-lg shadow-indigo-500/20">
                <Rocket className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-xl tracking-tight text-[#F5F5F7]">
                TechRise
              </span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs">
              Empowering individuals through technology, innovation, and global collaboration. Building the next generation of problem-solvers.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Globe, href: "#", label: "Twitter" },
                { icon: Code2, href: "#", label: "GitHub" },
                { icon: Globe, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:techriseinitiative53@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-[#6366F1]/20 text-[#9CA3AF] hover:text-[#818CF8] border border-[#232330] hover:border-[#6366F1]/40 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Donate banner */}
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-[#232330] bg-gradient-to-r from-[#13131A] via-[#1a1740] to-[#13131A] p-px">
          <div className="bg-[#0A0A0F] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-[#F5F5F7] font-display font-semibold text-xl leading-snug">
                Help us empower the next generation
              </p>
              <p className="text-[#9CA3AF] text-sm mt-1.5">
                Your donation funds programs, competitions, and resources for students worldwide.
              </p>
            </div>
            <Link
              href="/donate"
              className="btn-amber shrink-0 text-sm"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
              Donate Now
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#232330] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} TechRise Initiative. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7280]">
            techriseinitiative53@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
