import { Router } from "express";
const router = Router();

import * as seriesCtrl from "../controllers/serie.controller";

router.get("/", seriesCtrl.getSeries);

router.get("/:id", seriesCtrl.getSerieById);

router.post("/", seriesCtrl.createSerie);

router.put("/:id", seriesCtrl.updateSerieById);

router.delete("/:id", seriesCtrl.deleteSerieById);

export default router;
