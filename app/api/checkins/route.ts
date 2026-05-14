import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // or Checkin model if you have one

export async function GET() {
  try {
    await connectDB();

    // Example response — adjust to your real logic
    return NextResponse.json({ message: "Check-ins API is working" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
