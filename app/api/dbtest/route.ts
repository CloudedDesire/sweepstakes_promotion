import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {

  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  
  try {
    const client = await clientPromise;
    const db = client.db("nightlife");
    const result = await db.collection("test").insertOne({
      ok: true,
      time: new Date(),
    });

    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("DBTEST ERROR:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
