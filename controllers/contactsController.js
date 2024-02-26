import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    const result = await contactsService.getContactsByFilter({ owner, favorite }, { skip, limit });
    const total = await contactsService.getContactsCountByFilter({ owner, favorite });
    res.json({ total, result });
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.getContactByFilter({ _id: id, owner });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.removeContactByFilter({ _id: id, owner });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result)
};

const createContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner })
    res.status(201).json(result)
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.updateContactByFilter({ _id: id, owner }, req.body)
    if (!result) {
        throw HttpError(404);
    }
    res.json(result)
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.updateStatusByFilter({ _id: id, owner }, req.body)
    if (!result) {
        throw HttpError(404);
    }
    res.json(result)
}

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatus: ctrlWrapper(updateStatus)
}