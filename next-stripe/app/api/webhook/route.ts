import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const webHookEndpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      webHookEndpointSecret
    );

    switch (stripeEvent.type) {
      case "checkout.session.completed":
        const sessionLineItems = await stripe.checkout.sessions.retrieve(
          stripeEvent.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        const lineItems = sessionLineItems.line_items;
        if (!lineItems)
          return NextResponse.json({ error: "No line items" }, { status: 400 });

        // Save the line items to your database
        console.log(
          "Checkout Session Completed",
          lineItems.data,
          stripeEvent.data.object.customer_details?.email
        );

        // save checkout session to your database

        console.log("Checkout Session Completed", stripeEvent.data.object);

        break;
      case "customer.subscription.updated":
        const subscription = stripeEvent.data.object?.customer;
        const customer = await stripe.customers.retrieve(
          subscription as string
        );

        // save subscription to your database
        console.log("Customer Subscription Updated", customer);

        break;
      default:
        NextResponse.json({ message: "Unhandled event type" }, { status: 200 });
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return NextResponse.json({ message: "Webhook Received" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
