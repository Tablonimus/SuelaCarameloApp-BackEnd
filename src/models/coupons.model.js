import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  terminos: {
    type: String,
  },
  descuento: {
    type: String,
  },
  telefono: {
    type: String,
  },
  ubicacion: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Coupon", couponSchema);
