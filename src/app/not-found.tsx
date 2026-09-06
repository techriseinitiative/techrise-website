import Link from "next/link";
import { Rocket, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-ink-50 relative overflow-hidden px-5">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

      <div className="relative text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-xl shadow-primary-600/30">
          <Rocket className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>
        <p className="mt-8 font-display font-bold text-7xl sm:text-8xl tracking-tighter text-gradient">404</p>
        <h1 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-ink-900">
          Lost in orbit
        </h1>
        <p className="mt-3 text-ink-600">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-ink-800 transition hover:scale-[1.02]">
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <Link href="/events" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 border border-ink-200 hover:border-ink-300 transition">
            <ArrowLeft className="h-4 w-4" />
            Browse events
          </Link>
        </div>
      </div>
    </section>
  );
}
