import { Schema, model } from "mongoose";

const configSchema = new Schema(
  {
    key:        { type: String, unique: true, required: true },
    tournament: { type: String, enum: ["Apertura", "Clausura", "Torneo Anual"], default: "Apertura" },
    season:     { type: String, default: "2026" },
  },
  { timestamps: true }
);

export default model("Config", configSchema);
