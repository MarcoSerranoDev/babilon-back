import { Schema, model } from "mongoose";

const schemaRole = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", schemaRole);
