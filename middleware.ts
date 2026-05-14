import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth")?.value;

  if (!token) return NextResponse.redirect("/login");

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect("/login");
  }
}

export const config = {
  matcher: ["/profile/:path*", "/edit-profile/:path*"],
};
