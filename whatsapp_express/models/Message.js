const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    message_id: {
        type: String,
        required: true
    },
    messages: [{
        received: String,
        message: String,
        date: {
            type: Date
        }
    }]
})

module.exports = mongoose.model('Message', messageSchema);