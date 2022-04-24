const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
   username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: String,
    password: {
        type: String,
        required: true
    },
    profile_photo: String
})

module.exports = mongoose.model("User", userSchema)
