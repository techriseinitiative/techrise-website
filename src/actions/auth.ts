"use server";

import { signIn, signOut } from "@/lib/auth";
import { userService } from "@/lib/services/userService";
import { emailService } from "@/lib/services/emailService";
import { withResult } from "@/lib/utils";
import { signUpSchema, loginSchema, passwordResetRequestSchema, passwordResetSchema } from "@/validations/auth";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const result = await withResult(() =>
    userService.createUser(parsed.data)
  );

  if (!result.success) return result;

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const result = await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  if (result?.error) {
    return { success: false, error: "Invalid email or password" };
  }

  redirect("/dashboard");
}

export async function logoutAction(_formData?: FormData) {
  await signOut({ redirect: false });
  redirect("/");
}

export async function requestPasswordResetAction(formData: FormData) {
  const parsed = passwordResetRequestSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await withResult(() =>
    emailService.sendPasswordResetEmail(parsed.data.email)
  );

  // Always return success to prevent email enumeration
  return { success: true };
}

export async function resetPasswordAction(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;

  const parsed = passwordResetSchema.safeParse({ token, password });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  // Verify confirm password matches
  const confirm = formData.get("confirm") as string;
  if (password !== confirm) {
    return { success: false, error: "Passwords do not match" };
  }

  const result = await withResult(() =>
    userService.resetPassword(parsed.data.token, parsed.data.password)
  );

  if (!result.success) {
    return result;
  }

  return { success: true };
}
