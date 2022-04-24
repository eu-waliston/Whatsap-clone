const router = require('express').Router();
const auth = require('./auth');
const contact = require('./contact');
const createError = require('http-errors')

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/auth', auth);
router.use('/contacts', contact);

router.use( async (req, res, next) => {
    next(createError.NotFound('Route not Found'))
})

router.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})

module.exports = router;
