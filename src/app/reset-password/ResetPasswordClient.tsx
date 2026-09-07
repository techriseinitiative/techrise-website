"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Compass, Lock, Loader2, CheckCircle, AlertCircle, KeyRound } from "lucide-react";
import { resetPasswordAction } from "@/actions/auth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasToken = !!token;

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(
    hasToken ? "" : "Missing reset token. Please request a new password reset link."
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setError("Missing reset token");
      return;
    }

    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);

    const result = await resetPasswordAction(fd);
    setLoading(false);

    if (!result?.success) {
      setError(result?.error ?? "Failed to reset password");
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#0A0E14] px-6 py-12">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/15 mb-6">
            <CheckCircle className="h-8 w-8 text-[#22C55E]" />
          </div>
          <h1 className="font-display font-bold text-3xl text-[#F9FAFB]">Password reset!</h1>
          <p className="mt-3 text-[#9CA3AF]">You can now sign in with your new password.</p>
          <Link href="/login" className="mt-6 btn-primary inline-flex">Sign in</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-[#0A0E14]">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="group inline-flex items-center gap-2.5 mb-6">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E]/20 border border-[#0F766E]/30">
              <Compass className="h-5 w-5 text-[#5ECAD4]" strokeWidth={2} />
            </span>
            <span className="font-display font-bold text-lg text-[#F9FAFB]">TechRise</span>
          </Link>

          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">Set new password</h1>
          <p className="mt-2 text-[#9CA3AF]">Choose a strong password to protect your account.</p>

          {error && (
            <div className="mt-4 rounded-lg bg-[#F87171]/10 border border-[#F87171]/20 p-3 flex items-center gap-2 text-sm text-[#F87171]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <input type="hidden" name="token" value={token ?? ""} />

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#F9FAFB] mb-2">New password</label>
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

            <div>
              <label htmlFor="confirm" className="block text-sm font-semibold text-[#F9FAFB] mb-2">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Repeat your password"
                  className="input pl-10 pr-4 py-2.5"
                />
              </div>
            </div>

            <button type="submit" disabled={loading || !hasToken} className="btn-primary w-full justify-center">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <><KeyRound className="h-5 w-5" /> <span>Reset password</span></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#9CA3AF]">
            <Link href="/forgot-password" className="font-semibold text-[#5ECAD4] hover:text-[#14B8A6]">Need a new link?</Link>
          </p>
        </div>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[#111827] via-[#0A0E14] to-[#111827] items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F766E]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F57342]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-md p-10">
          <div className="h-16 w-16 rounded-2xl bg-[#0F766E]/20 border border-[#0F766E]/30 flex items-center justify-center mb-6">
            <KeyRound className="h-8 w-8 text-[#5ECAD4]" />
          </div>
          <p className="text-2xl font-display font-bold leading-snug text-[#F9FAFB]">
            Your account security matters. Choose a strong, unique password.
          </p>
          <p className="mt-4 text-sm text-[#6B7280]">
            Use at least 8 characters with a mix of letters, numbers, and symbols.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ResetPasswordClient() {
  return (
    <Suspense fallback={
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#0A0E14]">
        <Loader2 className="h-8 w-8 animate-spin text-[#5ECAD4]" />
      </section>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
