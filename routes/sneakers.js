const express = require('express');
// Imports the Expess framework
const router = express.Router();
// Creates a router object using Express
const sneakersCtrl = require('../controllers/sneakers');
// Imports the sneakers controller
const ensureLoggedIn = require('../config/ensureLoggedIn');
// Require the authorization middleware
const multer = require('multer');
// Imports the multer middleware for handling file uploads
const upload = multer({ dest: 'public/uploads/' });
// Creates the upload object with the destination directory set to public/uploads/

router.get('/', sneakersCtrl.index);
// GET /sneakers
router.get('/new', ensureLoggedIn, sneakersCtrl.new);
// GET /sneakers/new (request new sneaker while logged in)
router.get('/:id', sneakersCtrl.show);
// GET /sneakers/:id (show sneaker)
router.get('/:id/edit', ensureLoggedIn, sneakersCtrl.edit);
// GET /sneakers/:id/edit (edit sneaker while logged in)
router.put('/:id', ensureLoggedIn, sneakersCtrl.update);
// PUT /sneakers/:id (update sneaker while logged in)
router.post('/', ensureLoggedIn, upload.single('avatar'), sneakersCtrl.create);
// POST /sneakers (submit sneaker with image while logged in)
router.delete('/:id', ensureLoggedIn, sneakersCtrl.delete);
// DELETE /sneakers/:id (delete sneaker while logged in)
	
module.exports = router;
// Exports the router object