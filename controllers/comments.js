const Sneaker = require("../models/sneaker"); // Imports the sneaker model

module.exports = {
  create,
  delete: deleteComment,
};
// Exports objects that contains these functions, which can be accessed and used by other parts of the application

function deleteComment(req, res) {
// Deletes comments associated with the sneaker
  Sneaker.findOne({
    // Uses the fineOne method on the sneaker model to find a sneaker that matches the comment and user ID
    "comments._id": req.params.id,
    "comments.user": req.user._id,
  }).then(function (sneaker) {
    if (!sneaker) return res.redirect("/sneakers");
    // If no matching sneaker is found, the function redirects the user to the sneakers collection page
    sneaker.comments.remove(req.params.id);
    // If a matching sneaker is found, it removes the comment form the comments array
    sneaker
    // Then it saves the modified sneaker object
      .save()
      .then(function () {
        // If the save operation is successful, it redirects the user to the details page of the corresponding sneaker
        res.redirect(`/sneakers/${sneaker._id}`);
      })
      // If there is an error during the save operation, it is caught and the error is passed
      .catch(function (err) {
        return next(err);
      });
  });
}

async function create(req, res) {
  // Creates comments associated with the sneaker
  try {
    // First uses the sneaker model to find the sneaker with the specific sneaker ID
    const sneaker = await Sneaker.findById(req.params.id);
    // Then modifies the req.body object by adding properties related to the user
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Logs the modified req.body comment object to the console
    console.log(req.body);
    // The comment is then pushed to the comments array of the sneaker using Mongoose
    sneaker.comments.push(req.body);
    // It is then saved to the database
    await sneaker.save();
    // If there is an error, it is caught and the error is logged
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/sneakers/${req.params.id}`);
  // Redirects user to the details page of the corresponding sneaker
}