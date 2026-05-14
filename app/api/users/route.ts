import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({});
    return NextResponse.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newUser = await User.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      createdAt: new Date(),
      lastLogin: new Date(),
      totalEntries: 0,
      statusTier: "Silver",
      referralCode: body.referralCode || null,
      referredBy: body.referredBy || null,
    });

    return NextResponse.json({ insertedId: newUser._id });
  } catch (err) {
    console.error("POST /users error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
