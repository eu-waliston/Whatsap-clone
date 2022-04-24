const contact = require('../services/contact.service');
const createError = require('http-errors');

class contactController {

    static all = async(req, res, next) => {

        try {

            let { id } = req.params;
            let data = await contact.all(id);

            // if(data === null) {
            //     res.status(204).json({
            //         status: false,
            //         message: 'No contacts found!'
            //     })
            // }

            res.status(200).json({
                status: true,
                message: 'contacts found',
                data
            })

        } catch(error) {
            next(createError(error.statusCode, error.message));
        }
    }

    static add = async(req, res, next) => {

        try {
            
            let data = await contact.add(req.body);

            res.status(200).json({
                status: true,
                message: 'New contact added',
                data
            })
        } catch (error) {
            next(createError(error.statusCode, error.message));
        }
    }
}


module.exports = contactController;