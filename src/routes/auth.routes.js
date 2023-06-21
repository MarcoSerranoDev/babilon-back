import { Router } from "express";
const router = Router();
import { validateSignup } from "../middlewares";

import * as authCtrl from "../controllers/auth.controller";

router.get("/refresh", authCtrl.refreshToken);
router.get("/verify", authCtrl.verifyToken);
router.post("/signup", validateSignup.checkExistingUser, authCtrl.signUp);
router.post("/signin", authCtrl.signIn);
router.post("/logout", authCtrl.logout);

export default router;
