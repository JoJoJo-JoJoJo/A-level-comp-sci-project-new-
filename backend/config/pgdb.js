const ENV = require('dotenv');
const pgp = require('pg-promise');
//! Needs updating with correct information before working on POST routes
const db = pgp(`postgres://postgres:${ENV.DB_PASSWORD}@localhost:5432/Amaze`);

//* Example DB query
async function exDbQuery() {
  try {
    await db.one('SELECT * FROM Users', _, (data) => console.log("DATA: " + data));
  } catch (err) {
    console.error(err.message);
  }
}
