import mongoose from "mongoose";

const fixtureSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "El número de fecha es requerido"],
    min: [1, "El número mínimo es 1"],
    max: [30, "El número máximo es 30"],
  },
  image: {
    type: String,
    required: [true, "La imagen es requerida"],
    validate: {
      validator: function (v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
  is_Active: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: [true, "La categoría es requerida"],
    enum: {
      values: ["A1", "F1", "DH", "TI", "TN", "CM"],
      message: "{VALUE} no es una categoría válida",
    },
  },
  tournament: {
    type: String,
    required: [true, "El torneo es requerido"],
    trim: true,
    maxlength: [100, "El nombre del torneo no puede exceder 100 caracteres"],
  },
  season: {
    type: String,
    required: [true, "La temporada es requerida"],
    match: [/^\d{4}-\d{4}$/, "Formato de temporada inválido (ej: 2023-2024)"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Índice compuesto para evitar duplicados
fixtureSchema.index(
  { number: 1, category: 1, season: 1, tournament: 1 },
  { unique: true }
);

export default mongoose.model("Fixture", fixtureSchema);
