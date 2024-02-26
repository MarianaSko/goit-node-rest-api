import express from "express";
import authController from "../controllers/authController.js";
import validateBody from "../decorators/validateBody.js";
import { signupSchema, subscriptionChangeSchema } from "../schemas/usersSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(signupSchema), authController.signup)

authRouter.post("/login", validateBody(signupSchema), authController.signin)

authRouter.get("/current", authenticate, authController.getCurrent)

authRouter.post("/logout", authenticate, authController.logout)

authRouter.patch("/", authenticate, validateBody(subscriptionChangeSchema), authController.updateSubscription)

export default authRouter;