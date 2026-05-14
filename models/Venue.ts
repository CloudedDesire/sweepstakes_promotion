import mongoose, { Schema } from "mongoose";

const VenueSchema = new Schema(
  {
    venueName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },

    latitude: { type: Number },
    longitude: { type: Number },

    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Venue || mongoose.model("Venue", VenueSchema);
