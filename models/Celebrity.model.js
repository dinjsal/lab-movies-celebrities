//  Add your code here

// IMPORT MONGOOSE
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// Iteration 2
// CREATE A SCHEMA - defines the shape of the documents

const celebritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
      required: false,
    },
    //ref: model name
    movie: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  {
    timestamps: true,
  }
);

// CREATE THE MODEL
const Celebrity = mongoose.model("Celebrity", celebritySchema);

// EXPORT THE MODEL
module.exports = Celebrity;
