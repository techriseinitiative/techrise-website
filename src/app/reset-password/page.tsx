import type { Metadata } from "next";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: "Set New Password",
  description: "Set a new password for your TechRise account.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
