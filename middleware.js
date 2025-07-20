
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/create-user(.*)',
  '/api/contact(.*)',
  '/api/create-checkout-session(.*)',
  '/api/get-plan(.*)',
  '/api/website-generation(.*)',
]);

export default clerkMiddleware({
  async afterAuth(auth, req) {
    const plan = auth?.user?.publicMetadata?.plan || 'basic';
    const url = req.nextUrl;

    // Handle protected routes
    if (isProtectedRoute(req)) {
      if (!auth.userId) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
    }

    // Handle plan-based redirects
    if (url.pathname.startsWith('/pro-feature') && plan !== 'pro') {
      url.pathname = '/upgrade';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};
