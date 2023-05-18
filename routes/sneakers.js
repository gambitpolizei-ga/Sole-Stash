const express = require('express');
const router = express.Router();
const sneakersCtrl = require('../controllers/sneakers');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

router.get('/', sneakersCtrl.index);
router.get('/new', ensureLoggedIn, sneakersCtrl.new);
router.get('/:id', sneakersCtrl.show);
router.get('/:id/edit', ensureLoggedIn, sneakersCtrl.edit);
router.put('/:id', ensureLoggedIn, sneakersCtrl.update);
router.post('/', ensureLoggedIn, upload.single('avatar'), sneakersCtrl.create);
router.delete('/:id', ensureLoggedIn, sneakersCtrl.delete);
	
module.exports = router;