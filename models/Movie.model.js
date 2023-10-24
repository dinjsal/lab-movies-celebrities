//  Add your code here

// IMPORT MONGOOSE
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// Iteration 5
// CREATE A SCHEMA - defines the shape of the documents
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    //ref: model name
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity", required: true }],
  },
  {
    timestamps: true,
  }
);

// CREATE THE MODEL
const Movie = mongoose.model("Movie", movieSchema);

// EXPORT THE MODEL
module.exports = Movie;
