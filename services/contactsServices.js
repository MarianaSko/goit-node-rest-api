import Contact from "../models/Contact.js";

export const getAllContacts = () => Contact.find();

export const getContactById = async (contactId) => Contact.findById(contactId);

export const addContact = async (data) => Contact.create(data);

export const removeContact = async (contactId) => Contact.findByIdAndDelete(contactId)

export const updateContactById = async (contactId, data) => Contact.findByIdAndUpdate(contactId, data)

export const updateStatusContact = async (contactId, body) => Contact.findByIdAndUpdate(contactId, body)