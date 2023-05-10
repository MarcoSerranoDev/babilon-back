import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from "../middlewares";

router.get("/topProducts", productsCtrl.getTopProducts);

router.get("/:id", productsCtrl.getProductById);

router.get("/", productsCtrl.getProducts);

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
