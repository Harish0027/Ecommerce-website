import { FastifyInstance } from "fastify";
import stripe from "../utils/stripe.js";
import { shouldBeUser } from "../middleware/authMiddleware.js";
import { getStripeProductPrice } from "../utils/stripeProduct.js";
import Stripe from "stripe";

export const sessionRoute = async (fastify: FastifyInstance) => {
  //  Test route
  fastify.get("/", { preHandler: shouldBeUser }, async (request, reply) => {
    return reply.send({
      key: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      key2: process.env.CLERK_SECRET_KEY,
      message: `Welcome user with ID: ${request.userId}`,
    });
  });

  fastify.post(
    "/create-checkout-session",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      try {
        const { cart } = request.body as {
          cart: { id: string; name: string; quantity: number }[];
        };

        const userId = (request as any).userId;

        if (!cart?.length) {
          return reply.code(400).send({ error: "Cart cannot be empty" });
        }

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
          await Promise.all(
            cart.map(async (item) => {
              const unitAmount = Number(
                await getStripeProductPrice(Number(item.id))
              );
              if (isNaN(unitAmount)) {
                throw new Error(`Invalid price for product ${item.id}`);
              }
              return {
                price_data: {
                  currency: "usd",
                  product_data: { name: item.name },
                  unit_amount: unitAmount,
                },
                quantity: item.quantity,
              };
            })
          );

        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: lineItems,
          client_reference_id: userId,
          ui_mode: "custom",
          return_url:
            "http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}",
        });

        fastify.log.info(` Stripe checkout session created: ${session.id}`);

        return reply.code(200).send({
          checkoutSessionClientSecret: session.client_secret,
        });
      } catch (error: any) {
        fastify.log.error("Stripe session error:", error);
        return reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.get("/:session_id", async (request, reply) => {
    try {
      const { session_id } = request.params as { session_id: string };
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items"],
      });

      return reply.code(200).send({
        status: session.status,
        paymentStatus: session.payment_status,
      });
    } catch (error: any) {
      fastify.log.error("Stripe retrieve error:", error);
      return reply.code(500).send({ error: error.message });
    }
  });
};
