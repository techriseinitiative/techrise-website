"use server";

import { signIn } from "@/lib/auth";
import { userService } from "@/lib/services/userService";
import { withResult } from "@/lib/utils";
import { signUpSchema, loginSchema } from "@/validations/auth";
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

  // Auto sign in after registration
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
