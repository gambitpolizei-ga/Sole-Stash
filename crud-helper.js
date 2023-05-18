require('dotenv').config();
// If the database connection string is in a .env file, we need to read in those env variables just like in server.js
require('./config/database');
// Connect to the database

const Sneaker = require('./models/sneaker');
// Require the app's Mongoose models

let sneakers = await Sneaker.find({});
console.log(sneakers);
// Top-level await (using await outside of an async function)