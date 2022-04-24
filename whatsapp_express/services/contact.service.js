const Contact = require('../models/Contact');
const createError = require('http-errors');
const message = require('../services/message.service')

class contactService {

    static async all(id) {

        let contact = await Contact.findOne({user_id : id});
        return contact;
    }

    static async add(data) {

        const { user_id, contact_username, contact_id } = data;
        const user = await Contact.findOne({user_id});

        if(user !== null) {

            const condition = { user_id, 'contacts.contact_id' : data.contact_id };

            let checkIfContactExist = await Contact.findOne(condition);

            if(checkIfContactExist) {
                return false;
            }

            let getMessageId = await message.createMessageId();

            if(getMessageId) {

                let contacts = [];
                const getContacts = await Contact.findOne(user_id);
                contacts.push(...getContacts);

                let newContact = { contact_username, contact_i, message_id : getMessageId };
                contacts.push(newContact);

                let update = await Contact.findOneAndUpdate(user_id, { user_id, contacts });

                return update;
            }
        }

        let getMessageId = await message.createMessageId();
        let contactDetails = { user_id, contacts: [{ contact_username, contact_id, message_id : getMessageId  }]};
        let createContact = new Contact(contactDetails);
        let newContact = createContact.save();
        return newContact;
    }
}


module.exports = contactService;