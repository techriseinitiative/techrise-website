import Link from "next/link";
import { Rocket, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#0A0A0F] relative overflow-hidden px-5">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

      <div className="relative text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#F59E0B] shadow-xl" style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)' }}>
          <Rocket className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>
        <p className="mt-8 font-display font-bold text-7xl sm:text-8xl tracking-tighter text-gradient">404</p>
        <h1 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-[#F5F5F7]">
          Lost in orbit
        </h1>
        <p className="mt-3 text-[#9CA3AF]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <Link href="/events" className="btn-outline">
            <ArrowLeft className="h-4 w-4" />
            Browse events
          </Link>
        </div>
      </div>
    </section>
  );
}
