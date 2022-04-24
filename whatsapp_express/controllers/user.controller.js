const user = require('../services/user.service')
const createError = require('http-errors')
const cloud = require("../utils/cloudinary");

class userController {

    static register = async (req, res, next) => {
        try {

            const data = await user.register(req.body)
            res.status(200).json({
                status: true,
                message: "Account successfully created",
                data
            })
            
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static login = async (req, res, next) => {

        try {
            const data = await user.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static all = async (req, res, next) => {

        let { id } = req.params;
        try {
            let currentUser = await user.findUser(id);
            let gender = currentUser.gender;

            switch (gender) {
                case 'M':
                    gender = 'F';
                    break;
                case 'F':
                    gender = 'M';
                    break;
                default:
            }

            let getUsers = await user.allUsers(gender);
            let users = [];

            if(getUsers) {
                getUsers.map((user, index) => {
                    let likes = user.likes;

                    let getNotLiked = likes.filter(obj => obj.liked_id !== user._id);


                    if(getNotLiked) {
                        users.push(user);
                    }

                })
            }
            res.status(200).json({
                status: true,
                message: "Account token successful refreshed",
                data: users
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static matches = async (req, res, next) => {
        let { id } = req.params;

        let u = [];
        let final = [];
        let getUser = await user.findUser(id);
        u.push(getUser)

        if(u) {
            let matches = u.map((object, index) => {
                let newLikes = []
                let likes = object.likes;

                likes.map(like => {
                    if(like.match === '1') {
                        newLikes.push(like);
                    }
                });

                object.likes = newLikes;
                final.push(object);
            });

            return res.status(200).json({
                status: true,
                message: "Liked",
                data: final
            })
        }
    }

    static like = async (req, res, next) => {

        try {
            let check = await user.match(req.body);

            if(check && !check.length) {

                const like = await user.like(req.body);

                return res.status(200).json({
                    status: true,
                    message: "Liked",
                    data: like
                })

            }

            req.body.match = 1;
            const like = await user.like(req.body);
            return res.status(200).json({
                status: true,
                message: "It's a match",
                data: like
            })

        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static dislike = async (req, res, next) => {

    }

    static single = async (req, res, next) => {
        let { id } = req.params;

        try {
            let currentUser = await user.findUser(id);

            return res.status(200).json({
                status: true,
                message: "User details",
                data: currentUser
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static refreshToken = async (req, res, next) => {

        const { refreshToken } = req.body;

        if (!refreshToken) return next(createError.NotFound('Refresh token not found'))

        await jwt.verifyRefreshToken(refreshToken).then(async data => {

            const user = data.payload
            const accessToken = await jwt.signAccessToken(user)
            // const refToken = await jwt.signRefreshToken(user)

            res.status(200).json({
                status: true,
                message: "Account token successful refreshed",
                data: { ...user, accessToken, refreshToken }
            })

        }).catch(e => {
            next(createError(e.statusCode, e.message))
        })

    }

    static logout = async (req, res, next) => {

        const { refreshToken } = req.body;

        if (!refreshToken) return next(createError.NotFound('Refresh token not found'))

        await jwt.verifyRefreshToken(refreshToken).then(async data => {

            const user = data.payload

            redis.DEL(user.id, (err, val) => {
                if (err) {
                    console.log(err.message)
                    next(createError.InternalServerError())
                }
                res.status(200).json({
                    status: true,
                    message: "Account successful logout"
                })
            })

        }).catch(e => {
            next(createError(e.statusCode, e.message))
        })

    }

}

module.exports = userController;
