const express = require('express');
const router = express.Router();

//? GET forms route (should have a message as needs id)
router.get('/', function (_req, res, _next) {
  res.send('Please use a valid form route: register, login, change-password');
});

//? GET register form
//? GET login form
//? GET change password form
router.get('/:id', function (req, res, _next) {
  res.render('form', { temp_text: `This is the page route for the ${req.params.id} form` });
});

//? POST register form
//? POST login form
//? POST change password form
//! Should handle form data + interact with db - then render home page if valid, else go back to form page with previous info saved
router.post('/:id/submit', function (req, res, next) {
  res.render('form', { temp_text: `This is the submission route for the ${req.params.id} form` });
});

module.exports = router;
