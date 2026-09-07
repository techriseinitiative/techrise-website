import Link from "next/link";
import { X, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Donation canceled",
  description: "Your donation was canceled.",
};

export default function DonateCanceledPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#0A0E14] px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-30" />

      <div className="relative max-w-md text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F57342]/15 border border-[#F57342]/25">
          <X className="h-8 w-8 text-[#F57342]" strokeWidth={2.5} />
        </div>
        <h1 className="mt-6 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
          Donation canceled
        </h1>
        <p className="mt-3 text-[#9CA3AF]">
          No worries — your card wasn&apos;t charged. You can try again any time, or come back later.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/donate" className="btn-accent">
            <Heart className="h-4 w-4" fill="currentColor" />
            Try again
          </Link>
          <Link href="/events" className="btn-outline">
            Browse programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
