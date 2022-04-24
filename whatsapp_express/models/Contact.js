const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    contacts: [{
        contact_id: {
            type: String,
            required: true
        },
        message_id: {
            type: String,
            required: true
        },
        contact_username: {
            type: String,
            required: true
        },
        // contact_image: {
        //     type: String,
        //     required: true
        // },
    }]
});

module.exports = mongoose.model('Contact', contactSchema);