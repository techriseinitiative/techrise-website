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
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm animate-fade-up">
              <MessageSquare className="h-3.5 w-3.5 text-primary-600" />
              Get in touch
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight animate-fade-up delay-100">
              Let's <span className="text-gradient">connect.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-2xl animate-fade-up delay-200">
              Whether you're a curious learner, a potential mentor, a sponsor, or just have a question — we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="pb-20 sm:pb-28 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white border border-ink-200 p-7 sm:p-9 shadow-sm">
                <h2 className="font-display font-bold text-2xl text-ink-900">Send us a message</h2>
                <p className="mt-2 text-sm text-ink-600">We typically respond within 1-2 business days.</p>

                <form className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" id="name" placeholder="Your name" />
                    <Field label="Email" id="email" type="email" placeholder="you@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      I'm reaching out as a...
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {REASONS.map((r, i) => (
                        <label
                          key={r.value}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-ink-200 hover:border-ink-300 cursor-pointer transition has-[:checked]:bg-primary-50 has-[:checked]:border-primary-300"
                        >
                          <input type="radio" name="reason" value={r.value} defaultChecked={i === 0} className="text-primary-600 focus:ring-primary-600" />
                          <span className="text-sm text-ink-700">{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Field label="Subject" id="subject" placeholder="What's this about?" />

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-ink-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us more..."
                      className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ink-900/20 hover:bg-ink-800 transition hover:scale-[1.02] active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-7 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-grid opacity-20" />
                <div className="relative">
                  <Sparkles className="h-7 w-7 text-accent-300" />
                  <h3 className="mt-4 font-display font-bold text-xl">Direct line</h3>
                  <p className="mt-2 text-sm text-white/80">
                    For urgent inquiries, reach out directly:
                  </p>
                  <a href="mailto:techriseinitiative53@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-200 transition">
                    <Mail className="h-4 w-4" />
                    techriseinitiative53@gmail.com
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-ink-200 p-6">
                <h3 className="font-display font-bold text-lg text-ink-900">Find us</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    <span className="text-ink-700">Remote-first · Global team across 8 time zones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    <span className="text-ink-700">Discord community: link in welcome email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    <span className="text-ink-700">Press: press@techrise.example</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-ink-50 border border-ink-200 p-6">
                <h3 className="font-display font-bold text-lg text-ink-900">Response time</h3>
                <p className="mt-2 text-sm text-ink-600">
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
      <label htmlFor={id} className="block text-sm font-semibold text-ink-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
      />
    </div>
  );
}
