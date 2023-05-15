require('dotenv').config();
require('./config/database');

const Collection = require('./models/collection');

let collections = await Collection.find({});
console.log(collections);