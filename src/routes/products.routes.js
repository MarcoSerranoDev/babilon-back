import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from "../middlewares";

router.get("/", productsCtrl.getProducts);

router.get("/:id", productsCtrl.getProductById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.createProduct
);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isEditor],
  productsCtrl.updateProductById
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProductById
);

export default router;
