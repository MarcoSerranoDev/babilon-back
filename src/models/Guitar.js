import { Schema, model } from "mongoose";

const guitarSchema = new Schema({
  urlImage: String,
  linkTo: String,
  usLang: {
    title: String,
    description: String,
  },
  esLang: {
    title: String,
    description: String,
  },
});

export default model("Guitar", guitarSchema);
