import { Router } from "express";
const router = Router();

import * as eventCtrl from "../controllers/event.controller";

router.post("/", eventCtrl.createEvent);
router.get("/", eventCtrl.getEvents);
router.get("/:id", eventCtrl.getEventById);
router.put("/:id", eventCtrl.updateEventById);
router.delete("/:id", eventCtrl.deleteEventById);

export default router;
