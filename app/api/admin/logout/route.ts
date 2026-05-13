import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect("/admin/login");
  res.cookies.set("admin_auth", "", { path: "/", maxAge: 0 });
  return res;
}
