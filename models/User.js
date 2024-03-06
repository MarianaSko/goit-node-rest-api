import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp } from "../constants/regexp.js";

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
        required: [true, 'Verify token is required'],
    },
    verificationToken: {
        type: String,

    },
}, { versionKey: false })

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;