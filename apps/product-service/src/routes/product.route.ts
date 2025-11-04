import { FastifyInstance } from "fastify";
import { Prisma } from "@repo/product-db";
import { prisma } from "@repo/product-db";
import { producer } from "../utils/kafka.js";
import { shouldBeAdmin } from "../middleware/authMiddleware.js";
import { StripeProductType } from "@repo/types";
import { client } from "../utils/redis.js";

export const productRoute = async (fastify: FastifyInstance) => {
  //  CREATE PRODUCT
  fastify.post("/", { preHandler: shouldBeAdmin }, async (request, reply) => {
    const data = request.body as Prisma.ProductCreateInput;
    const { colors, images } = data;

    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return reply.code(400).send({ message: "Colors array is required!" });
    }

    if (!images || typeof images !== "object") {
      return reply.code(400).send({ message: "Images object is required!" });
    }

    const missingColors = colors.filter((color) => !(color in images));
    if (missingColors.length > 0) {
      return reply
        .code(400)
        .send({ message: "Missing images for colors!", missingColors });
    }

    const product = await prisma.product.create({ data });

    const stripeProduct: StripeProductType = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
    };

    await producer.send("product.created", { value: stripeProduct });

    //  Invalidate cache
    await client.del("products");

    return reply.code(201).send(product);
  });

  //  UPDATE PRODUCT
  fastify.put("/:id", { preHandler: shouldBeAdmin }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as Prisma.ProductUpdateInput;

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });

    //  Invalidate cache
    await client.del("products");
    await client.del(`product:${id}`);

    return reply.code(200).send(updatedProduct);
  });

  //  DELETE PRODUCT
  fastify.delete(
    "/:id",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const deletedProduct = await prisma.product.delete({
        where: { id: Number(id) },
      });

      await producer.send("product.deleted", { value: Number(id) });

      //  Invalidate cache
      await client.del("products");
      await client.del(`product:${id}`);

      return reply.code(200).send(deletedProduct);
    }
  );

  //  GET ALL PRODUCTS (CACHED)
  fastify.get("/", async (request, reply) => {
    const { sort, category, search, limit } = request.query as {
      sort?: string;
      category?: string;
      search?: string;
      limit?: number;
    };

    //  Unique cache key based on query
    const cacheKey = `products:${sort || "default"}:${category || "all"}:${
      search || "none"
    }:${limit || "all"}`;

    //  Check cache
    const cached = await client.get(cacheKey);
    if (cached) {
      return reply.code(200).send(JSON.parse(cached));
    }

    const orderBy = (() => {
      switch (sort) {
        case "asc":
          return { price: Prisma.SortOrder.asc };
        case "desc":
          return { price: Prisma.SortOrder.desc };
        case "oldest":
          return { createdAt: Prisma.SortOrder.asc };
        default:
          return { createdAt: Prisma.SortOrder.desc };
      }
    })();

    const where = {
      ...(category && category !== "all"
        ? { category: { slug: category } }
        : {}),
      ...(search ? { name: { contains: search.toLowerCase() } } : {}),
    };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: limit ? Number(limit) : undefined,
      include: { category: true },
    });

    //  Cache stored for 1 minute
    await client.set(cacheKey, JSON.stringify(products), { EX: 60 });

    return reply.code(200).send(products);
  });

  //  GET SINGLE PRODUCT (CACHED)
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const cacheKey = `product:${id}`;

    //  Check cache
    const cached = await client.get(cacheKey);
    if (cached) {
      return reply.code(200).send(JSON.parse(cached));
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    //  Store in cache for 1 minute
    await client.set(cacheKey, JSON.stringify(product), { EX: 60 });

    return reply.code(200).send(product);
  });
};
