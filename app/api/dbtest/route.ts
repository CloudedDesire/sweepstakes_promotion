import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("nightlife");
  const result = await db.collection("test").insertOne({
    ok: true,
    time: new Date(),
  });

  return NextResponse.json({ insertedId: result.insertedId });
}
