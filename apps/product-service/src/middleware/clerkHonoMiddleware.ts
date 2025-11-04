import { clerkMiddleware } from "@clerk/express";
import { Context, Next } from "hono";

/**
 * Wrap Clerk middleware to work with Hono
 */
export const clerkHonoMiddleware = async (c: Context, next: Next) => {
  // Convert Hono's request to something Clerk understands
  const req = c.req.raw as any;
  const res: any = {
    end: () => {},
    statusCode: 200,
    setHeader: () => {},
  };

  // Run Clerk middleware
  await new Promise<void>((resolve, reject) => {
    (clerkMiddleware() as any)(req, res, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });

  await next();
};
