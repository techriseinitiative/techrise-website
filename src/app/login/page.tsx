"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 bg-[#0A0A0F]">
      {/* Left: form */}
      <div className="flex items-center justify-center px-5 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="group inline-flex items-center gap-2.5 mb-6">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105">
              <Rocket className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold text-lg text-[#F5F5F7]">
              Tech<span className="text-[#6366F1]">Rise</span>
            </span>
          </Link>

          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F5F5F7]">Welcome back</h1>
          <p className="mt-2 text-[#9CA3AF]">Sign in to your account to continue.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#F5F5F7] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="input-dark pl-10 pr-4 py-2.5"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[#F5F5F7]">Password</label>
                <Link href="#" className="text-xs font-semibold text-[#818CF8] hover:text-[#6366F1]">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="input-dark pl-10 pr-4 py-2.5"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <input type="checkbox" className="h-4 w-4 rounded border-[#232330] bg-[#0A0A0F] text-[#6366F1] focus:ring-[#6366F1]" />
              Keep me signed in
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#9CA3AF]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-[#818CF8] hover:text-[#6366F1]">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:flex relative bg-aurora items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid pointer-events-none opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6366F1]/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#22D3EE]/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-md p-10 text-[#F5F5F7]">
          <p className="text-2xl font-display font-bold leading-snug">
            &ldquo;TechRise turned a curious kid with a laptop into a builder shipping tools used by thousands.&rdquo;
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div>
              <p className="font-semibold text-[#F5F5F7]">Aarav Mehta</p>
              <p className="text-sm text-[#9CA3AF]">Software Engineer · Alumnus &apos;24</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
