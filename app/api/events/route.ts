import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find({});
    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /events error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const event = await Event.create({
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
      active: true,
    });

    return NextResponse.json({ insertedId: event._id });
  } catch (err) {
    console.error("POST /events error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
