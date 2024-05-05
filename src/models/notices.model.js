import mongoose from "mongoose";

const noticiasSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  subtitle: {
    type: String,
  },
  images: {
    type: Array,
  },
  videos: {
    type: String,
  },
  content: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Object,
    default: { name: "Suela Caramelo", img: "suela.jpg" },
  },
});

export default mongoose.model("Noticia", noticiasSchema);
