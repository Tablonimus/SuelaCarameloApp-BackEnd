import mongoose from "mongoose";

const noticiasSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  images: {
    type: Array,
  },
  videos: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Object,
  },
});

export default mongoose.model("Noticia", noticiasSchema);
