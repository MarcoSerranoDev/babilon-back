import { Schema, model } from "mongoose";

const productSchema = new Schema({
  id: Number,
  serie: String,
  modelo: String,
  category: String,
  type: String,
  top: { type: Boolean, default: false },
  gama: { type: String, default: "null" },
  usLang: {
    description: String,
    description_small: String,
    featuresText: [String],
  },
  esLang: {
    description: String,
    description_small: String,
    featuresText: [String],
  },
  colors: [
    {
      color: String,
      code: String,
      rutas: [String],
    },
  ],
  rutas: [String],
});

export default model("Product", productSchema);
