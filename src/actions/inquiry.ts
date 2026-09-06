"use server";

import { auth } from "@/lib/auth";
import { inquiryService } from "@/lib/services/inquiryService";
import { withResult } from "@/lib/utils";
import { submitInquirySchema, updateInquiryStatusSchema } from "@/validations/inquiry";

export async function submitInquiryAction(formData: FormData) {
  const session = await auth();

  const parsed = submitInquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    reason: formData.get("reason") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() =>
    inquiryService.submit(parsed.data, session?.user?.id)
  );
}

/** ADMIN: update inquiry status */
export async function updateInquiryStatusAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = updateInquiryStatusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() => inquiryService.updateStatus(parsed.data));
}
