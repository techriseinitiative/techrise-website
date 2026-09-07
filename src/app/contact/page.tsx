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
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4] animate-fade-up">
              <MessageSquare className="h-4 w-4" />
              Get in touch
            </div>
            <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB] animate-fade-up delay-100">
              Let&apos;s <span className="gradient-text">connect.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl animate-fade-up delay-200">
              Whether you&apos;re a curious learner, a potential mentor, a sponsor, or just have a question — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="pb-20 sm:pb-28 bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-7 sm:p-9">
                <h2 className="font-display font-bold text-2xl text-[#F9FAFB]">Send us a message</h2>
                <p className="mt-2 text-sm text-[#9CA3AF]">We typically respond within 1–2 business days.</p>

                <form className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" id="name" placeholder="Your name" />
                    <Field label="Email" id="email" type="email" placeholder="you@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F9FAFB] mb-2">
                      I&apos;m reaching out as a...
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {REASONS.map((r, i) => (
                        <label
                          key={r.value}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-[#374151] hover:border-[#0F766E] bg-[#0A0E14] cursor-pointer transition has-[:checked]:bg-[#0F766E]/10 has-[:checked]:border-[#0F766E]/40"
                        >
                          <input type="radio" name="reason" value={r.value} defaultChecked={i === 0} className="text-[#0F766E] focus:ring-[#0F766E]" />
                          <span className="text-sm text-[#9CA3AF]">{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Field label="Subject" id="subject" placeholder="What's this about?" />

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#F9FAFB] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us more..."
                      className="input px-3.5 py-2.5 resize-none"
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
              <div className="rounded-2xl bg-gradient-to-br from-[#0F766E] via-[#14B8A6] to-[#F57342] p-7 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <Sparkles className="h-7 w-7 text-white/80" />
                  <h3 className="mt-4 font-display font-bold text-xl">Direct line</h3>
                  <p className="mt-2 text-sm text-white/80">
                    For urgent inquiries, reach out directly:
                  </p>
                  <a href="mailto:techriseinitiative53@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition">
                    <Mail className="h-4 w-4" />
                    techriseinitiative53@gmail.com
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
                <h3 className="font-display font-bold text-lg text-[#F9FAFB]">Find us</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#5ECAD4] mt-0.5 shrink-0" />
                    <span className="text-[#9CA3AF]">Remote-first · Global team across 8 time zones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-[#5ECAD4] mt-0.5 shrink-0" />
                    <span className="text-[#9CA3AF]">Discord community: link in welcome email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#5ECAD4] mt-0.5 shrink-0" />
                    <span className="text-[#9CA3AF]">Press: press@techrise.example</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
                <h3 className="font-display font-bold text-lg text-[#F9FAFB]">Response time</h3>
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
      <label htmlFor={id} className="block text-sm font-semibold text-[#F9FAFB] mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input px-3.5 py-2.5"
      />
    </div>
  );
}