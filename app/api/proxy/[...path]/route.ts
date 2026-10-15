import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.lucasefreitas.dev";

async function proxyRequest(
  req: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  const { path } = await props.params;
  const pathString = path.join("/");
  const url = `${API_BASE_URL}/api/v1/${pathString}${req.nextUrl.search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k !== "host" && k !== "connection" && k !== "content-length") {
      headers.set(key, value);
    }
  });

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.text()
      : undefined;

  if (body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (k !== "content-encoding" && k !== "transfer-encoding") {
        responseHeaders.set(key, value);
      }
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error("Proxy error reaching backend API:", err);
    return NextResponse.json(
      {
        status: 502,
        title: "Bad Gateway",
        detail:
          err instanceof Error
            ? err.message
            : "Proxy failed to reach backend API",
      },
      { status: 502 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
