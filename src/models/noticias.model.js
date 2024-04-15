import mongoose from "mongoose";

const noticiasSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: "true"
  }
});

export default mongoose.model("Noticia", noticiasSchema);
