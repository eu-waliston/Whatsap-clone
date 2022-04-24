const User = require("../models/User")
const createError = require('http-errors')

require('dotenv').config()

const jwt = require('../utils/jwt')
const bcrypt = require('bcryptjs')

class userService {

    static async register(data) {

        const { phone } = data

        const check = await User.findOne({ phone })

        if (check) {
            throw createError.Conflict('User with phone number already exist')
        }

        data.password = bcrypt.hashSync(data.password, 8)

        const newUser = new User(data)
        const user = await newUser.save()
        delete data.password

        data.accessToken = await jwt.signAccessToken(user)
        data._id = user._id;
        return data

    }

    static async login(data) {

        const { email, password } = data

        const user = await User.findOne({ email })

        if (!user) {
            throw createError.NotFound('User not registered')
        }

        const checkPassword = bcrypt.compareSync(password, user.password)

        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')

        delete user.password

        const accessToken = await jwt.signAccessToken(user)

        return { ...user, accessToken }

    }

    static async findUser(id) {

        const user = await User.findById(id)

        if (!user) {
            throw createError.NotFound('User not registered')
        }

        return user;
    }

    static async allUsers(gender) {
        return User.find({gender});
    }

    static async match(data) {

        const { user_id, liked_id } = data;

        return User.find({
            _id: liked_id,
            "likes.liked_id": user_id
        });

    }

    static async like(data) {
        const { user_id, liked_id, match } = data;

        let condition = { _id : user_id }
        let likes = [];

        let getUser = await User.findById(user_id);

        if(getUser) {
            likes = getUser._doc.likes;
            likes.push(data);
        }

        let update = await User.findOneAndUpdate(condition, {
            likes
        });

        let secondCondition = {_id : liked_id, 'likes.user_id': liked_id};
        if(update) {
            if(match === 1) {

                let updateLiked = await User.findOneAndUpdate(secondCondition, {
                    $set:  {'likes.$': {
                        user_id: liked_id,
                        liked_id: user_id,
                        match: 1
                    }}
                },
                    { new: true });

                if(updateLiked) {
                    return update;
                }
            }
        }
        return update
    }

}

module.exports = userService;
