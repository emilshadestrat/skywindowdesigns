import { NextResponse } from "next/server";

/**
 * Manus storage proxy — replicates the Vite vitePluginStorageProxy behavior.
 * Intercepts /manus-storage/{key} requests, presigns via Manus Forge API,
 * and returns a 307 redirect to the signed CloudFront URL.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key: keyParts } = await params;
  const key = keyParts.join("/");

  if (!key) {
    return new NextResponse("Missing storage key", { status: 400 });
  }

  const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeBaseUrl || !forgeKey) {
    return new NextResponse("Storage proxy not configured", { status: 500 });
  }

  try {
    const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
    forgeUrl.searchParams.set("path", key);

    const forgeResp = await fetch(forgeUrl, {
      headers: { Authorization: `Bearer ${forgeKey}` },
    });

    if (!forgeResp.ok) {
      return new NextResponse("Storage backend error", { status: 502 });
    }

    const data = (await forgeResp.json()) as { url: string };

    if (!data.url) {
      return new NextResponse("Empty signed URL", { status: 502 });
    }

    return NextResponse.redirect(data.url, {
      status: 307,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return new NextResponse("Storage proxy error", { status: 502 });
  }
}
