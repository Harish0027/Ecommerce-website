import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";
import { startOfMonth, subMonths } from "date-fns";
import { OrderChartType } from "@repo/types";

export const orderRoute = async (fastify: FastifyInstance) => {
  //  User orders
  fastify.get(
    "/user-orders",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId });
      return reply.send(orders);
    }
  );

  //  Admin: All orders
  fastify.get(
    "/orders",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const { limit } = request.query as { limit?: number };
      const orders = await Order.find()
        .limit(limit ?? 50)
        .sort({ createdAt: -1 });
      return reply.send(orders);
    }
  );

  //  Admin: Chart data for last 6 months
  fastify.get(
    "/order-chart",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const now = new Date();
      const sixMonthsAgo = startOfMonth(subMonths(now, 5));

      // We aggregate orders by month
      const raw = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo, $lte: now },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: { $sum: 1 }, // total transactions
            successful: {
              $sum: {
                $cond: [{ $eq: ["$status", "success"] }, 1, 0],
              },
            },
            uniqueUsers: { $addToSet: "$userId" }, // get distinct users per month
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            total: 1,
            successful: 1,
            totalUsers: { $size: "$uniqueUsers" }, // count of unique users (people who transacted)
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const results: OrderChartType[] = [];

      for (let i = 5; i >= 0; i--) {
        const d = subMonths(now, i);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;

        const match = raw.find(
          (item) => item.year === year && item.month === month
        );

        results.push({
          month: monthNames[month - 1],
          total: match ? match.total : 0,
          successful: match ? match.successful : 0,
          totalUsers: match ? match.totalUsers : 0,
        });
      }

      return reply.send(results);
    }
  );
};
