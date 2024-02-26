import Contact from "../models/Contact.js";

export const getAllContacts = () => Contact.find();
export const getContactsByFilter = (filter, query = {}) => {
    if (!filter.favorite) {
        filter = { owner: filter.owner }
    }
    return Contact.find(filter, null, query)
}


export const getContactsCountByFilter = filter => {
    if (!filter.favorite) {
        filter = { owner: filter.owner }
    }
    return Contact.countDocuments(filter)
};

export const getContactById = (contactId) => Contact.findById(contactId);
export const getContactByFilter = filter => Contact.findOne(filter);

export const addContact = (data) => Contact.create(data);

export const removeContact = (contactId) => Contact.findByIdAndDelete(contactId)
export const removeContactByFilter = filter => Contact.findOneAndDelete(filter)

export const updateContactById = (contactId, data) => Contact.findByIdAndUpdate(contactId, data)
export const updateContactByFilter = (filter, data) => Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = (contactId, data) => Contact.findByIdAndUpdate(contactId, data);
export const updateStatusByFilter = (filter, data) => Contact.findOneAndUpdate(filter, data)