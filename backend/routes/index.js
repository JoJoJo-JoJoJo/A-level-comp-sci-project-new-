const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/indexController');
const home_controller = require('../controllers/homeController');

//? GET home page
// router.get('/home/:user_id', home_controller.home_get);

//* Shouldn't need this
//? GET register/login page - PoE to site
router.get('/', index_controller.index);

module.exports = router;
