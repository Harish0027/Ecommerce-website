import dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import cors from "@fastify/cors";
import Clerk from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { consumer, producer } from "./utils/kafka.js";
import { productRoute } from "./routes/product.route.js";
import { categoryRoute } from "./routes/category.route.js";

const fastify = Fastify({
  logger: true,
});

//Enable CORS first
await fastify.register(cors, {
  origin: ["http://localhost:3002", "http://localhost:3003"],
  credentials: true,
});

// Register Clerk middleware
await fastify.register(Clerk.clerkPlugin, {
  publishableKey:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    "pk_test_c3VyZS1waG9lbml4LTY0LmNsZXJrLmFjY291bnRzLmRldiQ",
  secretKey:
    process.env.CLERK_SECRET_KEY ||
    "sk_test_C4ypSfNB4OjQKtMnRhIs1t7lUl6nEKzcuq3u8a4OtZ",
});

// Register your routers
await fastify.register(productRoute, { prefix: "/products" });
await fastify.register(categoryRoute, { prefix: "/categories" });

//Error handling
fastify.setErrorHandler((error, request, reply) => {
  reply.status(500).send({
    message: error.message || "Internal Server Error!",
  });
});

// Start server
const start = async () => {
  try {
    await Promise.all([producer.connect(), consumer.connect()]);

    await fastify.listen({ port: 8000 });
    console.log("Product service running on port 8000");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
