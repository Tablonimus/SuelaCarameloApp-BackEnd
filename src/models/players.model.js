import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: String,
  },
  alias: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  current_club_name: {
    type: String,
  },
  category: {
    type: String,
  },
  club_arrival: {
    type: String,
  },
  position: {
    type: String,
  },
  instagram: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Player", playersSchema);
