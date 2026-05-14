import mongoose, { Schema } from "mongoose";

const QRCodeSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true },
    venueId: { type: Schema.Types.ObjectId, required: true },

    codeValue: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },

    maxScans: { type: Number, required: true },
    scansUsed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.QRCode || mongoose.model("QRCode", QRCodeSchema);
