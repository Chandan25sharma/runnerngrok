import { NextResponse } from "next/server";

export function middleware(request) {
  const ngrokUrl = process.env.NGROK_URL;
  if (!ngrokUrl) return NextResponse.next();

  const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, ngrokUrl);

  const headers = new Headers(request.headers);
  headers.set("ngrok-skip-browser-warning", "true");
  headers.set("host", destination.host);

  return NextResponse.rewrite(destination, { request: { headers } });
}

export const config = {
  matcher: "/:path*",
};
