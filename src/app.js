import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/initialSetup";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();
createRoles();

//Meddlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/babilon/v1/products", productsRoutes);
app.use("/api/babilon/v1/auth", authRoutes);
app.use("/api/babilon/v1/users", userRoutes);

export default app;
