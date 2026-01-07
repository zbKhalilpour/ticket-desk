import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/requireAuth";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", requireAuth, authController.me);
