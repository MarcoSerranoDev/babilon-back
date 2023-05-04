import express from "express";
import morgan from "morgan";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

//Meddlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;
