import { Router } from "express";
const router = Router();
import * as guitarCtrl from "../controllers/guitar.controller";

router.get("/", guitarCtrl.getGuitars);

router.get("/:id", guitarCtrl.getGuitarById);

router.post("/", guitarCtrl.createGuitar);

router.put("/:id", guitarCtrl.updateGuitarById);

router.delete("/:id", guitarCtrl.deleteGuitarById);

export default router;
