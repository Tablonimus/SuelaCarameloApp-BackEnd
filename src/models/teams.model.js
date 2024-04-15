import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  details: {
    type: String,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  image: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Team", teamSchema);
