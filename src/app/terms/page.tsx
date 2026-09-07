import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "TechRise Initiative Terms of Service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-[80vh] bg-[#0A0E14]">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to TechRise
        </Link>

        <h1 className="font-display font-bold text-4xl text-[#F5F5F7] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#6B7280] mb-10">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none text-[#9CA3AF] space-y-6">
          <p>Welcome to TechRise Initiative. By using our website and services, you agree to these Terms of Service. Please read them carefully.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using TechRise Initiative&apos;s website, programs, and services, you agree to be bound by these Terms of Service and our Privacy Policy.</p>

          <h2>2. Eligibility</h2>
          <p>You must be at least 13 years old to create an account. If you are under 18, you represent that you have parental or guardian consent to use our services.</p>

          <h2>3. Account Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to notify us immediately of any unauthorized use.</p>

          <h2>4. Programs & Events</h2>
          <p>Registration for TechRise programs and events is subject to capacity limits and deadlines. We reserve the right to cancel or reschedule events. Refunds are provided at our discretion.</p>

          <h2>5. Code of Conduct</h2>
          <p>You agree to behave respectfully and professionally in all TechRise communities. Harassment, hate speech, or abusive behavior will result in immediate account termination.</p>

          <h2>6. Intellectual Property</h2>
          <p>Content you create using TechRise programs belongs to you. By submitting projects to our showcase, you grant us a non-exclusive license to display and promote your work.</p>

          <h2>7. Donations</h2>
          <p>All donations are final and non-refundable unless required by applicable law. TechRise Initiative is a nonprofit — donations support our educational programs.</p>

          <h2>8. Disclaimers</h2>
          <p>Our services are provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee specific outcomes from participating in our programs.</p>

          <h2>9. Limitation of Liability</h2>
          <p>TechRise Initiative shall not be liable for indirect, incidental, or consequential damages arising from your use of our services.</p>

          <h2>10. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms.</p>

          <h2>11. Contact</h2>
          <p>For questions about these terms, contact us at{" "}<a href="mailto:techriseinitiative53@gmail.com" className="text-[#5ECAD4] hover:underline">techriseinitiative53@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
