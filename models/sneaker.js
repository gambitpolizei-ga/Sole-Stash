const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const imgSchema = new Schema({
  image: {
    data: String,
    contentType: String,
  },
});

const sneakerSchema = new Schema(
  {
    comments: [commentSchema],
    image: imgSchema,
    name: { type: String, required: true },
    brand: {
      type: String,
      enum: ["Air Jordan", "Nike", "Adidas", "Reebok", "Asics", "New Balance", "Converse", "Vans", "Saucony", "Luxury", "Other"],
    },
    dateAcquired: {
      type: Date,
      default: function () {
        return new Date(new Date().setFullYear(new Date().getFullYear()));
      },
    },
    size: {
      type: Number,
      min: 4,
      max: 17,
      default: 10,
    },
    notes: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sneaker", sneakerSchema);
