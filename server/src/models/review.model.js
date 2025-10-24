import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
  },
});

export default mongoose.model("Review", reviewSchema);
