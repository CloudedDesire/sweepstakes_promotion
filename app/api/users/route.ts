import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const users = await client.db("nightlife").collection("users").find().toArray();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  const newUser = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    createdAt: new Date(),
    lastLogin: new Date(),
    totalEntries: 0,
    statusTier: "Silver",
    referralCode: body.referralCode || null,
    referredBy: body.referredBy || null
  };

  const result = await client.db("nightlife").collection("users").insertOne(newUser);
  return NextResponse.json({ insertedId: result.insertedId });
}
