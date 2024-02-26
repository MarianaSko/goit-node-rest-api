import * as authServices from "../services/authServices.js";
import * as userServices from "../services/userServices.js"
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await userServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const newUser = await authServices.signup(req.body);

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

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
}