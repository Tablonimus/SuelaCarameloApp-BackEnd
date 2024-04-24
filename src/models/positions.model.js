import mongoose from "mongoose";

const positionsSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});

export default mongoose.model("Positions", positionsSchema);
