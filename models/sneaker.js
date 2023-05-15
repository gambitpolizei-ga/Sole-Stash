const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const sneakerSchema = new Schema({
  name: { type: String, required: true },
  brand: {
    type: String,
    enum: ['Air Jordan', 'Nike', 'Adidas', 'Luxury', 'Other'],
  },
  releaseDate: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1980
  },
  size: {
    type: Number,
    min: 4,
    max: 17,
    default: 10
  },
  cast: [{
    type: Schema.Types.ObjectId,
    ref: 'Performer'
  }],
  nowShowing: { type: Boolean, default: true },
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Sneaker', sneakerSchema);