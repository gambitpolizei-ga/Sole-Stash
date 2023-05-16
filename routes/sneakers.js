const express = require('express');
const router = express.Router();
const sneakersCtrl = require('../controllers/sneakers');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', sneakersCtrl.index);
router.get('/new', ensureLoggedIn, sneakersCtrl.new);
router.get('/:id', sneakersCtrl.show);
router.post('/', ensureLoggedIn, sneakersCtrl.create);
router.delete('/:id', sneakersCtrl.delete);
	
module.exports = router;