import { NextResponse } from "next/server";

export async function middleware(request) {
  const ngrokUrl = process.env.NGROK_URL;
  if (!ngrokUrl) return NextResponse.next();

  const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, ngrokUrl);

  const headers = new Headers(request.headers);
  headers.set("host", destination.host);
  headers.set("ngrok-skip-browser-warning", "true");

  const init = { method: request.method, headers, redirect: "follow" };
  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = request.body;
    init.duplex = "half";
  }

  const upstream = await fetch(destination, init);

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const config = {
  matcher: "/:path*",
};
