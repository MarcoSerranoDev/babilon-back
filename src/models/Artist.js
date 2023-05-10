import { Schema, model } from "mongoose";

const schemaArtist = new Schema({
  name: String,
  usDescription: String,
  esDescription: String,
  img: String,
  facebook: String,
  twitter: String,
});

export default model("Artist", schemaArtist);
