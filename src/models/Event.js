import { Schema, model } from "mongoose";

const schemaEvent = new Schema({
  tag: String,
  date: String,
  imgCard: String,
  iconEvent: String,
  usLang: {
    title: String,
    smallInfo: String,
    largeInfo: [String],
  },
  esLang: {
    title: String,
    smallInfo: String,
    largeInfo: [String],
  },
  imagesEvent: [String],
});

export default model("Event", schemaEvent);
