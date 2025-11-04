import { FastifyInstance } from "fastify";
import { Prisma, prisma } from "@repo/product-db";
import { shouldBeAdmin } from "../middleware/authMiddleware.js";
import { client } from "../utils/redis.js";

export const categoryRoute = async (fastify: FastifyInstance) => {
  //  CREATE CATEGORY
  fastify.post("/", { preHandler: shouldBeAdmin }, async (request, reply) => {
    try {
      const data = request.body as Prisma.CategoryCreateInput;

      const category = await prisma.category.create({ data });

      // delete cached categories
      await client.del("categories");

      return reply.code(201).send(category);
    } catch (err: any) {
      console.error("Error creating category:", err);
      return reply.code(500).send({ message: err.message });
    }
  });

  // UPDATE CATEGORY
  fastify.put("/:id", { preHandler: shouldBeAdmin }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const data = request.body as Prisma.CategoryUpdateInput;

      const category = await prisma.category.update({
        where: { id: Number(id) },
        data,
      });

      //  clear cache
      await client.del("categories");

      return reply.code(200).send(category);
    } catch (err: any) {
      console.error("Error updating category:", err);
      return reply.code(500).send({ message: err.message });
    }
  });

  // DELETE CATEGORY
  fastify.delete(
    "/:id",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };

        const category = await prisma.category.delete({
          where: { id: Number(id) },
        });

        // clear cache
        await client.del("categories");

        return reply.code(200).send(category);
      } catch (err: any) {
        console.error("Error deleting category:", err);
        return reply.code(500).send({ message: err.message });
      }
    }
  );

  // GET ALL CATEGORIES (CACHED)
  // GET ALL CATEGORIES (CACHED)
  fastify.get("/", async (request, reply) => {
    try {
      const cached = await client.get("categories");

      if (cached) {
        return reply.code(200).send(JSON.parse(cached));
      }

      // Fetch DB
      const categories = await prisma.category.findMany();

      // Store in cache for 1 minute
      await client.set("categories", JSON.stringify(categories), {
        EX: 60, // 1 minute
      });

      return reply.code(200).send(categories);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      return reply.code(500).send({ message: err.message });
    }
  });
};
