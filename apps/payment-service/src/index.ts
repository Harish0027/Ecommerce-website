import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import { clerkPlugin } from "@clerk/fastify";

import { sessionRoute } from "./routes/session.route.js";
import { webhookRoute } from "./routes/webhooks.route.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";
import { producer } from "./utils/kafka.js";

const fastify = Fastify({ logger: true });

/**
 * ✅ 1. CORS and formbody — ok
 */
await fastify.register(cors, { origin: ["http://localhost:3002"] });
await fastify.register(fastifyFormbody);

/**
 * ✅ 2. Clerk setup — ok
 */
await fastify.register(clerkPlugin, {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

/**
 * ⚡ 3. Stripe Webhook Parser — critical part
 * Must be added BEFORE registering /webhook route.
 */
fastify.addContentTypeParser(
  "application/json",
  { parseAs: "buffer" },
  (req, body, done) => {
    try {
      if (req.url?.startsWith("/webhook")) {
        // ✅ keep as Buffer for Stripe signature verification
        done(null, body);
      } else {
        // ✅ normal JSON parsing for other routes
        const json = JSON.parse(body.toString("utf8"));
        done(null, json);
      }
    } catch (err) {
      done(err as Error, undefined);
    }
  }
);

/**
 * ✅ 4. Register routes
 */
await fastify.register(sessionRoute, { prefix: "/sessions" });
await fastify.register(webhookRoute, { prefix: "/webhook" });

/**
 * ✅ 5. Start Fastify + Kafka
 */
fastify.listen({ port: 8002 }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await producer.connect();

  fastify.log.info(`🚀 Server running at ${address}`);

  try {
    await runKafkaSubscriptions();
    fastify.log.info("✅ Kafka subscriptions initialized");
  } catch (err) {
    fastify.log.error(err, "❌ Kafka subscription failed:");
  }
});
