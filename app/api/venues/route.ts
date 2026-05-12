import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const venues = await client.db("nightlife").collection("venues").find().toArray();
  return NextResponse.json(venues);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  const venue = {
    venueName: body.venueName,
    address: body.address,
    city: body.city,
    state: body.state,
    zip: body.zip,
    latitude: body.latitude,
    longitude: body.longitude,
    createdAt: new Date(),
    active: true
  };

  const result = await client.db("nightlife").collection("venues").insertOne(venue);
  return NextResponse.json({ insertedId: result.insertedId });
}
