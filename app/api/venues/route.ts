import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Venue from "@/models/Venue";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const venues = await Venue.find({});
    return NextResponse.json(venues);
  } catch (err) {
    console.error("GET /venues error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const venue = await Venue.create({
      venueName: body.venueName,
      address: body.address,
      city: body.city,
      state: body.state,
      zip: body.zip,
      latitude: body.latitude,
      longitude: body.longitude,
      createdAt: new Date(),
      active: true,
    });

    return NextResponse.json({ insertedId: venue._id });
  } catch (err) {
    console.error("POST /venues error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    await Venue.updateOne(
      { _id: new mongoose.Types.ObjectId(body._id) },
      { $set: body }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH /venues error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Venue.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /venues error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
