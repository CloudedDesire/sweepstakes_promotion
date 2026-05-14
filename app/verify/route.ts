import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status");

  return new NextResponse(
    `
      <html>
        <body>
          ${
            status === "success"
              ? "<h1>Email Verified</h1><p>Your account is now active.</p>"
              : "<h1>Verifying…</h1><p>Please wait while we confirm your email.</p>"
          }
        </body>
      </html>
    `,
    { headers: { "Content-Type": "text/html" } }
  );
}
