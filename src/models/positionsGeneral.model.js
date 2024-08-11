import mongoose from "mongoose";

const positionsGeneralSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});

export default mongoose.model("PositionsGeneral", positionsGeneralSchema);
