import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", request.url));
  res.cookies.set("admin_auth", "", { path: "/", maxAge: 0 });
  return res;
}
