require('dotenv').config();
require('./config/database');

const Sneaker = require('./models/sneaker');

let sneakers = await Sneaker.find({});
console.log(sneakers);