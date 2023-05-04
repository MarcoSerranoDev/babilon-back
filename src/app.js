import express from "express";
import morgan from "morgan";

const app = express();

//Meddlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
