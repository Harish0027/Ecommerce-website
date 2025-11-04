import "@clerk/fastify";

declare module "fastify" {
  interface FastifyRequest {
    auth?: import("@clerk/fastify").ClerkFastifyAuth;
  }
}
