import mongoose from "mongoose";

const pageViewSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userAgent: {
    type: String,
  },
});

export default mongoose.model("PageView", pageViewSchema);
