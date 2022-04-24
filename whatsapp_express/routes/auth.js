const router = require('express').Router();
const schema = require('../schemas/auth.schema');
const user = require('../controllers/user.controller');
const validator = require('../middlewares/validator');

router.post('/register', validator(schema.register), user.register);
router.post('/login', validator(schema.login), user.login);

router.get('/:id', user.single);
router.get('/all/:id', user.all);

router.post('/like', validator(schema.like), user.like);
router.post('/dislike', validator(schema.dislike), user.like);

router.get('/matches/:id', user.matches);

module.exports = router;
