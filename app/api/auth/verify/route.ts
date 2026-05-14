import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return NextResponse.redirect("/verify?status=invalid");
  }

  user.emailVerified = true;
  user.verificationToken = null;
  await user.save();

  return NextResponse.redirect("/verify?status=success");
}
