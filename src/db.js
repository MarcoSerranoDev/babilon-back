import mongoose, { connect } from "mongoose";

(async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await connect(
      "mongodb://mongo:uN891ioiZ4SnkuybGoWM@containers-us-west-22.railway.app:6444"
    );
    db.STATES.connected
      ? console.log("DB is connected")
      : console.log("Error DB connection");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
