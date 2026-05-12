import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const entries = await client.db("nightlife").collection("entries").find().toArray();
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  const entry = {
    userId: body.userId,
    venueId: body.venueId,
    eventId: body.eventId,
    entryType: body.entryType,
    amount: body.amount || 1,
    timestamp: new Date()
  };

  const result = await client.db("nightlife").collection("entries").insertOne(entry);

  // Update user's total entries
  await client.db("nightlife").collection("users").updateOne(
    { _id: body.userId },
    { $inc: { totalEntries: entry.amount } }
  );

  return NextResponse.json({ insertedId: result.insertedId });
}
