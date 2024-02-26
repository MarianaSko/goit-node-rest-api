import Joi from "joi";
import { emailRegexp } from "../constants/regexp.js";

export const signupSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

export const subscriptionChangeSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required()
})