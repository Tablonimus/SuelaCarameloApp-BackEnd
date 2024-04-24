import mongoose from "mongoose";

const authorsSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Authors", authorsSchema);
