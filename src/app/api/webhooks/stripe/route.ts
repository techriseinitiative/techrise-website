import { headers } from "next/headers";
import Stripe from "stripe";
import { donationService } from "@/lib/services/donationService";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-08-26.dahlia",
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const reqHeaders = await headers();
  const signature = reqHeaders.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch {
    return new Response("Stripe not configured", { status: 503 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Webhook error", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await donationService.markSucceeded(
          session.id,
          session.payment_intent as string
        );
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        await donationService.markSucceeded(
          session.id,
          session.payment_intent as string
        );
        break;
      }
      case "checkout.session.async_payment_failed":
      case "payment_intent.payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await donationService.markFailed(session.id);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response("Internal error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
