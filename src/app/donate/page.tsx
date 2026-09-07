"use client";

import { useState, useTransition } from "react";
import { Heart, Shield, Sparkles, Check, Users, BookOpen, Rocket, Loader2, AlertCircle } from "lucide-react";
import { createDonationCheckoutAction } from "@/actions/donation";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];
const IMPACT = [
  { amount: 10, label: "1 month of internet for a learner", icon: Users },
  { amount: 25, label: "Workshop supplies for a team of 5", icon: BookOpen },
  { amount: 50, label: "Ships a student's capstone project", icon: Rocket },
];

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const finalAmount = custom ? Number(custom) : amount;
  const isValid = finalAmount && finalAmount >= 1;

  const onSubmit = () => {
    setError("");

    if (!isValid) return;

    const fd = new FormData();
    fd.set("amount", String(finalAmount));
    fd.set("donorName", donorName);
    fd.set("donorEmail", donorEmail);
    fd.set("isRecurring", String(recurring));

    startTransition(async () => {
      const result = await createDonationCheckoutAction(fd);
      // On success, the action redirects to Stripe Checkout
      // On error, it returns { success: false, error: ... }
      if (result && !result.success) {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
      // If success, user is redirected to Stripe
    });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-24 pb-12 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-30" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#F57342]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#F57342]/15 border border-[#F57342]/25 px-4 py-2 text-sm font-semibold text-[#FB923C] animate-fade-up">
            <Heart className="h-4 w-4" fill="currentColor" />
            100% of donations fund programs
          </div>
          <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB] animate-fade-up delay-100">
            Fund the next <br />
            <span className="gradient-warm">generation of builders.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
            Your donation removes financial barriers, funds programs, and helps us reach more students worldwide.
          </p>
        </div>
      </section>

      {/* DONATION FORM */}
      <section className="py-16 sm:py-20 bg-[#0A0E14]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
          {error && (
            <div className="max-w-5xl mx-auto mb-6 rounded-lg bg-[#F87171]/10 border border-[#F87171]/20 p-4 flex items-center gap-3 text-sm text-[#F87171]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-7 sm:p-9">
                <h2 className="font-display font-bold text-2xl text-[#F9FAFB]">Choose an amount</h2>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(a); setCustom(""); }}
                      className={`relative rounded-xl border-2 px-3 py-4 text-center font-display font-bold transition ${
                        amount === a && !custom
                          ? "border-[#0F766E] bg-[#0F766E]/10 text-[#5ECAD4]"
                          : "border-[#374151] text-[#9CA3AF] hover:border-[#4B5563] hover:text-[#F9FAFB]"
                      }`}
                    >
                      <span className="text-lg">${a}</span>
                      {amount === a && !custom && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#0F766E] flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-[#F9FAFB] mb-2">Or enter custom amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">$</span>
                    <input
                      type="number"
                      min="1"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      placeholder="Enter amount"
                      className="input pl-8 pr-4 py-3"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-[#0A0E14] border border-[#1F2937]">
                  <input
                    id="recurring"
                    type="checkbox"
                    checked={recurring}
                    onChange={(e) => setRecurring(e.target.checked)}
                    className="h-4 w-4 text-[#0F766E] rounded focus:ring-[#0F766E]"
                  />
                  <label htmlFor="recurring" className="flex-1 cursor-pointer">
                    <p className="text-sm font-semibold text-[#F9FAFB]">Make this monthly</p>
                    <p className="text-xs text-[#6B7280]">Recurring support helps us plan long-term programs</p>
                  </label>
                </div>

                <div className="mt-6">
                  <h3 className="font-display font-bold text-lg text-[#F9FAFB] mb-4">Your details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full name (optional)"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="input px-3.5 py-2.5"
                    />
                    <input
                      type="email"
                      placeholder="Email (optional, for receipt)"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="input px-3.5 py-2.5"
                    />
                  </div>
                </div>

                <button
                  onClick={onSubmit}
                  disabled={!isValid || pending}
                  className="mt-7 w-full btn-accent justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Heart className="h-5 w-5" fill="currentColor" />
                  )}
                  Donate ${finalAmount || 0}{recurring ? " / month" : ""}
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment via Stripe · 256-bit SSL</span>
                </div>
              </div>
            </div>

            {/* Impact sidebar */}
            <aside className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
                <h3 className="font-display font-bold text-lg text-[#F9FAFB]">Your impact</h3>
                <p className="mt-2 text-sm text-[#9CA3AF]">Every dollar goes directly to programs.</p>
                <div className="mt-5 space-y-3">
                  {IMPACT.map((item) => (
                    <div
                      key={item.amount}
                      className={`p-4 rounded-xl border-2 transition ${
                        finalAmount >= item.amount
                          ? "border-[#22C55E] bg-[#22C55E]/5"
                          : "border-[#1F2937]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                          finalAmount >= item.amount ? "bg-[#22C55E] text-white" : "bg-[#1F2937] text-[#6B7280]"
                        }`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#F9FAFB]">${item.amount}+</p>
                          <p className="text-xs text-[#6B7280]">{item.label}</p>
                        </div>
                        {finalAmount >= item.amount && (
                          <Check className="h-4 w-4 text-[#22C55E]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#111827] via-[#0F766E]/15 to-[#111827] border border-[#374151] p-6">
                <Sparkles className="h-6 w-6 text-[#F57342]" />
                <h3 className="mt-3 font-display font-bold text-lg text-[#F9FAFB]">Why we exist</h3>
                <p className="mt-2 text-sm text-[#9CA3AF]">
                  Last year, 67% of our learners came from low-income backgrounds. Your donation removes the financial barrier to learning.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
