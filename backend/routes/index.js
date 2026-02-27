const express = require('express');
const db = require('../config/pgdb');
const router = express.Router();

//? GET home page - temp
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//? GET register/login page
//* Should be first page to load on entering website
router.get('/', function (_req, res, _next) {
  res.render('index', { title: 'Amaze' });
});

//? GET home page
//* Should be accessible once user has been authorized
//! Needs form POST req + middleware in chain - GET is end of chain

router.get('/home/:user_id', async (req, res, _next) => {
  try {
    if (!/[0-9]{8}/.test(req.params.user_id)) throw new TypeError('User ID is invalid. User IDs should be 8 digits long.');
    const { rows } = db.query(`SELECT u.name, g.class FROM Users as u LEFT JOIN Groups as g ON u.group_id=g.id WHERE u.id=${req.params.user_id}`);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  //? temp name + class
  // const userName = 'John Doe';
  // const userClass = '10A';

  // res.render('home', {
  //   title: 'Amaze | Home',
  //   user_initial: userName.slice(0, 1).toUpperCase(),
  //   user_name: userName,
  //   user_class: userClass
  // });
});

//! Needs middleware to send data to client w/ user info to be displayed on navbar
//* Create sidebar for home page statically on server side w/ user display?
//* Or can return JSON w/ data to be displayed to reduce server overhead

module.exports = router;
