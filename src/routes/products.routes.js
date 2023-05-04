import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";

router.get("/", productsCtrl.getProducts);

router.get("/:id", productsCtrl.getProductById);

router.post("/", productsCtrl.createProduct);

router.put("/:id", productsCtrl.updateProductById);

router.delete("/:id", productsCtrl.deleteProductById);

export default router;
