import { Schema, model } from "mongoose";

const serieSchema = new Schema({
  imgUrl: String,
  routeUrl: String,
  title: String,
  esDescription: String,
  usDescription: String,
});

export default model("Serie", serieSchema);
