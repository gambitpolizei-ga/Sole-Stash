const mongoose = require("mongoose"); // Imports Mongoose library module for MongoDB; shortcut to the mongoose.Schema class
const Schema = mongoose.Schema; // Assigns the schema proptery of the Mongoose object to define data schemas for MongoDB

const commentSchema = new Schema(
  // This schema describes the structure and data types of the comments object
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
  // This schema describes the structure and properties of an image required to store the image data
  image: {
    data: String,
    contentType: String,
  },
});

const sneakerSchema = new Schema(
  // This schema describes the structure and data types of a sneaker object
  {
    comments: [commentSchema],
    image: imgSchema,
    name: { type: String, required: true },
    brand: {
      type: String,
      enum: ["Air Jordan", "Nike", "Adidas", "Reebok", "Asics", "New Balance", "Converse", "Vans", "Saucony", "Luxury", "Other"],
    },
    size: {
      type: Number,
      min: 4,
      max: 17,
      default: 10,
    },
    dateAcquired: {
      type: Date,
      default: function () {
        return new Date(new Date().setFullYear(new Date().getFullYear()));
      },
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
// Compiles the schema into the sneaker model and exports it to perfrom CRUD operations in the database