import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const codes = await client.db("nightlife").collection("qr_codes").find().toArray();
  return NextResponse.json(codes);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  const qr = {
    eventId: body.eventId,
    venueId: body.venueId,
    codeValue: body.codeValue,
    createdAt: new Date(),
    expiresAt: new Date(body.expiresAt),
    maxScans: body.maxScans,
    scansUsed: 0
  };

  const result = await client.db("nightlife").collection("qr_codes").insertOne(qr);
  return NextResponse.json({ insertedId: result.insertedId });
}
