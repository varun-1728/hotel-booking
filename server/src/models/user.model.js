import mongoose from "mongoose";
const { Schema } = mongoose;

const SessionSchema = Schema({
  deviceInfo: String,
  refreshTokenHash: String,
  createdAt: { type: Date, default: Date.now() },
  expiresAt: Date,
  lastUsedAt: Date,
});

const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "user" },
  sessions: [SessionSchema],
});

const User = mongoose.model("user", userSchema);
export default User;
