import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const events = await client.db("nightlife").collection("events").find().toArray();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  const event = {
    venueId: body.venueId,
    eventName: body.eventName,
    description: body.description,
    startTime: new Date(body.startTime),
    endTime: new Date(body.endTime),
    prizeDaily: body.prizeDaily,
    prizeWeekly: body.prizeWeekly,
    prizeMonthly: body.prizeMonthly,
    bonusEntryWindows: body.bonusEntryWindows || [],
    createdAt: new Date(),
    active: true
  };

  const result = await client.db("nightlife").collection("events").insertOne(event);
  return NextResponse.json({ insertedId: result.insertedId });
}
