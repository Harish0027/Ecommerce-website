import { FastifyInstance } from "fastify";
import Stripe from "stripe";
import stripe from "../utils/stripe.js";
import { producer } from "../utils/kafka.js";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const webhookRoute = async (fastify: FastifyInstance) => {
  // HEALTH CHECK
  fastify.get("/", async (request, reply) => {
    return reply.code(200).send({
      status: "ok webhook",
      uptime: process.uptime(),
      timestamp: Date.now(),
    });
  });

  // STRIPE WEBHOOK HANDLER
  fastify.post("/stripe", async (request, reply) => {
    const rawBody = request.body as string;
    const sig = request.headers["stripe-signature"] as string | undefined;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
      console.log(event);
    } catch (error) {
      fastify.log.error("Webhook verification failed!");
      return reply.code(400).send({ error: "Webhook verification failed!" });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        try {
          await producer.send("payment.successful", {
            value: {
              userId: session.client_reference_id,
              email: session.customer_details?.email,
              amount: session.amount_total,
              status: session.payment_status === "paid" ? "success" : "failed",
              products: lineItems.data.map((item) => ({
                name: item.description,
                quantity: item.quantity,
                price: item.price?.unit_amount,
              })),
            },
          });

          console.log(" Kafka message sent successfully");
        } catch (err) {
          console.error(" Failed to send Kafka message:", err);
        }

        break;
      }

      default:
        break;
    }

    return reply.code(200).send({ received: true });
  });
};
