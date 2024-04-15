import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  team: {
    type: String,
  },

});

export default mongoose.model("Player", playersSchema);
