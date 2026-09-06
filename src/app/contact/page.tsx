import { Mail, MapPin, MessageSquare, Send, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the TechRise Initiative team.",
};

const REASONS = [
  { label: "I want to join as a learner", value: "learner" },
  { label: "I want to volunteer/mentor", value: "mentor" },
  { label: "I'm interested in sponsoring", value: "sponsor" },
  { label: "Press / media inquiry", value: "press" },
  { label: "Something else", value: "other" },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#0A0A0F] overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full badge-indigo text-xs animate-fade-up">
              <MessageSquare className="h-3.5 w-3.5" />
              Get in touch
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight text-[#F5F5F7] animate-fade-up delay-100">
              Let&apos;s <span className="gradient-text">connect.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl animate-fade-up delay-200">
              Whether you&apos;re a curious learner, a potential mentor, a sponsor, or just have a question — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="pb-20 sm:pb-28 bg-[#0A0A0F]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#13131A] border border-[#232330] p-7 sm:p-9">
                <h2 className="font-display font-bold text-2xl text-[#F5F5F7]">Send us a message</h2>
                <p className="mt-2 text-sm text-[#9CA3AF]">We typically respond within 1–2 business days.</p>

                <form className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" id="name" placeholder="Your name" />
                    <Field label="Email" id="email" type="email" placeholder="you@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F5F5F7] mb-2">
                      I&apos;m reaching out as a...
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {REASONS.map((r, i) => (
                        <label
                          key={r.value}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-[#232330] hover:border-[#6366F1]/50 bg-[#0A0A0F] cursor-pointer transition has-[:checked]:bg-[#6366F1]/10 has-[:checked]:border-[#6366F1]/40"
                        >
                          <input type="radio" name="reason" value={r.value} defaultChecked={i === 0} className="text-[#6366F1] focus:ring-[#6366F1]" />
                          <span className="text-sm text-[#9CA3AF]">{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Field label="Subject" id="subject" placeholder="What's this about?" />

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#F5F5F7] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us more..."
                      className="w-full rounded-lg border border-[#232330] bg-[#0A0A0F] px-3.5 py-2.5 text-sm text-[#F5F5F7] placeholder-[#6B7280] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl bg-gradient-to-br from-[#6366F1] via-[#7C3AED] to-[#F59E0B] p-7 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-grid opacity-20" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <Sparkles className="h-7 w-7 text-white/80" />
                  <h3 className="mt-4 font-display font-bold text-xl">Direct line</h3>
                  <p className="mt-2 text-sm text-white/80">
                    For urgent inquiries, reach out directly:
                  </p>
                  <a href="mailto:techriseinitiative53@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#F5F5F7] transition">
                    <Mail className="h-4 w-4" />
                    techriseinitiative53@gmail.com
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-[#13131A] border border-[#232330] p-6">
                <h3 className="font-display font-bold text-lg text-[#F5F5F7]">Find us</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#818CF8] mt-0.5 shrink-0" />
                    <span className="text-[#9CA3AF]">Remote-first · Global team across 8 time zones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 text-[#818CF8] mt-0.5 shrink-0" />
                    <span className="text-[#9CA3AF]">Discord community: link in welcome email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-[#818CF8] mt-0.5 shrink-0" />
                    <span className="text-[#9CA3AF]">Press: press@techrise.example</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-[#13131A] border border-[#232330] p-6">
                <h3 className="font-display font-bold text-lg text-[#F5F5F7]">Response time</h3>
                <p className="mt-2 text-sm text-[#9CA3AF]">
                  We answer inquiries within 1–2 business days. Sponsorship requests may take a few extra days.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, type = "text", placeholder }: { label: string; id: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#F5F5F7] mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#232330] bg-[#0A0A0F] px-3.5 py-2.5 text-sm text-[#F5F5F7] placeholder-[#6B7280] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition"
      />
    </div>
  );
}
