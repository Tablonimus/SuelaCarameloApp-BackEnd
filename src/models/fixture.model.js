import mongoose from "mongoose";

const fixtureSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  image: {
    type: String,
  },
  is_Active: {
    type: Boolean,
    default: false
  },
  category:{
    type:String
  }
});

export default mongoose.model("Fixture", fixtureSchema);
