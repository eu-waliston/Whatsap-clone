const Message = require('../models/Message')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class messageService {

    static async createMessageId() {

        let message_id = String(uuidv4());
        let message = new Message({message_id});
        await message.save();
        return message_id;
    }
    
    static async message(data = null) {

        if(data !== null ) {

            let { message_id, receive, message, date } = data;
            let messages = [];

            const condition = { message_id };

            let getMessages = await Message.findOne(message_id);
            messages.push(...getMessage.messages);

            if(getMessages) {
                let newMessage = { receive, message, date }
                messages.push(newMessage);

                await Message.findOneAndUpdate(condition, { $set:  {'messages.$': messages }} );

                return data
            }


        }
    }

}

module.exports = messageService