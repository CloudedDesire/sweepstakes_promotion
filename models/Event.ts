import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
  {
    venueId: { type: Schema.Types.ObjectId, required: true },
    eventName: { type: String, required: true },
    description: { type: String },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    prizeDaily: { type: Number },
    prizeWeekly: { type: Number },
    prizeMonthly: { type: Number },

    bonusEntryWindows: [
      {
        start: Date,
        end: Date,
        bonusAmount: Number,
      },
    ],

    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
