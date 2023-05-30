import mongoose, { connect } from "mongoose";
import { MONGODB_URL } from "./config";

(async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await connect(MONGODB_URL);
    db.STATES.connected
      ? console.log("DB is connected")
      : console.log("Error DB connection");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
