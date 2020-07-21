var express = require('express');
var router = express.Router();
var index = require('../Controllers/index_controller');
var user = require('../Controllers/user_controller');

/* GET home page. */
router.get('/', index.index);

router.get('/signup', user.show_signup);
router.post('/signup', user.signup);

router.get('/login', user.show_login);
router.post('/login', user.login);

router.get('/logout', user.logout);
module.exports = router;
