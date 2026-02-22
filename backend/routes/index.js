const express = require('express');
const router = express.Router();

//? GET home page - temp
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//! GET register/login page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//! GET home page
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
