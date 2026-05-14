import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import QRCode from "@/models/QRCode";

export async function GET() {
  try {
    await connectDB();

    const codes = await QRCode.find({});
    return NextResponse.json(codes);
  } catch (err) {
    console.error("GET /qr_codes error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const qr = await QRCode.create({
      eventId: body.eventId,
      venueId: body.venueId,
      codeValue: body.codeValue,
      createdAt: new Date(),
      expiresAt: new Date(body.expiresAt),
      maxScans: body.maxScans,
      scansUsed: 0,
    });

    return NextResponse.json({ insertedId: qr._id });
  } catch (err) {
    console.error("POST /qr_codes error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
