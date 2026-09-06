"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 bg-ink-50">
      {/* Left: form */}
      <div className="flex items-center justify-center px-5 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-lg">
              <Rocket className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold text-lg">TechRise</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">Start your journey</h1>
          <p className="mt-2 text-ink-600">Create your free account and join 2,400+ learners.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-ink-700 mb-2">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-ink-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
                />
              </div>
            </div>

            <div className="rounded-lg bg-primary-50 border border-primary-100 p-3 text-xs text-primary-800">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="font-semibold underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="font-semibold underline">Privacy Policy</Link>.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-ink-800 transition hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:flex relative bg-aurora items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid opacity-20" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent-500/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl" />

        <div className="relative max-w-md p-10 text-white">
          <p className="text-2xl font-display font-bold leading-snug">
            "I went from zero coding knowledge to shipping my first open-source contribution in 8 weeks. The mentorship made all the difference."
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent-500 to-rose-500 flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <p className="font-semibold">Sofia Garcia</p>
              <p className="text-sm text-ink-300">Full-Stack Developer · Alumnus '25</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
