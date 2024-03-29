import express from "express";
import authController from "../controllers/authController.js";
import validateBody from "../decorators/validateBody.js";
import { signupSchema, subscriptionChangeSchema, verifySchema } from "../schemas/usersSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(signupSchema), authController.signup)

authRouter.get("/verify/:verificationToken", authController.verify)

authRouter.post("/verify", validateBody(verifySchema), authController.resendVerifyEmail)

authRouter.post("/login", validateBody(signupSchema), authController.signin)

authRouter.get("/current", authenticate, authController.getCurrent)

authRouter.post("/logout", authenticate, authController.logout)

authRouter.patch("/", authenticate, validateBody(subscriptionChangeSchema), authController.updateSubscription)

authRouter.patch("/avatars", upload.single("avatarURL"), authenticate, authController.updateAvatar)


export default authRouter;