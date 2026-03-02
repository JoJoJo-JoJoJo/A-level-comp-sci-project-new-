const { body, validationResult, matchedData } = require('express-validator');
const db = require('../config/pgdb');

//? Display user create form on GET
exports.user_create_get = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: User create GET`);
}

//? Handle user create on POST (user registers)
//? Controller defines an array of middleware (mostly validation) + data handling + response
exports.user_create_post = [
  body('user_group_id')
    .trim()
    .escape()
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Group ID must be numeric if provided'),
  body('user_name')
    .exists({ checkFalsy: true }).withMessage('User name is required')
    .isString().withMessage('User name must be a string')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('User name must be specified'),
  body('user_email')
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .normalizeEmail()
    .withMessage('Email must be a valid email format if provided'),
  body('user_password')
    .trim()
    .escape()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false
    })
    .withMessage('Password must contain at least 1 lowercase and 1 uppercase character, 1 number, 1 symbol and be at least 8 characters long'),
  //? Process request after validation + sanitization
  async (req, res, _next) => {
    //? Extract validation errors from request (if any)
    const errors = validationResult(req);

    //? If data invalid, send data and relevant error messages to client
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array()
      })
    }

    //? Extract validated and sanitized data from request body
    const data = matchedData(req);
    const [groupId, name, email, password] = [data.user_group_id, data.user_name, data.user_email, data.user_password];

    //? Set flags for query
    const isGroupId = !!groupId;
    const isUserEmail = email.length !== 0;

    //? If data valid, insert new record into DB then retrieve user's group name (if exists)
    await db.query(
      `INSERT INTO users(${isGroupId ? 'group_id, ' : ''}user_name, ${isUserEmail ? 'user_email, ' : ''}user_password) VALUES(${isGroupId ? groupId + ", " : ''}'${name}', ${isUserEmail ? `'${email}', ` : ""}'${password}')`
    );

    //? Get user ID to store in session storage
    const { rows: userRows } = await db.query(
      `SELECT user_id FROM users WHERE user_name='${name}' AND user_password='${password}'`
    );

    //? If no match, send form data back to client
    if (typeof userRows === "undefined") {
      return res.status(401).send({
        groupId: isGroupId ? groupId : '',
        name: name,
        email: isUserEmail ? email : '',
        password: password,
        isMatch: false
      });
    }

    const userId = userRows[0]['user_id'];

    //? Don't query DB for group name if user is not part of a group
    if (!isGroupId) {
      return res.send({
        userId: userId,
        name: name,
        groupName: '',
      })
    }

    const { rows: groupRows } = await db.query(
      `SELECT group_name FROM groups WHERE group_id=${groupId}`
    );

    const groupName = groupRows[0]['group_name'];

    //? Send json response to client
    return res.send({
      userId: userId,
      name: name,
      groupName: groupName
    });
  },
];

//? Display user login form on GET
exports.user_login_get = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: User login GET`);
}

//? Handle user login on POST
exports.user_login_post = [
  body('user_name')
    .exists({ checkFalsy: true }).withMessage('User name is required')
    .isString().withMessage('User name must be a string')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('User name must be specified'),
  body('user_password')
    .exists({ checkFalsy: true }).withMessage('User password is required')
    .trim()
    .escape()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false
    })
    .withMessage('Password must contain at least 1 lowercase and 1 uppercase character, 1 number, 1 symbol and be at least 8 characters long'),
  //? Process request after validation + sanitization
  async (req, res, _next) => {
    //? Extract validation errors from request (if any)
    const errors = validationResult(req);

    //? If data invalid, send data and relevant error messages to client
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array()
      })
    }

    //? Extract validated and sanitized data from request body
    const data = matchedData(req);
    const [name, password] = [data.user_name, data.user_password];

    console.log("User query on DB");
    //? If data valid, check if any records exist with the given name and password
    const { rows: userRows } = await db.query(
      `SELECT user_id, group_id FROM users WHERE user_name='${name}' AND user_password='${password}'`
    )

    //? If no match, send name and password back to client
    if (typeof userRows === "undefined") {
      return res.status(401).send({
        name: name,
        password: password,
        isMatch: false
      });
    }

    const userId = userRows[0]['user_id'];
    const groupId = userRows[0]['group_id'];

    //? Don't query DB for group name if user is not part of a group
    if (!groupId) {
      return res.send({
        userId: userId,
        name: name,
        groupName: '',
        isMatch: true
      });
    }

    console.log("Group query on DB");
    const { rows: groupRows } = await db.query(
      `SELECT group_name FROM groups WHERE group_id=${groupId}`
    );

    const groupName = groupRows[0]['group_name'];

    //? Send user info to client if DB finds match
    return res.send({
      userId: userId,
      name: name,
      groupName: groupName,
      isMatch: true
    });
  },
];

//? Display user change password form on GET
exports.user_update_get = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: User update (password) GET`);
}

//? Handle user change password on POST
exports.user_update_put = [
  body('user_id')
    .trim()
    .escape()
    .optional({ checkFalsy: true })
    .isNumeric(),
  body('user_password')
    .trim()
    .escape()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false
    })
    .withMessage('Password must contain at least 1 lowercase and 1 uppercase character, 1 number, 1 symbol and be at least 8 characters long'),
  //? Process request after validation + sanitization
  async (req, res, _next) => {
    //? Extract validation errors from request (if any)
    const errors = validationResult(req);

    //? If data invalid, send data and relevant error messages to client
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array()
      })
    }

    //? Extract validated and sanitized data from request body
    const data = matchedData(req);
    const [userId, newPassword] = [data.user_id, data.user_password];

    //? If data valid, update user password in DB
    await db.query(
      `UPDATE users SET user_password='${newPassword}' WHERE user_id=${userId}`
    );

    //? Respond to client and close connection
    return res.status(204).send();
  },
];
