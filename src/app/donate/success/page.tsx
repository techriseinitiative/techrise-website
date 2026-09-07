import Link from "next/link";
import { Check, Heart, ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Thank you!",
  description: "Your donation has been received.",
};

export default function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#0A0E14] px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#22C55E]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#0F766E]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-lg text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#22C55E] to-[#059669] shadow-lg">
          <Check className="h-10 w-10 text-white" strokeWidth={3} />
        </div>
        <h1 className="mt-7 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB]">
          Thank you!
        </h1>
        <p className="mt-4 text-lg text-[#9CA3AF] leading-relaxed">
          Your generous donation helps us empower the next generation of builders. A receipt will be emailed to you shortly.
        </p>

        <div className="mt-8 rounded-2xl bg-[#111827] border border-[#374151] p-6 text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#0F766E]/15 flex items-center justify-center">
              <Heart className="h-5 w-5 text-[#5ECAD4]" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F9FAFB]">Donation received</p>
              <p className="text-xs text-[#9CA3AF]">Your support fuels real impact</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { value: "1", label: "Student funded" },
              { value: "$25", label: "Workshop supplies" },
              { value: "∞", label: "Impact" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-[#0A0E14] border border-[#1F2937] p-3 text-center">
                <p className="font-display font-bold text-lg text-[#F9FAFB]">{s.value}</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/events" className="btn-primary">
            Browse programs
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className="btn-outline">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
