const { Client } = require('pg');
require('dotenv').config();

async function createDBAndConnect() {
  //* Using client as setting up DB for a system should be a one-time action
  //? Set up connection to default postgres DB to create new DB
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres',
    //? Default to invalid password
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
  });

  try {
    await client.connect();

    //? Create DB if it doesn't exist
    const dbExists = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_DATABASE]
    );

    if (dbExists.rowCount === 0) {
      await client.query(`CREATE DATABASE "${process.env.DB_DATABASE}"`);
      console.log(`Database "${process.env.DB_DATABASE}" created.`);
    } else {
      console.log(`Database "${process.env.DB_DATABASE}" already exists.`);
    }

    //? Connect to new DB
    const dbClient = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    await dbClient.connect();

    //? Create 'groups' table
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS groups (
        group_id SERIAL PRIMARY KEY,
        group_name VARCHAR(32) NOT NULL
      );
    `);

    //! Change to table-specific column names

    console.log('Table "groups" created successfully');

    //? Create 'users' table
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        group_id INTEGER,
        FOREIGN KEY (group_id) REFERENCES groups(group_id),
        user_name VARCHAR(32) NOT NULL,
        user_email VARCHAR(32) UNIQUE,
        user_password VARCHAR(32) NOT NULL
      );
    `);

    console.log('Table "users" created successfully');

    //? Close connection to app DB
    await dbClient.end();
  } catch (err) {
    //? Handle setup errors
    console.error('Error setting up DB: ', err.message);
  } finally {
    //? Close original connection to default DB
    await client.end();
  }
}

createDBAndConnect();
