const Sneaker = require('../models/sneaker');
const Brand = require('../models/brand');

module.exports = {
  index,
  show,
  new: newSneaker,
  create,
  delete: deleteSneaker
};

async function index(req, res) {
  const sneakers = await Sneaker.find({});
  res.render('sneakers/index', { title: 'Collection', sneakers });
}

async function show(req, res) {
  const sneaker = await Sneaker.findById(req.params.id).populate('cast');
  const brands = await Brand.find({ _id: { $nin: sneaker.cast } }).sort('name');
  res.render('sneakers/show', { title: 'Sneaker Details', sneaker, brands });
}

function newSneaker(req, res) {
  res.render('sneakers/new', { title: 'Add Sneaker', errorMsg: '' });
}

async function create(req, res) {
  console.log(req.body)
  try {
    const sneaker = await Sneaker.create(req.body);
    console.log(sneaker);
    res.redirect(`/sneakers/${sneaker._id}`);
  } catch (err) {
    console.log(err);
    res.render('sneakers/new', { errorMsg: err.message });
  }
}

async function deleteSneaker(req,res) {
  await Sneaker.findByIdAndDelete(req.params.id);
  res.redirect('/sneakers');
}