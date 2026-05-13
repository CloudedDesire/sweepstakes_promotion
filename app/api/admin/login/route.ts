import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Hardcoded admin credentials for now
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/"
    });

    return res;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
