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
    <footer className="bg-ink-950 text-white relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3 mb-4">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-lg shadow-primary-900/40">
                <Rocket className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-xl tracking-tight">
                TechRise
              </span>
            </Link>
            <p className="text-ink-400 text-sm leading-relaxed max-w-xs">
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-ink-400 hover:text-white border border-white/10 hover:border-white/20 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-bold text-ink-400 uppercase tracking-widest mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 hover:text-white transition-colors"
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
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-900 via-primary-800 to-accent-600 p-px">
          <div className="bg-ink-950 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-display font-semibold text-lg">
                Help us empower the next generation
              </p>
              <p className="text-ink-400 text-sm mt-0.5">
                Your donation funds programs, competitions, and resources for students worldwide.
              </p>
            </div>
            <Link
              href="/donate"
              className="group inline-flex items-center gap-2 shrink-0 rounded-full bg-white text-ink-900 font-semibold px-6 py-3 hover:bg-ink-100 transition"
            >
              <Heart className="h-4 w-4 text-accent-500" fill="currentColor" />
              Donate Now
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} TechRise Initiative. All rights reserved.
          </p>
          <p className="text-xs text-ink-500">
            techriseinitiative53@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
