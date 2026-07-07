import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    value:   { type: String, required: true, unique: true, immutable: true, trim: true },
    label:   { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true },
    order:   { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
