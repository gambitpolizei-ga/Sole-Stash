const Sneaker = require("../models/sneaker"); // Imports the "Sneaker" model
const fs = require("fs"); // Provides methods for interacting with the file system
const path = require("path"); // Provides utility functiions for working with file and directory paths

module.exports = {
  index,
  show,
  new: newSneaker,
  create,
  delete: deleteSneaker,
  edit,
  update
};
// Exports objects that contains these functions, which can be accessed and used by other parts of the application

async function index(req, res) {
  // Retrieves all sneakers from the database and renders a view to display them in the collection
  const sneakers = await Sneaker.find({});
  res.render("sneakers/index", { title: "COLLECTION", sneakers });
}

async function show(req, res) {
  // Retrieves a specific sneaker from the database based on the sneaker ID
  const sneaker = await Sneaker.findById(req.params.id);
  // Logs the sneaker object to the console and renders a view to display it's details
  console.log("sneaker", sneaker);
  res.render("sneakers/show", { title: "DETAILS", sneaker });
}

function newSneaker(req, res) {
  // Renders a view for creating a new sneaker
  res.render("sneakers/new", { title: "ADD SNEAKER", errorMsg: "" });
}

async function create(req, res) {
  // Handles creation of a new sneaker
  console.log(req.body)
  // Checks if the uploaded file is a valid image by calling the isIMG function (jpeg or png)
  if (!isImg(req.file.mimetype)) {
    console.log("You must upload a jpeg or png");
    fs.unlinkSync(__basedir + `/public/uploads/${req.file.filename}`);
    return res.redirect("/posts/new");
  }
  // Uses multer middleware for handling multipart/form-data to upload the files
  // Prepares the avatar object with the file information
  const avatar = {
    image: {
      data: path.join("uploads/" + req.file.filename),
      contentType: req.file.mimetype,
    },
  };
  // Adds the avatar to the request body
  req.body.image = avatar;
  try {
    // Creates a new sneaker in the database using the provided data
    const sneaker = await Sneaker.create(req.body);
    console.log(sneaker);
    // Redirects the user to the details page of the newly created sneaker
    res.redirect(`/sneakers/${sneaker._id}`);
  } catch (err) {
    // If there is an error during the creation process, it is logged
    console.log(err);
    // Renders the new sneaker creation page again with an error message
    res.render("sneakers/new", { title: "ADD SNEAKER", errorMsg: err.message });
  }
}

async function deleteSneaker(req, res) {
  // Deletes a sneaker from the database based on the sneaker ID
  await Sneaker.findByIdAndDelete(req.params.id);
  // Redirects the user to the sneakers collection page
  res.redirect("/sneakers");
}

function isImg(mimetype) {
  // Takes a MIME type as input providing an array of valid image MIME types (jpeg or png)
  const validImgTypes = ["image/jpeg", "image/png"];
  // Checks if the provided MIME type is included in the array of valid images
  return validImgTypes.includes(mimetype);
}

async function update(req, res) {
  try {
    // Updates an existing sneaker in the database with the provided information
    await Sneaker.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    // Redirects the user to the sneakers collection page
    res.redirect("/sneakers"); 
  } catch (err) {
    // If there is an error during the update process, it is logged
    console.log(err);
    // Renders the sneaker edit page
    res.render("sneakers/edit", { title: "UPDATE SNEAKER" });
  }
}

async function edit(req, res) {
  // Retrieves a specific sneaker from the database based on the provided ID
  const sneaker = await Sneaker.findById(req.params.id);
  res.render("sneakers/edit", { title: "UPDATE", sneaker });
}