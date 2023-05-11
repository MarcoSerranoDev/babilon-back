import { Schema, model } from "mongoose";

const serieSchema = new Schema({
  imgUrl: String,
  routeUrl: String,
  usLang: {
    title: String,
    description: String,
  },
  esLang: {
    title: String,
    description: String,
  },
});

export default model("Serie", serieSchema);
