import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId");

  // NextResponse.next() 的作用是将请求传递给下一个中间件或处理程序。这样，如果你在这个中间件后面还有其他中间件或处理程序，它们将会继续处理请求。如果没有调用 NextResponse.next()，请求将会被截断，不会继续传递给其他中间件或处理程序。
  const res = NextResponse.next();

  if (!userId) {
    res.cookies.set("userId", nanoid());
  }

  return res;
}

export const config = {
  matcher: [
    /**
     * Match all request paths except for the ones starting with:
     *  - api (API routes)
     *  - _next/static (static files)
     *  - _next/image (image optimization files)
     *  - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
