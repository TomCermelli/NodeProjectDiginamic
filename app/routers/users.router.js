var express = require('express');
var router = express.Router();
const userController = require('../controller/users.controller');
const auth = require('../services/auth.service');


router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', auth, userController.getInfo);
router.post('/addInfo', auth, userController.createProfil);




module.exports = router;