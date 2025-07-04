import mongoose from "mongoose";

const fixtureSchema = new mongoose.Schema(
  {
    stage: {
      type: String,
      required: true,
      enum: ["temporada", "octavos", "cuartos", "semifinal", "final"],
      default: "temporada",
    },
    number: {
      type: Number,
      required: true,
      index: true,
      min: 1,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: (props) => `${props.value} no es una URL válida!`,
      },
    },
    is_Active: {
      type: Boolean,
      default: false,
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
      enum: ["F1", "A1", "F2", "A2", "DH", "TI", "TN", "CM"],
    },
    season: {
      type: String,
      required: true,
      default: "2025",
      index: true,
    },
    tournament: {
      type: String,
      required: true,
      enum: ["Apertura", "Clausura", "Torneo Anual"],
      index: true,
    },
    playDates: {
      from: {
        type: Date,
        default: null,
      },
      to: {
        type: Date,
        default: null,
      },
    },
    matchweek: {
      type: Number,
      required: function () {
        return this.stage === "temporada";
      },
      min: 1,
      max: 38,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices compuestos
fixtureSchema.index({ category: 1, season: 1, tournament: 1 });
fixtureSchema.index({ is_Active: 1, category: 1 });
fixtureSchema.index({ stage: 1, season: 1, tournament: 1 });

// Middleware para validar un solo fixture activo por categoría/torneo/temporada
fixtureSchema.pre("save", async function (next) {
  if (this.is_Active) {
    await this.constructor.updateMany(
      {
        category: this.category,
        season: this.season,
        tournament: this.tournament,
        _id: { $ne: this._id },
      },
      { $set: { is_Active: false } }
    );
  }
  next();
});

// Virtual para mostrar el rango de fechas formateado
fixtureSchema.virtual("dateRange").get(function () {
  if (!this.playDates?.from) return "Temporada regular";

  const options = { day: "2-digit", month: "long", year: "numeric" };
  const from = this.playDates.from.toLocaleDateString("es-ES", options);
  const to = this.playDates.to.toLocaleDateString("es-ES", options);

  return `Jugado del ${from} al ${to}`;
});

const Fixture = mongoose.model("Fixture", fixtureSchema);

export default Fixture;
