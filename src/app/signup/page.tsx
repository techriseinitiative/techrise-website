"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { signUpAction } from "@/actions/auth";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const result = await signUpAction(fd);

    if (result && !result.success) {
      setError(result.error ?? "Signup failed");
      setLoading(false);
    }
    // On success, signUpAction redirects via Next.js redirect()
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-[#0A0E14]">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="group inline-flex items-center gap-2.5 mb-8">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E]/20 border border-[#0F766E]/30">
              <Compass className="h-5 w-5 text-[#5ECAD4]" strokeWidth={2} />
            </span>
            <span className="font-display font-bold text-lg text-[#F9FAFB]">
              TechRise
            </span>
          </Link>

          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB] mt-4">Start your journey</h1>
          <p className="mt-2 text-[#9CA3AF]">Create your free account and join 2,400+ learners.</p>

          {error && (
            <div className="mt-4 rounded-lg bg-[#F87171]/10 border border-[#F87171]/20 p-3 flex items-center gap-2 text-sm text-[#F87171]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#F9FAFB] mb-2">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="input pl-10 pr-4 py-2.5"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#F9FAFB] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="input pl-10 pr-4 py-2.5"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#F9FAFB] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="input pl-10 pr-4 py-2.5"
                />
              </div>
            </div>

            <div className="rounded-lg bg-[#0F766E]/10 border border-[#0F766E]/25 p-3 text-xs text-[#9CA3AF]">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="font-semibold text-[#5ECAD4] hover:text-[#14B8A6] underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="font-semibold text-[#5ECAD4] hover:text-[#14B8A6] underline">Privacy Policy</Link>.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <><span>Create account</span> <ArrowRight className="h-5 w-5" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#9CA3AF]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#5ECAD4] hover:text-[#14B8A6]">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[#111827] via-[#0A0E14] to-[#111827] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F57342]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0F766E]/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-md p-10">
          <p className="text-2xl font-display font-bold leading-snug text-[#F9FAFB]">
            &ldquo;I went from zero coding knowledge to shipping my first open-source contribution in 8 weeks. The mentorship made all the difference.&rdquo;
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#F57342] to-[#FB923C] flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div>
              <p className="font-semibold text-[#F9FAFB]">Sofia Garcia</p>
              <p className="text-sm text-[#9CA3AF]">Full-Stack Developer · Alumnus &apos;25</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
