const express = require('express');
const router = express.Router();
const sneakersCtrl = require('../controllers/sneakers');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /sneakers
router.get('/', sneakersCtrl.index);
// GET /sneakers/new
router.get('/new', ensureLoggedIn, sneakersCtrl.new);
// GET /sneakers/:id (show functionality) MUST be below new route
router.get('/:id', sneakersCtrl.show);
// POST /sneakers
router.post('/', ensureLoggedIn, sneakersCtrl.create);
	
module.exports = router;
