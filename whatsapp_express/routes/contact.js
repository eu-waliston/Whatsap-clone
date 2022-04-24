const router = require('express').Router();
const contact = require('../controllers/contact.controller');
const validator = require('../middlewares/validator');
const schema = require('../schemas/contact.schema');

router.get('/:id', contact.all);
router.post('/add', validator(schema.add), contact.add);

module.exports = router;