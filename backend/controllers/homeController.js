const db = require('../config/pgdb');

//? GET home page
//* Should be accessible once user has been authorized
//! Needs form POST req + middleware in chain - GET is end of chain
exports.home_get = async (req, res, next) => {
  try {
    if (!/[0-9]+/.test(req.params.user_id)) {
      throw new TypeError('User ID is invalid. User IDs should contain 1 or more digits.');
    }

    const { rows } = await db.query(
      `SELECT u.user_name, g.group_name
      FROM users as u
      LEFT JOIN groups as g
      ON u.group_id=g.group_id
      WHERE u.user_id=${req.params.user_id}`
    );

    const [name, groupName] = rows[0];

    if (rows.length !== 1) {
      throw new TypeError("Each user ID should be unique - there should only be one record per user.");
    } else if (typeof name !== "string" || typeof groupName !== "string") {
      throw new TypeError("A user's name and their group name (if applicable) should be of type string.");
    }

    res.json({
      name,
      groupName,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
