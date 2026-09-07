import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth";

export const metadata = {
  title: "My Profile",
  description: "Manage your TechRise account.",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }

  const user = session.user;

  return (
    <div className="min-h-[80vh] bg-[#0A0E14]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F5F7] mb-2">My Profile</h1>
        <p className="text-[#9CA3AF] mb-10">Manage your account settings.</p>

        <div className="space-y-5">
          {/* Profile card */}
          <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-white text-3xl font-bold">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-[#F5F5F7]">{user.name}</h2>
                <p className="text-sm text-[#9CA3AF]">{user.email}</p>
                <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  user.role === "ADMIN"
                    ? "bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20"
                    : "bg-[#111827] text-[#9CA3AF] border border-[#374151]"
                }`}>
                  <Shield className="h-3 w-3" />
                  {user.role === "ADMIN" ? "Admin" : "Member"}
                </span>
              </div>
            </div>
          </div>

          {/* Account details */}
          <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
            <h3 className="font-display font-bold text-lg text-[#F5F5F7] mb-5">Account details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0A0E14] border border-[#1F2937]">
                <User className="h-4 w-4 text-[#6B7280]" />
                <div>
                  <p className="text-xs text-[#6B7280]">Full name</p>
                  <p className="text-sm font-medium text-[#F5F5F7]">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0A0E14] border border-[#1F2937]">
                <Mail className="h-4 w-4 text-[#6B7280]" />
                <div>
                  <p className="text-xs text-[#6B7280]">Email</p>
                  <p className="text-sm font-medium text-[#F5F5F7]">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
            <h3 className="font-display font-bold text-lg text-[#F5F5F7] mb-2">Sign out</h3>
            <p className="text-sm text-[#9CA3AF] mb-4">You&apos;ll be redirected to the homepage.</p>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F87171]/10 border border-[#F87171]/20 px-4 py-2 text-sm font-semibold text-[#F87171] hover:bg-[#F87171]/15 transition"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
