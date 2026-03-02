const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

//* Router attached to '/forms'

//? GET req for creating user
// router.get('/user/create', user_controller.user_create_get);

//? POST req for creating user
router.post('/user/create', user_controller.user_create_post);

//? GET req for user login
// router.get('/user/login', user_controller.user_login_get);

//? POST req for user login
router.post('/user/login', user_controller.user_login_post);

//? GET req for updating user (password)
// router.get('/user/update/password', user_controller.user_update_get);

//? POST req for updating user (password)
router.post('/user/update/password', user_controller.user_update_put);

module.exports = router;
