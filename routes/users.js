var express = require('express');
var router = express.Router();
const controller = require("../controllers/usersController");

/* GET users listing. */
router.get('/', controller.getAll);
router.get('/user', controller.getOne);
router.post('/', controller.create);

module.exports = router;
