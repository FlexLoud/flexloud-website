import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Correlation ID: accept inbound header, otherwise generate
  const existing = req.headers.get("x-request-id");
  const requestId =
    existing && existing.trim().length > 0
      ? existing
      : crypto.randomUUID();

  res.headers.set("x-request-id", requestId);
  res.headers.set("x-served-by", "flexloud-web");

  return res;
}

// REQUIRED exact export name
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
