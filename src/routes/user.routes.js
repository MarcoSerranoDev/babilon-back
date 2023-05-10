import { Router } from "express";
const router = Router();

import { verifyToken, isAdmin } from "../middlewares/authjwt";
import * as userCtrl from "../controllers/user.controller";

router.get("/", [verifyToken, isAdmin], userCtrl.getUsers);

router.get("/:id", userCtrl.getUserById);

router.post("/", userCtrl.createUser);

router.put("/:id", userCtrl.updateUserById);

router.delete("/:id", userCtrl.deleteUserById);

export default router;
