import Link from "next/link";
import { Rocket, Heart, Code2, Globe, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Programs: [
    { label: "Events", href: "/events" },
    { label: "Competitions", href: "/events" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
  Community: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Success Stories", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Connect: [
    { label: "Donate", href: "/donate" },
    { label: "Sponsorship", href: "/contact" },
    { label: "Partner with us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer-surface text-[#E2E8F0]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-20 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3 mb-5">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
                <Rocket className="h-5 w-5 text-primary-light" strokeWidth={2} />
              </span>
              <span className="font-display font-bold text-xl tracking-tight text-[#F9FAFB]">
                TechRise
              </span>
            </Link>
            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs">
              Empowering individuals through technology, innovation, and global collaboration.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              <SocialLink href="#" icon={Globe} label="Social community" />
              <SocialLink href="#" icon={Code2} label="GitHub" />
              <SocialLink href="#" icon={Globe} label="LinkedIn" />
              <SocialLink href="mailto:techriseinitiative53@gmail.com" icon={Mail} label="Email" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="lg:col-span-1">
              <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-4">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
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
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/10 via-[#14B8A6]/5 to-[#0F766E]/10 rounded-2xl pointer-events-none" />
          <div className="relative rounded-2xl border border-[#374151] bg-gradient-to-r from-[#111827] via-[#1A2332] to-[#111827] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-base font-bold text-[#F9FAFB]">
                  Join 2,400+ learners transforming their careers
                </p>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  Your donation funds programs, scholarships, and resources for the next generation.
                </p>
              </div>
              <Link
                href="/donate"
                className="btn-accent shrink-0 text-sm font-semibold"
              >
                <Heart className="h-4 w-4" fill="currentColor" />
                Donate Now
              </Link>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 pb-8 border-b border-[#374151]">
          <StatItem value="48" label="Countries" />
          <StatItem value="2,400+" label="Active Learners" />
          <StatItem value="120+" label="Projects Launched" />
          <StatItem value="$180K+" label="Donated & Distributed" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} TechRise Initiative. All rights reserved.
          </p>
          <p className="text-xs text-[#64748B]">
            techriseinitiative53@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F2937] hover:bg-primary/20 text-[#9CA3AF] hover:text-primary-light border border-[#374151] hover:border-primary/30 transition"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display font-bold text-2xl text-[#F9FAFB]">{value}</p>
      <p className="text-xs text-[#64748B] mt-1">{label}</p>
    </div>
  );
}