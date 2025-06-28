import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  place: {
    type: String,
    required: [true, "El lugar del partido es obligatorio"],
  },
  date: {
    type: Date,
    required: [true, "La fecha del partido es obligatoria"],
  },
  time: {
    type: String,
    required: [true, "La hora del partido es obligatoria"],
  },
  local: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "El equipo local es obligatorio"],
  },
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "El equipo visitante es obligatorio"],
  },
  category: {
    type: String,
    required: [true, "La categoría del partido es obligatoria"],
  },
  status: {
    type: String,
    enum: [
      "pending", // antes de empezar
      "first_half", // primer tiempo
      "halftime", // entre tiempo
      "second_half", // segundo tiempo
      "extra_time", // tiempo extra
      "penalties", // definición por penales
      "finished", // finalizado
      "postponed", // aplazado
      "canceled", // cancelado
      "suspended", // suspendido
    ],
    default: "pending",
  },
  score: {
    local: {
      type: Number,
      default: 0,
    },
    visitor: {
      type: Number,
      default: 0,
    },
  },

  penaltyScore: {
    local: {
      type: Number,
      default: 0,
    },

    visitor: {
      type: Number,
      default: 0,
    },
  },

  referee: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Opcional: Índices para mejorar búsquedas frecuentes
// matchSchema.index({ date: 1 });
// matchSchema.index({ local: 1 });
// matchSchema.index({ visitor: 1 });
// matchSchema.index({ category: 1 });
// matchSchema.index({ status: 1 });

export default mongoose.model("Match", matchSchema);
