import User from "../models/User.js";

export const findUser = filter => User.findOne(filter);

export const findUserById = id => User.findById(id);

export const updateSubscription = (id, data) => User.findByIdAndUpdate(id, data)

export const updateAvatar = (id, data) => User.findByIdAndUpdate(id, data);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);