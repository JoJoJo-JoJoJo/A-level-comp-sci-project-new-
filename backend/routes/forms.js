const express = require('express');
const router = express.Router();

//? GET forms route (should have a message as needs id)
router.get('/', function (_req, res, _next) {
  res.send('respond with a resource');
});

//? GET register form
//? GET login form
//? GET change password form
router.get('/:id', function (req, res, _next) {
  res.send(`This is the page route for the ${req.params.id} form`);
});

//? POST register form
//? POST login form
//? POST change password form
router.post('/:id/submit', function (req, res, _next) {
  res.send(`This is the submission route for the ${req.params.id} form`);
});

module.exports = router;
