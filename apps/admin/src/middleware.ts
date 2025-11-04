import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { CustomJwtSessionClaims } from "@repo/types";

// Define which routes are public (no login required)
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/unauthorized(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Skip auth check for public routes
  if (!isPublicRoute(req)) {
    await auth.protect();

    const { userId, sessionClaims } = await auth();

    if (userId && sessionClaims) {
      const userRole = (sessionClaims as CustomJwtSessionClaims).metadata?.role;

      if (userRole === "admin") {
        return Response.redirect(new URL("/unauthorized", req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
