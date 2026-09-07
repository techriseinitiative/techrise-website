import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "TechRise Initiative Privacy Policy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[80vh] bg-[#0A0E14]">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to TechRise
        </Link>

        <h1 className="font-display font-bold text-4xl text-[#F5F5F7] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#6B7280] mb-10">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none text-[#9CA3AF] space-y-6">
          <p>TechRise Initiative (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.</p>

          <h2>1. Information We Collect</h2>
          <p><strong>Account information:</strong> name, email address, and password when you register.</p>
          <p><strong>Program data:</strong> event registrations, project submissions, and blog posts you create.</p>
          <p><strong>Donation information:</strong> processed securely via Stripe — we receive your name, email, and donation amount.</p>
          <p><strong>Usage data:</strong> pages visited, interactions, and device information via standard analytics.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, communicate with you about programs and events, process donations, and send transactional emails.</p>

          <h2>3. Information Sharing</h2>
          <p>We do not sell your personal information. We share data only with: service providers (Stripe for payments, Resend for email) when necessary to deliver our services, and when required by law.</p>

          <h2>4. Data Retention</h2>
          <p>We retain your account data as long as your account is active. You may request deletion of your account and personal data at any time by emailing{" "}<a href="mailto:techriseinitiative53@gmail.com" className="text-[#5ECAD4] hover:underline">techriseinitiative53@gmail.com</a>.</p>

          <h2>5. Cookies</h2>
          <p>We use essential session cookies for authentication (managed by NextAuth). We may use analytics cookies to understand site usage — you can opt out via your browser settings.</p>

          <h2>6. Security</h2>
          <p>Passwords are hashed with bcrypt. All traffic is encrypted via HTTPS. Payment data is handled exclusively by Stripe — we never store card numbers.</p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>Our services are not directed to users under 13. We do not knowingly collect information from children under 13.</p>

          <h2>8. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at{" "}<a href="mailto:techriseinitiative53@gmail.com" className="text-[#5ECAD4] hover:underline">techriseinitiative53@gmail.com</a>.</p>

          <h2>9. Changes to Policy</h2>
          <p>We may update this Privacy Policy periodically. The updated policy will be posted on this page with a revised &ldquo;Last updated&rdquo; date.</p>

          <h2>10. Contact</h2>
          <p>Questions? Email us at{" "}<a href="mailto:techriseinitiative53@gmail.com" className="text-[#5ECAD4] hover:underline">techriseinitiative53@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
