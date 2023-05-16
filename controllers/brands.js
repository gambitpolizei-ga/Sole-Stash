const Brand = require('../models/brand');
const Sneaker = require('../models/sneaker');

module.exports = {
  new: newBrand,
  create,
  addToCast
};

async function addToCast(req, res) {
  const sneaker = await Sneaker.findById(req.params.id);
  sneaker.cast.push(req.body.brandId);
  await sneaker.save();
  res.redirect(`/sneakers/${sneaker._id}`);
}

async function newBrand(req, res) {
  const brands = await Brand.find({}).sort('name');
  res.render('brands/new', { title: 'Add Brand', brands });
}

async function create(req, res) {
  req.body.born += 'T00:00';
  try {
    await Brand.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/brands/new');
}