const Sneaker = require('../models/sneaker');

module.exports = {
  create,
  delete: deleteComment
};

function deleteComment(req, res) {
  Sneaker.findOne({'comments._id': req.params.id, 'comments.user': req.user._id}).then(function(sneaker) {
    if (!sneaker) return res.redirect('/sneakers');
    sneaker.comments.remove(req.params.id);
    sneaker.save().then(function() {
      res.redirect(`/sneakers/${sneaker._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}

async function create(req, res) {
  try {
  const sneaker = await Sneaker.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  console.log(req.body);
  sneaker.comments.push(req.body);
    await sneaker.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/sneakers/${req.params.id}`);
}