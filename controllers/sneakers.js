const Sneaker = require('../models/sneaker');
// const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newSneaker,
  create
};

async function index(req, res) {
  const sneakers = await Sneaker.find({});
  res.render('sneakers/index', { title: 'Collection', sneakers });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const sneaker = await Sneaker.findById(req.params.id).populate('cast');
  // Mongoose query builder approach to retrieve performers not the movie:
    // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the movie.cast array like this:
  const performers = await Performer.find({ _id: { $nin: sneaker.cast } }).sort('name');
  res.render('sneakers/show', { title: 'Sneaker Detail', sneaker, performers });
}

function newSneaker(req, res) {
  res.render('sneakers/new', { title: 'Add Sneaker', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const sneaker = await Sneaker.create(req.body);
    // Redirect to the new movie's show functionality 
    res.redirect(`/sneakers/${sneaker._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('sneakers/new', { errorMsg: err.message });
  }
}