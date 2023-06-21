import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const schemaUser = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    refreshToken: String,
    accessToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schemaUser.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

schemaUser.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword);
};

export default model("User", schemaUser);
