import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  },
  instagram: {
    type: String,
  },
  ubicacion: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Sponsor", sponsorSchema);
