const Sneaker = require("../models/sneaker");
const Brand = require("../models/brand");
const fs = require("fs");
const path = require("path");

module.exports = {
  index,
  show,
  new: newSneaker,
  create,
  delete: deleteSneaker,
};

async function index(req, res) {
  const sneakers = await Sneaker.find({});
  res.render("sneakers/index", { title: "Collection", sneakers });
}

async function show(req, res) {
  const sneaker = await Sneaker.findById(req.params.id).populate("cast");
  const brands = await Brand.find({ _id: { $nin: sneaker.cast } }).sort("name");
  console.log('sneaker', sneaker);
  res.render("sneakers/show", { title: "Sneaker Details", sneaker, brands });
}

function newSneaker(req, res) {
  res.render("sneakers/new", { title: "ADD SNEAKER", errorMsg: "" });
}

async function create(req, res) {
  if (!isImg(req.file.mimetype)) {
    console.log("You must upload a jpeg or png");
    fs.unlinkSync(__basedir + `/public/uploads/${req.file.filename}`);
    return res.redirect("/posts/new");
  }
  // Multer
  const avatar = {
    image: {
      data: path.join("uploads/" + req.file.filename),
      contentType: req.file.mimetype,
    },
  };
  req.body.image = avatar;
  try {
    const sneaker = await Sneaker.create(req.body);
    console.log(sneaker);
    res.redirect(`/sneakers/${sneaker._id}`);
  } catch (err) {
    console.log(err);
    res.render("sneakers/new", { title: "ADD SNEAKER", errorMsg: err.message });
  }
}

async function deleteSneaker(req, res) {
  await Sneaker.findByIdAndDelete(req.params.id);
  res.redirect("/sneakers");
}

function isImg(mimetype) {
  const validImgTypes = ["image/jpeg", "image/png"];
  return validImgTypes.includes(mimetype);
}
