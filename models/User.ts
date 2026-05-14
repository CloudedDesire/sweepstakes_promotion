import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    // Auth fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },

    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String },

    // Profile fields
    phone: { type: String },
    address: { type: String },
    zipcode: { type: String },
    sex: { type: String, enum: ["male", "female"] },

    // Admin dashboard fields
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    totalEntries: { type: Number, default: 0 },
    statusTier: { type: String, default: "Silver" },
    referralCode: { type: String },
    referredBy: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
