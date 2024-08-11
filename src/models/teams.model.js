import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  logo: {
    type: String,
  },
  address: {
    type: String,
  },
  foundation: {
    type: String,
  },
  stadium: {
    type: String,
  },
  colors: {
    type: String,
  },
  category: {
    type: String,
  },
  teams: { type: Array },
});

export default mongoose.model("Team", teamSchema);
