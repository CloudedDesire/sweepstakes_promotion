import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  const checkin = {
    userId: body.userId,
    venueId: body.venueId,
    eventId: body.eventId,
    latitude: body.latitude,
    longitude: body.longitude,
    distanceFromVenue: body.distanceFromVenue,
    timestamp: new Date(),
    valid: body.valid
  };

  const result = await client.db("nightlife").collection("checkins").insertOne(checkin);
  return NextResponse.json({ insertedId: result.insertedId });
}
