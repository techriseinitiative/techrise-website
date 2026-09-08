"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Mail, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { requestPasswordResetAction } from "@/actions/auth";

export default function ForgotPasswordClient() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const result = await requestPasswordResetAction(fd);

    setLoading(false);

    if (!result?.success) {
      setError(result?.error ?? "Something went wrong");
      return;
    }

    setStep("success");
  };

  if (step === "success") {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#0A0E14] px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="group inline-flex items-center gap-2.5 mb-6">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E]/20 border border-[#0F766E]/30">
              <Compass className="h-5 w-5 text-[#5ECAD4]" strokeWidth={2} />
            </span>
            <span className="font-display font-bold text-lg text-[#F9FAFB]">TechRise</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4] mb-6">
            <CheckCircle className="h-4 w-4" />
            <span>Check your email</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">Reset link sent!</h1>
          <p className="mt-3 text-[#9CA3AF] leading-relaxed">
            We&apos;ve sent a password reset link to your email. Click the link in the email to set a new password.
          </p>
          <p className="mt-4 text-sm text-[#6B7280]">
            Didn&apos;t receive it? Check your spam folder, or{" "}
            <a href="mailto:techriseinitiative53@gmail.com" className="text-[#5ECAD4] hover:text-[#14B8A6] underline">
              contact support
            </a>.
          </p>

          <div className="mt-8">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#5ECAD4] hover:text-[#14B8A6] transition">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to sign in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-[#0A0E14]">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="group inline-flex items-center gap-2.5 mb-8">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E]/20 border border-[#0F766E]/30">
              <Compass className="h-5 w-5 text-[#5ECAD4]" strokeWidth={2} />
            </span>
            <span className="font-display font-bold text-lg text-[#F9FAFB]">TechRise</span>
          </Link>

          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB] mt-4">Forgot password?</h1>
          <p className="mt-2 text-[#9CA3AF]">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-[#F87171]/10 border border-[#F87171]/20 p-3 flex items-center gap-2 text-sm text-[#F87171]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
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

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <><span>Send reset link</span> <ArrowRight className="h-5 w-5" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#9CA3AF]">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-[#5ECAD4] hover:text-[#14B8A6]">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[#111827] via-[#0A0E14] to-[#111827] items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F766E]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F57342]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-md p-10">
          <div className="h-16 w-16 rounded-2xl bg-[#0F766E]/20 border border-[#0F766E]/30 flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-[#5ECAD4]" />
          </div>
          <p className="text-2xl font-display font-bold leading-snug text-[#F9FAFB]">
            Don&apos;t worry — we&apos;ll get you back in quickly and securely.
          </p>
          <p className="mt-4 text-sm text-[#6B7280]">
            The reset link expires in 1 hour for security.
          </p>
        </div>
      </div>
    </section>
  );
}
