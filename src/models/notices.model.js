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
    default: {
      name: "Suela Caramelo",
      img: "https://firebasestorage.googleapis.com/v0/b/suelapp-837b5.appspot.com/o/suela.png?alt=media&token=ccfb4ed3-ba86-4720-9e29-664957f65272",
    },
  },
});

export default mongoose.model("Noticia", noticiasSchema);
