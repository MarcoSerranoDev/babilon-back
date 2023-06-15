import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { validateSignup } from "../middlewares";

router.post("/signup", validateSignup.checkExistingUser, authCtrl.signUp);
router.post("/signin", authCtrl.signIn);
router.get("/verify", authCtrl.verifyToken);

export default router;
