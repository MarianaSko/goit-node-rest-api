import * as authServices from "../services/authServices.js";
import * as userServices from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar"
import Jimp from "jimp";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const avatarsDir = path.resolve("public", "avatars");

const signup = async (req, res) => {
    const { email } = req.body;
    const avatarURL = gravatar.url(email, { s: '250', r: 'pg', d: 'identicon' });
    const user = await userServices.findUser({ email });

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const newUser = await authServices.signup({ ...req.body, avatarURL });

    res.status(201).json({
        user:
        {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" })
    await authServices.setToken(user._id, token);

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await authServices.setToken(_id);
    res.status(204).json()
}

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const result = await userServices.updateSubscription(_id, req.body);
    res.json(result)
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;

    Jimp.read(oldPath).then(async (img) => {
        img.resize(250, 250).write(oldPath);
        const newPath = path.join(avatarsDir, filename);
        await fs.rename(oldPath, newPath);
    }).catch((err) => {
        console.error(err);
    });

    const avatarURL = path.join("avatars", filename);
    await userServices.updateAvatar(_id, { avatarURL });
    res.json({
        avatarURL
    })

}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}