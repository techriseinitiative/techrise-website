"use server";

import { auth } from "@/lib/auth";
import { donationService } from "@/lib/services/donationService";
import { withResult } from "@/lib/utils";
import { createDonationCheckoutSchema } from "@/validations/donation";
import Stripe from "stripe";
import { redirect } from "next/navigation";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe is not configured. Please set STRIPE_SECRET_KEY.");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-08-26.dahlia",
  });
}

export async function createDonationCheckoutAction(formData: FormData) {
  const session = await auth();

  const parsed = createDonationCheckoutSchema.safeParse({
    amount: Number(formData.get("amount")) * 100, // convert to cents
    donorName: formData.get("donorName") || undefined,
    donorEmail: formData.get("donorEmail") || undefined,
    isRecurring: formData.get("isRecurring") === "true",
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { amount, donorName, donorEmail, isRecurring, message } = parsed.data;

  // Create Stripe Checkout Session
  const checkoutSession = await getStripe().checkout.sessions.create({
    mode: isRecurring ? "subscription" : "payment",
    line_items: [
      {
        price_data: isRecurring
          ? {
              currency: "usd",
              product_data: {
                name: "TechRise Initiative Donation",
                description: "Recurring monthly donation to support our programs",
              },
              unit_amount: amount,
              recurring: { interval: "month" },
            }
          : {
              currency: "usd",
              product_data: {
                name: "TechRise Initiative Donation",
                description: "One-time donation to support our programs",
              },
              unit_amount: amount,
            },
        quantity: 1,
      },
    ],
    customer_email: donorEmail || undefined,
    metadata: {
      userId: session?.user?.id || "",
      donorName: donorName || "",
      message: message || "",
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/donate?canceled=true`,
  });

  // Create pending donation record
  await withResult(() =>
    donationService.createPending({
      userId: session?.user?.id,
      amount,
      donorName,
      donorEmail,
      isRecurring,
      message,
      stripeSessionId: checkoutSession.id,
    })
  );

  if (checkoutSession.url) {
    redirect(checkoutSession.url);
  }

  return { success: false, error: "Failed to create checkout session" };
}
