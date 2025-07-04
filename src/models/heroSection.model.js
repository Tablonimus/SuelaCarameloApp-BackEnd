import mongoose from "mongoose";

const heroImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator: function (v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  redirectUrl: {
    type: String,
    validate: {
      validator: function (v) {
        if (!v) return true;
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  targetHeight: {
    type: Number,
    required: [true, "Target height is required"],
    min: [100, "Height must be at least 100px"],
    max: [2000, "Height cannot exceed 2000px"],
  },
  deviceType: {
    type: String,
    required: [true, "Device type is required"],
    enum: {
      values: ["desktop", "mobile"],
      message: "{VALUE} is not supported",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
    min: [0, "Order cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Actualizar updatedAt antes de guardar
heroImageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Actualizar updatedAt antes de actualizar
heroImageSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

export default mongoose.model("HeroImage", heroImageSchema);
