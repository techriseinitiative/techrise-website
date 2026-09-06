"use client";

import { useState } from "react";
import { Heart, Shield, Sparkles, Check, Users, BookOpen, Rocket } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = custom ? Number(custom) : amount;

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-[#0A0A0F] px-5">
        <div className="max-w-md text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#34D399] to-[#059669] shadow-lg" style={{ boxShadow: '0 0 32px rgba(52, 211, 153, 0.3)' }}>
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="mt-7 font-display font-bold text-4xl tracking-tight text-[#F5F5F7]">Thank you!</h1>
          <p className="mt-3 text-[#9CA3AF]">
            Your ${finalAmount} donation will be processed shortly. A receipt will be emailed to you.
          </p>
          <button
            onClick={() => { setSubmitted(false); setAmount(50); setCustom(""); }}
            className="mt-8 btn-outline"
          >
            Make another donation
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 sm:pt-20 pb-12 bg-[#0A0A0F] overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid pointer-events-none opacity-30" />
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full badge-amber text-xs animate-fade-up">
            <Heart className="h-3.5 w-3.5" fill="currentColor" />
            100% of donations fund programs
          </div>
          <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight text-[#F5F5F7] animate-fade-up delay-100">
            Fund the next <br /><span className="gradient-text">generation of builders.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
            Your donation removes financial barriers, funds programs, and helps us reach more students worldwide.
          </p>
        </div>
      </section>

      {/* DONATION FORM */}
      <section className="py-16 sm:py-20 bg-[#0A0A0F]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#13131A] border border-[#232330] p-7 sm:p-9">
                <h2 className="font-display font-bold text-2xl text-[#F5F5F7]">Choose an amount</h2>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(a); setCustom(""); }}
                      className={`relative rounded-xl border-2 px-3 py-4 text-center font-display font-bold transition ${
                        amount === a && !custom
                          ? "border-[#6366F1] bg-[#6366F1]/10 text-[#818CF8]"
                          : "border-[#232330] text-[#9CA3AF] hover:border-[#3A3A50] hover:text-[#F5F5F7]"
                      }`}
                    >
                      <span className="text-lg">${a}</span>
                      {amount === a && !custom && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#6366F1] flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-[#F5F5F7] mb-2">Or enter custom amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">$</span>
                    <input
                      type="number"
                      min="1"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full rounded-lg border border-[#232330] bg-[#0A0A0F] pl-8 pr-4 py-3 text-sm text-[#F5F5F7] placeholder-[#6B7280] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-[#0A0A0F] border border-[#232330]">
                  <input
                    id="recurring"
                    type="checkbox"
                    checked={recurring}
                    onChange={(e) => setRecurring(e.target.checked)}
                    className="h-4 w-4 text-[#6366F1] rounded focus:ring-[#6366F1]"
                  />
                  <label htmlFor="recurring" className="flex-1 cursor-pointer">
                    <p className="text-sm font-semibold text-[#F5F5F7]">Make this monthly</p>
                    <p className="text-xs text-[#6B7280]">Recurring support helps us plan long-term programs</p>
                  </label>
                </div>

                <div className="mt-6">
                  <h3 className="font-display font-bold text-lg text-[#F5F5F7] mb-4">Your details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full rounded-lg border border-[#232330] bg-[#0A0A0F] px-3.5 py-2.5 text-sm text-[#F5F5F7] placeholder-[#6B7280] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition"
                    />
                    <input
                      type="email"
                      placeholder="Email (for receipt)"
                      className="w-full rounded-lg border border-[#232330] bg-[#0A0A0F] px-3.5 py-2.5 text-sm text-[#F5F5F7] placeholder-[#6B7280] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!finalAmount || finalAmount < 1}
                  className="mt-7 w-full btn-amber justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Heart className="h-4 w-4" fill="currentColor" />
                  Donate ${finalAmount || 0}{recurring ? " / month" : ""}
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Secure payment via Stripe · 256-bit SSL</span>
                </div>
              </div>
            </div>

            {/* Impact sidebar */}
            <aside className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl bg-[#13131A] border border-[#232330] p-6">
                <h3 className="font-display font-bold text-lg text-[#F5F5F7]">Your impact</h3>
                <p className="mt-2 text-sm text-[#9CA3AF]">Every dollar goes directly to programs.</p>
                <div className="mt-5 space-y-4">
                  {IMPACT.map((item) => (
                    <div
                      key={item.amount}
                      className={`p-4 rounded-xl border-2 transition ${
                        finalAmount >= item.amount
                          ? "border-[#34D399] bg-[#34D399]/5"
                          : "border-[#232330]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                          finalAmount >= item.amount ? "bg-[#34D399] text-white" : "bg-[#232330] text-[#6B7280]"
                        }`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#F5F5F7]">${item.amount}+</p>
                          <p className="text-xs text-[#6B7280]">{item.label}</p>
                        </div>
                        {finalAmount >= item.amount && (
                          <Check className="h-4 w-4 text-[#34D399]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#13131A] via-[#1a1740] to-[#13131A] border border-[#232330] p-6">
                <Sparkles className="h-6 w-6 text-[#F59E0B]" />
                <h3 className="mt-3 font-display font-bold text-lg text-[#F5F5F7]">Why we exist</h3>
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
