
import { clerkMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  async afterAuth(auth, req) {
    const plan = auth?.user?.publicMetadata?.plan || 'basic';
    const url = req.nextUrl;

    if (url.pathname.startsWith('/pro-feature') && plan !== 'pro') {
      url.pathname = '/upgrade';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
