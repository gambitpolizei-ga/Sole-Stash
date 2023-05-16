const express = require('express');
const router = express.Router();
const brandsCtrl = require('../controllers/brands');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/brands/new', ensureLoggedIn, brandsCtrl.new);
router.post('/brands', ensureLoggedIn, brandsCtrl.create);
router.post('/sneakers/:id/brands', ensureLoggedIn, brandsCtrl.addToCast);

module.exports = router;